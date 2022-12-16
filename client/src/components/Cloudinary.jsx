export async function Cloudinary(files) {
    const file = files;
    console.log(file + "file")
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "preset");
    let myHeaders = new Headers();
    let options = {
      method: "POST",
      body: formData,
      headers:myHeaders,
      mode: "cors",
      cache: "default"
    };
  
    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/drj6s1st9/image/upload",
        options
      );
      const data = await res.json();
      console.log("data")
      return data;
    } catch (error) {
      return new Error(
        "Error al cargar imagen")
    }
  }
  
  
  //   await axios.post(
  //     "https://api.cloudinary.com/v1_1/drj6s1st9/image/upload",
  //     formData
  //     .then((response) => {console.log(response.json(), " soy response")})
  //     .catch(err => console.log(err))
  //   );
  // };