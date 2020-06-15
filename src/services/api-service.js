import axios from 'axios';

//const superHeroEndpoint = 'https://www.superheroapi.com/api.php/10158550546561869/';
//const apiKey = '?ts=1&apikey=455c9f467c991d2bedc2425d729e8940&hash=00b99ffb369bcb25bafb0fc80a2da78e'

const rickMortyApi = 'https://rickandmortyapi.com/api/';

export function getCharacters(ids) {
  return axios.get(rickMortyApi + 'character/' + ids);
}

export function getCharacter(id) {
  return axios.get(rickMortyApi + 'character/' + id);
}

export function getCharacterCount() {
  return axios.get(rickMortyApi + 'character/');
}

export function getLocations(ids) {
  return axios.get(rickMortyApi + 'location/' + ids)
}
