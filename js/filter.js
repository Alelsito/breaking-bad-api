const formCharacter = document.querySelector("#formCharacter");
const season1 = document.querySelector("#season1");
const season2 = document.querySelector("#season2");
const season3 = document.querySelector("#season3");
const season4 = document.querySelector("#season4");
const season5 = document.querySelector("#season5");
const alive = document.querySelector("#alive");
const deceased = document.querySelector("#deceased");
const unknown = document.querySelector("#unknown");

//STATUS
// Alive
alive.addEventListener("click", () => {
    fetch("https://www.breakingbadapi.com/api/characters")
    .then((response) => response.json())
    .then((data) => {
      let alive = data.filter((character) => {
        return character.status.includes("Alive");
      });
      renderCards(alive);
    });
})

// Deceased
deceased.addEventListener("click", () => {
    fetch("https://www.breakingbadapi.com/api/characters")
    .then((response) => response.json())
    .then((data) => {
      let deceased = data.filter((character) => {
        return character.status.includes("Deceased");
      });
      renderCards(deceased);
    });
})

//Unknown
unknown.addEventListener("click", () => {
    fetch("https://www.breakingbadapi.com/api/characters")
    .then((response) => response.json())
    .then((data) => {
      let unknown = data.filter((character) => {
          return character.status.includes("Presumed dead") || character.status.includes("Unknown");
    });
      renderCards(unknown);
    });
})

// Search By Seasons
// season1
season1.addEventListener("click", () => {
  fetch("https://www.breakingbadapi.com/api/characters")
    .then((response) => response.json())
    .then((data) => {
      let charactersSeason1 = data.filter((character) => {
        return character.appearance.includes(1);
      });
      renderCards(charactersSeason1);
    });
});

// season2
season2.addEventListener("click", () => {
  fetch("https://www.breakingbadapi.com/api/characters")
    .then((response) => response.json())
    .then((data) => {
      let charactersSeason1 = data.filter((character) => {
        return character.appearance.includes(2);
      });
      renderCards(charactersSeason1);
    });
});

// season3
season3.addEventListener("click", () => {
  fetch("https://www.breakingbadapi.com/api/characters")
    .then((response) => response.json())
    .then((data) => {
      let charactersSeason1 = data.filter((character) => {
        return character.appearance.includes(3);
      });
      renderCards(charactersSeason1);
    });
});

// season4
season4.addEventListener("click", () => {
  fetch("https://www.breakingbadapi.com/api/characters")
    .then((response) => response.json())
    .then((data) => {
      let charactersSeason1 = data.filter((character) => {
        return character.appearance.includes(4);
      });
      renderCards(charactersSeason1);
    });
});

// season5
season5.addEventListener("click", () => {
  fetch("https://www.breakingbadapi.com/api/characters")
    .then((response) => response.json())
    .then((data) => {
      let charactersSeason1 = data.filter((character) => {
        return character.appearance.includes(5);
      });
      renderCards(charactersSeason1);
    });
});

// Search (name, nickname, status)

formCharacter.addEventListener("submit", (evt) => {
  evt.preventDefault();
  search(evt.target.character.value);
});

const search = (characterSearch) => {
  fetch("https://www.breakingbadapi.com/api/characters")
    .then((response) => response.json())
    .then((data) => {
      let characterName = filterByName(data, characterSearch);
      let characterNickname = filterByNickname(data, characterSearch);
    //   let characterStatus = filterByStatus(data, characterSearch);
      let unique = new Set([
        ...characterName,
        ...characterNickname
      ]);
      renderCards(unique);
    });
};

// Name
const filterByName = (data, characterSearch) =>
  data.filter((character) => {
    return character.name.toLowerCase().includes(characterSearch.toLowerCase());
  });

// Nickname
const filterByNickname = (data, characterSearch) =>
  data.filter((character) => {
    return character.nickname.toLowerCase().includes(characterSearch.toLowerCase());
  });

// // Status
// const filterByStatus = (data, characterSearch) =>
//   data.filter((character) => {
//     return character.status
//       .toLowerCase()
//       .includes(characterSearch.toLowerCase());
//   });
