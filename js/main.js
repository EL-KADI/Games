import Display from "./Display-module.js";
import GameSectionToggle from "./gameSectionToggle.js";

class Spinner {
  constructor(spinnerContainerClass) {
    this.spinnerContainer = document.querySelector(`.${spinnerContainerClass}`);
  }

  show() {
    if (this.spinnerContainer) {
      this.spinnerContainer.classList.remove("d-none");
    }
  }

  hide() {
    if (this.spinnerContainer) {
      this.spinnerContainer.classList.add("d-none");
    }
  }
}

class Main {
  constructor() {
    this.navItems = document.querySelectorAll(".navbar-nav .nav-item");
    this.spinner = new Spinner("split-icon-container");
    this.gameSectionToggle = new GameSectionToggle();
    this.displayContainer = new Display("one", this.gameSectionToggle);
    this.detailsSection = document.querySelector(".sec-tow");
    this.sectionOne = document.querySelector(".sec-one");
  }

  changeActiveClass(activeElement) {
    this.navItems.forEach((item) => {
      const span = item.querySelector(".nav-link");
      if (span.classList.contains("span-clr")) {
        span.classList.remove("span-clr");
      }
    });
    activeElement.classList.add("span-clr");
  }

  async fetchGames(category) {
    this.spinner.show();

    try {
      const response = await fetch(
        `https://free-to-play-games-database.p.rapidapi.com/api/filter?tag=${category}&platform=pc`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
            "x-rapidapi-key":
              "c49d6d8a20msh270d8275ae9a107p1535bfjsna60275f02166",
          },
        }
      );

      const data = await response.json();
      this.displayContainer.renderData(data);
      this.spinner.hide();
    } catch (error) {
      console.error("Error fetching games:", error);
      this.spinner.hide();
    }
  }

  initialize() {
    this.navItems.forEach((item) => {
      const span = item.querySelector(".nav-link");
      span.addEventListener("click", (event) => {
        this.changeActiveClass(span);
        const category = span.textContent.trim().toLowerCase();
        this.fetchGames(category);
      });
    });

    const defaultCategory = "mmorpg";
    this.fetchGames(defaultCategory);

    this.navItems.forEach((item) => {
      const span = item.querySelector(".nav-link");
      if (span.textContent.trim().toLowerCase() === defaultCategory) {
        this.changeActiveClass(span);
      }
    });

    this.gameSectionToggle.init();

    this.displayContainer.addGameClickListener((item) => {
      this.gameSectionToggle.updateGameDetails(gameDetails);
      this.gameSectionToggle.showSectionTwo();
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const main = new Main();
  main.initialize();
});
