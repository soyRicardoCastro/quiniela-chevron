export const convertBase64 = (file: any) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};
// @ts-ignore
export const handleImage = (e) => {
  const file = e.target.files[0]
  const base = setFileToBase(file)
  return base
}
// @ts-ignore
const setFileToBase = (file) => {
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onloadend = () => reader.result
}