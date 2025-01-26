import { Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "@/context/theme-provider";
import CitySearch from "./CitySearch";
const Header = () => {
  const { theme, setTheme } = useTheme();

  const isDark = theme === "dark";

  return (
    <div className="border-b">
      <div className="flex items-center justify-between p-4 mx-auto max-w-7xl">
        <div>
          <Link to="/">
            <img className="size-12" src="./global-warming.png" alt="logo" />
          </Link>
        </div>
        <div className="flex gap-4">
          <CitySearch />
          <div
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={`flex items-center transition-transform duration-500 cursor-point ${
              isDark ? "rotate-180" : "rotate-0"
            }`}
          >
            {isDark ? (
              <Sun className="text-yellow-500 transition-all rotate-0 size-6" />
            ) : (
              <Moon className="text-blue-500 transition-all rotate-0" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
