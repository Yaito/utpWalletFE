import { Directive, HostListener, Output, EventEmitter, Input } from '@angular/core';

const rotate  = { asc: 'desc', desc: '', '': 'asc' };

@Directive({
  selector: '[appTableSortable]'
})
export class TableSortableDirective {

  @Input('appTableSortable') sortField: string;
  @Input() direction = '';
  @Output() sort = new EventEmitter<any>();

  constructor() { }

  @HostListener('click') onClick() {
    console.log('clicked');
    this.direction = rotate[this.direction];
    this.sort.emit({direction: this.direction, field: this.sortField});
  }

}
