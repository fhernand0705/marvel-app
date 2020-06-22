import React, { useState } from 'react';

function withLoadData(Component) {
    return function WithLoadData() {
            const [idList, setIdList] = useState(10);
            const [isFetching, setIsFetching] = useState(false);
            
            function handleLoadMoreData() {
                setIdList((idList) => idList + 5);
                setIsFetching(true);
              }
            return (
                <div>
                    <Component 
                       idList={idList} 
                       isFetching={isFetching} 
                       loadData={handleLoadMoreData}
                       setFetching={setIsFetching}
                    />
                </div>
            )
        }
    
}

export default withLoadData;
