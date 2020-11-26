import grid from '../data/gridEnum'

function initCommonOptions() {
    return {
        selectedRowKeys: [],
        pageSize: 20,
        pageIndex: 0
    }
}

const initState = {
    [grid.one]: initCommonOptions(), 
    [grid.two]: initCommonOptions()
}

export default initState;