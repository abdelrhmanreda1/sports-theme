document.addEventListener("DOMContentLoaded", function () {
  const languageSwitcher = document.getElementById("language-switcher");
  const allTextElements = document.querySelectorAll("[data-en][data-ar]");
  const header = document.querySelector("header");

  const updateLanguage = (language) => {
    allTextElements.forEach(function (element) {
      const text = element.getAttribute("data-" + language);
      element.innerHTML = text;
    });

    const options = languageSwitcher.querySelectorAll("option");
    options.forEach(function (option) {
      const text = option.getAttribute("data-" + language);
      if (text) {
        option.textContent = text.replace(/<br\s*\/?>/g, " ");
      }
    });

    if (language === "ar") {
      languageSwitcher.querySelector("option[value='ar']").textContent = "عربي";
      languageSwitcher.querySelector("option[value='en']").textContent = "إنجليزي";
      header.setAttribute("dir", "rtl");
    } else {
      languageSwitcher.querySelector("option[value='ar']").textContent = "Ar";
      languageSwitcher.querySelector("option[value='en']").textContent = "En";
      header.setAttribute("dir", "ltr");
    }

    const inputs = document.querySelectorAll("input, textarea");
    inputs.forEach(function (input) {
      const placeholderText = input.getAttribute("data-" + language);
      if (placeholderText) {
        input.setAttribute("placeholder", placeholderText);
      }
    });

    const submitButtons = document.querySelectorAll("input[type='submit']");
    submitButtons.forEach(function (button) {
      const buttonText = button.getAttribute("data-" + language);
      if (buttonText) {
        button.value = buttonText;
      }
    });

    localStorage.setItem("selectedLanguage", language);
  };

  languageSwitcher.addEventListener("change", function () {
    const selectedLanguage = languageSwitcher.value;
    updateLanguage(selectedLanguage);
  });

  const defaultLanguage = localStorage.getItem("selectedLanguage") || "en";
  languageSwitcher.value = defaultLanguage;

  updateLanguage(defaultLanguage);
});
