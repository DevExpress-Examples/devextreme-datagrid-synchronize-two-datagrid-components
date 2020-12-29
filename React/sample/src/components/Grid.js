import React, { useCallback } from 'react';
import DataGrid, { Selection, Pager, Paging, Column, FilterRow } from 'devextreme-react/data-grid';
import { updateOptions, updateColumnOptions, incrementReadyCtr } from '../logic/reducer';
const allowedPageSizes = [5, 10, 20]

function Grid({dataSource, syncedOpts, dispatch, gridName, gridRef, initScrollOpts}) {  

  const onContentReady = useCallback((e) => {
    if(initScrollOpts.readyCtr <= initScrollOpts.widgetCount) {
      dispatch(incrementReadyCtr());

      if (initScrollOpts.readyCtr === initScrollOpts.widgetCount) {
        setTimeout(() => {
          initScrollOpts.start();
        })
      }
    }
  },[initScrollOpts.readyCtr]); 

  return (
    <DataGrid
        ref={gridRef}
        dataSource={dataSource}
        keyExpr="ID"
        showBorders={true}
        height={440}
        selectedRowKeys={syncedOpts.selectedRowKeys}
        onSelectedRowKeysChange={(keys) => dispatch(updateOptions('selectedRowKeys', keys, gridName))}
        onContentReady={onContentReady}
    >
        <Column dataField="CompanyName" selectedFilterOperation={syncedOpts.column.selectedFilterOperation.CompanyName}
            filterValue={syncedOpts.column.filterValue.CompanyName} sortOrder={syncedOpts.column.sortOrder.CompanyName}
            onFilterValueChange={(filterValue) => dispatch(updateColumnOptions("filterValue", "CompanyName", filterValue, gridName))}
            onSelectedFilterOperationChange={(selectedFilterOperation) => dispatch(updateColumnOptions("selectedFilterOperation", "CompanyName", selectedFilterOperation, gridName))}
            onSortOrderChange={(sortOrder) => {debugger;dispatch(updateColumnOptions("sortOrder", "CompanyName", sortOrder, gridName))}}
            onSortIndexChange={(sortIndex) => {debugger;dispatch(updateColumnOptions("sortIndex", "CompanyName", sortIndex, gridName))}}
          />
        <Column dataField="Address" selectedFilterOperation={syncedOpts.column.selectedFilterOperation.Address}
            filterValue={syncedOpts.column.filterValue.Address} sortOrder={syncedOpts.column.sortOrder.Address}
            onFilterValueChange={(filterValue) => dispatch(updateColumnOptions("filterValue", "Address", filterValue, gridName))}
            onSelectedFilterOperationChange={(selectedFilterOperation) => dispatch(updateColumnOptions("selectedFilterOperation", "Address", selectedFilterOperation, gridName))}
            onSortOrderChange={(sortOrder) => {debugger;dispatch(updateColumnOptions("sortOrder", "Address", sortOrder, gridName))}}
            onSortIndexChange={(sortIndex) => {debugger;dispatch(updateColumnOptions("sortIndex", "Address", sortIndex, gridName))}}
          />
        <Paging enabled={true} 
          pageSize={syncedOpts.pageSize} pageIndex={syncedOpts.pageIndex} 
          onPageSizeChange={(pageSize) => dispatch(updateOptions('pageSize', pageSize, gridName))}
          onPageIndexChange={(pageIndex) => dispatch(updateOptions('pageIndex', pageIndex, gridName))}
          />
        <Pager visible={true} showPageSizeSelector={true} allowedPageSizes={allowedPageSizes} showInfo={true} />
        <FilterRow visible={true} />
        <Selection mode="single" />
    </DataGrid>
  );
}

export default Grid;
