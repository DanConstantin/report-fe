import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild} from '@angular/core';
import {faBullseye, faCapsules, faClock, faMinus, faPlus} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {
  faBullseye = faBullseye;
  faClock = faClock;
  faCapsules = faCapsules;
  faPlus = faPlus;
  faMinus = faMinus;
  sections = [true, true, true];

  @ViewChild("youTubePlayer") youTubePlayer: ElementRef<HTMLDivElement> | undefined;

  videoHeight: number | undefined;
  videoWidth: number | undefined;
  videoId  = 'QqkVtciJk5o';

  constructor(private changeDetectorRef: ChangeDetectorRef) {
  }

  ngAfterViewInit(): void {
    this.onResize();
    window.addEventListener("resize", this.onResize.bind(this));
  }

  onResize(): void {
    // you can remove this line if you want to have wider video player than 1200px
    this.videoWidth = Math.min(
      this.youTubePlayer!.nativeElement.clientWidth,
      3000
    );
    // so you keep the ratio
    this.videoHeight = this.videoWidth * 0.6;
    this.changeDetectorRef.detectChanges();
  }

  public collapse(index: number) {
    this.sections.forEach((section, i) => {
      if (i === index) {
        this.sections[i] = !section;
      } else {
        this.sections[i] = true;
      }
    });
  }
}
