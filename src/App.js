import './App.css';
import React from "react";
import Weather from './app_component/weather.component';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/free-solid-svg-icons';
import Form from './app_component/form.component';


// api call api.openweathermap.org/data/2.5/weather?q=London,uk
const API_key = '5de21b85761e17c45781408f157eb54c';

class App extends React.Component{

  constructor(){
    super();
    this.state = {
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      celsius: undefined,
      temp_max: undefined,
      temp_min: undefined,
      description: "",
      error: false,
      data: undefined
    };

  }

  componentDidMount() {
    fetch("http://localhost:3001/api/count")
      .then(response => response.json())
      .then(data =>
        this.setState(() => {
          return { data };
        })
      );
  }

  calCelsius(temp){
    let cell = Number(temp-273.15).toFixed(2);
    return cell;
  }

  getWeather = async(e)=>{
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    if(city&&country){
      const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_key}`);

      const response = await api_call.json();
      console.log(response);
  
      this.setState({
        city: `${response.name},${response.sys.country}`,
        description: response.weather.description,
        celsius: this.calCelsius(response.main.temp),
        temp_max: this.calCelsius(response.main.temp_max),
        temp_min: this.calCelsius(response.main.temp_min),
        weather_description: response.weather[0].description,
        error: false,
        data: this.data
      });
    }      
    else{
      this.setState({error: true});
    }

  };
  render(){
    
    const{city, error, country,celsius,weather_description,temp_max, temp_min, data}= this.state
    return (
      <div className="App">
      <Form loadweather={this.getWeather} error={error} />
      <Weather city ={city} 
      country ={country} 
      temp_celsius ={celsius} 
      description={weather_description}
      temp_max={temp_max}
      temp_min={temp_min}
      data={data}/>
      </div>
      
    );
  }
}


export default App;
