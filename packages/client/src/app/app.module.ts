import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { CreateDialogComponent } from './create-dialog/create-dialog.component';
import { HomeComponent } from './home/home.component';
import { TypesService } from './types.service';
import { TypeOverviewComponent } from './type-overview/type-overview.component';

import { flatMap } from 'rxjs/';

export class TypeOverviewResolver implements Resolve<any> {
  constructor (private types: TypesService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.types.find().pipe(
      flatMap
    )
  }
}

@NgModule({
  declarations: [
    AppComponent,
    CreateDialogComponent,
    TypeOverviewComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
    MaterialModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/home'
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'types/:id',
        component: TypeOverviewComponent,
        resolve: 
      }
    ])
  ],
  providers: [TypesService],
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
