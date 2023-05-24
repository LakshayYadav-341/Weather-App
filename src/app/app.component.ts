import { Component, OnInit } from '@angular/core';
import { WeatherService } from './services/weather.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'weatherApp';
  weather: any;
  temperature: any;
  sunsetTime: any;
  temp_celcius: any;
  temp_min: any;
  temp_max: any;
  temp_feels_like: any;
  sunset_time: any;
  humidity: any;
  isDay = true;

  display = false;

  getValue(val: string) {
    this.cityName = val;
  }

  cityName: string = '';
  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
  }

  loadData() {
    this.weatherService.getWeatherData(this.cityName).subscribe({

      next: (res) => {
        console.log(res);
        this.weather = res;
        console.log(this.weather);
        this.temperature = this.weather.main.temp;
        this.sunsetTime = new Date(this.weather.sys.sunset * 1000);
        this.temp_celcius = (this.weather.main.temp).toFixed(0);
        this.temp_min = (this.weather.main.temp_min).toFixed(0);
        this.temp_max = (this.weather.main.temp_max).toFixed(0);
        this.temp_feels_like = (this.weather.main.feels_like).toFixed(0);
        let sunsetTime = new Date(this.weather.sys.sunset * 1000);
        this.sunset_time = sunsetTime.toLocaleTimeString();
        let currentDate = new Date();
        this.isDay = (currentDate.getTime() < sunsetTime.getTime());
        this.humidity = this.weather.main.humidity;
        this.display = true;

      },

      error: (error) => {
        console.log(error.message);
        alert('Please enter a valid city name');
      },

      complete: () => console.log('API call completed')
    })
  }

}
