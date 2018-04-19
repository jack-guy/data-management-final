import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { CreateDialogComponent } from './create-dialog/create-dialog.component';
import { TypeOverviewComponent } from './type-overview/type-overview.component';
import { HomeComponent } from './home/home.component';


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
  ],
  providers: [],
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
