import { Component, OnInit, ViewChild, AfterViewInit, HostListener, ViewChildren, QueryList } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { MatSidenav, MatSelectionList, MatSort, MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { CreateDialogComponent } from '../create-dialog/create-dialog.component';
import { ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { flatMap, map, startWith, zip, share, combineLatest } from 'rxjs/operators';
import { merge } from 'rxjs/observable/merge';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { SatPopover } from '@ncstate/sat-popover';
import { TypesService } from '../types.service';
import { Subject } from 'rxjs/Subject';
import { EvaComponent } from '../eva/eva.component';

@Component({
  selector: 'app-type-overview',
  templateUrl: './type-overview.component.html',
  styleUrls: ['./type-overview.component.scss']
})
export class TypeOverviewComponent implements OnInit, AfterViewInit {
  type$ = this.route.data.pipe(map(({type}) => type));
  // displayedColumns$ = new Subject();
  displayedColumns = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filterList') filterList: MatSelectionList; 
  @ViewChild('filterPopover') filterPopover: SatPopover; 
  @ViewChildren(EvaComponent) evas: QueryList<EvaComponent>;
  @HostListener('document:click', ['$event']) clickedOutside($event) {
    this.popoverCloseAll();
  }

  private loading$;
  private dataSource$;
  private filter$ = new BehaviorSubject(null);

  constructor(
    private dialog: MatDialog,
    private apollo: Apollo,
    private route: ActivatedRoute,
    private types: TypesService,
  ) {}

  ngOnInit() {
    const table$ = this.type$.pipe(
      flatMap((type) => this.apollo.query({
        query: gql`
          query withPrefixes @prefix(carnot: "http://Carnot.org/") {
            ${type.rdfType} {
              ${type.columns.map((col) => {
                if (col.input === 'eva' || col.input === 'meva') {
                  return `${col.rdfField} @optional {
                    ${col.listField} @optional
                  }\n`;
                }
                return `${col.rdfField} @optional\n`
              })}
            }
          }
        `,
        variables: { '@reasoning': true },
        fetchPolicy: 'no-cache'
      })),
      map(({data}) => data as Array<any>),
      share(),
    );

    this.loading$ = merge(
      table$.pipe(map(() => false)),
      this.type$.pipe(map(() => true))
    );

    this.dataSource$ = table$.pipe(
      combineLatest(this.filter$),
      map(([data, filter]) => {
        const dataSource = new MatTableDataSource(data)
        dataSource.filter = filter;
        dataSource.sort = this.sort;
        dataSource.paginator = this.paginator;
        return dataSource;
      })
    );
    
    this.type$.subscribe((type) => {
      this.displayedColumns = type.defaultColumns
    });
  }

  ngAfterViewInit() {
    console.log(this.filterList);
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.filter$.next(filterValue);
  }

  create () {
    let dialogRef = this.dialog.open(CreateDialogComponent, {
      height: '400px',
      width: '600px',
    });
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   this.animal = result;
    // });
  }

  popoverOpen (e: MouseEvent, evaPopover: EvaComponent) {
    this.evas
      .filter(item => item !== evaPopover)
      .forEach((item) => item.close());
  }

  popoverClick (e: MouseEvent) {
    e.stopPropagation();
  }

  popoverCloseAll () {
    this.evas.forEach((eva) => eva.close());
    this.filterPopover.close();
  }

  popoverGetData (rdfField) {
    return this.types.get(rdfField);
  }

  openFilterPopover(e: MouseEvent) {
    e.stopPropagation();
    this.filterPopover.toggle();
  }
}
