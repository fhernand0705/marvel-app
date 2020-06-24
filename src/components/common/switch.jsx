import React from 'react';
import '../../assets/main.scss'

function Switch({onChange}) {
    return (
        <div className="sort-wrapper">
            <p className="sort-header">Sort By</p>
            <label className="switch">
                <input type="checkbox" onChange={() => onChange()} />
                <div className="slider round">
                    <span className="asc">Name (A-Z)</span>
                    <span className="desc">Name (Z-A)</span>
                </div>
            </label>
        </div>
    )
}

export default Switch;