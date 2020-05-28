import React from 'react';

const Checkbox = ({type = 'checkbox', name, checked = false, onChange}) => {
  return (
    <input type={type} name={name} checked={checked} onChange={(e) => onChange(e)} />
  )
}

export default Checkbox;
