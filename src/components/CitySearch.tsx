import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { Button } from "./ui/button";
import { useState } from "react";
import { Clock, Loader2, Search, Star, XCircle } from "lucide-react";
import { useLocationSearch } from "@/hooks/useWeather";
import { CommandSeparator } from "cmdk";
import { useNavigate } from "react-router-dom";
import { useSearchHistory } from "@/hooks/useSearchHistory";
import { format } from "date-fns";
import { useFavorite } from "@/hooks/useFavorite";

const CitySearch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const { data: locations, isLoading } = useLocationSearch(query);
  const { addToHistory, clearHistory, history } = useSearchHistory();

  const handleSelect = (cityData: string) => {
    const [lat, lon, name, country] = cityData.split("|");

    //  Add to search history
    addToHistory.mutate({
      query,
      name,
      lat: parseFloat(lat),
      lon: parseFloat(lon),
      country,
    });

    setIsOpen(false);
    navigate(`/city/${name}?lat=${lat}&lon=${lon}`);
  };

  const { favorites } = useFavorite();

  return (
    <>
      <Button
        variant={"outline"}
        className="justify-start w-full text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
        onClick={() => setIsOpen(true)}
      >
        <Search className="mr-2 size-4" />
        Search cities...
      </Button>
      <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
        <CommandInput
          value={query}
          onValueChange={setQuery}
          placeholder="Type a command or search..."
        />
        <CommandList>
          {query.length > 2 && !isLoading && (
            <CommandEmpty>No results found.</CommandEmpty>
          )}
          {favorites.length > 0 && (
            <CommandGroup heading="Favorites">
              {favorites.map((location) => {
                return (
                  <CommandItem
                    key={location.id}
                    value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
                    onSelect={handleSelect}
                  >
                    <Star className="mr-2 text-yellow-500 size-4" />
                    <span>{location.name}</span>
                    {location.state && (
                      <span className="text-sm text-muted-foreground">
                        , {location.state}
                      </span>
                    )}
                    <span className="text-sm text-muted-foregrounde">
                      , {location.country}
                    </span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          )}
          {history.length > 0 && (
            <>
              <CommandSeparator />
              <CommandGroup>
                <div className="flex items-center justify-between px-2 my-2">
                  <p className="text-xs text-muted-foreground">Recent Search</p>
                  <Button
                    size={"sm"}
                    variant={"ghost"}
                    onClick={() => clearHistory.mutate()}
                  >
                    <XCircle className="size-4" />
                    clear
                  </Button>
                </div>
                {history.map((location) => {
                  return (
                    <CommandItem
                      key={`${location.lat}-${location.lon}`}
                      value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
                      onSelect={handleSelect}
                    >
                      <Clock className="mr-2 size-4" />
                      <span>{location.name}</span>
                      {location.state && (
                        <span className="text-sm text-muted-foregrounde">
                          , {location.state}
                        </span>
                      )}
                      <span className="text-sm text-muted-foregrounde">
                        , {location.country}
                      </span>
                      <span className="ml-auto text-xs text-muted-foreground">
                        {format(location.searchedAt, "MMM d, h:mm a")}
                      </span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </>
          )}
          <CommandSeparator />
          {locations && locations.length > 0 && (
            <CommandGroup heading="Suggestions">
              {isLoading && (
                <div className="flex items-center justify-center p-4">
                  <Loader2 className="size-4 animate-spin" />
                </div>
              )}
              {locations.map((location) => {
                return (
                  <CommandItem
                    key={`${location.lat}-${location.lon}`}
                    value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
                    onSelect={handleSelect}
                  >
                    <Search className="mr-2 size-4" />
                    <span>{location.name}</span>
                    {location.state && (
                      <span className="text-sm text-muted-foregrounde">
                        , {location.state}
                      </span>
                    )}
                    <span className="text-sm text-muted-foregrounde">
                      , {location.country}
                    </span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default CitySearch;
