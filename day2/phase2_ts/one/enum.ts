enum Direction {
  Up,    // 0
  Down,  // 1
  Left,  // 2
  Right  // 3
}

let dir: Direction = Direction.Left;
console.log(dir); // 2


enum StatusCode {
  OK = 200,
  NotFound = 404,
  ServerError = 500
}
let sts: StatusCode = StatusCode.OK;
console.log(sts); // 200

let arr : number[] = [1, 2, 3, 4, 5];
console.log(arr.length)