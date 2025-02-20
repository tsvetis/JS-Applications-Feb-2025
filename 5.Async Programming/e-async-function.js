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

async function groupProposal() {
  console.log("[INNER] Before proposal");
  try {
    const result = await proposal();
    console.log({ result });
    console.log("[INNER] After proposal");
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

console.log("[OUT-SCOPE] Before GROUP proposal");
groupProposal();
console.log("[OUT-SCOPE] After GROUP proposal");
