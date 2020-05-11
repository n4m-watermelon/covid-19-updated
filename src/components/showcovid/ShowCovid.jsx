import React, { useState, useEffect } from "react";
import axios from "axios";
import "./showcovid.css";

function ShowCovid(props) {
  const [data, setData] = useState({});
  const [dataChild, setDataChild] = useState({});
  const [filterCountry , setFilterCountry] = useState('vn')

  useEffect(() => {
    function getData() {
      axios.get(`https://corona.lmao.ninja/v2/countries/${filterCountry}`).then((res) => {
        const newData = res.data;
        setData(newData);
        setDataChild(newData.countryInfo);
      });
    }
    getData();
    return () => {};
  }, [filterCountry]);
  
function onChangeCountry(e){
    
       setFilterCountry(e.target.value)
}
  
  return (
    <div>
      <div className="main">
       <h1>Covid19 Updated !</h1>
        <div className="custom-select">
          <h2>Country</h2>
          <select onChange={(e) => onChangeCountry(e)}>
            <option value="vn">Việt Nam</option>
            <option value="usa">USA</option>
            <option value="jp">Japan</option>
          </select>
        </div>
        <div className="img">
          <img width="250px" height="150px" src={dataChild.flag} alt="" />
        </div>
        <div className="list-items">
          <div className="item">
            <p>Tổng số ca nhiễm</p>
            <span style={{ color: "blue" }}>{data.cases} ca</span>
          </div>
          <div className="item">
            <p>Đã hồi phục</p>
            <span style={{ color: "green" }}>{data.recovered} ca</span>
          </div>
          <div className="item">
            <p>Tử vong</p>
            <span style={{ color: "red" }}>{data.deaths} ca</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowCovid;
