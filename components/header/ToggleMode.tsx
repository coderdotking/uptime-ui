"use client";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

const ToggleMode = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div
      className="cursor-pointer"
      onClick={() => setTheme(theme == "light" ? "dark" : "light")}>
      {theme == "light" ? (
        <SunIcon className="h-4 w-4" />
      ) : (
        <MoonIcon className="h-4 w-4" />
      )}
    </div>
  );
};

export default ToggleMode;
