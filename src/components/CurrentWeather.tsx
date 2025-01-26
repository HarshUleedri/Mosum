import { GeocodingResponse, WeatherData } from "@/api/type";
import { Card, CardContent } from "./ui/card";
import { ArrowDown, ArrowUp, Droplet, Wind } from "lucide-react";

interface CurrentWeatherProps {
  data: WeatherData;
  locationName?: GeocodingResponse;
}
const CurrentWeather = ({ data, locationName }: CurrentWeatherProps) => {
  const {
    weather: [currentWeather],
    main: { temp, feels_like, temp_min, temp_max, humidity },
    wind: { speed },
  } = data;

  const formatTemp = (temp: number) => `${Math.round(temp)}°`;
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-end gap-2">
                <h2 className="text-xl font-semibold">{locationName?.name}</h2>
                {locationName?.state && (
                  <span className="text-muted-foreground">
                    , {locationName.state}
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                {locationName?.country}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <p className="font-semibold tracking-tighter text-7xl">
                {formatTemp(temp)}
              </p>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Feels like {formatTemp(feels_like)}
                </p>
                <div className="flex items-center gap-2 text-sm font-medium">
                  <span className="flex items-center gap-1 text-blue-400">
                    <ArrowDown className="size-4" />
                    {formatTemp(temp_min)}
                  </span>
                  <span className="flex items-center gap-1 text-red-400">
                    <ArrowUp className="size-4" />
                    {formatTemp(temp_max)}
                  </span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 ">
                <Droplet className="text-blue-500 size-4" />
                <div className="">
                  <p className="text-sm font-medium">Humidity</p>
                  <p className="text-sm text-muted-foreground">{humidity}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 ">
                <Wind className="text-blue-500 size-4" />
                <div className="">
                  <p className="text-sm font-medium">Wind Speed</p>
                  <p className="text-sm text-muted-foreground">{speed} m/s</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative flex flex-col items-center justify-center aspect-square max-w-[200px] w-full">
              <img
                src={`https://openweathermap.org/img/wn/${currentWeather.icon}@4x.png`}
                alt={currentWeather.description}
                className="object-contain h-fit w-fit"
              />
              <p className="absolute text-sm font-medium capitalize bottom-2">
                {currentWeather.description}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentWeather;
