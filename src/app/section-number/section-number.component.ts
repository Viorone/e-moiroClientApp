import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import { SectionNumberService } from '../services/section-number.service';
import { SectionNumber } from '../models/SectionNumber';
import {MDBModalRef, MDBModalService, MdbTableDirective, MdbTablePaginationComponent} from 'angular-bootstrap-md';
import {SectionNumberEditComponent} from './section-number-edit.component';

@Component({
  selector: 'app-section-number',
  templateUrl: './section-number.component.html',
  styleUrls: ['./section-number.component.scss'],
  providers: [SectionNumberService]
})
export class SectionNumberComponent implements OnInit, AfterViewInit {
  value: SectionNumber = new SectionNumber();
  values: SectionNumber[];

  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild('row', { static: true }) row: ElementRef;

  elements: any = [];
  headElements = ['Номер', 'id', 'Содержание', 'Команда'];
  searchText = '';
  previous: string;
  modalRef: MDBModalRef;

  constructor(
    private valueService: SectionNumberService,
    private cdRef: ChangeDetectorRef,
    private modalService: MDBModalService) { }

  // tslint:disable-next-line:typedef
  @HostListener('input') oninput() {
    this.mdbTablePagination.searchText = this.searchText;
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.loadValue();
  }

  // tslint:disable-next-line:typedef use-lifecycle-interface
  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(8);

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  // tslint:disable-next-line:typedef
  searchItems() {
    const prev = this.mdbTable.getDataSource();

    if (!this.searchText) {
      this.mdbTable.setDataSource(this.previous);
      this.elements = this.mdbTable.getDataSource();
    }

    if (this.searchText) {
      this.elements = this.mdbTable.searchLocalDataBy(this.searchText);
      this.mdbTable.setDataSource(prev);
    }

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();

    this.mdbTable.searchDataObservable(this.searchText).subscribe(() => {
      this.mdbTablePagination.calculateFirstItemIndex();
      this.mdbTablePagination.calculateLastItemIndex();
    });
  }

  // tslint:disable-next-line:typedef
  loadValue() {
    this.valueService.getValues()
      .subscribe((data: SectionNumber[]) => {
        this.values = data;
        for (let i = 1; i <= this.values.length; i++) {
          this.elements.push({id: i.toString(), first: this.values[i - 1].id, last: this.values[i - 1].name});
        }
        this.mdbTable.setDataSource(this.elements);
        this.mdbTablePagination.setMaxVisibleItemsNumberTo(8);
        this.elements = this.mdbTable.getDataSource();
        this.previous = this.mdbTable.getDataSource();
      });
  }

  // tslint:disable-next-line:typedef
  crate(){
    this.valueService.createValue(this.value)
      .subscribe((data: SectionNumber) => {
        // this.values.push(data);
        this.value = data;
        const index = this.elements.length + 1;
        this.mdbTable.addRow({
          id: index.toString(),
          first: this.value.id,
          last: this.value.name
        });
        this.mdbTable.setDataSource(this.elements);
        this.cancel();
      });
  }

  // tslint:disable-next-line:typedef
  save(el: any) {
    this.cancel();
    this.value.id = el.first;
    this.value.name = el.last;
    this.valueService.updateValue(this.value)
      .subscribe();
    this.cancel();
  }
  // tslint:disable-next-line:typedef
  editValue(p: SectionNumber) {
    this.value = p;
  }
  // tslint:disable-next-line:typedef
  cancel() {
    this.value = new SectionNumber();
  }
  // tslint:disable-next-line:typedef
  delete(p: any) {
    this.value.id = p.first;
    this.value.name = p.last;
    this.valueService.deleteValue(this.value.id)
      .subscribe(data => {
        this.removeRow(p);
      });
  }
  // tslint:disable-next-line:typedef
  add() {
    this.cancel();
  }

  // tslint:disable-next-line:typedef
  removeRow(el: any) {
    const elementIndex = this.elements.findIndex((elem: any) => el === elem);
    this.mdbTable.removeRow(elementIndex);
    // tslint:disable-next-line:no-shadowed-variable
    this.mdbTable.getDataSource().forEach((el: any, index: any) => {
      el.id = (index + 1).toString();
    });
    this.mdbTable.setDataSource(this.elements);
    this.cancel();
  }

  // tslint:disable-next-line:typedef
  editRow(el: any) {
    const elementIndex = this.elements.findIndex((elem: any) => el === elem);
    const modalOptions = {
      data: {
        editableRow: el
      }
    };
    this.modalRef = this.modalService.show(SectionNumberEditComponent, modalOptions);
    this.modalRef.content.saveButtonClicked.subscribe((newElement: any) => {
      this.elements[elementIndex] = newElement;
      this.save(newElement);
    });
    this.mdbTable.setDataSource(this.elements);
  }
}


