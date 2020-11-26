import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import React, { useCallback, useState, useReducer, useMemo, useEffect } from 'react';
import './App.css';
import Grid from "./components/Grid"
import { customers } from "./data"
import reducer from './logic/reducer'
import initState from './logic/initState'
import gridEnum from './gridEnum'


function App() {
  const [state, dispatch] = useReducer(reducer, initState)
  const getSyncedGridOptions = useCallback((grid) => {
    return {
      selectedRowKeys: state[grid].selectedRowKeys,
      pageSize: state[grid].pageSize,
      pageIndex: state[grid].pageIndex,
      handleSelectedRowKeysChange: (keys) => dispatch({type: "selectedRowKeys", value: keys, grid})
    }
  }, [state])

  return (
    <div className="App">
      <div className="tables">
        <div className="column">
          <Grid dataSource={customers} 
            syncedOpts={getSyncedGridOptions(gridEnum.one)}
          />
        </div>
        <div className="column">
          <Grid dataSource={customers} 
            syncedOpts={getSyncedGridOptions(gridEnum.two)}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
