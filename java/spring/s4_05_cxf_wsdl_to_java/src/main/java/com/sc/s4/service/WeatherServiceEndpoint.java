package com.sc.s4.service;

import com.sc.s4.ws.weatherservice.WeatherException;
import com.sc.s4.ws.weatherservice.WeatherService;
import com.sc.s4.ws.weatherservice.general.ForecastRequest;
import com.sc.s4.ws.weatherservice.general.ForecastReturn;
import com.sc.s4.ws.weatherservice.general.WeatherInformationReturn;
import com.sc.s4.ws.weatherservice.general.WeatherReturn;

public class WeatherServiceEndpoint implements WeatherService {
    @Override
    public WeatherInformationReturn getWeatherInformation(String zip) throws WeatherException {
        return null;
    }

    @Override
    public ForecastReturn getCityForecastByZIP(ForecastRequest forecastRequest) throws WeatherException {
        return null;
    }

    @Override
    public WeatherReturn getCityWeatherByZIP(ForecastRequest forecastRequest) throws WeatherException {
        return null;
    }
}
