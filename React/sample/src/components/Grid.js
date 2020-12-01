import React, { useCallback } from 'react';
import DataGrid, { Selection, Pager, Paging } from 'devextreme-react/data-grid';
import { updateOptions } from '../logic/reducer';
const allowedPageSizes = [5, 10, 20]

function Grid({dataSource, syncedOpts, dispatch, gridName}) {  
  return (
    <DataGrid
        dataSource={dataSource}
        keyExpr="ID"
        showBorders={true}
        height={440}
        selectedRowKeys={syncedOpts.selectedRowKeys}
        onSelectedRowKeysChange={(keys) => dispatch(updateOptions('selectedRowKeys', keys, gridName))}
    >
        <Paging enabled={true} 
          pageSize={syncedOpts.pageSize} pageIndex={syncedOpts.pageIndex} 
          onPageSizeChange={(pageSize) => dispatch(updateOptions('pageSize', pageSize, gridName))}
          onPageIndexChange={(pageIndex) => dispatch(updateOptions('pageIndex', pageIndex, gridName))}
          />
        <Pager visible={true} showPageSizeSelector={true} allowedPageSizes={allowedPageSizes} showInfo={true} />
        <Selection mode="single" />
    </DataGrid>
  );
}

export default Grid;
