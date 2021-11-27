import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-floating-timer',
  templateUrl: './floating-timer.component.html',
  styleUrls: ['./floating-timer.component.scss']
})
export class FloatingTimerComponent implements OnInit {
  hours!: number;
  minutes!: number;
  seconds!: number;
  
  TimeOut?: any;
  isActive?: boolean;

  constructor() { }
  ngOnInit(): void {
    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0;
  }

  playTimer() {
    this.isActive = true;
    this.setTimer();
  }

  pauseTimer() {
    this.isActive = false;
    this.unSetTimer();
  }

  stopTimer() {
    this.isActive &&
    (this.pauseTimer(),
    this.hours = 0,
    this.minutes = 0,
    this.seconds = 0)
  }

  submitTimer() {
    console.log(`${this.hours}:${this.minutes}:${this.seconds}`)
  }

  updateTimer() {
    if (this.isActive) {
      this.seconds == 59 ?
      (this.minutes == 59 ? (this.hours++, this.minutes = 0) : this.minutes++):
      (this.seconds++);
      this.setTimer();
    }
  }

  formatTime(timeFrame: number) {
    return timeFrame.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false
    })
  }

  setTimer() {
    this.TimeOut = setTimeout(() => this.updateTimer(), 1000);
  }

  unSetTimer() {
    clearTimeout(this.TimeOut)
  }
}
