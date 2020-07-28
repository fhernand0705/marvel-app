import React from 'react';
import '../../assets/main.scss'

function Switch({ onChange }) {
    return (
        <div className="switch sort-wrapper">
            <label className="purple-text text-darken-3">
                Name (Z-A)
            <input type="checkbox" onChange={() => onChange()}/>
            <span className="lever orange darken-2"></span>
                Name (A-Z)
            </label>
        </div>
    )
}

export default Switch;