(() => {
  "use strict";

  // A second script inclusion must not register handlers or initialize twice.
  const key = Symbol.for("shortcode-tabs.loaded");
  if (window[key]) return;
  window[key] = true;

  const start = () => {
    const instances = [];
    const owners = new Map();
    let sequence = 0;
    const uniqueId = () => {
      let id;
      do { id = `shortcode-tabs-${++sequence}`; }
      while (document.getElementById(id));
      return id;
    };

    const select = (instance, index) => {
      instance.buttons.forEach((button, i) => {
        button.setAttribute("aria-selected", String(i === index));
        button.tabIndex = i === index ? 0 : -1;
        instance.panels[i].hidden = i !== index;
      });
    };

    const activate = (instance, index) => {
      select(instance, index);
      if (!instance.group) return;
      const title = instance.panels[index].dataset.tabTitle;
      instances.forEach((other) => {
        if (other === instance || other.group !== instance.group) return;
        const match = other.panels.findIndex((panel) => panel.dataset.tabTitle === title);
        if (match !== -1) select(other, match);
      });
    };

    document.querySelectorAll(".shortcode-tabs").forEach((root) => {
      // Direct children only: descendants belong to independent nested widgets.
      const panels = Array.from(root.children).filter((child) =>
        child.matches(".shortcode-tabs__panel")
      );
      const headings = panels.map((panel) => Array.from(panel.children).find((child) =>
        child.matches(".shortcode-tabs__heading")
      ));
      if (!panels.length || panels.some((panel, i) => !panel.dataset.tabTitle || !headings[i])) return;

      const list = document.createElement("div");
      list.className = "shortcode-tabs__list";
      list.setAttribute("role", "tablist");
      list.setAttribute("aria-label", root.dataset.tabsLabel || "Examples");
      list.setAttribute("aria-orientation", "horizontal");
      const buttons = panels.map((panel) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "shortcode-tabs__button";
        button.id = uniqueId();
        button.setAttribute("role", "tab");
        button.textContent = panel.dataset.tabTitle;
        list.append(button);
        return button;
      });
      const instance = { root, panels, buttons, group: root.dataset.tabsGroup };
      buttons.forEach((button, index) => {
        button.addEventListener("click", () => activate(instance, index));
        button.addEventListener("keydown", (event) => {
          if (event.altKey || event.ctrlKey || event.metaKey) return;
          const rtl = getComputedStyle(list).direction === "rtl";
          let next;
          switch (event.key) {
            case "ArrowRight": next = (index + (rtl ? -1 : 1) + buttons.length) % buttons.length; break;
            case "ArrowLeft": next = (index + (rtl ? 1 : -1) + buttons.length) % buttons.length; break;
            case "Home": next = 0; break;
            case "End": next = buttons.length - 1; break;
            default: return;
          }
          event.preventDefault();
          activate(instance, next);
          buttons[next].focus({ preventScroll: true });
          buttons[next].scrollIntoView({ block: "nearest", inline: "nearest", behavior: "instant" });
        });
      });

      root.prepend(list);
      panels.forEach((panel, index) => {
        if (!panel.id) panel.id = uniqueId();
        buttons[index].setAttribute("aria-controls", panel.id);
        panel.setAttribute("role", "tabpanel");
        panel.setAttribute("aria-labelledby", buttons[index].id);
        panel.tabIndex = 0;
        owners.set(panel, instance);
      });
      instances.push(instance);
      // No content is hidden until the widget and all its handlers are ready.
      root.dataset.tabsReady = "true";
      headings.forEach((heading) => { heading.hidden = true; });
      select(instance, 0);
    });

    const revealHash = () => {
      if (!location.hash) return;
      let id;
      try { id = decodeURIComponent(location.hash.slice(1)); }
      catch { return; }
      const target = document.getElementById(id) || Array.from(document.getElementsByName(id)).find((el) => el.tagName === "A");
      if (!target) return;
      let revealed = false;
      for (let node = target; node; node = node.parentElement) {
        const owner = owners.get(node);
        if (owner) {
          select(owner, owner.panels.indexOf(node));
          revealed = true;
        }
      }
      // Hash navigation takes precedence over group syncing, which could hide an ancestor.
      if (revealed) target.scrollIntoView({ block: "start", behavior: "instant" });
    };
    window.addEventListener("hashchange", revealHash);
    // Clicking the current hash does not emit hashchange.
    document.addEventListener("click", (event) => {
      const link = event.target instanceof Element ? event.target.closest("a[href]") : null;
      if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.hasAttribute("download") || (link.target && link.target !== "_self")) return;
      const url = new URL(link.href, location.href);
      if (url.origin === location.origin && url.pathname === location.pathname && url.search === location.search && url.hash === location.hash) {
        requestAnimationFrame(revealHash);
      }
    });
    revealHash();
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start, { once: true });
  else start();
})();
