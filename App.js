import React from 'react';
import Loading from './Loading';
import { Alert } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';

const API_KEY = "a39b6faccff5cb45a02d2bcfb84adad6";

export default class App extends React.Component {
  state ={
    isLoading: true
  };
  getWeather = async (latitude, longitude) =>{
    const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}` 
    );
    console.log(data);
  };
  getLocation = async () => {
    try {
      await Location.requestPermissionsAsync();
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();
      this.getWeather(latitude, longitude);
      this.setState({isLoading: false});
    } catch (error) {
      Alert.alert("Can't find you.", 'So sad');
    }
  };
  componentDidMount() {
    this.getLocation();
  }
  render() {
    const {isLoading} = this.state;
    return isLoading ? <Loading /> : null;
  }
}
