import { getCharacters } from "./characters";
import { createCharactersPages, createIndexPageWithCharacters } from "./render";

const numberOfPagesToRetrieve = 5;
const characters = await getCharacters(numberOfPagesToRetrieve);
await createIndexPageWithCharacters(characters);
await createCharactersPages(characters)

