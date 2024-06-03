import React, { useEffect, useState } from 'react'
import './Recommend.css'
import { recommendationLists } from '../../assets/assets';
import FoodRec from '../../components/FoodRecommendation/FoodRec';
import FoodItem from '../../components/FoodItem/FoodItem';

const Recommend = () => {

  const [age, setAge] = useState('')
  const [showWeight, setShowWeight] = useState(false)
  const [weightOptions, setWeightOptions] = useState([]);
  const [weight, setWeight] = useState('');
  const [recommendations, setRecommendations ] = useState([])

  const handleAgeChange = (event) =>{
    const selectedAge = event.target.value;
    setAge(selectedAge);
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
    setWeight('');
  };

  const handleWeightChange = (event) =>{
    setWeight(event.target.value)
  };

  const showtheWeight = (item) =>{
    return <option key={item} value={item}>{item} kg</option>
  }

  const handleSubmit = (event) =>{
    event.preventDefault();
    const formData = {
      age: age,
      weight: weight
    };
    console.log("Hasil input user: ", formData);
    const newRecommendations = getRecommendations(age,weight);
    setRecommendations(newRecommendations);
  };

  const getRecommendations = (selectedAge, selectedWeight) =>{
    return recommendationLists[selectedAge]?.[selectedWeight] || [];
  }

  useEffect(()=>{
    console.log('weight options: ', weightOptions);
  }, [weightOptions]);

  useEffect(()=>{
    console.log('Recommendations : ', recommendations);
  }, [recommendations]);
  return (
    <div className='recc-container'>
      <div className="input-container">
          <h2 className="input-title">Find Recommendation For Your Children</h2>
          <div className="form-recommendation">
            <form action="" className="form-input-container" onSubmit={handleSubmit}>

              <label htmlFor="Usia">Usia</label>
              <select name="Usia" id="Usia" value={age} onChange={handleAgeChange}>
                <option value="">--Pilih Usia--</option>
                <option key="tk1" value="tk1">6-8 Bulan</option>
                <option key="tk2" value="tk2">9-11 Bulan</option>
                <option key="tk3" value="tk3">12-24 Bulan</option>
              </select>

              {showWeight && (
                  <div className="weight-container">
                  <label htmlFor="BeratBadan">Berat Badan</label>
                  <select name="BeratBadan" id="BeratBadan" value={weight} onChange={handleWeightChange}>
                    <option value="">--Pilih Berat Badan--</option>
                    {weightOptions.map(showtheWeight)}
                  </select>
                </div>

              )}

              <button type='submit'>Save</button>
            </form>
          </div>
          <hr/>
      </div>
      <div className="recc-container">
        {recommendations.length > 0 && (
          <div className="recommendation-display">
            <div className="recommendation-display-list">
              {recommendations.map((item,index)=>{
                return <FoodItem key={index} id={item._id} name={item.name} description={item.name} image={item.image} />
              })}
            </div>
          </div>
        )}
      </div>
    </div>
    
  );
};

export default Recommend;
