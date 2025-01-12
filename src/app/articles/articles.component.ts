import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {InfiniteScrollComponent} from '../shared/infinite-scroll.template';
import {Article} from '../shared/dataobjects/article';
import {ReactiveFormsModule, UntypedFormControl, UntypedFormGroup} from '@angular/forms';
import {debounceTime, Subscription} from 'rxjs';
import {ArticleService} from '../shared/dataservices/article.service';
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
  selector: 'app-articles',
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
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.css'
})
export class ArticlesComponent implements OnInit, AfterViewInit{
  @ViewChild(InfiniteScrollComponent, {read: ElementRef}) scrollContainer!: ElementRef;

  page: number = 0;
  fetchSize: number = 50;
  articles: Article[] = [];
  articleCount: number = 0;
  columns: { name: string; label: string; grow: number; cell: (element: Article) => string }[] = [
    {name: 'name', label: 'Name', grow: 1, cell: (element: Article) => `${element.name}`},
    {name: 'content', label: 'Content', grow: 1, cell: (element: Article) => `${element.content}`},
    {name: 'unit', label: 'Unit', grow: 1, cell: (element: Article) => `${element.unit.symbol} (${element.unit.name})`},
    {name: 'brand', label: 'Brand', grow: 1, cell: (element: Article) => `${element.brand.name}`},
    {name: 'manufacturer', label: 'Manufacturer', grow: 1, cell: (element: Article) => `${element.manufacturer.name}`},
  ]
  displayedColumns: string[] = this.columns.map(column => column.name);
  formControls: UntypedFormGroup = new UntypedFormGroup({
    name: new UntypedFormControl('', {nonNullable: true})
  })
  formControlSub!: Subscription;

  constructor(private articleService: ArticleService) {
  }

  ngOnInit(): void {
    this.filterArticles();
  }

  ngAfterViewInit(): void {
    this.formControlSub = this.formControls.valueChanges
      .pipe(
        debounceTime(500)
      )
      .subscribe(() => {
        this.page = 0;
        this.articles = [];
        this.filterArticles();
      });
  }

  fetchArticles() {
    let params = new HttpParams();

    Object.keys(this.formControls.controls).forEach((key) => {
      const value = this.formControls.controls[key].value?.trim();
      if (value) {
        params = params.set(key, value);
      }
    })

    params = params.set("size", this.fetchSize);
    params = params.set("page", this.page);

    this.articleService.getArticles(params).subscribe( (articles) => {
      articles = JSON.parse(JSON.stringify(articles).replace(/:null/gi, "\:\"\""))
      this.articles = this.articles.concat(articles.content);
      this.articleCount = articles.totalElements;
    });
  }

  onScroll() {
    this.page++;
    this.fetchArticles();
  }

  filterArticles() {
    this.page = 0;
    this.articles = [];
    this.scrollContainer.nativeElement.scrollTop = 0;
    this.fetchArticles();
  }

  clearFilter() {
    this.formControls.reset({}, {emitEvent: true});
    this.filterArticles();
    this.scrollContainer.nativeElement.scrollTop = 0;
  }
}
