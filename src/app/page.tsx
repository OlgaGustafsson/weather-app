// /** @format */
'use client'

import Image from "next/image";
import Navbar from "@/components/Navbar";
import { WeatherData, WeatherListItem, CityData } from "../../interface";
import { useQuery } from 'react-query';
import axios from "../../node_modules/axios/index";
// import { format } from "path";
import { format, parseISO } from "date-fns";
import Container from "@/components/Container";
import { convertKelvinToCelsius } from "@/utils/convertKelvinToCelsius";


// https://api.openweathermap.org/data/2.5/forecast?q=pune&appid=1e375b17cd8d0563cf8cdb3356420acb&cnt=56

export default function Home() {

  const { isLoading, error, data } = useQuery<WeatherData>(
    'repoData', 
    async () => {
    const {data} = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=lidkoping&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=56`
      );
      return data;
  }
);

const firstData = data?.list[0];

console.log('data', data);
console.log('data', data?.city.name);

if (isLoading) return (
  <div className="flex items-center min-h-screen justify-center">
    <p className="animate-bounce">Loading...</p>

  </div>
)


  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
      <Navbar />
      <main className="px-3 max-w-7x1 mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
        {/* today data */}
        <section className="space-y-4">
          <div className="space-y-2">
            <h2 className="flex gap-1 text-2xl items-end">
              <p className="">{format(parseISO(firstData?.dt_txt ?? ""), "EEEE")}</p>
              <p className="text-lg">({format(parseISO(firstData?.dt_txt ?? ""), "dd.MM.yyy")})</p>
            </h2>
            <Container className="gap-10 px-6 items-center">
              {/* temprature */}
              <div className="flex flex-col px-4">
                <span className="text-5xl">
                  {convertKelvinToCelsius(firstData?.main.temp ?? 296.37)}°
                </span>
                <p className="text-xs space-x-1 whitespace-nowrap">

                </p>
                <p className="text-xs space-x-2">
                  <span>
                    {convertKelvinToCelsius(firstData?.main.temp_min ?? 0)}
                    °↓{" "}
                  </span>
                  <span>
                    {" "}
                    {convertKelvinToCelsius(firstData?.main.temp_max ?? 0)}
                    °↑
                  </span>


                </p>
              </div>
              {/* time and weather icon */}
              <div className="flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3">
                {data?.list.map((d, i) => (
                  <div 
                    key={i}
                    className="flex flex-col justify-between gap-2 items-center text-xs font-semibold"
                  >
                    <p className="whitwspace-nowrap">
                      {format(parseISO(d.dt_txt), "h:mm a")}
                    </p>
                  </div>

                ))}
              </div>
            </Container>
          </div>
        </section>
        {/* 7 day forcast data */}
        <section></section>
      </main>
    </div>

  );
}
