import gridEnum from '../data/gridEnum'

function reducer(state, action){
  const {grid, prop, value, column, getUpdatedOptions} = action
  let gridsArr = [gridEnum.two],
    newState = {...state};

  switch(action.type){
    case 'UPDATE_SINGLE_OPTION':         
      if(grid === gridEnum.one) 
        gridsArr.push(gridEnum.one);
      
      gridsArr.forEach(grid => {
        newState[grid] = getUpdatedOptionState(state, prop, value, grid);
      })

      return newState
    case 'UPDATE_COLUMN_OPTION':
      if(grid === gridEnum.one) 
        gridsArr.push(gridEnum.one);

      gridsArr.forEach(grid => {
        newState[grid] = getUpdatedColumnOptionState(state, prop, column, value, grid)
      })

      return newState;
    default:
      break;
  }
}

function getUpdatedOptionState(state, prop, value, grid) {
  return {
    ...state[grid], 
    [prop]: value
  }
}

function getUpdatedColumnOptionState(state, prop, column, value, grid) {
  return {
    ...state[grid], column: {
      ...state[grid]["column"], [prop]: {
        ...state[grid]["column"][prop], [column]: value
      }
    }
  }
}

function updateOptions(prop, value, grid) {
  return {type: 'UPDATE_SINGLE_OPTION', prop, value, grid}
}

function updateColumnOptions(prop, column, value, grid) {
  return {type: 'UPDATE_COLUMN_OPTION', prop, column, value, grid}
}


export default reducer;
export { updateOptions, updateColumnOptions }

