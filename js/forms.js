"use strict";

(() => {
    const demoPlan = document.getElementById("demo-plan");

    if (demoPlan) {
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
    }

    function configureForm(formId, errorId) {
        const form = document.getElementById(formId);
        const error = document.getElementById(errorId);

        if (!form || !error) {
            return;
        }

        form.addEventListener("input", () => {
            error.hidden = true;
        });

        form.addEventListener("submit", (event) => {
            error.hidden = true;

            const endpoint = (form.getAttribute("action") || "").trim();
            const isConfigured = /^https:\/\/formspree\.io\/f\/[a-z0-9]+$/i.test(endpoint);

            if (!isConfigured) {
                event.preventDefault();
                error.hidden = false;
                error.focus();
                return;
            }

            form
                .querySelectorAll('input[type="text"], input[type="email"], textarea')
                .forEach((field) => {
                    field.value = field.value.trim();
                });

            if (!form.reportValidity()) {
                event.preventDefault();
            }
        });
    }

    configureForm("demo-form", "demo-error");
    configureForm("contact-form", "contact-error");
})();