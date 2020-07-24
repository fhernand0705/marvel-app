import React from 'react';
import withBackToTopBtn  from '../hoc/withBackToTopBtn';

function BackToTopBtn() {
    return (
        <div className="fixed-action-btn">
            <a href="/" className="btn-floating btn-large red">
                <i className="large material-icons">arrow_upward</i>
            </a>
        </div>
    )
}

export default withBackToTopBtn(BackToTopBtn);