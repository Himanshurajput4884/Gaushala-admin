import React, { useState } from "react";
import "./Gallery.css";
import axios from 'axios';

const Gallery = () => {
  const [formData, setFormData] = useState({
    image: null,
  });

  const handleImageChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  const handleSubmitForm = async () => {
    if (!formData.image) {
      alert("Upload an image");
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("image", formData.image);

      const response = await axios.post("http://localhost:8008/gallery/add/new", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response);
    } catch (err) {
      console.log("Error in sending image to backend: ", err);
    }
  };

  return (
    <div>
      <h1> Gallery </h1>
      <div className="galleryFormClass">
        <label htmlFor="imageInput"> Choose an image </label>
        <input type="file" name="image" accept="image/*" onChange={handleImageChange} />
        <div className="galleryFormButton">
          <button onClick={handleSubmitForm}> Submit </button>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
