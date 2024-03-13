import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FirstFormComponent } from './first-form/first-form.component';
import { SecondFormComponent } from './second-form/second-form.component';
import { SelectApiComponent } from './select-api/select-api.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    FirstFormComponent,
    SecondFormComponent,
    SelectApiComponent
  ],
  imports: [
    BrowserModule,    // routing
    AppRoutingModule, // routing
    FormsModule,      // formularios
    HttpClientModule  // APIs
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
