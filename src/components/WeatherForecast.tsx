import type { ForecastData } from "@/api/type";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { format } from "date-fns";
import { ArrowDown, ArrowUp, Droplet, Wind } from "lucide-react";

interface WeatherForecastProps {
  data: ForecastData;
}

interface DailyForecast {
  date: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
  wind: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  };
}
const WeatherForecast = ({ data }: WeatherForecastProps) => {
  const dailyForecasts = data.list.reduce((acc, forecast) => {
    const date = format(new Date(forecast.dt * 1000), "yyyy-MM-dd");
    if (!acc[date]) {
      acc[date] = {
        temp_min: forecast.main.temp_min,
        temp_max: forecast.main.temp_max,
        humidity: forecast.main.humidity,
        wind: forecast.wind.speed,
        weather: forecast.weather[0],
        date: forecast.dt,
      };
    } else {
      acc[date].temp_min = Math.min(acc[date].temp_min, forecast.main.temp_min);
      acc[date].temp_max = Math.max(acc[date].temp_max, forecast.main.temp_max);
    }
    return acc;
  }, {} as Record<string, DailyForecast>);

  const nextDays = Object.values(dailyForecasts).slice(0, 6);
  const formatTemp = (temp: number) => `${Math.round(temp)}°`;
  return (
    <Card>
      <CardHeader>
        <CardTitle>5-Day Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {nextDays.map((day) => {
            return (
              <div
                key={day.date}
                className="grid items-center grid-cols-3 gap-4 p-4 border rounded-lg"
              >
                <div>
                  <p className="font-medium">
                    {format(new Date(day.date * 1000), "EEE, MMM d")}
                  </p>
                  <p className="text-sm capitalize text-muted-foreground">
                    {day.weather.description}
                  </p>
                </div>
                <div className="flex justify-center gap-4">
                  <span className="flex items-center text-blue-400">
                    <ArrowDown className="mr-1 size-4" />
                    {formatTemp(day.temp_min)}
                  </span>
                  <span className="flex items-center text-red-400">
                    <ArrowUp className="mr-1 size-4" />
                    {formatTemp(day.temp_max)}
                  </span>
                </div>
                <div className="flex justify-end gap-4">
                  <span className="flex items-center gap-1">
                    <Droplet className="text-blue-400 size-4" />
                    <span className="text-sm">{day.humidity}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Wind className="text-blue-400 size-4" />
                    <span className="text-sm">{day.wind}</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherForecast;
