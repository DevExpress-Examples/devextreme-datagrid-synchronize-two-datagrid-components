import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import React, { useCallback, useReducer, useState, useRef, useEffect } from 'react';
import './App.css';
import Grid from "./components/Grid"
import { customers } from "./data/customers"
import reducer from './logic/reducer'
import initState from './logic/initState'
import gridEnum from './data/gridEnum'
import { saveScrollable } from './logic/reducer';


const widgetCount = 2;

function App() {
  const [{[gridEnum.one]: grid1State, [gridEnum.two]: grid2State, readyCtr, scrollables}, dispatch] = useReducer(reducer, initState)
  const grid1Ref = useRef();
  const grid2Ref = useRef();

  const initScrollable = (e) => {
    const scrollableDg1 = scrollables[0],
      scrollableDg2 = scrollables[1]
    // scrollableDg1 = this.dataGrid1.getScrollable();
    // scrollableDg2 = this.dataGrid2.getScrollable();
    
      scrollableDg1.on("scroll", function (e) {
        scrollableDg2.scrollTo(e.scrollOffset);
      }.bind(this));
  }

  const onContentReady = useCallback((e) => {
    console.log(readyCtr)
    if (readyCtr <= widgetCount) {
      dispatch(saveScrollable(e.component.getScrollable(), grid));
    }
    if (readyCtr === widgetCount) {
      initScrollable(e);
    }
  },[readyCtr]); 

  

  // const initScrollable = useCallback(() => {
  //   const scrollableDg1 = grid1Ref.current.instance.getScrollable(),
  //     scrollableDg2 = grid2Ref.current.instance.getScrollable()
  //   debugger;
  //   // scrollableDg1 = this.dataGrid1.getScrollable();
  //   // scrollableDg2 = this.dataGrid2.getScrollable();
  
  //   scrollableDg1.on("scroll", function (e) {
  //     scrollableDg2.scrollTo(e.scrollOffset);
  //   }.bind(this));
    
  // }, [])

  return (
    <div className="App">
      <div className="tables">
        <div className="column">
          <Grid dataSource={customers} 
            syncedOpts={grid1State}
            gridName={gridEnum.one}
            dispatch={dispatch}
            gridRef={grid1Ref}
            onContentReady={onContentReady}
          />
        </div>
        <div className="column">
          <Grid dataSource={customers} 
            syncedOpts={grid2State}
            gridName={gridEnum.two}
            dispatch={dispatch}
            gridRef={grid2Ref}
            onContentReady={onContentReady}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
