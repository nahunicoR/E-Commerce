import axios from "axios";

const upImage = async (files) => {
  let file = files[0];
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "dzux3ynpe");

  axios.post(
    "https://api.cloudinary.com/v1_1/dzux3ynpe/image/upload",
    formData.then((response) => {console.log(response.json(), " soy response")})
  );
};
export default upImage;
