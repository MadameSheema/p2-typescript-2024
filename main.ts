import { writeFile } from "fs/promises";

const CHARACTERS_URL = 'https://rickandmortyapi.com/api/character';

class Character {
  constructor(
    public id: number,
    public name: string,
    public status: "Dead" | "Alive",
    public species: string,
    public type: string,
    public gender: "Male" | "Female",
    public origin: string,
    public location: string,
    public image: string,
  ){}
}

const getCharacters = async(numberOfPages: number) => {
  const characters: Array<Character> = [];
  
  for(let pageId=1; pageId<=numberOfPages; pageId++) {
    const response = await fetch(`${CHARACTERS_URL}?page=${pageId}`);
    const {results} = (await response.json()) as {results: any[]}
    for (const { id, name, status, species, type, gender, origin, location, image} of results) {
      characters.push(new Character(id, name, status, species, type, gender, origin.name, location.name, image))
    }
  }

  return characters
}

const head = (title: string) => `
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="icon" href="/images/portal.png" type="image/x-icon" sizes="128x128" />
</head>`

const renderCharacters = (characters: Array<Character>) => {
  let html = "";
  for (const character of characters) {
    html += `<a class="character" href=${character.id}.html>
      <img class=img-list src="${character.image}" />
      <div class="name">${character.name}</div>
    </a>`;
  }
  return html;
}

const renderCharacterDetails= (character: Character) => {
  let html = 
    `<div class="character">
      <img src="${character.image}" />
      <div class="data">
        <div class="name">${character.name}</div>
      </div>
    </div>`;
  return html;
}

const render = (characters: Array<Character>) => {
  return `
<html>
  ${head("Rick&Morty Characters")}
  <body>
    <header>
      <div class="logo-container">
        <img src=/images/logo.png />
      </div>
      <div class="characters-container">
        ${renderCharacters(characters)}
      <div class="characters-container">  
    </header>
  </body>
</html>`;
};

const characters = await getCharacters(3);
const html = render(characters);
await writeFile('index.html', html);

/*
for(const character of characters) {
  await writeFile(`${character.id}.html`, renderCharacterDetails(character))
}*/
