import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedService } from './shared.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import {DataTablesModule} from 'angular-datatables';
import { MatFileUploadModule } from '@martyganz/mat-file-upload'
import  {  PdfViewerModule  }  from  'ng2-pdf-viewer';
import { NgxChartsModule } from '@swimlane/ngx-charts';


import { AuthModule } from '@auth0/auth0-angular';
import { environment as env } from '../environments/environment'

// ---------------------------MDB UI Modules ----------------------------------

import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { MdbPopoverModule } from 'mdb-angular-ui-kit/popover';
import { MdbRadioModule } from 'mdb-angular-ui-kit/radio';
import { MdbRangeModule } from 'mdb-angular-ui-kit/range';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbScrollspyModule } from 'mdb-angular-ui-kit/scrollspy';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { MdbTooltipModule } from 'mdb-angular-ui-kit/tooltip';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';

import { NgxPopper } from 'angular-popper';


// ---------------------------Angular UI Modules ----------------------------------

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { CdkTableModule } from '@angular/cdk/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {OverlayModule} from '@angular/cdk/overlay';

// ---------------------------Components ----------------------------------

import { ModalComponent } from './components/modal/modal.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginButtonComponent } from './components/login-button/login-button.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { LogoutButtonComponent } from './components/logout-button/logout-button.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LandingComponent } from './components/homepage/landing/landing.component';
import { UserscreenComponent } from './components/homepage/userscreen/userscreen.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { CoursesComponent } from './components/courses/courses.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegPageComponent } from './components/courses/reg-page/reg-page.component';
import { CourseListComponent } from './components/courses/course-list/course-list.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { DataTableComponent } from './components/courses/course-list/data-table/data-table.component';
import { NewAssignmentComponent } from './components/courses/course-list/new-assignment/new-assignment.component';
import { AssgnViewComponent } from './components/courses/course-list/data-table/assgn-view/assgn-view.component';
import { SubmissionViewComponent } from './components/courses/course-list/data-table/submission-view/submission-view.component';



@NgModule({
  declarations: [
    AppComponent,
    ModalComponent,
    HomepageComponent,
    LoginButtonComponent,
    NavBarComponent,
    LogoutButtonComponent,
    LoadingComponent,
    ProfileComponent,
    LandingComponent,
    UserscreenComponent,
    SidenavComponent,
    CoursesComponent,
    DashboardComponent,
    RegPageComponent,
    CourseListComponent,
    UserProfileComponent,
    DataTableComponent,
    NewAssignmentComponent,
    AssgnViewComponent,
    SubmissionViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MdbAccordionModule,
    MdbCarouselModule,
    MdbCheckboxModule,
    MdbCollapseModule,
    MdbDropdownModule,
    MdbFormsModule,
    MdbModalModule,
    MdbPopoverModule,
    MdbRadioModule,
    MdbRangeModule,
    MdbRippleModule,
    MdbScrollspyModule,
    MdbTabsModule,
    MdbTooltipModule,
    MdbValidationModule,
    BrowserAnimationsModule,
    OverlayModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDividerModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    AuthModule.forRoot({
      ...env.auth,
    }),
    MatTableModule,
    CdkTableModule,
    MatPaginatorModule,
    MatSortModule,
    DataTablesModule,
    PdfViewerModule,
    MatExpansionModule,
    NgxChartsModule,
    NgxPopper
  ],
  providers: [SharedService,DatePipe],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
