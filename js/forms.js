"use strict";

(() => {
    const demoForm = document.getElementById("demo-form");
    const demoPlan = document.getElementById("demo-plan");
    const demoError = document.getElementById("demo-error");

    if (!demoForm || !demoPlan || !demoError) {
        return;
    }

    const availablePlans = new Set(
        [...demoPlan.options].map((option) => option.value)
    );

    document.querySelectorAll('a[data-plan][href="#demo"]').forEach((link) => {
        link.addEventListener("click", (event) => {
            if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) {
                return;
            }

            const selectedPlan = link.dataset.plan;

            if (availablePlans.has(selectedPlan)) {
                demoPlan.value = selectedPlan;
                demoPlan.focus({ preventScroll: true });
            }
        });
    });

    demoForm.addEventListener("input", () => {
        demoError.hidden = true;
    });

    demoForm.addEventListener("submit", (event) => {
        demoError.hidden = true;

        const endpoint = demoForm.getAttribute("action") || "";
        const isConfigured = /^https:\/\/formspree\.io\/f\/[a-z0-9]+$/i.test(endpoint);

        if (!isConfigured) {
            event.preventDefault();
            demoError.hidden = false;
            demoError.focus();
            return;
        }

        demoForm
            .querySelectorAll('input[type="text"], input[type="email"], textarea')
            .forEach((field) => {
                field.value = field.value.trim();
            });

        if (!demoForm.reportValidity()) {
            event.preventDefault();
        }
    });
})();