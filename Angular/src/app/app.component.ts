import { Component, ViewChild } from '@angular/core';
import { DxDataGridComponent, DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { DxDataGridModule } from 'devextreme-angular';
import { DxScrollViewTypes } from 'devextreme-angular/ui/scroll-view';
import { Customer, Service } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [DxDataGridModule],
  providers: [Service],
})
export class AppComponent {
  @ViewChild('dependentGrid') dependentGrid!: DxDataGridComponent;

  customers: Customer[];

  dependentScrollable: DxDataGridTypes.Scrollable | null = null;

  pageSize = 10;

  allowedPageSizes: number[] = [5, 10, 20];

  pageIndex = 0;

  selectedRowKeys: number[] = [];

  columnFilterValues: any = {};

  columnSelectedFilterOps: any = {};

  columnSortOpts: any = {};

  constructor(service: Service) {
    this.customers = service.getCustomers();
  }

  onOptionChanged(e: DxDataGridTypes.OptionChangedEvent): void {
    if (e.fullName.includes('sortOrder')) {
      const match = /\[(\d+)\]/.exec(e.fullName);
      const colIdx = match ? parseInt(match[1], 10) : null;
      if (colIdx !== null) {
        const dataField = e.component.columnOption(colIdx, 'dataField');
        this.dependentGrid.instance.clearSorting();
        this.columnSortOpts = {};
        this.columnSortOpts[dataField] = e.value;
      }
    }
  }

  onMainGridReady(e: DxDataGridTypes.ContentReadyEvent): void {
    const that = this;
    e.component.getScrollable().on('scroll', (e: DxScrollViewTypes.ScrollEvent) => {
      that.dependentScrollable?.scrollTo(e.scrollOffset);
    });
  }

  onDependentGridReady(e: DxDataGridTypes.ContentReadyEvent): void {
    this.dependentScrollable = e.component.getScrollable();
  }
}
