import React from 'react';

const WeatherBtn = ({cities, hadleCityCurrent, setCity}) => {
    console.log(cities);
    return (
        <div className="weatherBtn">
            <button onClick={()=>hadleCityCurrent("current")}>현재 위치</button>
            {
                cities.map((item)=>(
                    <button onClick={()=>setCity(item)} >{item}</button>
                ))
            }
        </div>
    );
};

export default WeatherBtn;