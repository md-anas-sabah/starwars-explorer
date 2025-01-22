import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { theme } from "./theme";
import Shell from "./components/Layout/Shell";
import "./App.scss";

export default function App() {
  const { pathname } = useLocation();
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "color-scheme",
    defaultValue: "light",
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ ...theme, colorScheme }}
        withGlobalStyles
        withNormalizeCSS
      >
        <Shell>
          <Outlet />
        </Shell>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
