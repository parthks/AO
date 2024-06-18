export const PROCESS_ID = "NJa2cC8gYN9riAvrPFoMuDUbhyV3y4kf7woeGKdFEgg";

export function convertToBase64(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      const reader = new FileReader();
      reader.onloadend = function () {
        resolve(reader.result as string);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.onerror = function () {
      reject(new Error("Failed to convert image to base64"));
    };
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.send();
  });
}
