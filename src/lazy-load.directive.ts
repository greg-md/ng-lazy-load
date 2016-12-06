import {Directive, OnInit, HostBinding, Input, ElementRef, AfterViewInit} from '@angular/core';

import { inViewport } from './lazy-load.utils';

@Directive({
  selector: '[gg-lazy-load]',
})
export class LazyLoadDirective implements OnInit, AfterViewInit {
  @HostBinding('src') @Input() src: string;

  @Input('gg-lazy-load') lazySrc: string;

  @Input() threshold: number = 0;

  @Input() container: HTMLElement | Window;

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    // Int fix.
    this.threshold = parseInt(this.threshold + '');
  }

  ngAfterViewInit() {
    this.initLazyLoad();
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
      let img = document.createElement('img');

      img.onload = () => {
        this.src = this.lazySrc;
      };

      img.src = this.lazySrc;
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
