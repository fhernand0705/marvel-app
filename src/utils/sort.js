
export function sortAlpha(characters, isAscending) {
  return (
    characters.sort((a,b) => {
      const aZ = a.name[0].toLowerCase(), zA = b.name[0].toLowerCase();

      return !isAscending ? aZ.localeCompare(zA)
      : zA.localeCompare(aZ);
    })
  )
}
