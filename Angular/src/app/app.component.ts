import { Component, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { Service, Customer } from './app.service'
import { DxDataGridComponent } from 'devextreme-angular';

//testing
import { pairs, from } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
})
export class AppComponent {
  customers: Array<Customer>;

  widgetCount: number;
  readyCtr: number;

  @ViewChildren(DxDataGridComponent) dataGrids: QueryList<DxDataGridComponent>;
  scrollableDg1;
  scrollableDg2;

  pageSize: number;
  allowedPageSizes: Array<number>;
  pageIndex: number;

  columnFilterValues: any;
  columnSelectedFilterOps: any;
  columnSortOpts: any;

  prevColSorted: string;

  constructor(service: Service) {
    this.widgetCount = 2;
    this.readyCtr = 0;

    this.pageSize = 10;
    this.allowedPageSizes = [5, 10, 20];
    this.pageIndex = 0;

    this.columnFilterValues = service.initColumnOptions();
    this.columnSelectedFilterOps = service.initColumnOptions();
    this.columnSortOpts = service.initColumnOptions();
    
    this.customers = service.getCustomers();
  }

  onContentReady(e) {
    if (this.readyCtr < this.widgetCount) {
      this.readyCtr++;
    }
    if (this.readyCtr === this.widgetCount) {
      this.readyCtr++;
      this.initScrollable();
    }
  }

  onOptionChanged(e) {
    if (e.fullName.includes("sortOrder")) {
      let colIdx = parseInt(e.fullName.slice(8, 9)),
        dataField = e.component.columnOption(colIdx, "dataField");
      
      this.dataGrids.last.instance.beginUpdate();
      if(this.prevColSorted && this.prevColSorted !== dataField) {
        this.columnSortOpts[this.prevColSorted] = null;
      }
      this.columnSortOpts[dataField] = e.value;
      this.dataGrids.last.instance.endUpdate();
      
      this.prevColSorted = dataField
    }
  }

  initScrollable() {
    this.scrollableDg1 = this.dataGrids.first.instance.getScrollable();
    this.scrollableDg2 = this.dataGrids.last.instance.getScrollable();
  
    this.scrollableDg1.on("scroll", function (e) {
      this.scrollableDg2.scrollTo(e.scrollOffset);
    }.bind(this));
  }

}
