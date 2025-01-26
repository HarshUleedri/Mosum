import { Button } from "@/components/ui/button";
import { useGeolocation } from "@/hooks/useGeolocation";
import WeatherSkeleton from "@/components/loadingSkeleton";
import WeatherDetails from "@/components/WeatherDetail";

import { AlertTriangle, MapPin, RefreshCcw } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  useForecaseQuery,
  useReverseGeocodeQuery,
  useWeatherQuery,
} from "@/hooks/useWeather";
import CurrentWeather from "@/components/CurrentWeather";
import HourlyTemprature from "@/components/HourlyTemprature";
import WeatherForecast from "@/components/WeatherForecast";
import FavoriteCities from "@/components/FavoriteCities";

const Dashboard = () => {
  const {
    coordinates,
    error: locationError,
    getLocation,
    isLoading: locationLoading,
  } = useGeolocation();

  const weatherQuery = useWeatherQuery(coordinates);
  const locationQuery = useReverseGeocodeQuery(coordinates);
  const forecastQuery = useForecaseQuery(coordinates);

  const handleRefresh = () => {
    getLocation();
    if (coordinates) {
      weatherQuery.refetch();
      forecastQuery.refetch();
      locationQuery.refetch();
    }
  };
  if (locationLoading) {
    return <WeatherSkeleton />;
  }

  if (locationError) {
    return (
      <Alert variant="default">
        <AlertTriangle className="w-4 h-4 text-yellow-600" />
        <AlertTitle className="mb-2 ">Location Error</AlertTitle>
        <AlertDescription>
          <p className="mb-2">{locationError}</p>
          <Button onClick={getLocation} variant={"outline"} className="w-fit">
            <MapPin className="mr-2 size-4" />
            Enable Loction
          </Button>
        </AlertDescription>
      </Alert>
    );
  }
  if (!coordinates) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="w-4 h-4" />
        <AlertTitle>Location Required</AlertTitle>
        <AlertDescription className="space-x-4">
          <p>Please enable location access to see your local weather</p>
          <Button onClick={getLocation} variant={"outline"} className="w-fit">
            <MapPin className="mr-2 size-4" />
            Enable Loction
          </Button>
        </AlertDescription>
      </Alert>
    );
  }
  const locationName = locationQuery.data?.[0];

  if (weatherQuery.error || forecastQuery.error) {
    return (
      <Alert variant="default">
        <AlertTriangle className="w-4 h-4 text-yellow-600" />
        <AlertTitle className="mb-2 "> Error</AlertTitle>
        <AlertDescription>
          <p className="mb-2">
            failed to fetch weather data. Please try again.
          </p>
          <Button onClick={handleRefresh} variant={"outline"} className="w-fit">
            <MapPin className="mr-2 size-4" />
            retry
          </Button>
        </AlertDescription>
      </Alert>
    );
  }
  if (!weatherQuery.data || !forecastQuery.data) {
    return <WeatherSkeleton />;
  }

  return (
    <div>
      <FavoriteCities />
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold tracking-tight ">My Location</h1>
        <div>
          <Button
            variant={"outline"}
            size={"icon"}
            onClick={handleRefresh}
            disabled={weatherQuery.isFetching || forecastQuery.isFetching}
          >
            <RefreshCcw
              className={` size-4 ${
                weatherQuery.isFetching ? "animate-spin" : ""
              }`}
            />
          </Button>
        </div>
      </div>
      {/* current and hourly weather */}
      <div className="grid gap-4">
        <div className="flex flex-col gap-4 lg:flex-row">
          <CurrentWeather
            data={weatherQuery.data}
            locationName={locationName}
          />
          <HourlyTemprature data={forecastQuery.data} />
          {/* current weather */}
          {/* hourly temprature */}
        </div>
        <div className="grid items-start gap-4 md:grid-cols-2">
          {/* details */}
          {/* forecast */}
          <WeatherDetails data={weatherQuery.data} />
          <WeatherForecast data={forecastQuery.data} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
