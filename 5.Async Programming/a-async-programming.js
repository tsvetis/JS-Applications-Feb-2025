// Synchronous code
console.log(1);
console.log(2);
console.log(3);
console.log(4);

// Callback Async code
console.log("Before");
setTimeout(() => {
  console.log("Middle");
}, 0);
console.log("After");
