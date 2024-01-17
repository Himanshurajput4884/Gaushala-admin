import React, { useEffect, useState } from "react";
import "./Gallery.css";
import axios from 'axios';
import GalleryImage from "./GalleryImage";
import {ToastContainer, toast} from "react-toastify";

const URL = `https://gaushala-backend.onrender.com`;

const Gallery = () => {
  const [formData, setFormData] = useState({
    image: null,
  });
  const [imageData, setImageData] = useState([]);
  const [changeInData, setChangeInData] = useState(false);

  useEffect(()=>{
    const getImageData = async()=>{
      try{
        const response = await axios.get(`${URL}/gallery/show/all`);
        if(response.status === 200 && (response.data.message==="Fetch All Image")){
          setImageData(response.data.galleryImages);
        }
      }
      catch(err){
        console.log("Error in fetching image: ", err);
      }
    }
    setChangeInData(false);
    getImageData();
  },[changeInData]);

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

      const response = await axios.post(`{URL}/gallery/add/new`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setChangeInData(true);
      toast.success("Image uploaded", {
        position:"top-right",
      })
      setFormData({
        image:null,
      })
      // console.log(response);
    } catch (err) {
      console.log("Error in sending image to backend: ", err);
      toast("Image uploading failed", {
        position:"top-right",
      })
    }
  };

  // console.log(imageData);

  return (
    <div className="gallery-container">
      <ToastContainer/>
      <div className="gallery-heading">
        <div className="gallery-head1">Gallery</div>
        <div className="gallery-head2">Welcome to our captivating Gallery Page, where the magic happens! As an admin, you have the power to curate this visual journey by effortlessly deleting outdated photos and seamlessly uploading new ones.</div>
      </div>
      <div className="gallery-outer-box">
          <div className="gallery-form">
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              placeholder="username"
            />
            <button onClick={handleSubmitForm}> Upload Image </button>
          </div>
        </div>
        <div className="gallery-content-show">
          <div className="gallery-content">
              {
                imageData.map((image, index) => (
                  <div key={index} className="gallery-image-outer-card">
                    <GalleryImage image={image} setChangeInData={setChangeInData}/>
                  </div>
                ))
              }
          </div>
        </div>
    </div>
  );
};

export default Gallery;
