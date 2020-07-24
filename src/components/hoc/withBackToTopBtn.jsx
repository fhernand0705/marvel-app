import React, {useState} from 'react';

function withBackToTopBtn(Component) {
    return function WithBackToTopBtn() {
        
        return (
            <Component />
        )
    }

}

export default withBackToTopBtn;
