(function () {
  if (window.__sophiaWidgetLoaded) return;
  window.__sophiaWidgetLoaded = true;

  var SRC = "https://eurocert-chatbot-frontend.vercel.app/";
  var CSS_ID = "sophia-chatbot-css";
  var wired = false;

  var CSS = [
    "#ec-float-dock,footer.footer-premium > div.fixed.bottom-8.right-8,div.fixed.bottom-8.right-8.z-50{bottom:195px!important;right:max(16px,env(safe-area-inset-right))!important}",
    ".ft-float{bottom:195px!important;right:max(14px,env(safe-area-inset-right))!important}",
    "body:has(#sophia-chatbot-wrap.sophia-open) #ec-float-dock,body:has(#sophia-chatbot-wrap.sophia-open) footer.footer-premium > div.fixed.bottom-8.right-8,body:has(#sophia-chatbot-wrap.sophia-open) div.fixed.bottom-8.right-8.z-50,body:has(#sophia-chatbot-wrap.sophia-open) .ft-float{opacity:0!important;pointer-events:none!important}",
    "#sophia-chatbot-wrap{position:fixed!important;right:max(10px,env(safe-area-inset-right))!important;bottom:max(10px,env(safe-area-inset-bottom))!important;width:170px!important;height:170px!important;z-index:2147483646!important;overflow:visible!important;pointer-events:none!important}",
    "#sophia-chatbot-iframe{position:absolute!important;right:0!important;bottom:0!important;width:340px!important;height:340px!important;border:0!important;background:transparent!important;overflow:visible!important;border-radius:0!important;box-shadow:none!important;transform:scale(0.5)!important;transform-origin:bottom right!important;pointer-events:auto!important;-webkit-tap-highlight-color:transparent}",
    "#sophia-chatbot-wrap.sophia-open{inset:auto!important;right:max(12px,env(safe-area-inset-right))!important;bottom:max(12px,env(safe-area-inset-bottom))!important;width:min(400px,calc(100vw - 24px))!important;height:min(650px,calc(100dvh - 24px))!important;pointer-events:auto!important;z-index:2147483647!important}",
    "#sophia-chatbot-wrap.sophia-open #sophia-chatbot-iframe{inset:0!important;width:100%!important;height:100%!important;transform:none!important;border-radius:16px!important;overflow:hidden!important;box-shadow:0 16px 48px rgba(3,10,22,.32)!important}",
    "@media (max-width:767px){#ec-float-dock,footer.footer-premium > div.fixed.bottom-8.right-8,div.fixed.bottom-8.right-8.z-50,.ft-float{bottom:165px!important;right:max(12px,env(safe-area-inset-right))!important}#sophia-chatbot-wrap:not(.sophia-open){width:150px!important;height:150px!important;right:max(8px,env(safe-area-inset-right))!important;bottom:max(8px,env(safe-area-inset-bottom))!important}#sophia-chatbot-wrap:not(.sophia-open) #sophia-chatbot-iframe{transform:scale(0.44)!important}#sophia-chatbot-wrap.sophia-open{inset:0!important;width:100vw!important;height:100dvh!important;right:0!important;bottom:0!important}#sophia-chatbot-wrap.sophia-open #sophia-chatbot-iframe{border-radius:0!important;box-shadow:none!important}}",
    "@media (max-width:380px){#ec-float-dock,footer.footer-premium > div.fixed.bottom-8.right-8,div.fixed.bottom-8.right-8.z-50,.ft-float{bottom:145px!important}#sophia-chatbot-wrap:not(.sophia-open){width:130px!important;height:130px!important}#sophia-chatbot-wrap:not(.sophia-open) #sophia-chatbot-iframe{transform:scale(0.38)!important}}"
  ].join("");

  function ensureCss() {
    if (document.getElementById(CSS_ID)) return;
    var style = document.createElement("style");
    style.id = CSS_ID;
    style.textContent = CSS;
    (document.head || document.documentElement).appendChild(style);
  }

  function isMobile() {
    return window.matchMedia("(max-width: 767px)").matches;
  }

  function restoreFloats() {
    var onFostac = location.pathname.indexOf("/training/fostac") !== -1;
    document.querySelectorAll("#ec-float-dock, .ft-float, div.fixed.bottom-8.right-8.z-50").forEach(function (el) {
      if (onFostac && !el.classList.contains("ft-float")) {
        el.style.setProperty("display", "none", "important");
        return;
      }
      el.removeAttribute("hidden");
      el.removeAttribute("aria-hidden");
      var st = (el.getAttribute("style") || "").toLowerCase().replace(/ /g, "");
      if (st.indexOf("display:none") !== -1) el.style.removeProperty("display");
      if (window.getComputedStyle(el).display === "none") {
        el.style.setProperty("display", "flex", "important");
      }
    });
  }

  function setOpen(wrap, open) {
    if (!wrap) return;
    wrap.classList.toggle("sophia-open", !!open);
    document.documentElement.style.overflow = open && isMobile() ? "hidden" : "";
  }

  function wire() {
    if (wired) return;
    wired = true;
    window.addEventListener("message", function (event) {
      var data = event.data;
      if (!data || data.source !== "sophia-widget") return;
      if (data.type === "resize") {
        var open = data.open === true || (typeof data.height === "number" && data.height > 420);
        if (data.open === false) open = false;
        setOpen(document.getElementById("sophia-chatbot-wrap"), open);
      }
    });
  }

  function mount() {
    if (!document.body) return;
    ensureCss();
    var wrap = document.getElementById("sophia-chatbot-wrap");
    if (!wrap) {
      wrap = document.createElement("div");
      wrap.id = "sophia-chatbot-wrap";
      var iframe = document.createElement("iframe");
      iframe.id = "sophia-chatbot-iframe";
      iframe.src = SRC;
      iframe.title = "SOPHIA chatbot";
      iframe.setAttribute("allow", "microphone");
      wrap.appendChild(iframe);
      document.body.appendChild(wrap);
    } else if (!document.getElementById("sophia-chatbot-iframe")) {
      var iframe2 = document.createElement("iframe");
      iframe2.id = "sophia-chatbot-iframe";
      iframe2.src = SRC;
      iframe2.title = "SOPHIA chatbot";
      iframe2.setAttribute("allow", "microphone");
      wrap.appendChild(iframe2);
    }
    wire();
    restoreFloats();
  }

  function boot() {
    mount();
    setTimeout(mount, 300);
    setTimeout(mount, 1200);
    setTimeout(restoreFloats, 800);
    setInterval(function () {
      if (!document.getElementById("sophia-chatbot-wrap") || !document.getElementById("sophia-chatbot-iframe")) {
        mount();
      }
    }, 2500);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
  window.addEventListener("load", function () { setTimeout(mount, 50); });
})();
