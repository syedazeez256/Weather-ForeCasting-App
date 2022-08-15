import React from "react";
import { iconUrlFromCode } from "../services/WeatherService";

function ForeCast({ title, items }) {
  console.log(items);

  items.map((item) => {
    console.log(item.title);
  });
  return (
    <div>
      <div className="flex items-center justify-start mt-6 ">
        <p className="text-white font-medium uppercase">{title}</p>
      </div>
      <hr className="my-2" />

      <div className="flex flex-row items-center justify-between text-white">
        {items.map((data) => {
          return (
            <div className="flex flex-col items-center justify-center">
              <p className="font-light text-sm">{data.title}</p>
              <img
                src={iconUrlFromCode(data.icon)}
                className="w-12 my-1"
                alt=""
              />
              <p className="font-medium">{`${data.temp.toFixed()}°`}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ForeCast;
