import { Character } from "./characters";
import { mkdir, writeFile } from "fs/promises";

const renderCharacters = (characters: Array<Character>): string => {
  let html = '';
  for (const character of characters) {
    html += `<a class="character" href="./characters/${character.id}.html" data-name="${character.name.toLowerCase()}">
    <img class=img-list src="${character.image}" alt="${character.name} image"/>
    <p>${character.name}</p>
</a>
      `;         
  }
  return html;
}

const renderCharacterDetails = (character: Character): string => {
  return `<div class="details-container">
        <div>
          <img src="${character.image}" alt="${character.name} image"/>
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

const renderPage = (html: string, divClass: string, path: string = '.'): string => {
  const searchBoxHtml = divClass === 'characters-container' ? `
    <div class="search-container">
      <input id=input type="text" oninput="filterCharacters()" placeholder="Search characters...">
    </div>` : '';

  return `<!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rick&Morty Characters</title>
    <link rel="stylesheet" href="${path}/styles.css">
    <link rel="icon" href="${path}/images/portal.png" type="image/x-icon" sizes="128x128" />
    <script>
      function filterCharacters() {
        const searchQuery = document.getElementById('input').value.toLowerCase();
        const characters = document.getElementsByClassName('character');
        
        if(searchQuery === '') {
         for (let character of characters) {
            character.style.display = 'block';
          }
          return;
        }

        for (let character of characters) {
          character.style.display = 'none';
        }

        const filteredCharacters = document.querySelectorAll('.character[data-name*="' + searchQuery + '"]');
        for (let character of filteredCharacters) {
          character.style.display = 'block';
        }
      }
    </script>
  </head>
  <body>
    <header>
      <div class="logo-container">
        <img src=${path}/images/logo.png alt="Rick&Morty logo"/>
      </div>
    </header>
    ${searchBoxHtml}
    <div class="${divClass}">
      ${html}
    </div>  
  </body>
</html>`;
}

export const createIndexPageWithCharacters = async (characters: Array<Character>): Promise<void> => {
  const charactersHtml = renderCharacters(characters);
  const charactersPageHtml = renderPage(charactersHtml, 'characters-container');

  await writeFile('index.html', charactersPageHtml);
}

export const createCharactersPages = async (characters: Array<Character>): Promise<void> => {
  let characterDetailsHtml = '';
  let characterDetailsPageHtml = '';

  await mkdir('characters', { recursive: true });

  for (const character of characters) {
    characterDetailsHtml = renderCharacterDetails(character);
    characterDetailsPageHtml = renderPage(characterDetailsHtml, 'character-container', '..');
    await writeFile(`characters/${character.id}.html`, characterDetailsPageHtml);
  }
}




