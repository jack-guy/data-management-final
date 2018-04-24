import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatSort, MatSidenav, MatTableDataSource, PageEvent } from '@angular/material';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { TypesService } from './types.service';
import { of } from 'rxjs/observable/of';
import { map, flatMap, filter, tap, startWith } from 'rxjs/operators';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  menuItems = this.types.find().pipe(
    flatMap((x) => of(x))
  )

  routeName = this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    flatMap((route) => this.route.firstChild.data),
    map((data) => data['pageName']),
  );

  @ViewChild('sidenav') sideNav: MatSidenav;

  constructor (
    private router: Router,
    private route: ActivatedRoute,
    private types: TypesService,
    private apollo: Apollo
  ) {}

  ngOnInit() {
    this.sideNav.open();
  }
}
