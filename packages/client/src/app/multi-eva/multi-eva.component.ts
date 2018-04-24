import { Component, OnInit, ViewChild, Input, Output, EventEmitter, HostListener, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { SatPopover } from '@ncstate/sat-popover';

@Component({
  selector: 'app-multi-eva',
  templateUrl: './multi-eva.component.html',
  styleUrls: ['./multi-eva.component.scss']
})
export class MultiEvaComponent implements OnInit {
  @ViewChild('popover') popover: SatPopover;
  @ViewChildren('mevaPopover') mevaPopover: QueryList<SatPopover>;
  @HostListener('document:click', ['$event']) clickedOutside($event) {
    if (this.popover && this.popover.isOpen()) {
      this.popover.close();
    }
    this.mevaPopover.forEach((popover) => popover.close());
  }
  
  @Input() instance;
  @Input() column;

  @Output() popoverOpen = new EventEmitter(); 

  constructor() { }

  ngOnInit() {
    console.log(this.instance, this.column);
  }

  popoverClick (e: MouseEvent) {
    e.stopPropagation();
  }

  open (e: MouseEvent) {
    e.stopPropagation();
    this.popover.toggle();
    if (this.popover.isOpen()) {
      this.popoverOpen.emit(null);
    }
  }
  
  openEva (e: MouseEvent, popover: SatPopover) {
    e.stopPropagation();
    popover.toggle();
    if (this.popover.isOpen) {
      this.mevaPopover
        .filter(item => item !== popover)
        .forEach((item) => item.close());
    }
  }


  close () {
    this.popover.close();
  }
}
