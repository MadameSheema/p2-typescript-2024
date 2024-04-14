const CHARACTERS_URL = 'https://rickandmortyapi.com/api/character';

export class Character {
  constructor(
    public id: number,
    public name: string,
    public status: string,
    public species: string,
    public type: string,
    public gender: string,
    public origin: string,
    public location: string,
    public image: string,
  ) { }
}

export const getCharacters = async (numberOfPages: number): Promise<Character[]> => {
  const characters: Array<Character> = [];

  for (let pageId = 1; pageId <= numberOfPages; pageId++) {
    const response = await fetch(`${CHARACTERS_URL}?page=${pageId}`);
    const { results } = (await response.json()) as { results: any[] };
    for (const { id, name, status, species, type, gender, origin, location, image } of results) {
      characters.push(new Character(id, name, status, species, type, gender, origin.name, location.name, image));
    }
  }

  return characters;
}
