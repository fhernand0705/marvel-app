
export function filterByName(searchQuery, characters) {
  return (
    characters.filter((char,i) => {
    return char.name.toLowerCase().startsWith(searchQuery.toLowerCase().trim());
  })
 )
}

export function filterBySpecies(checkboxName, chars) {
  return chars.filter(char => char.species.toLowerCase() === checkboxName); 
}
