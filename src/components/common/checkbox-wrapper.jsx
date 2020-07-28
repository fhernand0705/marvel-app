import React from 'react';
import Checkbox from './checkbox';
import checkboxes from '../../utils/checkboxes';
import { GoTriangleDown } from 'react-icons/go'
import '../../assets/main.scss';

function CheckboxWrapper({onChange, checkedItems, onClick, isHidden}) {
  function slideDown() {
    let className = "dropdown-filter-content"; 
    if (!isHidden) 
      className += " dropdown-active"; 
    return className;   
  }
  return (
    <React.Fragment>
      <div className="dropdown-filter-wrapper">
        <label onClick={onClick} className="dropdown-filter-link purple-text text-darken-3">
          Filter By 
          <span><GoTriangleDown/></span>
        </label> 
        {!isHidden && 
          <div className={slideDown()}>
            <div className="category-title"><span>Species</span></div>
              <hr/>
              { checkboxes.map(item =>
                  <div className="dropdown-filter-item">
                    <label key={item.name} className="label-wrapper">
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
