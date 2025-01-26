import { WeatherData } from "@/api/type";
import { format } from "date-fns";
import { Compass, Gauge, Sunrise, Sunset } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface WeatherDetailProps {
  data: WeatherData;
}

const WeatherDetail = ({ data }: WeatherDetailProps) => {
  const { main, sys, wind } = data;
  console.log(data);
  const formatTime = (timestamp: number) => {
    return format(new Date(timestamp * 1000), "h:mm a");
  };

  const getWindDirection = (degree: number) => {
    const direction = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

    const index =
      Math.round(((degree %= 360) < 0 ? degree + 360 : degree) / 45) % 8;
    return direction[index];
  };

  const details = [
    {
      title: "Sunrise",
      value: formatTime(sys.sunrise),
      icon: Sunrise,
      color: " text-orange-400",
    },
    {
      title: "Sunset",
      value: formatTime(sys.sunset),
      icon: Sunset,
      color: " text-blue-400",
    },
    {
      title: "Wind Direction",
      value: `${getWindDirection(wind.deg)} (${wind.deg})°`,
      icon: Compass,
      color: " text-green-400",
    },
    {
      title: "Pressure",
      value: `${main.perssure} hPa`,
      icon: Gauge,
      color: " text-green-400",
    },
  ];
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weather Detail</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 sm:grid-cols-2">
          {details.map((detail) => {
            return (
              <div
                key={detail.title}
                className="flex items-center gap-3 p-4 border rounded-lg"
              >
                <detail.icon className={`size-8 ${detail.color}`} />
                <div>
                  <p className="text-sm font-medium leading-none">
                    {detail.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {detail.value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherDetail;
