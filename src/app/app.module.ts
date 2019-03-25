import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { UiModule } from './ui/ui.module';
import { AppRoutingModule } from './/app-routing.module';
import { FormsModule } from '@angular/forms';
import {appRoutes} from './routerConfig';
import { RouterModule } from '@angular/router';
import { ContactComponent } from './Home/contact/contact.component';
import { AboutComponent } from './Home/about/about.component';
import { HomeIndexComponent } from './Home/home-index/home-index.component';
import {CreateComponent} from './Patients/create/create.component';
import {IndexComponent} from './Patients/index/index.component';
import {EditComponent} from './Patients/edit/edit.component';
import { HttpModule } from '@angular/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {DatePipe} from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    AboutComponent,
    HomeIndexComponent,
    CreateComponent,
    IndexComponent,
    EditComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    UiModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
