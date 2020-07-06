import { Component, AfterViewInit, Input, ViewChild,  ElementRef, Renderer2 } from "@angular/core";

@Component({
  selector: 'app-expand',
  templateUrl: './expand.component.html',
  styleUrls: ['./expand.component.scss'],
})
export class ExpandComponent implements AfterViewInit  {
  @ViewChild("expandWrapper", { read: ElementRef }) expandWrapper: ElementRef;
  @Input("expanded") expanded: boolean = false;
  @Input("expandHeight") expandHeight: string = "10000px";

  constructor(public renderer: Renderer2) {}

  ngAfterViewInit() {
    this.renderer.setStyle(this.expandWrapper.nativeElement, "max-height", this.expandHeight);
    setTimeout(() => {
      // console.log(this.expandWrapper.nativeElement.scrollHeight);
      this.renderer.setStyle(this.expandWrapper.nativeElement, "max-height", this.expandWrapper.nativeElement.scrollHeight+'px');
      // this.expandHeight = '';
    }, 500);
  }

}
