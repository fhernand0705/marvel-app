import React, {useState} from 'react';
import Checkbox from './checkbox';
import checkboxes from '../../utils/checkboxes';
import '../../assets/main.scss';

function CheckboxWrapper({onChange, checkedItems}) {
  const [isHidden, setIsHidden] = useState(true); 

  function toggleDropdown({target}) {
    setIsHidden((prev) => prev = !prev); 
  } 

  console.log(isHidden)

  return (
    <React.Fragment>
      <div className="dropdown-filter-wrapper">
        <div onClick={toggleDropdown} className="dropdown-filter-link">Filter By</div> 
        {!isHidden && 
          <div className="dropdown-filter-content">
            <div className="category-title"><span>Species</span></div>
              <hr/>
              {
                checkboxes.map(item =>
                  <div className="dropdown-filter-item">
                    <label key={item.name} className="label-wrapper">
                      {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                      <Checkbox
                        name={item.name}
                        checked={checkedItems.get(item.name)}
                        onChange={onChange}
                      />
                    </label>
                  </div>
                )
              }
        </div>
      }
      </div>
    </React.Fragment>
  )
}

export default CheckboxWrapper;
