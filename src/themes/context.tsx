import React from "react";
import { ThemeProvider as EmotionThemeProvider } from "emotion-theming";
import { darkTheme, defaultTheme } from "./themes";

const theme = (mode: string) => (mode === "dark" ? darkTheme : defaultTheme);

interface ThemeContext {
  dark: boolean,
  toggle: Function,
}

const defaultContextData = {
  dark: false,
  toggle: () => {
  }
};

const Context = React.createContext<ThemeContext>(defaultContextData);

const useTheme = () => React.useContext(Context);

const useEffectDarkMode = () => {
  const [themeState, setThemeState] = React.useState({
    dark: false,
    hasThemeMounted: false
  });
  React.useEffect(() => {
    const lsDark = localStorage.getItem("dark") === "true";
    setThemeState({...themeState, dark: lsDark, hasThemeMounted: true});
  }, []);

  return [themeState, setThemeState];
};

type Props = {
  children: React.ReactNode;
};

const ThemeProvider = ({children}: Props) => {
  const [themeState, setThemeState] = useEffectDarkMode() as any;

  if (!themeState.hasThemeMounted) {
    return <div/>;
  }

  const toggle = () => {
    const dark = !themeState.dark;
    localStorage.setItem("dark", JSON.stringify(dark));
    setThemeState({...themeState, dark});
  };

  const computedTheme = themeState.dark ? theme("dark") : theme("light");

  return (
    <EmotionThemeProvider theme={computedTheme}>
      <Context.Provider
        value={{
          dark: themeState.dark,
          toggle,
        }}
      >
        {children}
      </Context.Provider>
    </EmotionThemeProvider>
  );
};

export {
  ThemeProvider,
  useTheme,
};
