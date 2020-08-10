// Testing
// imports

"use strict";

const SEARCH_URL = "https://swapi.dev/api/people/?search=";

function responseOk(response) {
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response;
}

function fetchJson(url) {
  return window
    .fetch(url)
    .then(responseOk)
    .then((result) => result.json());
}

async function search(event) {
  event.preventDefault();
  const searchName = event.target.elements.namedItem("character-name").value;

  try {
    const results = await getResults(searchName);
    updateResults(results);
  } catch (error) {
    console.error(error);
  }
}
async function getResults(searchName) {
  const character = await getCharacter(searchName);
  if (!character) {
    return false;
  }
  const films = await getFilms(character.films);

  return { character, films };
}

async function getCharacter(searchName) {
  const url = `${SEARCH_URL}${searchName}`;
  const response = await fetchJson(url);

  if (!response.count) {
    return false;
  }
  const character = response.results[0];

  return character;
}

async function getFilms(filmUris) {
  const films = await Promise.all(
    filmUris.map((filmUri) => fetchJson(filmUri))
  );

  return films;
}

function updateResults(results) {
  const newResultsHtml = makeResultsHtml(results);
  const resultsContainer = document.getElementById("results");

  if (resultsContainer.firstElementChild) {
    resultsContainer.removeChild(resultsContainer.firstElementChild);
  }
  resultsContainer.appendChild(newResultsHtml);
}

function createNode(element) {
  return document.createElement(element);
}

function makeResultsHtml(results) {
  if (!results) {
    return makeNoResultsElem();
  }
  const { character, films } = results;

  const resultsDiv = createNode("div");
  const nameElement = makeCharacterElem(character.name);
  const listElement = makeFilmElem(films);

  resultsDiv.appendChild(nameElement);
  resultsDiv.appendChild(listElement);

  return resultsDiv;
}

function makeFilmElem(films) {
  const listElement = createNode("ul");

  films.forEach(({ title }) => {
    const filmElement = createNode("li");
    filmElement.className = "is-size-6 has-text-grey";
    filmElement.innerText = title;
    listElement.appendChild(filmElement);
  });

  return listElement;
}

function makeCharacterElem(name) {
  const nameElement = createNode("p");
  nameElement.className = "is-size-4 has-text-weight-bold";
  nameElement.innerText = name;
  return nameElement;
}

function makeNoResultsElem() {
  const messageElement = createNode("p");
  messageElement.className = "no-results";
  messageElement.innerText = "Sorry, there were no matching results.";
  return messageElement;
}
