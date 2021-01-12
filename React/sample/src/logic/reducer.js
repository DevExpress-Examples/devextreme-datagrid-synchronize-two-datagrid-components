import gridEnum from '../data/gridEnum'

function reducer(state, action){
  const {grid, prop, value, column} = action,
    gridsArr = [gridEnum.two]
  let newState;

  switch(action.type){
    case 'UPDATE_OPTION':
      newState = {...state}
      if(grid === gridEnum.one) 
        gridsArr.push(gridEnum.one);

      gridsArr.forEach(grid => {
        newState[grid] = column ? getUpdatedColumnOptionState(state, prop, column, value, grid) : getUpdatedOptionState(state, prop, value, grid);
      })

      return newState
    case 'UPDATE_SORT_OPTION':
      newState = {...state}

      if(grid === gridEnum.one) 
        gridsArr.unshift(gridEnum.one);

      gridsArr.forEach(grid => {
        newState[grid] = getUpdatedColumnOptionState(state, prop, column, value, grid);
      })
      
      // Revert previously sorted column in Grid Two
      if(state.prevColumnSorted && state.prevColumnSorted !== column) 
        newState[gridsArr[1]] = getUpdatedColumnOptionState(newState, prop, state.prevColumnSorted, null, gridsArr[1]);
      
      newState.prevColumnSorted = column;
      return newState
    case 'INCREMENT_READY_CTR':
      return {...state, readyCtr: state.readyCtr + 1}
    default:
      break;
  }
}

function incrementReadyCtr() {
  return {type: "INCREMENT_READY_CTR"}
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

// TODO:simplify reducer
// function updateColumnOption()


function updateOptions(prop, value, grid) {
  return {type: 'UPDATE_OPTION', prop, value, grid}
}

function updateColumnOptions(prop, column, value, grid) {
  return {type: 'UPDATE_OPTION', prop, column, value, grid}
}

function updateColumnSortOptions(prop, column, value, grid) {
  return {type: 'UPDATE_SORT_OPTION', prop, column, value, grid}
}

export default reducer;
export { updateOptions, updateColumnOptions, incrementReadyCtr, updateColumnSortOptions }

