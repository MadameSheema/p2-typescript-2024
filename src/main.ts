const CHARACHTERS_URL = 'https://rickandmortyapi.com/api/character';

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

const getCharacters = async(pageId: number) => {
  const response = await fetch(`${CHARACHTERS_URL}?page=${pageId}`);
  return await response.json()
}

console.log(getCharacters(1));