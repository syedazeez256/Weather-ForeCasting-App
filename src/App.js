import "./App.css";
import UilReact from "@iconscout/react-unicons/icons/uil-react";
import TopButtons from "./components/TopButtons";
import Inputs from "./components/Inputs";
import TimeAndLocation from "./components/TimeAndLocation";
import TemperatureAndDetails from "./components/TemperatureAndDetails";
import ForeCast from "./components/ForeCast";
import getFormatWeatherData from "./services/WeatherService";
import { useEffect, useState } from "react";

function App() {
  const [query, setQuery] = useState({ q: "berlin" });
  const [units, setUnits] = useState("metric");
  const [weather, SetWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      await getFormatWeatherData({ ...query, units }).then((data) => {
        SetWeather(data);
      });
    };
    fetchWeather();
  }, [query, units]);
  // console.log(weather.hourly);
  return (
    <div className="mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br from-cyan-700 to-blue-700 h-fit shadow-xl shadow-gray-400">
      <TopButtons setQuery={setQuery} />
      <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />

      {weather && (
        <div>
          <TimeAndLocation weather={weather} />
          <TemperatureAndDetails weather={weather} />
          <ForeCast title="daily forecast" items={weather.daily} />
          <ForeCast title="hourly forecast" items={weather.hourly} />
        </div>
      )}
    </div>
  );
}

export default App;
