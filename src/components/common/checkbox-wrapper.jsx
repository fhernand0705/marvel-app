import React from 'react';
import Checkbox from './checkbox';
import checkboxes from '../../utils/checkboxes';

function CheckboxWrapper({onChange, checkedItems}) {

  return (
    <React.Fragment>
      <div>
      {
        checkboxes.map(item =>
          <label key={item.name}>
              {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
              <Checkbox
                name={item.name}
                checked={checkedItems.get(item.name)}
                onChange={onChange}
              />
          </label>
        )
      }
      </div>
    </React.Fragment>
  )
}

export default CheckboxWrapper;
