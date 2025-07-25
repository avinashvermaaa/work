import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appHighlightStatus]'
})
export class HighlightStatusDirective implements OnChanges {
  @Input('appHighlightStatus') status: string = '';

  constructor(private readonly el: ElementRef, private readonly renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    const element = this.el.nativeElement;
    
    // Paid Status
    switch(this.status){
      case 'Paid' : this.renderer.addClass(element, 'paid-status'); break;
      case 'Unpaid' : this.renderer.addClass(element, 'unpaid-status'); break;
    }

    // Payment Method
    switch(this.status){
      case 'Cash' : this.renderer.addClass(element, 'cash-status'); break;
      case 'Card' : this.renderer.addClass(element, 'card-status'); break;
      case 'Crypto' : this.renderer.addClass(element, 'crypto-status'); break;
      case 'UPI' : this.renderer.addClass(element, 'UPI-status'); break;
      case 'Net Banking' : this.renderer.addClass(element, 'Bank-status'); break;
    }

    // Applied theme Status
    switch(this.status){
      case 'Active' : this.renderer.addClass(element, 'Active-status'); break;
      case 'Inactive' : this.renderer.addClass(element, 'Inactive-status'); break;
    }

    // this.renderer.setStyle(element, 'padding', '6px 14px');
  }
}
