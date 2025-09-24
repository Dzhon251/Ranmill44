import { bootstrapApplication } from '@angular/platform-browser';
import { ComponenteApp } from './app/app.component';
import { config } from './app/app.config.server';



const bootstrap = () => bootstrapApplication(ComponenteApp, config);

export default bootstrap;
