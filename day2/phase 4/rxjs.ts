// import { Observable } from 'rxjs';

// const greet = new Observable((subscriber) => {
//   // console.log('1');
//   subscriber.next('heelo');
//   subscriber.next('avinash');
//   subscriber.next('kumar');
//   subscriber.next('verma');
//   subscriber.complete();
// });

// function foo() {
//   return 'hello';
//   return 'avinash';
//   return 'kumar';
// }

// greet.subscribe((x) => {
//   console.log(x);
// });

// console.log(foo());

import { from } from 'rxjs';

const observable = from([10, 20, 30]);
const subscription = observable.subscribe((x) => console.log(x));
// Later:
subscription.unsubscribe();
