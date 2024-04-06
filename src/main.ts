const CHARACHTERS_URL = 'https://rickandmortyapi.com/api/character';

const getCharacters = async(pageId: number) => {
  const response = await fetch(`${CHARACHTERS_URL}?page=${pageId}`);
  return await response.json()
}

console.log(getCharacters(1));