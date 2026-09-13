(() => {
  "use strict";
  if (!CSS.supports("grid-template-rows", "subgrid") || !CSS.supports("clip-path", "inset(0 50% 0 0)")) return;

  const start = () => document.querySelectorAll(".wc-image-slider").forEach((root) => {
    if (root.dataset.sliderReady) return;
    const stage = root.querySelector(".wc-image-slider__stage");
    const figures = Array.from(stage.children).filter((el) => el.tagName === "FIGURE");
    if (figures.length !== 2 || figures.some((figure) => !figure.querySelector("img"))) return;

    const grip = root.querySelector(".wc-image-slider__grip");
    let position = Number(grip.getAttribute("aria-valuenow"));
    const media = figures[0].querySelector(":scope > img, :scope > a");
    if (!media) return;
    let pointer = null;
    let pointerOffset = 0;

    const update = (value) => {
      position = Math.max(0, Math.min(100, Math.round(value)));
      grip.setAttribute("aria-valuenow", String(position));
      root.style.setProperty("--image-split", `${position}%`);
      grip.setAttribute("aria-valuetext", `${position}% ${root.dataset.a}; ${100 - position}% ${root.dataset.b}`);
    };
    const move = (event) => {
      const rect = media.getBoundingClientRect();
      if (rect.width) update((event.clientX - rect.left - pointerOffset) / rect.width * 100);
    };

    grip.addEventListener("keydown", (event) => {
      let next;
      switch (event.key) {
        case "ArrowRight": case "ArrowUp": next = position + 1; break;
        case "ArrowLeft": case "ArrowDown": next = position - 1; break;
        case "PageUp": next = position + 10; break;
        case "PageDown": next = position - 10; break;
        case "Home": next = 0; break;
        case "End": next = 100; break;
        default: return;
      }
      event.preventDefault();
      update(next);
    });
    grip.addEventListener("pointerdown", (event) => {
      if (!event.isPrimary || event.button !== 0) return;
      pointer = event.pointerId;
      // Keep the divider still when grabbing off-center or at a clamped endpoint.
      const rect = media.getBoundingClientRect();
      pointerOffset = event.clientX - rect.left - rect.width * position / 100;
      grip.setPointerCapture(pointer);
      event.preventDefault();
      grip.focus({ preventScroll: true });
      root.classList.add("is-dragging");
      move(event);
    });
    grip.addEventListener("pointermove", (event) => {
      if (event.pointerId === pointer) move(event);
    });
    const finish = (event) => {
      if (event.pointerId !== pointer) return;
      pointer = null;
      root.classList.remove("is-dragging");
      if (grip.hasPointerCapture(event.pointerId)) grip.releasePointerCapture(event.pointerId);
    };
    grip.addEventListener("pointerup", finish);
    grip.addEventListener("pointercancel", finish);
    grip.addEventListener("lostpointercapture", finish);

    update(position);
    root.dataset.sliderReady = "true";

    root.querySelector(".wc-image-slider__divider").hidden = false;
  });

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start, { once: true });
  else start();
})();
