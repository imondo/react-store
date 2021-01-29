import {observable, action, computed, makeAutoObservable, makeObservable } from 'mobx';

const store = makeObservable(
  {
    count: 0,
    get double() {
      return this.count * 2;
    },
    addCount() {
      this.count += 1;
    },
    subCount() {
      this.count -= 1;
    }
  },
  {
    count: observable,
    double: computed,
    addCount: action,
    subCount: action
  }
)

// class Store {
//   constructor() {
//     makeAutoObservable(this)
//   }
//   count = 0
//   get double() {
//     return this.count * 2;
//   }
//   addCount() {
//     this.count += 1;
//   }
//   subCount() {
//     this.count -= 1;
//   }
  
// }

// export default new Store()
export default store

// class Store {
     // 可以使用装饰器模式
//   @observable
//   count = 0;
//   @action
//   handleCount() {
//     this.count += 1;
//   }
// }

// export default new Store();
