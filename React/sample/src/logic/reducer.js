import gridEnum from '../data/gridEnum'

function reducer(state, action){
  switch(action.type){
    case 'UPDATE':         
      const {grid, prop, value} = action
      if(grid === gridEnum.one) {
        return {[gridEnum.one]: {...state[gridEnum.one], [prop]: value}, [gridEnum.two]: {...state[gridEnum.two], [prop]: value}} 
      } else if(grid === gridEnum.two) {
        return {...state, [gridEnum.two]: {...state[gridEnum.two], [prop]: value}}
      }
  }
}

function updateOptions(prop, value, grid) {
  return {type: 'UPDATE', prop, value, grid}
}

export default reducer;
export { updateOptions}

