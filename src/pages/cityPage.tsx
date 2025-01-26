import CurrentWeather from "@/components/CurrentWeather";
import HourlyTemprature from "@/components/HourlyTemprature";
import WeatherSkeleton from "@/components/loadingSkeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import WeatherDetail from "@/components/WeatherDetail";
import WeatherForecast from "@/components/WeatherForecast";
import { useForecaseQuery, useWeatherQuery } from "@/hooks/useWeather";
import { AlertTriangle } from "lucide-react";
import { useParams, useSearchParams } from "react-router-dom";
import FavoritesButton from "@/components/favoriteButton";

const CityPage = () => {
  const [searchParams] = useSearchParams();
  const params = useParams();

  const lat = parseFloat(searchParams.get("lat") || "0");
  const lon = parseFloat(searchParams.get("lon") || "0");

  const coordinates = { lat, lon };

  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecaseQuery(coordinates);

  if (weatherQuery.error || forecastQuery.error) {
    return (
      <Alert variant="default">
        <AlertTriangle className="w-4 h-4 text-yellow-600" />
        <AlertTitle className="mb-2 "> Error</AlertTitle>
        <AlertDescription>
          <p className="mb-2">failed to load weather data. Please try again.</p>
        </AlertDescription>
      </Alert>
    );
  }
  if (!weatherQuery.data || !forecastQuery.data || !params.cityName) {
    return <WeatherSkeleton />;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold tracking-tight">
          {params.cityName}, {weatherQuery.data.sys.country}
        </h1>
        <div>
          <FavoritesButton
            data={{
              ...weatherQuery.data,
              name: params.cityName,
            }}
          />
        </div>
      </div>
      {/* current and hourly weather */}
      <div className="grid gap-4">
        <div className="flex flex-col gap-4 lg:flex-row">
          <CurrentWeather data={weatherQuery.data} />
          <HourlyTemprature data={forecastQuery.data} />
          {/* current weather */}
          {/* hourly temprature */}
        </div>
        <div className="grid items-start gap-4 md:grid-cols-2">
          {/* details */}
          {/* forecast */}
          <WeatherDetail data={weatherQuery.data} />
          <WeatherForecast data={forecastQuery.data} />
        </div>
      </div>
    </div>
  );
};

export default CityPage;
