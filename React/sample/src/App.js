import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import React, { useReducer, useMemo, useRef, useCallback } from 'react';
import './App.css';
import Grid from "./components/Grid"
import { customers } from "./data/customers"
import reducer from './logic/reducer'
import initState from './logic/initState'
import gridEnum from './data/gridEnum'

const widgetCount = 2;

function App() {
  const [{[gridEnum.one]: grid1State, [gridEnum.two]: grid2State, readyCtr}, dispatch] = useReducer(reducer, initState)
  const grid1Ref = useRef();
  const grid2Ref = useRef();
  
  const initScrollable = useCallback(() => {
    const scrollableDg1 = grid1Ref.current.instance.getScrollable(),
      scrollableDg2 = grid2Ref.current.instance.getScrollable();
    
    scrollableDg1.on("scroll", function (e) {
      scrollableDg2.scrollTo(e.scrollOffset);
    });
  }, [])

  const initScrollOpts = useMemo(() => {
    return {
      start: initScrollable, 
      readyCtr, 
      widgetCount
    }
  }, [readyCtr])

  return (
    <div className="App">
      <div className="tables">
        <div className="column">
          <Grid dataSource={customers} 
            syncedOpts={grid1State}
            gridName={gridEnum.one}
            dispatch={dispatch}
            gridRef={grid1Ref}
            initScrollOpts={initScrollOpts}
          />
        </div>
        <div className="column">
          <Grid dataSource={customers} 
            syncedOpts={grid2State}
            gridName={gridEnum.two}
            dispatch={dispatch}
            gridRef={grid2Ref}
            initScrollOpts={initScrollOpts}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
