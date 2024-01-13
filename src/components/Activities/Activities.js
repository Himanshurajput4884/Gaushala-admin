import React, {useState} from "react";
import axios from "axios";

const Activities = ()=>{
    const [formData, setFormData] = useState(({
        title:"",
        subtitle:"",
        desc:"",
        image:null
    }));

    const handleImageChange = (e)=>{
        setFormData({...formData, [e.target.name]:e.target.files[0]});
    }

    const handleChange = (e) =>{
        setFormData({...formData, [e.target.name]:e.target.value});
    }

    const handleSubmitForm = async()=>{
        if(!formData.title || !formData.subtitle || !formData.desc || formData.image == null){
            alert("Fill all the fields");
            return;
        }
        console.log(formData);
        try{
            const formDataToSend = new FormData();
            formDataToSend.append('title', formData.title);
            formDataToSend.append('subtitle', formData.subtitle);
            formDataToSend.append('desc', formData.desc);
            formDataToSend.append('image', formData.image);

            const response = await axios.post("http://localhost:8008/activity/add/new", formDataToSend, {
                headers:{
                    "Content-Type":"multipart/form-data",
                }
            });

            console.log(response.data);
        }
        catch(err){
            console.log("Error in uploading blog: ", err);
            return;
        }
    }

    return (
        <div>
            <h1> Activities </h1>
            <div className="activityForm">
                <label htmlFor="title"> Title </label>
                <input type="text" name="title" value={formData.title} onChange={handleChange}/>
                <label htmlFor="subtitle"> Sub-title </label>
                <input type="text" name="subtitle" value={formData.subtitle} onChange={handleChange}/>
                <label htmlFor="desc"> Description </label>
                <textarea rows="5" type="textbox" name="desc" value={formData.desc} onChange={handleChange}/>
                <label htmlFor="activityImage"> Image </label>
                <input type="file" name="image" accept="image/*" onChange={handleImageChange}/>
                <div className="activityButton">
                    <button onClick={handleSubmitForm}> Submit </button>
                </div>
            </div>
        </div>
    )
}

export default Activities;