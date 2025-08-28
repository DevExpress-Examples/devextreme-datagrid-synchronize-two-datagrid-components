import React, { useCallback, useMemo } from 'react';
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

  // Generate object of column handlers with the following structure
  // columnHandlers[columnProp][dataField]
  const columnHandlers = useMemo(() => {
    const columnProps = ["filterValue", "sortOrder", "selectedFilterOperation"]
    let handlers = {}

    columnProps.forEach(colProp => {
      handlers[colProp] = {}

      // for each colProp, add a column with a handler
      for(let colProp in handlers) {
        columns.forEach(dataField => {
            handlers[colProp][dataField] = (value) => dispatch(updateColumnOptions(colProp, dataField, value, gridName))
        })
      }
    });
    return handlers
  }, [])

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
      {columns.map(dataField => (
          <Column dataField={dataField} key={dataField}
          selectedFilterOperation={syncedOpts.column.selectedFilterOperation[dataField]}
          filterValue={syncedOpts.column.filterValue[dataField]}
          sortOrder={syncedOpts.column.sortOrder[dataField]}
          onFilterValueChange={columnHandlers.filterValue[dataField]}
          onSelectedFilterOperationChange={columnHandlers.selectedFilterOperation[dataField]}
          onSortOrderChange={columnHandlers.sortOrder[dataField]}
        />
        )
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
