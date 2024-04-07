import { Character, getCharacters } from "./characters";
import { writeFile } from "fs/promises";

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
    `<div class="details-container">
        <div class="character">
          <img src="${character.image}" />
        </div>  
        <div class="data">
          <h2>${character.name}</h2>
          <div><span class="bolded">Status:</span> ${character.status}</div>
          <div><span class="bolded">Species:</span> ${character.species}</div>
          <div><span class="bolded">Type:</span> ${character.type}</div>
          <div><span class="bolded">Gender:</span> ${character.gender}</div>
          <div><span class="bolded">Origin:</span> ${character.origin}</div>
          <div><span class="bolded">Location:</span> ${character.location}</div>
        </div>
    </div>`;
  return html;
}

const renderIndex = (characters: Array<Character>) => {
  return `
<html>
  ${head("Rick&Morty Characters")}
  <body>
    <header>
      <div class="logo-container">
        <img src=/images/logo.png />
      </div>
    </header>
      <div class="characters-container">
        ${renderCharacters(characters)}
      <div class="characters-container">  
  </body>
</html>`;
};

const renderCharacterPage = (character: Character) => {
  return `
<html>
  ${head("Rick&Morty Characters")}
  <body>
    <header>
        <div class="logo-container">
          <img src=/images/logo.png />
        </div>
    </header>
        <div class="character-container">
          ${renderCharacterDetails(character)}
        </div>  
  </body>
</html>`;
};

export const createIndexPageWithCharacters = async (characters: Array<Character>) => {
    const html = renderIndex(characters);
    await writeFile('index.html', html);
}

export const createCharactersPages = async (characters: Array<Character>) => {
    for(const character of characters) {
        await writeFile(`${character.id}.html`, renderCharacterPage(character))
      } 
}




