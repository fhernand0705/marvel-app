import React from 'react';

const Checkbox = ({type = 'checkbox', name, checked = false, onChange}) => {
  return (
    <div>
      <input 
        className="checkbox"
        type={type} 
        name={name} 
        checked={checked} 
        onChange={(e) => onChange(e)} />
      <span className="black-text">
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </span>
    </div>
  )
}

export default Checkbox;
