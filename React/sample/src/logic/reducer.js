import gridEnum from '../gridEnum'

function reducer(state, action) {
  return handleDynamic(state, action.grid, action.type, action.value)
}

function handleDynamic(state, grid, prop, value) {
  if(grid === gridEnum.one) {
    let test = {...state, one: {...state.one, [prop]: value}, two: {...state.two, [prop]: value}}
    debugger;
    return test
  } else if(grid === gridEnum.two) {
    return {...state, two: {...state.two, [prop]: value}}
  }
}

export default reducer;

