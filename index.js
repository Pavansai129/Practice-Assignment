const searchINputElement = document.getElementById("searchInput");
const searchIconElement = document.getElementById("searchIcon");
const resultsContainer = document.getElementById("results");
const loadingSpinnerElement = document.getElementById("loadingSpinner");
const listViewIcon = document.getElementById("listView");
const gridViewIcon = document.getElementById("gridView");

let fetchedData;

function displaySearchResults(data) {
  loadingSpinnerElement.classList.toggle("display-none");
  for (let eachData of data) {
    const cardElement = document.createElement("section");
    cardElement.classList.add("product-card");

    const productBadge = document.createElement("span");
    if (eachData.product_badge === "") {
      productBadge.classList.add("empty-badge");
    } else {
      productBadge.textContent =
        eachData.product_badge.charAt(0).toUpperCase() +
        eachData.product_badge.slice(1).toLowerCase();
      productBadge.classList.add("product-badge");
    }
    cardElement.appendChild(productBadge);

    const productImage = document.createElement("img");
    productImage.src = eachData.product_image;
    productImage.classList.add("product-image");
    cardElement.appendChild(productImage);

    const productsTitleAndVariantsSection = document.createElement("section");
    productsTitleAndVariantsSection.classList.add(
      "product-title-and-varients-section"
    );

    const productTitle = document.createElement("h2");
    productTitle.textContent = eachData.product_title;
    productTitle.classList.add("product-title");
    if (
      searchINputElement.value !== "" &&
      productTitle.textContent
        .toLowerCase()
        .includes(searchINputElement.value.toLowerCase())
    ) {
      productTitle.classList.add("highlight");
    } else {
      productTitle.classList.remove("highlight");
    }
    productsTitleAndVariantsSection.appendChild(productTitle);

    const productVariantsList = document.createElement("ul");
    const firstVariant = document.createElement("li");
    firstVariant.textContent = eachData.product_variants[0].v1;
    firstVariant.classList.add("product-varient");
    if (
      searchINputElement.value !== "" &&
      firstVariant.textContent
        .toLowerCase()
        .includes(searchINputElement.value.toLowerCase())
    ) {
      firstVariant.classList.add("highlight");
    } else {
      firstVariant.classList.remove("highlight");
    }
    productVariantsList.appendChild(firstVariant);

    const secondVariant = document.createElement("li");
    secondVariant.textContent = eachData.product_variants[1].v2;
    secondVariant.classList.add("product-varient");
    if (
      searchINputElement.value !== "" &&
      secondVariant.textContent
        .toLowerCase()
        .includes(searchINputElement.value.toLowerCase())
    ) {
      secondVariant.classList.add("highlight");
    } else {
      secondVariant.classList.remove("highlight");
    }
    productVariantsList.appendChild(secondVariant);

    const thirdVariant = document.createElement("li");
    thirdVariant.textContent = eachData.product_variants[2].v3;
    thirdVariant.classList.add("product-varient");
    if (
      searchINputElement.value !== "" &&
      thirdVariant.textContent
        .toLowerCase()
        .includes(searchINputElement.value.toLowerCase())
    ) {
      thirdVariant.classList.add("highlight");
    } else {
      thirdVariant.classList.remove("highlight");
    }
    productVariantsList.appendChild(thirdVariant);

    productVariantsList.classList.add("product-varient-list");

    productsTitleAndVariantsSection.appendChild(productVariantsList);

    cardElement.appendChild(productsTitleAndVariantsSection);

    resultsContainer.appendChild(cardElement);
  }
  resultsContainer.classList.add("product-cards-container");
}

const getData = async () => {
  const response = await fetch(
    "https://products-api-2ttf.onrender.com/api/products"
  );
  fetchedData = await response.json();
  displaySearchResults(fetchedData.data);
};

getData();

const setListView = () => {
  resultsContainer.classList.add("list-view");
  resultsContainer.classList.remove("grid-view");
};
const setGridView = () => {
  resultsContainer.classList.remove("list-view");
  resultsContainer.classList.add("grid-view");
};

listViewIcon.addEventListener("click", setListView);
gridViewIcon.addEventListener("click", setGridView);

highlightText = (event) => {
  resultsContainer.textContent = "";
  getData();
};

searchIconElement.addEventListener("click", highlightText);
