import React, { useState, useEffect } from 'react';
import CharacterDetails from './character-details';
import BackButton from './common/back-button';
import { useParams, useHistory } from 'react-router-dom';
import { getCharacter } from '../services/api-service';

function Profile() {
  const { id } = useParams();
  const [charId] = useState(id);
  const [character, setCharacter] = useState({});

  useEffect(() => {
    fetchCharacter();
  }, [charId])

  async function fetchCharacter() {
    try {
      const { data } = await getCharacter(charId);
      const character = data;
      console.log(data);

      setCharacter(character);
    } catch(e) {
      // display error message if error occurs
    }
  }
  const history = useHistory();
  function handleClick() { history.push('/characters') }

  const {name, species, status} = character;

  return (
    <React.Fragment>
      <BackButton onChange={handleClick} />
      <CharacterDetails>
        <h1>{name}</h1>
        <p>{species}</p>
        <p>{status}</p>
      </CharacterDetails>
    </React.Fragment>
  )
}

export default Profile;
