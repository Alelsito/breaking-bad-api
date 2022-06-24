const app = document.querySelector("#cards");
const reload = document.querySelector("#reload");
const characterList = document.querySelector("#list");
const emptyFavorites = document.querySelector(".empty");
const all = document.querySelector("#all");
const first = document.querySelector("#firstElement");
const last = document.querySelector("#lastElement");

const storage = JSON.parse(localStorage.getItem("@favorites"));
const favorites = storage !== null ? storage : [];

// Reload Page
reload.addEventListener("click", () => {
  location.reload();
})

//Principal Render list
const renderList = (order = true)=> {
  characterList.innerHTML = "";

  order && favorites.reverse();
  if (favorites.length === 0) {
    emptyFavorites.innerHTML = "NO FAVORITES IN YOUR LIST!";
    characterList.setAttribute("hidden", true);
    emptyFavorites.removeAttribute("hidden");
  } else {
    emptyFavorites.setAttribute("hidden", true);
    characterList.removeAttribute("hidden");
  }

  favorites.forEach((pokemon) => {
    let li = document.createElement("li");
    li.classList.add("favoritesList")
    li.innerText = pokemon;
    characterList.appendChild(li);
  });

  localStorage.setItem("@favorites", JSON.stringify(favorites));
  reloadHearts();
};

//Me costo de comprender
//Add favorites
const addfavorites = (f) => {
  favorites.reverse();
  if (favorites.indexOf(f.currentTarget.id) === -1) {
    if (favorites.length < 10) {
      favorites.push(f.currentTarget.id);
      toggleHeart(f.currentTarget.childNodes);
      renderList();
    }
  } else if (favorites.indexOf(f.currentTarget.id) !== -1) {
    removeFavorite(f.currentTarget.id);
    toggleHeart(f.currentTarget.childNodes);
  }
};

// Remove favorite
const removeFavorite = (f) => {
  let removeCharacter = favorites.indexOf(f);
  favorites.splice(removeCharacter, 1);
  renderList();
};

// ToggleHeart
const toggleHeart = (card) => {
  Array.from(card).forEach((child) => {
    if (child.tagName === "I") {
      child.classList.toggle("bi-heart");
      child.classList.toggle("bi-heart-fill");
    }
  });
};

const removeHeart = (id) => {
  toggleHeart(document.getElementById(id).childNodes);
};

// Reload Hearts
const reloadHearts = () => {
  storage !== null && //Otra cosa que me confundio
  storage.forEach((id) => {
      let card = Array.from(document.getElementById(id).childNodes);
      card.forEach((child) => {
        if (child.tagName === "I") {
          child.classList.remove("bi-heart");
          child.classList.add("bi-heart-fill");
        }
      });
    });
};

// Delete all
all.addEventListener("click", () => {
  let allCharacters = favorites.splice(0, favorites.length);
  allCharacters.forEach((character) => {
    removeHeart(character);
  });
  renderList();
});

// Delete by Pila
first.addEventListener("click", () => {
  favorites.reverse();
  let character = favorites.pop();
  removeHeart(character);
  renderList();
});

// Delete by Cola
last.addEventListener("click", () => {
  favorites.reverse();
  let character = favorites.shift();
  removeHeart(character);
  renderList();
});

// Render cards
const renderCards = (characters) => {
  app.innerHTML = "";
  characters.forEach((character) => {
    let card = document.createElement("div");
    let heart = document.createElement("i");
    let cardImg = document.createElement("img");
    let cardBody = document.createElement("div");
    let cardTitle = document.createElement("h5");
    let cardText = document.createElement("p");
    let listGroup = document.createElement("ul");
    let li1 = document.createElement("li");
    let li2 = document.createElement("li");
    let li3 = document.createElement("li");
    let li4 = document.createElement("li");

    card.classList.add("card", "col-lg-2", "col-md-2", "col-sm-4", "pb-3", "m-2");
    card.setAttribute("id", character.char_id);
    heart.classList.add("bi", "bi-heart", "p-1");
    cardImg.classList.add("card-img-top", "img-character", "mt-3", "mb-2");
    cardImg.setAttribute("src", character.img);
    cardBody.classList.add("card-body");
    cardTitle.classList.add("card-title");
    cardTitle.innerText = character.name;
    cardText.classList.add("card-text");
    cardText.innerText = "- " + character.occupation;
    listGroup.classList.add("list-group", "list-group-flush");
    li1.classList.add("mb-2", "cardAttributes")
    li1.innerText = "Nickname: " + character.nickname;
    li2.classList.add("mb-2", "cardAttributes")
    li2.innerText = "Appearance: " + character.appearance;
    li3.classList.add("mb-2", "cardAttributes")
    li3.innerText = "Portrayed: " + character.portrayed;
    li4.classList.add("mb-2", "cardAttributes")
    li4.innerText = "Status: " + character.status;

    card.appendChild(cardImg);
    card.appendChild(cardBody);
    card.appendChild(heart);
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    cardBody.appendChild(listGroup);
    listGroup.appendChild(li1);
    listGroup.appendChild(li2);
    listGroup.appendChild(li3);
    listGroup.appendChild(li4);
    app.appendChild(card);

    card.addEventListener("click", (f) => {
      addfavorites(f);
    });
  });
  renderList(false);
};

fetch("https://www.breakingbadapi.com/api/characters")
  .then((response) => response.json())
  .then((data) => renderCards(data));

window.addEventListener("load", () => {
  renderList(false);
});
