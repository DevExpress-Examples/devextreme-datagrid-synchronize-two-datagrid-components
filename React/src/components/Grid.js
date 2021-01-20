import React, { useCallback } from 'react';
import DataGrid, { Selection, Pager, Paging, Column, FilterRow } from 'devextreme-react/data-grid';
import { updateOptions, updateColumnOptions, incrementReadyCtr } from '../logic/reducer';
const allowedPageSizes = [5, 10, 20]

function Grid({ dataSource, syncedOpts, dispatch, gridName, gridRef, initScrollOpts, columns }) {

  const onContentReady = useCallback((e) => {
    if (initScrollOpts.readyCtr <= initScrollOpts.widgetCount) {
      dispatch(incrementReadyCtr());

      if (initScrollOpts.readyCtr === initScrollOpts.widgetCount) {
        setTimeout(() => {
          initScrollOpts.start();
        })
      }
    }
  }, [initScrollOpts.readyCtr]);

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
      {columns.map(dataField =>
        <Column dataField={dataField} key={dataField}
          selectedFilterOperation={syncedOpts.column.selectedFilterOperation[dataField]}
          filterValue={syncedOpts.column.filterValue[dataField]}
          sortOrder={syncedOpts.column.sortOrder[dataField]}
          onFilterValueChange={(filterValue) => dispatch(updateColumnOptions("filterValue", dataField, filterValue, gridName))}
          onSelectedFilterOperationChange={(selectedFilterOperation) => dispatch(updateColumnOptions("selectedFilterOperation", dataField, selectedFilterOperation, gridName))}
          onSortOrderChange={(sortOrder) =>  dispatch(updateColumnOptions("sortOrder", dataField, sortOrder, gridName)) }
        />
      )}
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
