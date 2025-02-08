import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideHttpClient } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from './environments/environment';


bootstrapApplication(AppComponent, {
  providers: [
    ...appConfig.providers,
    BrowserAnimationsModule,
    provideAuth(() => getAuth()),
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig))
  ]
}).catch((err) => console.error(err));