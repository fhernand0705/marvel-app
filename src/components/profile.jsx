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

  const {name, species, status, image} = character;

  return (
    <React.Fragment>
    
      <CharacterDetails>
        <div className="profile-container">
          <div className="text-wrapper">
            <BackButton onChange={handleClick} />
            <div className="text-content">
              <h1>{name}</h1>
              <p>{species}</p>
              <p>{status}</p>
            </div>
          </div>
          <div className="img-wrapper">
            <img src={image} alt="character_image"/>
          </div>
        </div>
      </CharacterDetails>
    </React.Fragment>
  )
}

export default Profile;
