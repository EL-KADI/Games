class GameSectionToggle {
  constructor() {
    this.sectionOne = document.querySelector(".sec-one");
    this.sectionTwo = document.querySelector(".sec-tow");
    this.gameDivs = document.querySelectorAll(".one .col-12");
    this.closeButton = this.sectionTwo.querySelector(".cars");
  }

  updateGameDetails(gameDetails) {
    this.sectionTwo.querySelector(".title").textContent = gameDetails.title;
    this.sectionTwo.querySelector(".platform").textContent =
      gameDetails.platform;
    this.sectionTwo.querySelector(
      ".category"
    ).textContent = ` ${gameDetails.category}`;
    this.sectionTwo.querySelector(".p-custom-de").textContent =
      gameDetails.description;
    this.sectionTwo.querySelector(".img-s2").src = gameDetails.thumbnail;

    const showGameBtn = this.sectionTwo.querySelector("#showGameBtn");
    if (gameDetails.game_url) {
      showGameBtn.href = gameDetails.game_url;
      showGameBtn.target = "_blank";
    } else {
      console.warn("Game URL is undefined");
      showGameBtn.href = "#";
    }

    if (this.sectionTwo.classList.contains("d-none")) {
      this.showSectionTwo();
    }
  }

  showSectionTwo() {
    this.sectionOne.classList.add("d-none");
    this.sectionTwo.classList.remove("d-none");
  }

  showSectionOne() {
    this.sectionTwo.classList.add("d-none");
    this.sectionOne.classList.remove("d-none");
  }

  init() {
    this.gameDivs.forEach((div) => {
      div.addEventListener("click", (event) => {
        const gameDetails = {
          title: div.querySelector(".title").textContent,
          category: div.querySelector(".category").textContent.trim(),
          platform: div.querySelector(".platform").textContent.trim(),
          description: div.querySelector(".p-custom-de").textContent,
          thumbnail: div.querySelector(".img-s2").src,
          game_url: div.dataset.gameUrl,
        };

        console.log("Game Details:", gameDetails);
        this.updateGameDetails(gameDetails);
        this.showSectionTwo();
      });
    });

    this.closeButton.addEventListener("click", () => {
      this.showSectionOne();
    });
  }
}

export default GameSectionToggle;
