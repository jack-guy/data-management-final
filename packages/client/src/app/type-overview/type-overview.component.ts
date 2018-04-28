import { Component, OnInit, ViewChild, AfterViewInit, HostListener, ViewChildren, QueryList } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { MatSidenav, MatSelectionList, MatSort, MatPaginator, MatTableDataSource, MatDialog, MatDialogRef } from '@angular/material';
import { CreateDialogComponent } from '../create-dialog/create-dialog.component';
import { ActivatedRouteSnapshot, ActivatedRoute, Router } from '@angular/router';
import { flatMap, map, startWith, zip, share, take, combineLatest } from 'rxjs/operators';
import { merge } from 'rxjs/observable/merge';
import { combineLatest as combineLatest$ } from 'rxjs/observable/combineLatest';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { SatPopover } from '@ncstate/sat-popover';
import { TypesService } from '../types.service';
import { Subject } from 'rxjs/Subject';
import { EvaComponent } from '../eva/eva.component';
import { Subscription } from 'rxjs/Subscription';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { GraphService } from '../graph.service';

@Component({
  selector: 'app-type-overview',
  templateUrl: './type-overview.component.html',
  styleUrls: ['./type-overview.component.scss']
})
export class TypeOverviewComponent implements OnInit {
  doRefresh = new Subject<null>();
  type$ = combineLatest$(
    this.route.data.pipe(map(({type}) => type)),
    this.doRefresh.pipe(startWith(null))
  ).pipe(map(([type, _]) => type));
  showCreate$ = combineLatest$(
    this.type$, 
    this.route.queryParamMap
  ).pipe(map(([type, params]) => ({
    showCreate: !!params.get('create'),
    type
  })));

  // displayedColumns$ = new Subject();
  displayedColumns = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filterList') filterList: MatSelectionList; 
  @ViewChild('filterPopover') filterPopover: SatPopover; 
  @ViewChildren(EvaComponent) evas: QueryList<EvaComponent>;
  @ViewChildren('optionsPopover') optionsPopovers: QueryList<SatPopover>;
  @HostListener('document:click', ['$event']) clickedOutside($event) {
    this.popoverCloseAll();
  }

  private loading$;
  private dataSource$;
  private filter$ = new BehaviorSubject(null);
  private dialogRef: MatDialogRef<CreateDialogComponent> = null;

  constructor(
    private dialog: MatDialog,
    private apollo: Apollo,
    private route: ActivatedRoute,
    private types: TypesService,
    private router: Router,
    private graph: GraphService,
  ) {}

  ngOnInit() {
    console.log(this.route.snapshot.params);
    const table$ = this.type$.pipe(
      flatMap((type) => this.apollo.query({
        query: gql`
          query withPrefixes @prefix(carnot: "http://Carnot.org/") {
            ${type.rdfType} {
              ${type.columns.map((col) => {
                if (col.inputType === 'eva' || col.inputType === 'meva') {
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
      this.displayedColumns = [...type.defaultColumns, 'options'];
    });

    let close$: Subscription;
    this.showCreate$.subscribe(({showCreate, type}) => {
      if (!showCreate && this.dialogRef) {
        this.dialogRef.close();
        this.dialogRef = null;
        close$.unsubscribe();
      }

      if (showCreate) {
        this.dialogRef = this.dialog.open(CreateDialogComponent, {
          height: '400px',
          width: '600px',
          data: { type }
        });
        close$ = this.dialogRef.afterClosed().subscribe((res) => {
          if (res && res.refresh) {
            this.doRefresh.next(null);
          }
          this.router.navigate(['/types', type.rdfType], { queryParams: {} });
        });  
      }
    });
  }

  filterOnChange(value) {
    this.displayedColumns = [...value, 'options'];
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.filter$.next(filterValue);
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
    this.optionsPopovers.forEach((item) => item.close());
    this.filterPopover.close();
  }

  popoverGetData (rdfField) {
    return this.types.get(rdfField);
  }

  openFilterPopover(e: MouseEvent) {
    e.stopPropagation();
    this.filterPopover.toggle();
  }

  openOptionsPopover(e: MouseEvent, optionsPopover: SatPopover) {
    e.stopPropagation();
    optionsPopover.toggle();
    this.optionsPopovers
      .filter(item => item !== optionsPopover)
      .forEach((item) => item.close());
  }

  async deleteItem(instance) {
    const type = this.route.snapshot.data['type'];
    const identifier: string[] = type.identifier;
    const identifierMap = identifier.reduce((prev, val) => {
      return {
        ...prev,
        [val]: instance[val]
      }
    }, {});
    const res = await this.graph.delete(type.rdfType, identifierMap).toPromise();
    console.log('RES', res);
  }
}
