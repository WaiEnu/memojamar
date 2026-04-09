import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MemoService {
  private key = 'memo-jamer-content';

  load(){
    const savedMemo = localStorage.getItem(this.key);
    return savedMemo ? savedMemo : '';
  }

  save(memo: string){
    localStorage.setItem(this.key, memo);
  }

}
