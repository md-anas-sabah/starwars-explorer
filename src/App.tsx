import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { MantineProvider, ColorSchemeProvider } from "@mantine/core";
import { theme } from "./theme";
import Shell from "./components/Layout/Shell";
import "./App.scss";

export default function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <ColorSchemeProvider colorScheme="dark" toggleColorScheme={() => {}}>
      <MantineProvider
        theme={{ ...theme, colorScheme: "dark" }}
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