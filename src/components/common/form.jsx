/* eslint-disable react/jsx-no-duplicate-props */
import React, {useState} from 'react';
import Select from './select';

function Form({handleSort}) {
    const [sortValue, setSortValue] = useState(''); 

    function handleChange({target}) {
        setSortValue(target.value); 
    }

    return (
        <Select 
            onClick={handleSort}  
            onChange={handleChange} 
            sortValue={sortValue}
        />
    )
}

export default Form; 