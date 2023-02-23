export interface ICity {
    city_id: string
    country_id: string
    region_id: string
    name: string;
}

export  interface IData {
    description: string;
    iconURL: string;
    temp: string;
    feels_like: string;
    temp_min: string;
    temp_max: string;
    pressure: string;
    humidity: string;
    speed: string;
    country: string;
    name: string;
}

export interface IForecast{
    id: number,
    title: string,
    data: string,
    unit: string,
}