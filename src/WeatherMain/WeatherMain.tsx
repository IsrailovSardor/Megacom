import React, { useState, useEffect } from 'react';
import cx from 'classnames'

import css from './index.module.scss'

import AnimationWalpaper from '../Walpaper/Walpaper';
import WeatherCard from '../WeatherCard/WeatherCard';
import WeatherForecast from '../WeatherForecast/WeatherForecast';
import sun from '../assets/icons/sunMode.svg'
import moon from '../assets/icons/moonMode.svg'
import { getFormattedWeatherData } from '../api/weatherservice';
import { arrCities } from '../api/citys';
import { ICity, IData } from '../models/IWeather';
import searchIcon from '../assets/icons/search.svg'


const WeatherMain = () => {
    const [weather, setWeather] = useState<IData | null>(null);
    const [units, setUnits] = useState<'imperial' | 'metric'>("imperial");
    const [mode, setMode] = useState<boolean>(true)
    const [cities, setCities] = useState<ICity[]>([])
    const [modalSearch, setModalSearch] = useState(false)
    const [searchCityValue, setSearchCityValue] = useState<string>('');

    useEffect(() => {
        fetchWeatherData();
    }, [units]);

    useEffect(() => {
        if (navigator.geolocation) {
            getCurrentCity()
        } else
            alert("Geolocation is not supported by this browser.");

    }, [navigator.geolocation]);

    const fetchWeatherData = async (cityValue = searchCityValue) => {
        const data = await getFormattedWeatherData(cityValue, units);
        setWeather(data)
    };

    const getCurrentCity = async () => {
        navigator.geolocation.getCurrentPosition(obj => {
            const url = "https://api.bigdatacloud.net/data/reverse-geocode-client?"
                + `latitude=${obj.coords.latitude}&longitude=${obj.coords.longitude}&localityLanguage=ru`;
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    setSearchCityValue(data.principalSubdivision)
                    fetchWeatherData(data.principalSubdivision)
                });
        });
    }

    const handleUnitsClick = (units: string) => {
        setUnits(units === 'imperial' ? "metric" : "imperial");
    };

    const handleWeather = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const data = await getFormattedWeatherData(searchCityValue, units);
        setWeather(data)
        setModalSearch(false)
    };

    const clickSerachItem = async (item: ICity) => {
        const nameCity = item.name
        const data = await getFormattedWeatherData(nameCity, units);
        setWeather(data)
        setModalSearch(false)
        setSearchCityValue(nameCity)
    };

    const handleCitySearchInput = (cityName: string) => {
        setModalSearch(true)
        setSearchCityValue(cityName)
        setCities(
            arrCities.filter(name => name.name.toLowerCase().includes(cityName.toLowerCase()))
        )
    };

    return (
        <div className={css.wrapper}>
            <AnimationWalpaper />
            <div className={css.wrapper__block}>
                <div className={css.header__block}>
                    <div className={cx(css.header, mode ? css.dark : css.light)}>
                        <form className={css.form} onSubmit={handleWeather}>
                            <input type="text" placeholder='Город' className={css.input}
                                onChange={e => handleCitySearchInput(e.target.value)}
                                value={searchCityValue}
                            />
                            <button type='submit' className={css.form__btn}>
                                <img src={searchIcon} alt="searchIcon" />
                                <span>Искать</span>
                            </button>
                        </form>
                        {mode ?
                            <button className={css.modeBtn} onClick={() => setMode(prev => !prev)}>
                                <img src={sun} alt="" />
                            </button>
                            :
                            <button className={css.modeBtn} onClick={() => setMode(prev => !prev)}>
                                <img src={moon} alt="" />
                            </button>
                        }
                        <button className={css.modeBtn} onClick={() => handleUnitsClick(units)}>
                            {units === 'imperial' ? "°F" : "°C"}
                        </button>
                    </div>
                    {modalSearch &&
                        <div className={cx(css.header__citys, mode ? css.dark : css.light)}>
                            {
                                cities.length === 0 ?
                                    <p>Такого города нет {")"}</p>
                                    :
                                    cities.map((item, index) => (
                                        <p onClick={() => clickSerachItem(item)} key={index}>{item.name}</p>
                                    ))
                            }
                        </div>
                    }
                </div>

                {weather &&
                    <div className={css.block}>
                        <WeatherCard mode={mode} units={units} date={weather} />
                        <WeatherForecast mode={mode} units={units} date={weather} />
                    </div>
                }
            </div>
        </div >
    );
};

export default WeatherMain;