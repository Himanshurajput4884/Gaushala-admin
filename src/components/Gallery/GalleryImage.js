import React from "react";
import axios from "axios";
import "./Gallery.css";
const URL = `https://gaushala-backend.onrender.com`;

const GalleryImage = ({ image, setChangeInData }) => {
  console.log(image);

  const id = image.imageId;
  const handleDelete = async () => {
    try {
        const token = localStorage.getItem("token");
      const response = await axios.delete(`${URL}/gallery/delete?id=${id}`, {
        headers:{
            Authorization:`Bearer ${token}`,
        }
      });

      if (response.status === 200 && response.data.message === "Image Deleted") {
        setChangeInData(true);
      } else {
        console.error("Failed to delete image:", response.data.message);
      }
    } catch (err) {
      console.log(`Error in deleting image ${id}: `, err);
    }
  };

  return (
    <div className="gallery-image-inner-card">
      <div className="gallery-image-card-image">
        <img src={image.imageUrl} alt="Gallery" />
      </div>
      <div className="gallery-image-card-button">
        <button onClick={handleDelete}> Delete </button>
      </div>
    </div>
  );
};

export default GalleryImage;
