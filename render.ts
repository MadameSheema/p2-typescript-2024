import { Character } from "./characters";
import { mkdir, writeFile } from "fs/promises";

const renderCharacters = (characters: Array<Character>): string => {
  let html = "";
  for (const character of characters) {
    html += `<a class="character" href="characters/${character.id}.html">
      <img class=img-list src="${character.image}" />
      <p>${character.name}</p>
    </a>`;
  }
  return html;
}

const renderCharacterDetails = (character: Character): string => {
  return `
    <div class="details-container">
        <div>
          <img src="${character.image}" />
        </div>  
        <div class="data">
          <h2>${character.name}</h2>
          <p><span class="bolded">Status:</span> ${character.status}</p>
          <p><span class="bolded">Species:</span> ${character.species}</p>
          <p><span class="bolded">Type:</span> ${character.type}</p>
          <p><span class="bolded">Gender:</span> ${character.gender}</p>
          <p><span class="bolded">Origin:</span> ${character.origin}</p>
          <p><span class="bolded">Location:</span> ${character.location}</p>
        </div>
    </div>`;
}

const pageTemplate = (html: string, divClass: string, path: string = '.'): string => {
  return `
  <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Rick&Morty Characters</title>
      <link rel="stylesheet" href="${path}/styles.css">
      <link rel="icon" href="${path}/images/portal.png" type="image/x-icon" sizes="128x128" />
    </head>
    <body>
      <header>
        <div class="logo-container">
          <img src=${path}/images/logo.png />
        </div>
      </header>
        <div class="${divClass}">
          ${html}
        </div>  
    </body>
  </html>`;
}

export const createIndexPageWithCharacters = async (characters: Array<Character>): Promise<void> => {
  const charactersHtml = renderCharacters(characters);
  const charactersPageHtml = pageTemplate(charactersHtml, 'characters-container')
  await writeFile('index.html', charactersPageHtml);
}

export const createCharactersPages = async (characters: Array<Character>): Promise<void> => {
  let characterDetailsHtml = '';
  let characterDetailsPageHtml = '';

  await mkdir('characters', { recursive: true });

  for (const character of characters) {
    characterDetailsHtml = renderCharacterDetails(character);
    characterDetailsPageHtml = pageTemplate(characterDetailsHtml, 'character-container', '..');
    await writeFile(`characters/${character.id}.html`, characterDetailsPageHtml);
  }
}




