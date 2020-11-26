import gridEnum from '../gridEnum'

function reducer(state, action) {
  return handleDynamic(state, action.grid, action.type, action.value)
}

function handleDynamic(state, grid, prop, value) {
  if(grid === gridEnum.one) {
    return {...state, one: {[prop]: value}, two: {[prop]: value}}
  } else if(grid === gridEnum.two) {
    return {...state, two: {[prop]: value}}
  }
}

export default reducer;

