import gridEnum from '../data/gridEnum'

function reducer(state, action){
  const {grid, prop, value, column, scrollable} = action,
    gridsArr = [gridEnum.two],
    newState = {...state};

  switch(action.type){
    case 'UPDATE_OPTION':
      if(grid === gridEnum.one) 
        gridsArr.push(gridEnum.one);

      gridsArr.forEach(grid => {
        newState[grid] = column ? getUpdatedColumnOptionState(state, prop, column, value, grid) : getUpdatedOptionState(state, prop, value, grid);
      })

      return newState
    case 'SAVE_SCROLLABLE':
      newState.readyCtr = state.readyCtr + 1;
      newState.scrollables.push(scrollable)
      return newState
    default:
      break;
  }
}

function saveScrollable(scrollable, grid){
  return {type: "SAVE_SCROLLABLE", scrollable, grid }
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
  return {type: 'UPDATE_OPTION', prop, value, grid}
}

function updateColumnOptions(prop, column, value, grid) {
  return {type: 'UPDATE_OPTION', prop, column, value, grid}
}

export default reducer;
export { updateOptions, updateColumnOptions, saveScrollable }

