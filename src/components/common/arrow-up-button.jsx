import React from 'react'

function ArrowUpButton({scrollToTop}) {
    return (
        <div className="fixed-action-btn">
            <button 
                onClick={() => scrollToTop()} 
                className="btn-floating btn-large orange">
                <i className="large material-icons">arrow_upward</i>
            </button>
        </div>
    )
}

export default ArrowUpButton;