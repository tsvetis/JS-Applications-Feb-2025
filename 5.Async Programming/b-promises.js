function proposal() {
  const promise = new Promise((resolve, reject) => {
    console.log("Will you marry me?");

    setTimeout(() => {
      if (Math.random() < 0.5) {
        resolve("Yess, yess, yess!");
      } else {
        reject("No, its not you, its me!");
      }
    }, 3650);
  });

  return promise;
}

// const p = proposal();

// p.then((result) => {
//   console.log(result);
// }).catch((error) => {
//   console.log(error);
// });

// Promise.all
const firstProposal = proposal();
const secondProposal = proposal();
const thirdProposal = proposal();
const fourthProposal = proposal();

// Resolves only if all promises resolves
const groupProposal = Promise.all([
  firstProposal,
  secondProposal,
  thirdProposal,
  fourthProposal,
]);

groupProposal
  .then((results) => {
    console.log(results);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    console.log("I da padnem i da biem...");
  });

// AllSettled
// const groupProposalSettled = Promise.allSettled([
//   firstProposal,
//   secondProposal,
//   thirdProposal,
//   fourthProposal,
// ]);

// groupProposalSettled
//   .then((results) => {
//     console.log(results);
//   })
//   .catch((err) => {
//     console.log(err);
//   })
//   .finally(() => {
//     console.log("I da padnem i da biem...");
//   });
