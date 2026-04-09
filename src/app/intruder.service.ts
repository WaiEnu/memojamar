import { Injectable } from '@angular/core';

export interface Intruder {
  emoji: string;
  message: string;
  intrudeText: string;
}

export interface IntruderInfo {
  [key: string]: Intruder;
}

@Injectable({
  providedIn: 'root',
})
export class IntruderService {

  private intruder:IntruderInfo={
    cat: {
      emoji: '🐱',
      message: '人類よ、猫様に奉仕せよ',
      intrudeText: 'にゃーん（猫様通過）'
    },
    parakeet: {
      emoji: '🦜' ,
      message: 'マウスの代わりに握られるのを待っている',
      intrudeText: 'ピピピ（インコが止まった）'
    },
    ninja: {
      emoji: '🥷',
      message: '切り捨て御免',
      intrudeText: '───ﾊﾞｻｯ（忍者が通り過ぎた）'
    }
  }

  timerId: number = 0;

  startTimer(callback: (intruder: Intruder) => void) {
    this.timerId = setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * Object.keys(this.intruder).length);
      const intruderName = Object.keys(this.intruder)[randomIndex];
      const intruder = this.intruder[intruderName as keyof typeof this.intruder];
      console.log(`${intruder.emoji} ${intruderName}が侵入しました！\n${intruder.message}`);
      callback(intruder);
    }, 15000);
  }

  stopTimer(){
    clearInterval(this.timerId);
  }

}
