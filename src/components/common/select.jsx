/* eslint-disable no-redeclare */
/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react'

function Select({sortValue, onChange, onClick}) {
    return (
        <div>
            <h5>Sort By</h5>
            <select 
                name="sort" 
                id="sort" 
                value={sortValue}
                onClick={() => onClick()}
                onChange={(e) => onChange(e)}
            >   
                <option value="Title(A-Z)">Title(A-Z)</option>
                <option value="Title(Z-A)">Title(Z-A)</option>
            </select>
        </div>
    )
}

export default Select;