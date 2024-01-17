import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Activities.css";
import Activity from "./Activity";
import {ToastContainer, toast} from "react-toastify";

const URL = `https://gaushala-backend.onrender.com`;

const Activities = () => {
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    desc: "",
    image: null,
  });

  const [blogData, setBlogData] = useState([]);
  const [changeInActivity, setChangeInActivity] = useState(false);

  useEffect(()=>{
    const getBlogData = async()=>{
        try{
            const response = await axios.get(`${URL}/activity/show/all`);
            if(response.status === 200 && (response.data.message === "Fetch All blogs")){
                // console.log(response);
                setBlogData(response.data.blogs);
            }
        }
        catch(err){
            console.log("Error in fetching blogs: ", err);
        }
    }
    setChangeInActivity(false);
    getBlogData();
    
  },[changeInActivity]);

  const handleImageChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitForm = async () => {
    if (
      !formData.title ||
      !formData.subtitle ||
      !formData.desc ||
      formData.image == null
    ) {
      alert("Fill all the fields");
      return;
    }
    console.log(formData);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("subtitle", formData.subtitle);
      formDataToSend.append("desc", formData.desc);
      formDataToSend.append("image", formData.image);

      const response = await axios.post(
        `${URL}/activity/add/new`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

    //   console.log(response.data);
      setChangeInActivity(true);
      toast.success("Blog Uploaded", {
        position:"top-right",
      })
      setFormData({
        title: "",
        subtitle: "",
        desc: "",
        image: null,
      })
    } catch (err) {
      toast.error("Blog uploading falied", {
        position:"top-right",
      })
      console.log("Error in uploading blog: ", err);
      return;
    }
  };

  console.log(blogData);

  return (
    <div className="activity-container">
      <ToastContainer />
      <div className="activity-heading">
        <div className="activity-head1">Activity</div>
        <div className="activity-head2">
          Welcome to our captivating Gallery Page, where the magic happens! As
          an admin, you have the power to curate this visual journey by
          effortlessly deleting outdated photos and seamlessly uploading new
          ones.
        </div>
      </div>
      <div className="activity-outer-box">
        <div style={{ padding: "0 0 14px 0" }}> Add New Blog </div>
        <div className="activity-form">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
          />
          <input
            type="text"
            name="subtitle"
            value={formData.subtitle}
            onChange={handleChange}
            placeholder="Sub-Title"
          />
          <textarea
            rows="5"
            type="textbox"
            name="desc"
            value={formData.desc}
            onChange={handleChange}
            placeholder="Description"
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />
          <div>
            <button onClick={handleSubmitForm}> Submit </button>
          </div>
        </div>
      </div>
      <div className="activity-content-show">
        <div className="activity-content">
            {
                blogData.map((blog, index)=>(
                    <div className="activity-blog-outer-card" key={index}>
                        <Activity blog={blog} setChangeInActivity={setChangeInActivity}/>
                    </div>
                ))
            }
        </div>
      </div>
    </div>
  );
};

export default Activities;
