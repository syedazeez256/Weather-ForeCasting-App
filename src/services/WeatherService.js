import { DateTime } from "luxon";

const API_Key = "674746bd7d3811b4fbe9da352c198b1c";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const getWeatherData = (infoType, searchParams) => {
  console.log(infoType);
  console.log(searchParams);
  const url = new URL(BASE_URL + "/" + infoType);
  console.log(url);
  url.search = new URLSearchParams({ ...searchParams, appid: API_Key });
  console.log({ ...searchParams });
  console.log(url.search);

  return fetch(url).then((resp) => resp.json());
};

// export default getWeatherData;

const formatCurrentWeather = (data) => {
  const {
    coord: { lon, lat },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
  } = data;

  const { main: details, icon } = weather[0];
  console.log(lat, lon);
  return {
    lat,
    lon,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    dt,
    country,
    sunrise,
    sunset,
    details,
    icon,
    speed,
  };
};

const formatForecastWeather = (data) => {
  console.log(data);
  let { timezone, daily, hourly } = data;
  daily = daily.slice(1, 8).map((d) => {
    return {
      title: formatToLocalTime(d.dt, timezone, "ccc"),
      temp: d.temp.day,
      icon: d.weather[0].icon,
    };
  });

  hourly = hourly.slice(1, 8).map((d) => {
    return {
      title: formatToLocalTime(d.dt, timezone, "hh:mm a"),
      temp: d.temp,
      icon: d.weather[0].icon,
    };
  });
  console.log(daily, hourly, timezone);

  return { timezone, daily, hourly };
};

const getFormatWeatherData = async (searchParams) => {
  const formattedCurrentWeather = await getWeatherData(
    "weather",
    searchParams
  ).then(formatCurrentWeather);

  console.log(formattedCurrentWeather);

  const { lon, lat } = formattedCurrentWeather;
  console.log(lat, lon);

  const formattedForecastWeather = await getWeatherData("onecall", {
    lat,
    lon,
    exclude: "current,minutely,alerts",
    units: searchParams.units,
  }).then(formatForecastWeather);

  return { ...formattedCurrentWeather, ...formattedForecastWeather };
};

const formatToLocalTime = (
  secs,
  zone,
  format = "cccc, dd LLL yyyy' | Local Time: 'hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const iconUrlFromCode = (code) =>
  `http://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormatWeatherData;
export { formatToLocalTime, iconUrlFromCode };
