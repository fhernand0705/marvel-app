import axios from 'axios';

//const marvelEndpoint = 'https://gateway.marvel.com/v1/public/characters?ts=1&apikey=455c9f467c991d2bedc2425d729e8940&hash=00b99ffb369bcb25bafb0fc80a2da78e&limit=100&offset=100'

const rickMortyEndpoint = 'https://rickandmortyapi.com/api/character/?page='

export function getCharacters() {
  return axios.get(rickMortyEndpoint);
}
