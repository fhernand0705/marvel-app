import React from 'react';
import Checkbox from './checkbox';
import checkboxes from '../../utils/checkboxes';
import { GoTriangleDown } from 'react-icons/go'
import '../../assets/main.scss';

function CheckboxWrapper({onChange, checkedItems, onClick, isHidden}) {
  function slideDown() {
    let className = "dropdown-filter-content"; 
    if (!isHidden) 
      className += " active"; 
    return className;   
  }
  return (
    <React.Fragment>
      <div className="dropdown-filter-wrapper">
        <p onClick={onClick} className="dropdown-filter-link">
          Filter By 
          <span><GoTriangleDown/></span>
        </p> 
        {!isHidden && 
          <div className={slideDown()}>
            <div className="category-title"><span>Species</span></div>
              <hr/>
              { checkboxes.map(item =>
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
