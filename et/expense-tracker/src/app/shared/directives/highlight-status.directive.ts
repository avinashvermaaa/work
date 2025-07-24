import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appHighlightStatus]'
})
export class HighlightStatusDirective implements OnChanges {
  @Input('appHighlightStatus') status: string = '';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    const element = this.el.nativeElement;
    
    this.renderer.removeClass(element, 'paid-status');
    this.renderer.removeClass(element, 'unpaid-status');

    this.renderer.removeClass(element, 'crypto-status');
    this.renderer.removeClass(element, 'cash-status');

    // Paid Status
    if (this.status === 'Paid') {
      this.renderer.addClass(element, 'paid-status');
    } else if (this.status === 'Unpaid') {
      this.renderer.addClass(element, 'unpaid-status');
    }

    // Payment Method
    if (this.status === 'Crypto') {
      this.renderer.addClass(element, 'crypto-status');
    } else if (this.status === 'Cash') {
      this.renderer.addClass(element, 'cash-status');
    } else if (this.status === 'Card') {
      this.renderer.addClass(element, 'card-status');
    } else if (this.status === 'UPI') {
      this.renderer.addClass(element, 'UPI-status');
    } else if (this.status == 'Bank Transfer') {
      this.renderer.addClass(element, 'Bank-status');
    }

    // Applied theme Status
    if (this.status === 'Active') {
      this.renderer.addClass(element, 'Active-status');
    } else if (this.status === 'Inactive') {
      this.renderer.addClass(element, 'Inactive-status');
    }

    this.renderer.setStyle(element, 'padding', '6px 14px');
  }
}
