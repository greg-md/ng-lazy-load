# Image lazy loading for Angular2

[![npm version](https://badge.fury.io/js/%40greg-md%2Fng-lazy-load.svg)](https://badge.fury.io/js/%40greg-md%2Fng-lazy-load)
[![Build Status](https://travis-ci.org/greg-md/ng-lazy-load.svg?branch=master)](https://travis-ci.org/greg-md/ng-lazy-load)

Lazy loading images with Angular2.

# Table of contents:

* [Installation](#installation)
* [How It Works](#how-it-works)
* [Directive Attributes](#directive-attributes)
* [License](#license)
* [Huuuge Quote](#huuuge-quote)

# Installation

```bash
npm install @greg-md/ng-lazy-load --save
```

# How It Works

### Setting up in a module

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// 1. Import lazy loading module;
import { LazyLoadModule } from '@greg-md/ng-lazy-load';

import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    // 2. Register lazy loading module.
    LazyLoadModule,
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### Using in templates

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <img src="loading.jpg" gg-lazy-load="lazy-image.jpg" />
  `,
})
export class AppComponent { }
```

# Directive Attributes

## threshold

By default images are loaded when they appear on the screen.
If you want images to load earlier, use threshold parameter.
Setting threshold to 200 causes image to load 200 pixels before it appears on viewport.

_Example:_

```html
<img src="loading.jpg" gg-lazy-load="lazy-image.jpg" threshold="200" />
```

## container

You can also use directive for images inside scrolling container,
such as div with scrollbar. Just pass the container element.

_Example:_

```html
<div #container>
    <img src="loading.jpg" gg-lazy-load="lazy-image.jpg" [container]="container" />
</div>
```

# License

MIT © [Grigorii Duca](http://greg.md)

# Huuuge Quote

![I fear not the man who has practiced 10,000 programming languages once, but I fear the man who has practiced one programming language 10,000 times. #horrorsquad](http://greg.md/huuuge-quote-fb.jpg)
