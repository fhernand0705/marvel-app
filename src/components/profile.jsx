import React, { useState, useEffect } from 'react';
import CharacterDetails from './character-details';
import BackButton from './common/back-button';
import { useParams, useHistory } from 'react-router-dom';
import { getCharacter } from '../services/api-service';
import {BsFillPersonFill} from 'react-icons/bs';

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
      console.log(data.origin.name);

      setCharacter(character);
    } catch(e) {
      // display error message if error occurs
    }
  }
  const history = useHistory();
  function handleClick() { history.push('/') }

  const {name, species, status, image } = character;
  console.log(image)
  return (
    <React.Fragment>
      <CharacterDetails >
        <div className="profile-container">
          <div className="text-wrapper">
            <BackButton onChange={handleClick} />
            <div className="text-content">
              <h1>{name}</h1>
              <hr/>
              <h4>Species</h4><p>{species}</p>
              <h4>Status</h4>
              <span className="profile-status">{status}</span>
              <span className={
                status === 'Alive' ? 'status-alive' : 'status-dead'}
              >
                <BsFillPersonFill/>
              </span>
            </div>
          </div>
          <div className="img-wrapper" style={{ backgroundImage: `url(${image})` }}>
          </div>
        </div>
      </CharacterDetails>
    </React.Fragment>
  )
}

export default Profile;
