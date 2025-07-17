import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appHighlightStatus]'
})
export class HighlightStatusDirective implements OnChanges {
  @Input('appHighlightStatus') status: string = '';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    const element = this.el.nativeElement;
    
    // Reset classes
    this.renderer.removeClass(element, 'paid-status');
    this.renderer.removeClass(element, 'unpaid-status');

    if (this.status === 'Paid') {
      this.renderer.addClass(element, 'paid-status');
    } else if (this.status === 'Failed') {
      this.renderer.addClass(element, 'unpaid-status');
    }

    // Add button padding always
    this.renderer.setStyle(element, 'padding', '6px 14px');
  }
}
