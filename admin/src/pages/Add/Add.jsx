import React, {useEffect, useState} from 'react'
import { assets } from '../../assets/assets'
import './Add.css'
import axios from "axios"
import { toast } from 'react-toastify'

const Add = () => {
    
    const url = "http://localhost:4000";
    const [showWeight, setShowWeight] = useState(false)
    const [weightOptions, setWeightOptions] = useState([]);

    const [image,setImage] = useState(false);

    const [data,setData] = useState({
        name: "",
        description: "",
        category:"Baby",
        age:"",
        weight:"",
    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(prevdata=>({...prevdata,[name]:value}))
    }

    const handleAgeChange = (event) =>{
        const selectedAge = event.target.value;
        setData(prevdata => ({ ...prevdata, age: selectedAge }));
        if(selectedAge === 'tk1'){
            setShowWeight(true);
            setWeightOptions(['≤6', '7-9','≥10']);
        } else if(selectedAge === 'tk2'){
            setShowWeight(true);
            setWeightOptions(['≤7', '8-10', '≥11']);
        } else if(selectedAge === 'tk3'){
            setShowWeight(true);
            setWeightOptions(['≤8', '9-13', '≥14']);
        } else{
            setShowWeight(false);
            setWeightOptions([]);
        }
        setData(prevdata => ({ ...prevdata, weight: '' })); 
    };

    const showtheWeight = (item) =>{
        return <option key={item} value={item}>{item} kg</option>
    }

    useEffect(()=>{
        console.log(data);
    },[data])

    const onSubmitHandler = async (event) =>{
        event.preventDefault(); //not reloading the web
        const formData = new FormData();
        formData.append("name", data.name)
        formData.append("description", data.description)
        formData.append("category", data.category)
        formData.append("age", data.age)
        formData.append("weight", data.weight)
        formData.append("image", image)
        const response = await axios.post(`${url}/api/food/add`, formData)
        if (response.data.success) {
            setData({
                name: "",
                description: "",
                category:"Baby",
                age:"",
                weight:"",
            })
            setImage(false)
            toast.success(response.data.message)
        }else{
            toast.error(response.data.message)
        }
    }

  return (
    <div className='add'>
        <form action="" className="flex-col" onSubmit={onSubmitHandler}>
            <div className="add-img-upload flex-col">
                <p>Upload Image</p>
                <label htmlFor="image">
                    <img src={image?URL.createObjectURL(image):assets.upload_sign} alt="" />
                </label>
                <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' hidden required />
            </div>
            <div className="add-product-name flex-col">
                <p>Food name</p>
                <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here' />
            </div>
            <div className="add-product-description flex-col">
                <p>Food description</p>
                <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Write content here'></textarea>
            </div>
            <div className="add-category-price">
                <div className="add-category flex-col">
                    <p>Food category</p>
                    <select onChange={onChangeHandler} name="category">
                        <option value="Baby">Baby</option>
                        <option value="Toddler">Toddler</option>
                    </select>
                </div>
                <div className="add-age flex-col">
                    <p>Age Food category</p>
                    <select name="age" value={data.age} onChange={handleAgeChange}>
                        <option value="">--Pilih Umur--</option>
                        <option value="tk1">TK-1</option>
                        <option value="tk2">TK-2</option>
                        <option value="tk3">TK-3</option>
                    </select>
                </div>
                {showWeight && (
                  <div className="add-weight flex-col">
                    <p>Weight Food Category</p>
                  <select name="weight" value={data.weight} onChange={onChangeHandler}>
                    <option value="">--Pilih Berat Badan--</option>
                    {weightOptions.map(showtheWeight)}
                  </select>
                </div>
              )}
            </div>
            <button type='submit' className='add-btn'>ADD</button>
        </form>
    </div>
  )
}


export default Add;
