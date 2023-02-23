import cx from 'classnames'

import css from './index.module.scss'
import { IForecast } from '../models/IWeather';

interface Props {
    date: any,
    units: string,
    mode: boolean
}

const WeatherForecast = ({ date, units, mode }: Props) => {

    const tempUnit = units === "metric" ? "°C" : "°F";
    const windUnit = units === "metric" ? "m/s" : "m/h";

    const cards: IForecast[] = [
        {
            id: 1,
            title: "min",
            data: date.temp_min.toFixed(),
            unit: tempUnit,
        },
        {
            id: 2,
            title: "max",
            data: date.temp_max.toFixed(),
            unit: tempUnit,
        },
        {
            id: 3,
            title: "feels like",
            data: date.feels_like.toFixed(),
            unit: tempUnit,
        },
        {
            id: 4,
            title: "pressure",
            data: date.pressure,
            unit: "hPa",
        },
        {
            id: 5,
            title: "humidity",
            data: date.humidity,
            unit: "%",
        },
        {
            id: 6,
            title: "wind speed",
            data: date.speed.toFixed(),
            unit: windUnit,
        },
    ];

    return (
        <div className={cx(css.wrapper, mode ? css.dark : css.light)}>
            <p className={css.wrapper__title}>Local weather repost</p>
            <ul className={css.weather__block}>
                {cards.map((item: any) =>
                    <li key={item.id}>{item.title} <span></span> {item.data} {item.unit}</li>
                )}
            </ul>
        </div>
    );
};

export default WeatherForecast;