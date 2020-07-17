import React, { useState } from 'react';

function withLoadData(Component) {
    return function WithLoadData() {
            const [locationIdList, setLocationIdList] = useState(3);
            const [isFetching, setIsFetching] = useState(false);
            
            function handleLoadLocations() {
                setLocationIdList((idList) => idList + 2);
                setIsFetching(true);
            }
            
            return (
                <div>
                    <Component 
                       locationIdList={locationIdList}
                       isFetching={isFetching} 
                       loadLocationData={handleLoadLocations}
                       setFetching={setIsFetching}
                    />
                </div>
            )
        }
    
}

export default withLoadData;
