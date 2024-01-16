import React from "react";
import axios from "axios";
import "./Activities.css";

const Activity = ({ blog, setChangeInActivity }) => {
//   console.log(blog);
  const id = blog.blogId;

  const handleBlogDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `http://localhost:8008/activity/delete?id=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200 && response.data.message === "Blog deleted") {
        setChangeInActivity(true);
      } else {
        console.error("Failed to delete blog: ", response.data.message);
      }
    } catch (err) {
      console.log(`Error in deleting blogs ${id}: `, err);
    }
  };

  return (
    <div className="activity-blog-inner-card">
      <div className="activity-blog-card-image">
        <img src={blog.imageUrl} alt="Gallery" />
      </div>
      <div className="activity-blog-text-content">
        {blog.title}
      </div>
      <div className="activity-blog-text-content">
        {blog.subtitle}
      </div>
      <div className="activity-blog-text-content">
        {blog.desc}
      </div>
      <div className="activity-blog-card-button">
        <button onClick={handleBlogDelete}> Delete </button>
      </div>
    </div>
  );
};

export default Activity;
