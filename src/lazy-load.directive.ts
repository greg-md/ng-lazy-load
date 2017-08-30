import {Directive, OnInit, HostBinding, Input, ElementRef, AfterViewInit, OnDestroy} from '@angular/core';

import { inViewport } from './lazy-load.utils';

@Directive({
  selector: '[gg-lazy-load]',
})
export class LazyLoadDirective implements OnInit, AfterViewInit, OnDestroy {
  @HostBinding('src') @Input() src: string;

  @HostBinding('style.background-image') backgroundImage: string;
  @HostBinding('style.background-position') backgroundPosition: string;

  @Input('gg-lazy-load') lazySrc: string;

  @Input('bg-src') bgSrc: string;

  @Input() threshold: number = 0;

  @Input() container: HTMLElement | Window;

  loaded: boolean = false;

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    // Int fix.
    this.threshold = parseInt(this.threshold + '');

    if (!this.src) {
      this.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    }

    if (this.bgSrc) {
      this.backgroundImage = 'url(' + this.bgSrc + ')';

      this.backgroundPosition = 'center center';
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.initLazyLoad();
    });
  }

  initLazyLoad() {
    if (window) {
      window.addEventListener('scroll', this.tryLoading);
      window.addEventListener('resize', this.tryLoading);

      this.tryLoading();
    }
  }

  load() {
    if (document) {
      if (this.bgSrc) {
        this.src = this.lazySrc;
      } else {
        let img = document.createElement('img');

        img.onload = () => {
          this.src = this.lazySrc;
          this.loaded = true;
        };

        img.src = this.lazySrc;
      }
    }
  }

  ngOnDestroy() {
    if (window && !this.loaded) {
      window.removeEventListener('scroll', this.tryLoading);
      window.removeEventListener('resize', this.tryLoading);
    }
  }

  tryLoading = () => {
    if (inViewport(this.elementRef.nativeElement, {threshold: this.threshold, container: this.container})) {
      this.load();

      window.removeEventListener('scroll', this.tryLoading);
      window.removeEventListener('resize', this.tryLoading);
    }
  };
}
