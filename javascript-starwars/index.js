function getJson(url) {
  return window.fetch(url).then((result) => result.json());
}

async function search(event) {
  event.preventDefault();
  const searchName = event.target.elements.namedItem("character-name").value;
  const results = await getCharacterAndFilms(searchName);
  updateResults(results);
}

async function getCharacterAndFilms(searchName) {
  const url = "https://swapi.dev/api/people/?search=" + searchName;
  const response = await getJson(url);
  if (!response.count) {
    return;
  }
  const character = response.results[0];
  const films = await Promise.all(
    character.films.map((filmUri) => getJson(filmUri))
  );
  return {
    character,
    films,
  };
}

function updateResults(results) {
  const newResultsHtml = makeResultsHtml(results);
  const resultsContainer = document.getElementById("results");
  if (resultsContainer.firstElementChild) {
    resultsContainer.removeChild(resultsContainer.firstElementChild);
  }
  resultsContainer.appendChild(newResultsHtml);
}

function makeResultsHtml(results) {
  if (!results) {
    const messageElement = document.createElement("p");
    messageElement.className = "no-results";
    messageElement.innerText = "Sorry, there were no matching results.";
    return messageElement;
  }

  const resultsDiv = document.createElement("div");

  const nameElement = document.createElement("p");
  nameElement.className = "is-size-4 has-text-weight-bold";
  nameElement.innerText = results.character.name;

  const listElement = document.createElement("ul");
  results.films.forEach((film) => {
    const filmElement = document.createElement("li");
    filmElement.className = "is-size-6 has-text-grey";
    filmElement.innerText = film.title;
    listElement.appendChild(filmElement);
  });

  resultsDiv.appendChild(nameElement);
  resultsDiv.appendChild(listElement);

  return resultsDiv;
}
