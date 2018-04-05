import {
  Directive,
  OnInit,
  HostBinding,
  Input,
  ElementRef,
  Renderer2,
  OnDestroy,
  PLATFORM_ID,
  Inject, AfterContentInit
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { inViewport } from './lazy-load.utils';

@Directive({
  selector: 'img[lazy-load]',
})
export class LazyLoadDirective implements OnInit, OnDestroy, AfterContentInit {
  @HostBinding('src') @Input() src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

  @HostBinding('style.background-image') backgroundImage: string;
  @HostBinding('style.background-position') backgroundPosition: string;
  @HostBinding('style.background-size') backgroundSize: string;

  @Input('lazy-load') lazySrc: string;

  @Input('bg-src') bgSrc: string;

  private _threshold = 0;

  @Input()
  set threshold(position: number) {
    this._threshold = parseInt(this.threshold + '', 10);
  }

  get thresold(): number {
    return this._threshold;
  }

  @Input() container: HTMLElement;

  scrollUnload: () => void;
  containerScrollUnload: () => void;
  resizeUnload: () => void;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: string
  ) {
  }

  ngOnInit() {
    this.initBgSrc();

    this.initEvents();
  }

  ngAfterContentInit() {
    this.tryLoading();
  }

  ngOnDestroy() {
    this.unloadListeners();
  }

  initBgSrc() {
    if (this.bgSrc) {
      this.backgroundImage = 'url(' + this.bgSrc + ')';

      this.backgroundPosition = 'center center';

      this.backgroundSize = 'cover';
    }
  }

  initEvents() {
    this.scrollUnload = this.renderer.listen('window', 'scroll', () => {
      this.tryLoading();
    });

    if (this.container) {
      this.containerScrollUnload = this.renderer.listen(this.container, 'scroll', () => {
        this.tryLoading();
      });
    }

    this.resizeUnload = this.renderer.listen('window', 'resize', () => {
      this.tryLoading();
    });
  }

  tryLoading() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    if (this.container && inViewport(this.container, {threshold: this.threshold})) {
      this.tryImgLoading();
    } else if (!this.container) {
      this.tryImgLoading();
    }
  }

  tryImgLoading() {
    const inWindowViewport = this.container ? inViewport(this.elementRef.nativeElement, {threshold: this.threshold}) : false;
    const inContainerViewport = inViewport(this.elementRef.nativeElement, {threshold: this.threshold, container: this.container});

    if (inWindowViewport && inContainerViewport) {
      console.log('in viewport', this.container);
      this.load();

      this.unloadListeners();
    }
  }

  load() {
    if (this.bgSrc) {
      this.src = this.lazySrc;
    } else {
      let img: HTMLImageElement = this.renderer.createElement('img');

      img.onload = () => {
        this.src = this.lazySrc;
      };

      img.src = this.lazySrc;
    }
  }

  unloadListeners() {
    if (this.scrollUnload) {
      this.scrollUnload();
    }

    if (this.containerScrollUnload) {
      this.containerScrollUnload();
    }

    if (this.resizeUnload) {
      this.resizeUnload();
    }
  }
}
