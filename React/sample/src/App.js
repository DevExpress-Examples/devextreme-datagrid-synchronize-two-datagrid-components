import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import React, { useCallback, useReducer } from 'react';
import './App.css';
import Grid from "./components/Grid"
import { customers } from "./data/customers"
import reducer from './logic/reducer'
import initState from './logic/initState'
import gridEnum from './data/gridEnum'


function App() {
  const [{[gridEnum.one]: grid1State, [gridEnum.two]: grid2State}, dispatch] = useReducer(reducer, initState)
  
  return (
    <div className="App">
      <div className="tables">
        <div className="column">
          <Grid dataSource={customers} 
            syncedOpts={grid1State}
            gridName={gridEnum.one}
            dispatch={dispatch}
          />
        </div>
        <div className="column">
          <Grid dataSource={customers} 
            syncedOpts={grid2State}
            gridName={gridEnum.two}
            dispatch={dispatch}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
