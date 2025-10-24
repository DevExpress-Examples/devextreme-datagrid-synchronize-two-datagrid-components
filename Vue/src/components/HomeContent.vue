<template>
  <div class="tables">
    <div class="column">
      <DxDataGrid
        :data-source="dataSource"
        key-expr="ID"
        :show-borders="true"
        :height="440"
        v-model:selected-row-keys="selectedRowKeys"
        @content-ready="onMainGridReady"
        @option-changed="mainGridOptionChanged"
      >
        <DxPaging
          :enabled="true"
          v-model:page-size="pageSize"
          v-model:page-index="pageIndex"
        />
        <DxPager
          :visible="true"
          :show-page-size-selector="true"
          :allowed-page-sizes="allowedPageSizes"
          :show-info="true"
        />
        <DxFilterRow :visible="true"/>
        <DxSelection mode="single"/>

        <DxColumn
          data-field="CompanyName"
          v-model:selected-filter-operation="columnSelectedFilterOps.CompanyName"
          v-model:filter-value="columnFilterValues.CompanyName"
        />
        <DxColumn
          data-field="City"
          v-model:selected-filter-operation="columnSelectedFilterOps.City"
          v-model:filter-value="columnFilterValues.City"
        />
        <DxColumn
          data-field="State"
          v-model:selected-filter-operation="columnSelectedFilterOps.State"
          v-model:filter-value="columnFilterValues.State"
        />
        <DxColumn
          data-field="Phone"
          v-model:selected-filter-operation="columnSelectedFilterOps.Phone"
          v-model:filter-value="columnFilterValues.Phone"
        />
        <DxColumn
          data-field="Fax"
          v-model:selected-filter-operation="columnSelectedFilterOps.Fax"
          v-model:filter-value="columnFilterValues.Fax"
        />
      </DxDataGrid>
    </div>
    <div class="column">
      <DxDataGrid
        ref="dependentGridRef"
        :data-source="dataSource"
        key-expr="ID"
        :show-borders="true"
        :height="440"
        :selected-row-keys="selectedRowKeys"
        @content-ready="onDependentGridReady"
      >
        <DxPaging
          :enabled="true"
          :page-size="pageSize"
          :page-index="pageIndex"
        />
        <DxPager
          :visible="true"
          :show-page-size-selector="true"
          :allowed-page-sizes="allowedPageSizes"
          :show-info="true"
        />
        <DxFilterRow :visible="true"/>
        <DxSelection mode="single"/>

        <DxColumn
          data-field="CompanyName"
          :selected-filter-operation="columnSelectedFilterOps.CompanyName"
          :filter-value="columnFilterValues.CompanyName"
          :sort-order="columnSortOpts.CompanyName"
        />
        <DxColumn
          data-field="City"
          :selected-filter-operation="columnSelectedFilterOps.City"
          :filter-value="columnFilterValues.City"
          :sort-order="columnSortOpts.City"
        />
        <DxColumn
          data-field="State"
          :selected-filter-operation="columnSelectedFilterOps.State"
          :filter-value="columnFilterValues.State"
          :sort-order="columnSortOpts.State"
        />
        <DxColumn
          data-field="Phone"
          :selected-filter-operation="columnSelectedFilterOps.Phone"
          :filter-value="columnFilterValues.Phone"
          :sort-order="columnSortOpts.Phone"
        />
        <DxColumn
          data-field="Fax"
          :selected-filter-operation="columnSelectedFilterOps.Fax"
          :filter-value="columnFilterValues.Fax"
          :sort-order="columnSortOpts.Fax"
        />
      </DxDataGrid>
    </div>
  </div>
</template>
<script setup lang="ts">
import { DxDataGrid, DxColumn, DxPager, DxPaging, DxFilterRow, DxSelection } from 'devextreme-vue/data-grid';
import type { DxDataGridTypes } from 'devextreme-vue/data-grid';
import { ref, reactive } from 'vue';
import service, { Customer } from '../data';
import type { DxScrollViewTypes } from 'devextreme-vue/scroll-view';

interface ColumnOptions {
  [key: string]: any;
}

const allowedPageSizes = [5, 10, 20];

const dataSource: Customer[] = service.getCustomers();
const columnFilterValues = reactive<ColumnOptions>({});
const columnSelectedFilterOps = reactive<ColumnOptions>({});
const columnSortOpts = reactive<ColumnOptions>({});
const selectedRowKeys = ref<number[]>([]);
const pageSize = ref(5);
const pageIndex = ref(0);

const dependentGridRef = ref<InstanceType<typeof DxDataGrid> | null>(null);
let dependentScrollable: DxDataGridTypes.Scrollable | null = null;

const onMainGridReady = (e: DxDataGridTypes.ContentReadyEvent) => {
  const scrollable = e.component.getScrollable();
  scrollable.on('scroll', (scrollEvent: DxScrollViewTypes.ScrollEvent) => {
    if (dependentScrollable) {
      dependentScrollable.scrollTo(scrollEvent.scrollOffset);
    }
  });
};

const onDependentGridReady = (e: DxDataGridTypes.ContentReadyEvent) => {
  dependentScrollable = e.component.getScrollable();
};

const mainGridOptionChanged = (e: DxDataGridTypes.OptionChangedEvent) => {
  if (e.fullName.includes('sortOrder')) {
    const match = /\[(\d+)\]/.exec(e.fullName);
    const colIdx = match ? parseInt(match[1], 10) : null;
    if (colIdx !== null) {
      const dataField = e.component.columnOption(colIdx, 'dataField');
      dependentGridRef.value?.instance?.columnOption(dataField, 'sortOrder', e.value);
      Object.keys(columnSortOpts).forEach(key => columnSortOpts[key] = null);
      columnSortOpts[dataField] = e.value;
    }
  }
};

</script>
<style scoped>
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
