import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {InfiniteScrollComponent} from '../shared/infinite-scroll.template';
import {Company} from '../shared/dataobjects/company';
import {CompanyService} from '../shared/dataservices/company.service';
import {ReactiveFormsModule, UntypedFormControl, UntypedFormGroup} from '@angular/forms';
import {debounceTime, Subscription} from 'rxjs';
import {HttpParams} from '@angular/common/http';
import {MatFormField} from '@angular/material/form-field';
import {
  MatCell,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderRow,
  MatRow,
  MatTable,
  MatTableModule
} from '@angular/material/table';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {MatInput, MatInputModule} from '@angular/material/input';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-companies',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    InfiniteScrollComponent,
    CommonModule,
    MatTable,
    MatTableModule,
    MatHeaderCell,
    MatCell,
    MatIcon,
    MatHeaderRow,
    MatRow,
    MatColumnDef,
    MatButton,
    MatInput,
    MatInputModule
  ],
  templateUrl: './companies.component.html',
  styleUrl: './companies.component.css'
})
export class CompaniesComponent implements OnInit, AfterViewInit{
  @ViewChild(InfiniteScrollComponent, {read: ElementRef}) scrollContainer!: ElementRef;

  page: number = 0;
  fetchSize: number = 50;
  companies: Company[] = [];
  companyCount: number = 0;
  columns: { name: string; label: string; grow: number; cell: (element: Company) => string }[] = [
    {name: 'name', label: 'Name', grow: 1, cell: (element: Company) => `${element.name}`},
    {name: 'parent', label: 'Parent Company', grow: 1, cell: (element: Company) => `${element.parentCompanies?.map(company => company.name).join(', ') || ''}`},
    {name: 'child', label: 'Child Company', grow: 1, cell: (element: Company) => `${element.childCompanies?.map(company => company.name).join(', ') || ''}`}
  ]
  displayedColumns: string[] = this.columns.map(column => column.name);
  formControls: UntypedFormGroup = new UntypedFormGroup({
    name: new UntypedFormControl('', {nonNullable: true}),
    parent: new UntypedFormControl('', {nonNullable: true}),
    child: new UntypedFormControl('', {nonNullable: true})
  })
  formControlSub!: Subscription;

  constructor(private companyService: CompanyService) {
  }

  ngOnInit(): void {
    this.fetchCompanies();
  }

  ngAfterViewInit(): void {
    this.formControlSub = this.formControls.valueChanges
      .pipe(
        debounceTime(500)
      )
      .subscribe(() => this.filterCompanies()
      );
  }

  fetchCompanies() {
    let params = new HttpParams();

    Object.keys(this.formControls.controls).forEach((key) => {
      params = params.set(key, this.formControls.controls[key].value.trim());
    })

    params = params.set("size", this.fetchSize);
    params = params.set("page", this.page);

    this.companyService.getCompanies(params).subscribe( (companies) => {
      companies = JSON.parse(JSON.stringify(companies).replace(/:null/gi, "\:\"\""))
      this.companies = this.companies.concat(companies.content);
      this.companyCount = companies.totalElements;
    });
  }

  onScroll() {
    this.page++;
    this.fetchCompanies();
  }

  filterCompanies() {
    this.page = 0;
    this.companies = [];
    this.scrollContainer.nativeElement.scrollTop = 0;
    this.fetchCompanies();
  }

  clearFilter() {
    this.formControls.reset({}, {emitEvent: true});
    this.fetchCompanies();
    this.scrollContainer.nativeElement.scrollTop = 0;
  }
}
