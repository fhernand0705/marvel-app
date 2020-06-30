import React, { useState } from 'react';

function withLoadData(Component) {
    return function WithLoadData() {
            const [locationIdList, setLocationIdList] = useState(3);
            const [characterIdList, setCharacterIdList] = useState(10); 
            const [isFetching, setIsFetching] = useState(false);
            
            function handleLoadLocations() {
                setLocationIdList((idList) => idList + 2);
                setIsFetching(true);
            }
            function handleLoadCharacters() {
                setCharacterIdList((idList) => idList + 10);
                setIsFetching(true);
            }
            return (
                <div>
                    <Component 
                       locationIdList={locationIdList}
                       characterIdList={characterIdList} 
                       isFetching={isFetching} 
                       loadLocationData={handleLoadLocations}
                       loadCharacterData={handleLoadCharacters}
                       setFetching={setIsFetching}
                    />
                </div>
            )
        }
    
}

export default withLoadData;
