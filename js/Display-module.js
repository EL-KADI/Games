class Display {
  constructor(containerClass, gameSectionToggle) {
    this.container = document.querySelector(`.${containerClass}`);
    this.gameSectionToggle = gameSectionToggle;
    if (!this.container) {
      throw new Error(`Element with class "${containerClass}" not found.`);
    }
  }

  renderData(data) {
    if (!Array.isArray(data)) {
      console.error("Data must be an array to render.");
      return;
    }

    this.container.innerHTML = "";

    data.forEach((item) => {
      const colDiv = document.createElement("div");
      colDiv.className = "col-12 col-sm-6 col-lg-4 col-xl-3";

      colDiv.innerHTML = ` 
          <div class="inner px-2 border-1 border border-clr hover rounded-2">
            <div>
              <img
                src="${item.thumbnail}"
                class="w-100 bg-clr-c mt-3 pb-4 rounded-4"
                alt="${item.title}"
              />
            </div>
            <div class="d-flex justify-content-between">
              <h4 class="h4-size ms-2">${item.title}</h4>
              <h6 class="h6-size me-2">Free</h6>
            </div>
            <p class="text-center mt-2 p-size">
              ${item.short_description}
            </p>
            <div
              class="d-flex justify-content-between mt-2 border-top border-clr-tow rounded-bottom-2"
            >
              <h5 class="text-uppercase mt-2 ms-2 ms-lg-3">${item.genre}</h5>
              <h5 class="mt-2 me-2 me-lg-3">${item.platform}</h5>
            </div>
          </div>
        `;

      colDiv.addEventListener("click", () => {
        const gameDetails = {
          title: item.title,
          category: item.genre,
          platform: item.platform,
          description: item.short_description,
          thumbnail: item.thumbnail,
          game_url: item.game_url,
        };
        this.gameSectionToggle.updateGameDetails(gameDetails);
        this.gameSectionToggle.showSectionTwo();
      });

      this.container.appendChild(colDiv);
    });
  }

  addGameClickListener(callback) {
    this.onGameClick = callback;
  }

  handleGameClick(item) {
    if (this.onGameClick) {
      this.onGameClick(item);
    }
  }
}

export default Display;
