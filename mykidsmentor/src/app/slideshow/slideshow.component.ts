import { Component, OnInit, ViewChild ,ElementRef,HostListener, Input, OnChanges, SimpleChanges} from '@angular/core';
import {BreakpointObserver, Breakpoints, BreakpointState} from '@angular/cdk/layout';


@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit, OnChanges {

  @Input() courses:any;
  @ViewChild('slideshow',{static: true}) slideshow: ElementRef |undefined;
  @ViewChild('track',{static: true}) track: ElementRef|undefined;

  @HostListener('window:resize',['$event']) onResize(event:any){
    this.initSlideshow();
    this.toSlide(this.idx);
  }
  slideWidth:number=0;
  trackWidth:number=0;
  offsetWidth:number=0;
  numVideoShow:number=4;
  videoSize:number=340;
  numNavBtn:number = 0;
  idx:number = 0;
  videoMargin:number=30;
  curVideo:number= 0; //first video of current slideshow

  //Images Src
  arrowLeftSrc = "../assets/img/btnArrowLeft.svg";
  arrowRightSrc = "../assets/img/btnArrowRight.svg";

  //Breakpoints
  xs:boolean = false; //320
  sm:boolean = false; //480
  md:boolean = false; //768
  lg:boolean = false; //1024
  xl:boolean = false; //1440
  xlmore:boolean = false; // >= 1024 

  constructor(private breakpointObserver:BreakpointObserver) { //1440 / 1024 / 768 / 480 / 300

  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  ngOnInit(): void {
    this.breakpointObserver
    .observe(['(min-width: 1024px)',
              '(max-width: 1440px)',
              '(max-width: 1024px)',
              '(max-width: 768px)',
              '(max-width: 650px)',
              '(max-width: 320px)'])
    .subscribe((state:BreakpointState)=>{
      this.xlmore = state.breakpoints['(min-width: 1024px)']
      this.xl = state.breakpoints['(max-width: 1440px)'];
      this.lg = state.breakpoints['(max-width: 1024px)'];
      this.md = state.breakpoints['(max-width: 768px)'];
      this.sm = state.breakpoints['(max-width: 650px)'];
      this.xs = state.breakpoints['(max-width: 320px)'];

      if (this.xs || this.sm) {
        this.numVideoShow=1;
        this.videoMargin= 16;
        // this.videoSize = 240;
      }
      else if (this.md || this.lg){
        this.numVideoShow=2;
        this.videoMargin= 16;
      } else {
        this.numVideoShow=3;
        this.videoMargin= 23.99;
      }
      this.initSlideshow();
      this.idx = Math.floor(this.curVideo/this.numVideoShow);
    });

  }
  initSlideshow(){
    if(this.slideshow && this.track){
      this.slideWidth = this.slideshow.nativeElement.offsetWidth;
      this.videoSize =  (this.slideWidth-(this.numVideoShow+1)*this.videoMargin)/this.numVideoShow;
      this.trackWidth = this.track.nativeElement.offsetWidth;
      this.numNavBtn = Math.ceil(this.courses.length/this.numVideoShow);
      //console.log(this.videoSize,this.trackWidth,this.slideWidth);
    }
  }
  getMaxIdx(track_width:number,slide_width:number){
    return  Math.ceil(track_width/slide_width)-1;
  }
  scrollLeft(){
    this.moveTo(this.idx -1);
  }
  scrollRight(){
    this.moveTo(this.idx + 1);
  }
  moveTo(index:number){
    if(index>=0 && index<this.numNavBtn){
      this.curVideo = this.numVideoShow * index;
      this.toSlide(index);
    }
  }

  toSlide(index:number){

      if(this.track && this.slideshow){
        /*this.initSlideshow();*/
        this.idx = index;
        this.offsetWidth =  (this.slideWidth-this.videoMargin)*this.idx;
        this.track.nativeElement.style.transform = "translateX(-"+this.offsetWidth.toString()+"px)";
      }

  }

}
