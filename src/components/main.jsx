import React, { useState, useEffect } from "react";
import { getCharacters } from '../services/characters-service';

function Main() {
  const [state, setState] = useState({
    characters: []
  });

  useEffect(() => {
    fetchCharacters();
  },[])

  const fetchCharacters = async () => {
    const { data } = await getCharacters()
    console.log(data.results)

    setState({...state, characters: data.results })
  }

  return (
    <div>
      { state.characters.map(char =>
        <div>{char.name}</div>
      )}
    </div>
  )
}

export default Main;
