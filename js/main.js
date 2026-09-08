"use strict";

document.documentElement.classList.add("js");

const languageButton = document.getElementById("language-toggle");

const translatedElements = [...document.querySelectorAll("[data-es]")].map(
    (element) => ({
        element,
        english: element.tagName === "META"
            ? element.getAttribute("content")
            : element.textContent,
        spanish: element.dataset.es,
    })
);

let currentLanguage = "en-US";

try {
    if (localStorage.getItem("maquigest-language") === "es-419") {
        currentLanguage = "es-419";
    }
} catch {
    // The page also works when browser storage is unavailable.
}

function changeLanguage(language) {
    currentLanguage = language;
    const isSpanish = language === "es-419";

    document.documentElement.lang = language;

    translatedElements.forEach(({ element, english, spanish }) => {
        const text = isSpanish ? spanish : english;

        if (element.tagName === "META") {
            element.setAttribute("content", text);
        } else {
            element.textContent = text;
        }
    });

    document.querySelectorAll('input[name="_language"]').forEach((input) => {
        input.value = isSpanish ? "es" : "en";
    });

    if (languageButton) {
        languageButton.textContent = isSpanish ? "English" : "Español";
        languageButton.lang = isSpanish ? "en-US" : "es-419";
        languageButton.hidden = false;
    }

    try {
        localStorage.setItem("maquigest-language", language);
    } catch {
        // Saving a preference is optional.
    }
}

languageButton?.addEventListener("click", () => {
    changeLanguage(currentLanguage === "en-US" ? "es-419" : "en-US");
});

changeLanguage(currentLanguage);

const menuButton = document.getElementById("menu-toggle");
const navigation = document.getElementById("nav-menu");

if (menuButton && navigation) {
    menuButton.hidden = false;

    function setMenu(open) {
        menuButton.setAttribute("aria-expanded", String(open));
        navigation.classList.toggle("is-open", open);
    }

    menuButton.addEventListener("click", () => {
        setMenu(menuButton.getAttribute("aria-expanded") !== "true");
    });

    navigation.addEventListener("click", (event) => {
        if (event.target.closest("a")) setMenu(false);
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && navigation.classList.contains("is-open")) {
            setMenu(false);
            menuButton.focus();
        }
    });

    document.addEventListener("click", (event) => {
        if (!event.target.closest(".header")) setMenu(false);
    });

    window.matchMedia("(min-width: 981px)").addEventListener("change", () => {
        setMenu(false);
    });
}