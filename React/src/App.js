import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import React, { useState } from 'react';
import Grid from './Grid.js';
import { customers } from './data';

import './App.css';

const initColumnOptions = {
  CompanyName: null,
  City: null,
  State: null,
  Phone: null,
  Fax: null
}

function App() {
  const [columnFilterValues, setColumnFilterValues] = useState({...initColumnOptions});
  const [columnSelectedFilterOps, setColumnSelectedFilterOps] = useState({...initColumnOptions});
  
  return (
    <div className="App">
      <div className="column">
        <Grid dataSource={customers} columnFilterValues columnSelectedFilterOps customers={customers} />
      </div>
      <div className="column">
        <Grid dataSource={customers} columnFilterValues columnSelectedFilterOps customers={customers}/>
      </div>
    </div>
  );
}

export default App;
