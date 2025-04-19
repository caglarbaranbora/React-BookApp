import { useState } from "react";
import { useContext, createContext } from "react";

const ThemeContext = createContext("light");

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  <ThemeContext.Provider
    value={{
      theme,
      toggleTheme: () => setTheme(theme === "light" ? "dark" : "light"),
    }}
  >
    {children}
  </ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
