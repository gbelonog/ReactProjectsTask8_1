
export function getBase64(file){//}, onSuccess = () => {}, onError = () => {}) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      //onSuccess(reader.result);
      resolve(reader.result);
    };
    reader.onerror = function (error) {
      //onError(error);
      reject(error);
    };
  })

}