import { useState } from "react";
import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi";
import useTheme from "../hooks/useTheme";

export default function ThemeSwitcher() {
  const [hover, setHover] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex items-center">
      <button
        className={`swap swap-rotate text-color-secondary ${
          hover ? "swap-active" : ""
        }`}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={toggleTheme}
      >
        <HiOutlineMoon
          size={24}
          className={theme === "light" ? "swap-on" : "swap-off"}
        />
        <HiOutlineSun
          size={24}
          className={theme === "light" ? "swap-off" : "swap-on"}
        />
      </button>
    </div>
  );
}
