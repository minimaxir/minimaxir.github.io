(() => {
  "use strict";

  const start = () => {
    const load = (video) => {
      const source = video.querySelector("source[data-src]");
      if (!source) return;
      source.src = source.dataset.src;
      delete source.dataset.src;
      video.load();
      video.parentElement.querySelector("[data-video-fallback]")?.remove();
      if (video.autoplay) {
        // A rejected autoplay request must still leave a usable player.
        video.play()?.catch(() => { video.controls = true; });
      }
    };
    const observer = "IntersectionObserver" in window
      ? new IntersectionObserver((entries) => {
        entries.forEach(({ target, isIntersecting }) => {
          if (!isIntersecting) return;
          observer.unobserve(target);
          load(target);
        });
      }, { rootMargin: "300px 0px" })
      : null;

    document.querySelectorAll("template[data-lazy-video]").forEach((template) => {
      const video = template.content.querySelector("video")?.cloneNode(true);
      const source = video?.querySelector("source");
      if (!source) return;
      // Remove the URL before insertion: autoplay/preload cannot fetch it early.
      source.dataset.src = source.getAttribute("src");
      source.removeAttribute("src");
      video.muted = video.hasAttribute("muted");
      template.replaceWith(video);
      video.addEventListener("play", () => load(video), { once: true });
      if (observer) observer.observe(video);
      else load(video);
    });
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start, { once: true });
  else start();
})();
