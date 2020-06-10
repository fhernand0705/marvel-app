import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { getCharacter } from '../services/api-service';

function Profile() {
  const { id } = useParams();
  const [charId, setId] = useState(id);
  const [character, setCharacter] = useState({});

  useEffect(() => {
    async function fetchCharacter() {
      const { data } = await getCharacter(charId);
      const character = data;
      console.log(data);

      setCharacter(character)
    }
    fetchCharacter();
  }, [])

  let history = useHistory();
  function handleClick() { history.push('/characters') }

  const { name, species, status } = character;

  return (
    <div>
      <button onClick={handleClick}>Back</button>
      <h1>{name}</h1>
      <p>{species}</p>
      <p>{status}</p>
    </div>
  )
}

export default Profile;
