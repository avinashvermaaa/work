"use strict";
// import { Observable } from 'rxjs';
Object.defineProperty(exports, "__esModule", { value: true });
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
var rxjs_1 = require("rxjs");
var observable = (0, rxjs_1.from)([10, 20, 30]);
var subscription = observable.subscribe(function (x) { return console.log(x); });
// Later:
subscription.unsubscribe();
