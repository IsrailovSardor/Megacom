import css from './index.module.scss'
import cx from 'classnames'


interface Props {
    date: any,
    units: string,
    mode: boolean
}

const WeatherCard = ({ date, units, mode }: Props) => {

    return (
        <div className={cx(css.wrapper, mode ? css.dark : css.light)}>
            <p className={css.wrapper__title}>{date.name}, {date.country}</p>
            <div className={css.weather__block}>
                <img src={date.iconURL} alt="weatherIcon" className={css.icon} />
                <div className={css.weather__block_text}>
                    <div className={css.weather__block_week}>
                        <p className={css.weather__day}>Sunday</p>
                        <p className={css.weather__description}>{date.description}</p>
                    </div>
                    <p className={css.weather__temp}>{`${date.temp.toFixed()} °${units === "metric" ? "C" : "F"}`}</p>
                </div>
            </div>
        </div>
    );
};

export default WeatherCard;