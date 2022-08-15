import React from "react";

function TopButtons({ setQuery }) {
  const cities = [
    {
      id: 1,
      title: "Sydney",
    },
    {
      id: 2,
      title: "Tokyo",
    },
    { id: 3, title: "Toronto" },

    { id: 4, title: "Paris" },
    { id: 5, title: "London" },
  ];
  // cities.map((city) => console.log(city));
  return (
    <div className="flex items-center justify-around my-6">
      {cities.map((city) => {
        return (
          // <h1>{city.title}</h1>
          <button
            // key={city.id}
            className="text-white text-lg font-medium"
            onClick={() => setQuery({ q: city.title })}
          >
            {city.title}
          </button>
        );
      })}
    </div>
  );
}

export default TopButtons;
