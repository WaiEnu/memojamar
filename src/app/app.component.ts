import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Intruder, IntruderService } from './intruder.service';
import { MemoService } from './memo.service';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit, OnDestroy {

  constructor(private intruderService: IntruderService, private memoService: MemoService) {
  }

  protected readonly title = signal('memojamar');
  content: string = '';
  currentIntruder: Intruder | null = null;

  ngOnInit(): void {
    this.content = this.memoService.load();
    this.intruderService.startTimer((intruder)=>this.setIntruderCallback(intruder));
  }

  private setIntruderCallback(intruder: Intruder):void {
    this.currentIntruder = intruder;
  }

  saveText() {
    this.memoService.save(this.content);
  }

  dismiss() {
    this.content += `\n${this.currentIntruder?.intrudeText}`;
    this.memoService.save(this.content);
    this.currentIntruder = null;
    this.intruderService.startTimer((intruder)=>this.setIntruderCallback(intruder));
  }

  ngOnDestroy(){
    this.intruderService.stopTimer();
  }
}

