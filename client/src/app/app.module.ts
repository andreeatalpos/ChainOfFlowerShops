import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider';
import {MatToolbarModule} from '@angular/material/toolbar'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';;
import {HttpClient, HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import {MatRadioModule} from '@angular/material/radio';
import { AdminComponent } from './admin/admin.component';
import { EmployeeComponent } from './employee/employee.component';
import {MatTableModule} from '@angular/material/table';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import { AddUserDialogComponent } from './add-user-dialog/add-user-dialog.component';
import {MatSelectModule} from '@angular/material/select';
import { AddFlowerDialogComponent } from './add-flower-dialog/add-flower-dialog.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {MatMenuModule} from '@angular/material/menu';
import { ChartComponent } from './chart/chart.component';
import {  HighchartsChartModule,HighchartsChartComponent } from 'highcharts-angular';
import { LanguageInterceptor } from './interceptors/language_interceptor';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    EmployeeComponent,
    AddUserDialogComponent,
    AddFlowerDialogComponent,
    ChartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule ,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    MatCardModule,
    MatSliderModule,
    MatToolbarModule,
    HttpClientModule,
    MatTableModule,
    MatSnackBarModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    MatMenuModule,
    HighchartsChartModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  })

  ],
  exports: [
    ChartComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LanguageInterceptor,
      multi:true
    },
    HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
