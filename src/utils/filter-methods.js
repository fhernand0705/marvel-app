
export function filterByName(searchQuery, chars) {
  return (
    chars.filter(char => {
    return char.name.toLowerCase().includes(searchQuery.toLowerCase().trim());
  })
 )
}

export function filterBySpecies(checkboxName, chars) {
  return chars.filter(char => char.species.toLowerCase() === checkboxName);
}
