/**
 * This is only for local test
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Component } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { LazyLoadModule }  from '@greg-md/ng-lazy-load';

@Component({
  selector: 'app',
  styles: [
    `
    img {
        background: gray;
        border: 1px solid red;
    }
    `
  ],
  template: `
    Hello<br />Hello<br />Hello<br />Hello<br />Hello<br />Hello<br />Hello<br />Hello<br />Hello<br />Hello<br />
    Hello<br />Hello<br />Hello<br />Hello<br />Hello<br />Hello<br />Hello<br />Hello<br />Hello<br />Hello<br />
    Hello<br />Hello<br />Hello<br />Hello<br />Hello<br />Hello<br />Hello<br />Hello<br />Hello<br />Hello<br />
    Hello<br />Hello<br />Hello<br />Hello<br />Hello<br />Hello<br />Hello<br />Hello<br />Hello<br />Hello<br />
    <div #container style="height: 300px; overflow: auto; background: lightblue;">
      <p><img lazy-load="http://lorempixel.com/400/200/?1" threshold="200" [container]="container"></p>
      <p><img lazy-load="http://lorempixel.com/400/200/?2" threshold="200" [container]="container"></p>
      <p><img lazy-load="http://lorempixel.com/400/200/?3" threshold="200" [container]="container"></p>
      <p><img lazy-load="http://lorempixel.com/400/200/?4" threshold="200" [container]="container"></p>
      <p><img lazy-load="http://lorempixel.com/400/200/?5" threshold="200" [container]="container"></p>
      <p><img lazy-load="http://lorempixel.com/400/200/?6" threshold="200" [container]="container"></p>
      <p><img lazy-load="http://lorempixel.com/400/200/?7" threshold="200" [container]="container"></p>
      <p><img lazy-load="http://lorempixel.com/400/200/?8" threshold="200" [container]="container"></p>
      <p><img lazy-load="http://lorempixel.com/400/200/?9" threshold="200" [container]="container"></p>
      <p><img lazy-load="http://lorempixel.com/400/200/?10" threshold="200" [container]="container"></p>
      <p><img lazy-load="http://lorempixel.com/400/200/?11" threshold="200" [container]="container"></p>
      <p><img lazy-load="http://lorempixel.com/400/200/?12" threshold="200" [container]="container"></p>
      <p><img lazy-load="http://lorempixel.com/400/200/?13" threshold="200" [container]="container"></p>
      <p><img lazy-load="http://lorempixel.com/400/200/?14" threshold="200" [container]="container"></p>
      <p><img lazy-load="http://lorempixel.com/400/200/?15" threshold="200" [container]="container"></p>
      <p><img lazy-load="http://lorempixel.com/400/200/?16" threshold="200" [container]="container"></p>
      <p><img lazy-load="http://lorempixel.com/400/200/?17" threshold="200" [container]="container"></p>
      <p><img lazy-load="http://lorempixel.com/400/200/?18" threshold="200" [container]="container"></p>
      <p><img lazy-load="http://lorempixel.com/400/200/?19" threshold="200" [container]="container"></p>
    </div>
    Hello<br />Hello<br />Hello<br />Hello<br />Hello<br />Hello<br />Hello<br />Hello<br />Hello<br />Hello<br />
    Hello<br />Hello<br />Hello<br />Hello<br />Hello<br />Hello<br />Hello<br />Hello<br />Hello<br />Hello<br />
    Hello<br />Hello<br />Hello<br />Hello<br />Hello<br />Hello<br />Hello<br />Hello<br />Hello<br />Hello<br />
    Hello<br />Hello<br />Hello<br />Hello<br />Hello<br />Hello<br />Hello<br />Hello<br />Hello<br />Hello<br />
  `
})
class AppComponent {}

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [ AppComponent ],
  imports: [ BrowserModule, LazyLoadModule ]
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
