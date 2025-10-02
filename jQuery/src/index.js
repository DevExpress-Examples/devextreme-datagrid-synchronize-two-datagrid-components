$(() => {
  let dataGridMain;
  let dataGridDependent;
  let scrollableMain;
  let scrollableDependent;
  let prevColSorted;

  $(() => {
    dataGridMain = $('#gridMain').dxDataGrid(createDataGridOptions(true)).dxDataGrid('instance');
    dataGridDependent = $('#gridDep').dxDataGrid(createDataGridOptions(false)).dxDataGrid('instance');

    dataGridMain.option({
      onOptionChanged: (e) => {
        if (e.fullName === 'paging.pageSize') {
          dataGridDependent.pageSize(e.value);
        } else if (e.fullName === 'paging.pageIndex') {
          dataGridDependent.pageIndex(e.value);
        } else if (e.fullName.includes('sortOrder')) {
          const match = e.fullName.match(/\[(\d+)\]/);
          const colIdx = match ? parseInt(match[1], 10) : null;
          if (colIdx) {
            const dataField = e.component.columnOption(colIdx, 'dataField');
            dataGridDependent.beginUpdate();
            if (prevColSorted && prevColSorted !== dataField) {
              dataGridDependent.columnOption(prevColSorted, 'sortOrder', null);
            }
            dataGridDependent.columnOption(dataField, 'sortOrder', e.value);
            dataGridDependent.endUpdate();
            prevColSorted = dataField;
          }
        } else {
          const opt = ['filterValue', 'selectedFilterOperation']
            .find((d) => e.fullName.includes(d));
          if (opt) {
            const match = e.fullName.match(/\[(\d+)\]/);
            const colIdx = match ? parseInt(match[1], 10) : null;
            if (colIdx) {
              dataField = e.component.columnOption(colIdx, 'dataField');
              dataGridDependent.columnOption(dataField, opt, e.value);
            }
          }
        }
      },
      onSelectionChanged: (e) => {
        dataGridDependent.selectRows(e.currentSelectedRowKeys);
      },
    });
  });

  function createDataGridOptions(isMainDataGrid) {
    return {
      dataSource: customers,
      keyExpr: 'ID',
      showBorders: true,
      paging: {
        pageSize: 10,
        enabled: true,
      },
      pager: {
        visible: true,
        showPageSizeSelector: true,
        allowedPageSizes: [5, 10, 20],
        showInfo: true,
      },
      filterRow: {
        visible: true,
      },
      selection: {
        mode: 'single',
      },
      columns: ['CompanyName', 'City', 'State', 'Phone', 'Fax'],
      height: 440,
      onContentReady: (e) => {
        if (isMainDataGrid) scrollableMain = e.component.getScrollable();
        else scrollableDependent = e.component.getScrollable();
        if (scrollableMain && scrollableDependent) {
          scrollableMain.on('scroll', (scrollArg) => {
            scrollableDependent.scrollTo(scrollArg.scrollOffset);
          });
        }
      },
    };
  }
});
