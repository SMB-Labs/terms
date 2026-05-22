/* ============================================================
   Shared EN/KO language toggle for document pages.
   - Elements with data-en / data-ko swap their textContent.
   - #doc-en / #doc-ko articles toggle visibility.
   - #btn-en / #btn-ko reflect the active state.
   - Choice persists in localStorage ("kw-lang") across pages.
   ============================================================ */
(function () {
  function setLang(lang) {
    document.documentElement.lang = lang;

    document.querySelectorAll("[data-" + lang + "]").forEach(function (el) {
      var value = el.getAttribute("data-" + lang);
      if (value !== null) el.textContent = value;
    });

    var en = document.getElementById("doc-en");
    var ko = document.getElementById("doc-ko");
    if (en) en.hidden = lang !== "en";
    if (ko) ko.hidden = lang !== "ko";

    var btnEn = document.getElementById("btn-en");
    var btnKo = document.getElementById("btn-ko");
    if (btnEn) btnEn.classList.toggle("active", lang === "en");
    if (btnKo) btnKo.classList.toggle("active", lang === "ko");

    try { localStorage.setItem("kw-lang", lang); } catch (e) {}
  }

  window.setLang = setLang;

  var saved;
  try { saved = localStorage.getItem("kw-lang"); } catch (e) {}
  var initial = saved || (navigator.language || "en").slice(0, 2);
  setLang(initial === "ko" ? "ko" : "en");
})();
