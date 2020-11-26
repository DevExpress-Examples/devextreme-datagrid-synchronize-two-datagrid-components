import React, { useCallback } from 'react';
import DataGrid, { Selection, Pager, Paging } from 'devextreme-react/data-grid';

const allowedPageSizes = [5, 10, 20]

function Grid({dataSource, syncedOpts}) {
  return (
    <DataGrid
        dataSource={dataSource}
        keyExpr="ID"
        showBorders={true}
        height={440}
        selectedRowKeys={syncedOpts.selectedRowKeys}
        onSelectedRowKeysChange={syncedOpts.handleSelectedRowKeysChange}
    >
        {/* <Paging enabled={true} pageSize={syncedOpts.pageSize} pageIndex={syncedOpts.pageIndex} 
          onPageSizeChange={syncedOpts.handlePageSizeChange} onPageIndexChange={syncedOpts.handlePageIndexChange}/>
        <Pager visible={true} showPageSizeSelector={true} allowedPageSizes={allowedPageSizes} showInfo={true} /> */}
        <Selection mode="single" />
    </DataGrid>
  );
}

export default Grid;
