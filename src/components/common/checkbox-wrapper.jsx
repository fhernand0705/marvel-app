import React from 'react';
import Checkbox from './checkbox';
import checkboxes from '../../utils/checkboxes';
import NavDropdown from 'react-bootstrap/NavDropdown';
import '../../assets/main.scss';

function CheckboxWrapper({onChange, checkedItems}) {

  return (
    <React.Fragment>
      <NavDropdown title="Filter By">
        <div className="category-title"><span>Species</span></div>
      {
        checkboxes.map(item =>
          <NavDropdown.Item eventKey="4.1">
            <label key={item.name} className="label-wrapper">
              {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
              <Checkbox
                name={item.name}
                checked={checkedItems.get(item.name)}
                onChange={onChange}
              />
            </label>
          </NavDropdown.Item>
        )
      }
      </NavDropdown>
    </React.Fragment>
  )
}

export default CheckboxWrapper;
