import { Character } from "./characters";
import { mkdir, writeFile } from "fs/promises";

const renderCharacters = (characters: Array<Character>): string => {
  let html = "";
  for (const character of characters) {
    html += `<a class="character" href="characters/${character.id}.html">
      <img class=img-list src="${character.image}" />
      <p class="name">${character.name}</p>
    </a>`;
  }
  return html;
}

const renderCharacterDetails= (character: Character): string => {
  let html = 
    `<div class="details-container">
        <div class="character">
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
  return html;
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


const renderIndex = (characters: Array<Character>): string => {
  const charactersHtml = renderCharacters(characters)
  return pageTemplate(charactersHtml, 'characters-container');
};

const renderCharacterPage = (character: Character): string => {
  const charactersDetailsHtml = renderCharacterDetails(character);
  return pageTemplate(charactersDetailsHtml, 'character-container', '..');
};

export const createIndexPageWithCharacters = async (characters: Array<Character>): Promise<void> => {
    const html = renderIndex(characters);
    await writeFile('index.html', html);
}

export const createCharactersPages = async (characters: Array<Character>): Promise<void> => {
    await mkdir('characters', { recursive: true });
    for(const character of characters) {
        await writeFile(`characters/${character.id}.html`, renderCharacterPage(character));
      } 
}




