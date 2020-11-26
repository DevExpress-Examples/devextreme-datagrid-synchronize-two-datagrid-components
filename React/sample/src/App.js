import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import React, { useCallback, useState, useReducer } from 'react';
import './App.css';
import Grid from "./components/Grid"
import { customers } from "./data"
import reducer from './logic/reducer'
import initState from './logic/initState'
import gridEnum from './gridEnum'

function App() {
  const [{one, two}, dispatch] = useReducer(reducer, initState)
  // const [selectedRowKeys, setSelectedRowKeys] = useState({
  //   first: [],
  //   second: []
  // });
  
  // const handleSelectionFirst = useCallback(selectedKeys => {
  //   setSelectedRowKeys({first: selectedKeys, second: selectedKeys});
  // }, [])

  // const handleSelectionSecond = useCallback(selectedKeys => {
  //   setSelectedRowKeys({...selectedRowKeys, second: selectedKeys});
  // }, [])



  return (
    <div className="App">
      <div className="tables">
        <div className="column">
          <Grid dataSource={customers} 
            selectedRowKeys={one.selectedRowKeys}
            pageSize={one.pageSize}
            handleSelectedRowKeysChange={keys => dispatch({type: "selectedRowKeys", value: keys, grid: gridEnum.one})}
            handlePageSizeChange={pageSize => dispatch({type: "pageSize", value: pageSize, grid: gridEnum.one})}
            // selectedRowKeys={selectedRowKeys.first} 
            // handleSelectedRowKeysChange={handleSelectionFirst} 
          />
        </div>
        <div className="column">
          <Grid dataSource={customers} 
            selectedRowKeys={two.selectedRowKeys}
            pageSize={two.pageSize}
            handleSelectedRowKeysChange={(keys) => dispatch({type: "selectedRowKeys", value: keys, grid: gridEnum.two})}
            handlePageSizeChange={pageSize => dispatch({type: "pageSize", value: pageSize, grid: gridEnum.two})}
            // selectedRowKeys={selectedRowKeys.second} 
            // handleSelectedRowKeysChange={handleSelectionSecond} 
          />
        </div>
      </div>
    </div>
  );
}

export default App;
