import React, { useCallback, useState } from 'react';
import DataGrid, { Column, Paging, Pager, FilterRow, Selection } from 'devextreme-react/data-grid';


function Grid(props) {

  const handleChange = useCallback(() => {
    console.log('change')
    return;
  }, [])

  return (
    <DataGrid
      dataSource={props.customers}
      keyExpr="ID"
      showBorders={true}
      height={440}
      // onContentReady={onContentReady}
      // onOptionChanged={onOptionChanged}
      onSelectionChanged={props.handleSelectionChanged}
      onFilterValueChange={handleChange}
    >
      <Paging enabled={true} pageSize={props.pageSize} pageIndex={props.pageIndex} />
      <Pager visible={true} showPageSizeSelector={true} allowedPageSizes={props.allowedPageSizes} 
        showInfo={true} />
      <FilterRow visible={true} />
      <Selection mode="single" />
      <Column dataField="CompanyName" selectedFilterOperation={props.columnSelectedFilterOps.CompanyName} 
        filterValue={props.columnFilterValues.CompanyName} onFilterValueChange={handleChange}/>
      <Column dataField="City" selectedFilterOperation={props.columnSelectedFilterOps.City} 
        filterValue={props.columnFilterValues.City} />
      <Column dataField="State" selectedFilterOperation={props.columnSelectedFilterOps.State} 
        filterValue={props.columnFilterValues.State} />
      <Column dataField="Phone" selectedFilterOperation={props.columnSelectedFilterOps.Phone} 
        filterValue={props.columnFilterValues.Phone} />
      <Column dataField="Fax" selectedFilterOperation={props.columnSelectedFilterOps.Fax} 
        filterValue={props.columnFilterValues.Fax} />
    </DataGrid>
  );
  
}

export default Grid;
