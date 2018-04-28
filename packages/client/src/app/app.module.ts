import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { CreateDialogComponent } from './create-dialog/create-dialog.component';
import { HomeComponent } from './home/home.component';
import { TypesService } from './types.service';
import { TypeOverviewComponent } from './type-overview/type-overview.component';

import { flatMap, map, tap } from 'rxjs/operators';

import {
  SatPopoverModule
} from '@ncstate/sat-popover';
import { EvaPreviewComponent } from './eva-preview/eva-preview.component';
import { MultiEvaComponent } from './multi-eva/multi-eva.component';
import { EvaComponent } from './eva/eva.component'; 
import { GraphService } from './graph.service';


@Injectable()
export class TypeOverviewResolver implements Resolve<any> {
  constructor (private types: TypesService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.types.get(route.paramMap.get('id'));
  }
}

@Injectable()
export class TypeOverviewNameResolver implements Resolve<any> {
  constructor (private types: TypesService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.types.get(route.paramMap.get('id')).pipe(
      map((type: any) => type.name),
    );
  }
}

@NgModule({
  declarations: [
    AppComponent,
    CreateDialogComponent,
    TypeOverviewComponent,
    HomeComponent,
    EvaPreviewComponent,
    MultiEvaComponent,
    EvaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
    MaterialModule,
    SatPopoverModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      },
      {
        path: 'types/:id',
        component: TypeOverviewComponent,
        data: {
          showCreate: false,
        },
        resolve: {
          pageName: TypeOverviewNameResolver,
          type: TypeOverviewResolver
        },
      },
      // {
      //   path: 'types/:id/create',
      //   component: TypeOverviewComponent,
      //   data: {
      //     showCreate: true,
      //   },
      //   resolve: {
      //     pageName: TypeOverviewNameResolver,
      //     type: TypeOverviewResolver
      //   },
      // },
      {
        path: 'home',
        component: HomeComponent,
        data: {
          'pageName': 'Home'
        }
      },
      {
        path: '**',
        redirectTo: '/home'
      }
    ]),
  ],
  providers: [
    TypesService,
    GraphService,
    TypeOverviewNameResolver,
    TypeOverviewResolver
  ],
  entryComponents: [
    CreateDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(apollo: Apollo, httpLink: HttpLink) {
    // stardog-admin server start --disable-security
    // Basic YWRtaW46YWRtaW4=
    apollo.create({
      link: httpLink.create({ uri: 'http://localhost:5820/companyDB/graphql' }),
      cache: new InMemoryCache({
        addTypename: false
      })
    });
  }
}
