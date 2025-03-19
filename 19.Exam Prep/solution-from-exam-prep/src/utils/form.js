export function createSubmitHandler(callback) {
  return function (event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    callback(data, event.target);
  };
}
