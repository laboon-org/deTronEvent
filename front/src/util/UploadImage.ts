import axios from 'axios';
export default async (e:File):Promise<string> => {
    const formData = new FormData();
    formData.append("file", e);
    const result= await axios
      .post("https://ntsapiv3.herokuapp.com/uploadfile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    return result.data.image_link
  };