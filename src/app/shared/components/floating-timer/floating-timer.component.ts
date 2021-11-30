import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-floating-timer',
  templateUrl: './floating-timer.component.html',
  styleUrls: ['./floating-timer.component.scss'],
})
export class FloatingTimerComponent implements OnInit {
  hours!: number;
  minutes!: number;
  seconds!: number;

  TimeOut?: any;
  isActive?: boolean;

  constructor() {}
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
    this.clearTimer();
  }

  stopTimer() {
    this.pauseTimer();
    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0;
  }

  submitTimer() {
    console.log({
      hours: this.hours,
      minutes: this.minutes,
      seconds: this.seconds,
    });
  }

  updateTimer() {
    if (this.isActive) {
      this.seconds == 59
        ? this.minutes == 59
          ? (this.hours++, this.minutes = 0)
          : (this.minutes++, this.seconds = 0)
        : this.seconds++;
      this.setTimer();
    }
  }

  formatTime(timeFrame: number) {
    return timeFrame.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
  }

  setTimer() {
    this.TimeOut = setTimeout(() => this.updateTimer(), 1000);
  }

  clearTimer() {
    clearTimeout(this.TimeOut);
  }
}
