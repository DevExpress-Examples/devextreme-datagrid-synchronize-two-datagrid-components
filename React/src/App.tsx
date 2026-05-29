import { useCallback, useState, useRef } from 'react';
import './App.css';
import DataGrid, {
  Selection,
  Pager,
  Paging,
  Column,
  FilterRow,
} from 'devextreme-react/data-grid';
import type { DataGridRef, DataGridTypes } from 'devextreme-react/data-grid';
import type { ScrollViewTypes } from 'devextreme-react/scroll-view';
import type dxDataGrid from 'devextreme/ui/data_grid';
import { customers } from './data/data';
import 'devextreme/dist/css/dx.material.blue.light.compact.css';

interface ColumnOptions {
  [key: string]: any;
}

const allowedPageSizes = [5, 10, 20];

function getColumnField(grid: dxDataGrid, fullName: string): string | null {
  const match = /\[(\d+)\]/.exec(fullName);
  const colIdx = match ? parseInt(match[1], 10) : null;
  if (colIdx === null) return null;
  return grid.columnOption(colIdx, 'dataField') as string;
}

function App(): JSX.Element {
  const [pageSize, setPageSize] = useState(10);
  const [pageIndex, setPageIndex] = useState(0);
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);
  const [columnFilterValues, setColumnFilterValues] = useState<ColumnOptions>({});
  const [columnSelectedFilterOps, setColumnSelectedFilterOps] = useState<ColumnOptions>({});
  const [columnSortOpts, setColumnSortOpts] = useState<ColumnOptions>({});

  const mainGridRef = useRef<DataGridRef>(null);
  const dependentGridRef = useRef<DataGridRef>(null);
  const dependentScrollable = useRef<DataGridTypes.Scrollable | null>(null);

  const updateFilterValue = useCallback((dataField: string, value: any) => {
    setColumnFilterValues((prev) => ({
      ...prev,
      [dataField]: value,
    }));
  }, []);

  const updateSelectedFilterOperation = useCallback((dataField: string, value: DataGridTypes.FilterOperation) => {
    setColumnSelectedFilterOps((prev) => ({
      ...prev,
      [dataField]: value,
    }));
  }, []);

  const onMainGridReady = useCallback((e: DataGridTypes.ContentReadyEvent) => {
    const scrollable = e.component.getScrollable();
    scrollable.on('scroll', (scrollEvent: ScrollViewTypes.ScrollEvent) => {
      if (dependentScrollable.current) {
        dependentScrollable.current.scrollTo(scrollEvent.scrollOffset);
      }
    });
  }, []);

  const onDependentGridReady = useCallback((e: DataGridTypes.ContentReadyEvent) => {
    dependentScrollable.current = e.component.getScrollable();
  }, []);

  const onOptionChanged = useCallback((e: DataGridTypes.OptionChangedEvent) => {
    const columnField = getColumnField(e.component, e.fullName);
    if (!columnField) return;

    if (e.fullName.includes('sortOrder')) {
      if (dependentGridRef.current) {
        dependentGridRef.current.instance().clearSorting();
      }
      setColumnSortOpts((prev) => ({
        ...Object.keys(prev).reduce((acc, key) => ({ ...acc, [key]: null }), {}),
        [columnField]: e.value,
      }));
    } else if (e.fullName.includes('filterValue')) {
      updateFilterValue(columnField, e.value);
    } else if (e.fullName.includes('selectedFilterOperation')) {
      updateSelectedFilterOperation(columnField, e.value);
    }
  }, [updateFilterValue, updateSelectedFilterOperation]);

  const onSelectionChanged = useCallback((e: DataGridTypes.SelectionChangedEvent) => {
    setSelectedRowKeys(e.selectedRowKeys);
  }, []);

  const onPageSizeChanged = useCallback((newPageSize: number) => {
    setPageSize(newPageSize);
  }, []);

  const onPageIndexChanged = useCallback((newPageIndex: number) => {
    setPageIndex(newPageIndex);
  }, []);

  return (
    <div className="tables">
      <div className="column">
        <DataGrid
          ref={mainGridRef}
          dataSource={customers}
          keyExpr="ID"
          showBorders={true}
          height={440}
          selectedRowKeys={selectedRowKeys}
          onContentReady={onMainGridReady}
          onOptionChanged={onOptionChanged}
          onSelectionChanged={onSelectionChanged}
        >
          <Paging
            enabled={true}
            pageSize={pageSize}
            pageIndex={pageIndex}
            onPageSizeChange={onPageSizeChanged}
            onPageIndexChange={onPageIndexChanged}
          />
          <Pager
            visible={true}
            showPageSizeSelector={true}
            allowedPageSizes={allowedPageSizes}
            showInfo={true}
          />
          <FilterRow visible={true} />
          <Selection mode="single" />
          <Column
            dataField="CompanyName"
            selectedFilterOperation={columnSelectedFilterOps.CompanyName}
            filterValue={columnFilterValues.CompanyName}
          />
          <Column
            dataField="City"
            selectedFilterOperation={columnSelectedFilterOps.City}
            filterValue={columnFilterValues.City}
          />
          <Column
            dataField="State"
            selectedFilterOperation={columnSelectedFilterOps.State}
            filterValue={columnFilterValues.State}
          />
          <Column
            dataField="Phone"
            selectedFilterOperation={columnSelectedFilterOps.Phone}
            filterValue={columnFilterValues.Phone}
          />
          <Column
            dataField="Fax"
            selectedFilterOperation={columnSelectedFilterOps.Fax}
            filterValue={columnFilterValues.Fax}
          />
        </DataGrid>
      </div>
      <div className="column">
        <DataGrid
          ref={dependentGridRef}
          dataSource={customers}
          keyExpr="ID"
          showBorders={true}
          height={440}
          selectedRowKeys={selectedRowKeys}
          onContentReady={onDependentGridReady}
        >
          <Paging
            enabled={true}
            pageSize={pageSize}
            pageIndex={pageIndex}
          />
          <Pager
            visible={true}
            showPageSizeSelector={true}
            allowedPageSizes={allowedPageSizes}
            showInfo={true}
          />
          <FilterRow visible={true} />
          <Selection mode="single" />
          <Column
            dataField="CompanyName"
            selectedFilterOperation={columnSelectedFilterOps.CompanyName}
            filterValue={columnFilterValues.CompanyName}
            sortOrder={columnSortOpts.CompanyName}
          />
          <Column
            dataField="City"
            selectedFilterOperation={columnSelectedFilterOps.City}
            filterValue={columnFilterValues.City}
            sortOrder={columnSortOpts.City}
          />
          <Column
            dataField="State"
            selectedFilterOperation={columnSelectedFilterOps.State}
            filterValue={columnFilterValues.State}
            sortOrder={columnSortOpts.State}
          />
          <Column
            dataField="Phone"
            selectedFilterOperation={columnSelectedFilterOps.Phone}
            filterValue={columnFilterValues.Phone}
            sortOrder={columnSortOpts.Phone}
          />
          <Column
            dataField="Fax"
            selectedFilterOperation={columnSelectedFilterOps.Fax}
            filterValue={columnFilterValues.Fax}
            sortOrder={columnSortOpts.Fax}
          />
        </DataGrid>
      </div>
    </div>
  );
}

export default App;
