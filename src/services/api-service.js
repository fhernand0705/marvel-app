import axios from 'axios';

//const apiKey = '?ts=1&apikey=455c9f467c991d2bedc2425d729e8940&hash=00b99ffb369bcb25bafb0fc80a2da78e'

export const rickMortyEndpoint = 'https://rickandmortyapi.com/api/';

// export async function getCharacters() {
//   const data = await axios.get(rickMortyEndpoint);
//   return data; 
// }

export function getCharacter(id) {
  return axios.get(`${rickMortyEndpoint}character/${id}`);
}

export function getLocations(ids) {
  return axios.get(`${rickMortyEndpoint}location/${ids}`);
}

