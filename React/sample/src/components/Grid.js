import React, { useCallback } from 'react';
import DataGrid, { Selection, Pager, Paging } from 'devextreme-react/data-grid';

const allowedPageSizes = [5, 10, 20]

function Grid(props) {
  return (
    <DataGrid
        dataSource={props.dataSource}
        keyExpr="ID"
        showBorders={true}
        height={440}
        selectedRowKeys={props.selectedRowKeys}
        onSelectedRowKeysChange={props.handleSelectedRowKeysChange}
    >
        <Paging enabled={true} pageSize={props.pageSize} onPageSizeChange={props.handlePageSizeChange}/>
        <Pager visible={true} showPageSizeSelector={true} allowedPageSizes={allowedPageSizes} showInfo={true} />
        <Selection mode="single" />
    </DataGrid>
  );
}

export default Grid;
