<template>
<div class="tables">
    <div class="column">
      <DxDataGrid
        ref="dataGrid1"
        :data-source="dataSource"
        key-expr="ID"
        :show-borders="true"
        :height="440"
        :selected-row-keys.sync="selectedRowKeys"
        @content-ready="onContentReady($event)" 
        @option-changed="onOptionChanged($event)"
      >
        <DxPaging :enabled="true" :page-size.sync="pageSize" :page-index.sync="pageIndex"/>
        <DxPager
          :visible="true"
          :show-page-size-selector="true"
          :allowed-page-sizes="allowedPageSizes"
          :show-info="true"
        />
        <DxFilterRow :visible="true" />
        <DxSelection mode="single" />

        <DxColumn dataField="CompanyName" :selectedFilterOperation.sync="columnSelectedFilterOps.CompanyName"
            :filterValue.sync="columnFilterValues.CompanyName" />
        <DxColumn dataField="City" :selectedFilterOperation.sync="columnSelectedFilterOps.City"
            :filterValue.sync="columnFilterValues.City" />
        <DxColumn dataField="State" :selectedFilterOperation.sync="columnSelectedFilterOps.State"
            :filterValue.sync="columnFilterValues.State" />
        <DxColumn dataField="Phone" :selectedFilterOperation.sync="columnSelectedFilterOps.Phone"
            :filterValue.sync="columnFilterValues.Phone" />
        <DxColumn dataField="Fax" :selectedFilterOperation.sync="columnSelectedFilterOps.Fax"
            :filterValue.sync="columnFilterValues.Fax" />
      </DxDataGrid>
    </div>
    <div class="column">
      <DxDataGrid
        ref="dataGrid2"
        :data-source="dataSource"
        key-expr="ID"
        :show-borders="true"
        :height="440"
        :selected-row-keys="selectedRowKeys"
        @content-ready="onContentReady($event)" 
      >
        <DxPaging :enabled="true" :page-size="pageSize" :page-index="pageIndex"/>
        <DxPager
          :visible="true"
          :show-page-size-selector="true"
          :allowed-page-sizes="allowedPageSizes"
          :show-info="true"
        />
        <DxFilterRow :visible="true" />
        <DxSelection mode="single" />

        <DxColumn dataField="CompanyName" :selectedFilterOperation="columnSelectedFilterOps.CompanyName"
            :filterValue="columnFilterValues.CompanyName" :sort-order="columnSortOpts.CompanyName"/>
        <DxColumn dataField="City" :selectedFilterOperation="columnSelectedFilterOps.City"
            :filterValue="columnFilterValues.City" :sort-order="columnSortOpts.City" />
        <DxColumn dataField="State" :selectedFilterOperation="columnSelectedFilterOps.State"
            :filterValue="columnFilterValues.State" :sort-order="columnSortOpts.State"/>
        <DxColumn dataField="Phone" :selectedFilterOperation="columnSelectedFilterOps.Phone"
            :filterValue="columnFilterValues.Phone" :sort-order="columnSortOpts.Phone"/>
        <DxColumn dataField="Fax" :selectedFilterOperation="columnSelectedFilterOps.Fax"
            :filterValue="columnFilterValues.Fax" :sort-order="columnSortOpts.Fax"/>
      </DxDataGrid>
    </div>
</div>
</template>

<script>
import { DxDataGrid, DxColumn, DxPager, DxPaging, DxFilterRow, DxSelection } from 'devextreme-vue/data-grid';
import service from './data.js';

let scrollableDg1, scrollableDg2;
let widgetCount = 2,
      readyCtr = 0;
let prevColSorted;

export default {
  components: {
    DxDataGrid,
    DxColumn,
    DxPager,
    DxPaging,
    DxFilterRow,
    DxSelection
  },
  data() {
    return {
      dataSource: service.getCustomers(),
      pageSize: 10,
      allowedPageSizes: [5, 10, 20],
      pageIndex: 0,
      columnFilterValues: service.initColumnOptions(),
      columnSelectedFilterOps: service.initColumnOptions(),
      columnSortOpts: service.initColumnOptions(),
      selectedRowKeys: []
      
    };
  },
  methods: {
    onContentReady() {
      if (readyCtr < widgetCount) {
        readyCtr++;
      }
      if (readyCtr === widgetCount) {
        readyCtr++;
        this.initScrollable();
      }
    },
    onOptionChanged(e) {
      if (e.fullName.includes("sortOrder")) {
        let colIdx = parseInt(e.fullName.slice(8, 9)),
          dataField = e.component.columnOption(colIdx, "dataField");
        
        this.dataGrid2.beginUpdate();
        if(prevColSorted && prevColSorted !== dataField) {
          this.columnSortOpts[prevColSorted] = null;
        }
        this.columnSortOpts[dataField] = e.value;
        this.dataGrid2.endUpdate();

        prevColSorted = dataField;
      }
    },
    initScrollable() {
      scrollableDg1 = this.dataGrid1.getScrollable();
      scrollableDg2 = this.dataGrid2.getScrollable();
    
      scrollableDg1.on("scroll", function (e) {
        scrollableDg2.scrollTo(e.scrollOffset);
      }.bind(this));
    }
  },
  computed: {
    dataGrid1() {
      return this.$refs.dataGrid1.instance;
    },
    dataGrid2() {
      return this.$refs.dataGrid2.instance
    }
  }
}
</script>

<style>
.tables {
    display: flex;
}

.column:first-child {
    width: 50%;
    padding-right: 15px;
}

.column:last-child {
    width: 50%;
    padding-left: 15px;
}
</style>
