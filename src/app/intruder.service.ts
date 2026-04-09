import { Injectable } from '@angular/core';

export interface Intruder {
  alert: string;
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
      alert: '猫が侵入しました！',
      emoji: '🐱',
      message: '人類よ\n猫様に奉仕せよ',
      intrudeText: 'にゃーん（猫様通過）'
    },
    parakeet: {
      alert: 'インコが侵入しました！',
      emoji: '🦜' ,
      message: 'マウスの代わりに\n握られるのを待っている',
      intrudeText: 'ピピピ（インコが止まった）'
    },
    ninja: {
      alert: '忍者が侵入しました！',
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
      console.log(`${intruder.emoji} ${intruder.alert}\n${intruder.message}`);
      callback(intruder);
    }, 15000);
  }

  stopTimer(){
    clearInterval(this.timerId);
  }

}
