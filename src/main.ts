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


const render = (characters: Array<Character>) => {
  const characteraDiv = document.getElementById("characters");

  characteraDiv?.append(...characters.map(renderCharacter));

};

const renderCharacter = (character: Character) => {

  const div = document.createElement("div");
  div.textContent = character.name

  return div

}


const characters = await getCharacters(3);
render(characters);