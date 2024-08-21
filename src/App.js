import WeatherBtn from './component/WeatherBtn';
import WeatherInfo from './component/WeatherInfo';
import React, { useEffect , useState} from 'react';
import './App.css';

function App() {
  // object 타입이여서 처음에는 null로 시작
  const [weather, setWeather] = useState(null);

  // 변경된 도시정보를 기억하는 state 변수
  const [city, setCity] = useState("");

  // 도시 정보를 기억하는 배열
  const cities = ['jeju','busan','seoul','tokyo','new york','london','paris']

  const [search, setSearch] = useState("");

  const changeSearch = (e) => {
      setSearch(e.target.value);
  }

  const enterSearch = (e) => {
      if(e.key === "Enter") {
          if (cities.includes(search) || cities.includes(search.toLowerCase())) {
            setCity(search);
            //getInputCityWeather();
          } else {
            alert('도시 이름을 정확히 입력하세요.')
          }
      }
  }

  const handleSearch = () => {
      if (cities.includes(search) || cities.includes(search.toLowerCase())) {
        setCity(search);
        //getInputCityWeather();
      } else {
        alert('도시 이름을 정확히 입력하세요.')
      }
  }


  //나의 현재 위치 정보의 위도 경도를 알아내는 코드
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position)=>{
      //위도값
      let lat = position.coords.latitude;
      //경도값
      let lon = position.coords.longitude;
      console.log(lat, lon);
      getWeatherApiLocatation(lat, lon);
    });
  }

  //날씨 api 서버 호출
  const getWeatherApiLocatation = async(lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=c39b31d5f473fa535aa1dfa1502db383&lang=Kr&units=metric`
    let response = await fetch(url)
    //json 데이터로 변환
    let data = await response.json()
    console.log(data)
    setWeather(data)
    console.log(weather)
  }

  // 버튼누르면 실행
  const getWeatherCity = async () => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city},{country code}&appid=c39b31d5f473fa535aa1dfa1502db383&units=metric&lang=kr`;

    let response = await fetch (url);
    let data = await response.json();

    console.log(data);
    console.log('useEffect도시명변경');
    setWeather(data);
  }

  // 시작했을때 빈배열 + 도시버튼 클릭했을때 
  // 도시버튼을 클릭하면 city값이 바뀌게 되면서 getWeatherCity()가 실행되게 된다
  useEffect(()=>{
    if(city === ""){
      getCurrentLocation();
    } else {
      getWeatherCity();
    }
  },[city]);


  const hadleCityCurrent = (city) => {
    console.log("현재상태클릭됨");
    if(city === "current"){
      setCity("");
    } else {
      setCity(city);
    }
  }

  return (
    <>
    <div className="container">
      <div className='inputBox'>
        <input onKeyPress={enterSearch} onChange = {changeSearch} type="text" placeholder="도시를 영문으로 입력하세요."/>
        <button onClick={handleSearch} >검색</button>
      </div>
      <WeatherInfo weather={weather} />
      <WeatherBtn cities={cities}  setCity={setCity} hadleCityCurrent={hadleCityCurrent}/>
    </div>
    </>
  );
}

export default App;
