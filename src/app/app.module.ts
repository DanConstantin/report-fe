import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {CoreModule} from './core/core.module';
import {YouTubePlayerModule} from '@angular/youtube-player';
import {HomeComponent} from './pages/home/home.component';
import {TrialComponent} from './pages/trial/trial.component';
import {LoginComponent} from './pages/login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {tokenIntercept} from './core/interceptors/token.interceptor';
import {errorInterceptor} from './core/interceptors/error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TrialComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    CoreModule,
    YouTubePlayerModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideHttpClient(withInterceptors([tokenIntercept, errorInterceptor])),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
