import grid from '../data/gridEnum'

function initColumnOptions() {
    return {
        CompanyName: null,
        City: null,
        State: null,
        Phone: null,
        Fax: null
    };
}

function initCommonOptions() {
    return {
        selectedRowKeys: [],
        pageSize: 20,
        pageIndex: 0,
        column: {
            filterValue: initColumnOptions(),
            selectedFilterOperation: initColumnOptions(),
            sortOrder: initColumnOptions()
        }
    }
}

const initState = {
    [grid.one]: initCommonOptions(), 
    [grid.two]: initCommonOptions(),
    readyCtr: 0
}

export default initState;