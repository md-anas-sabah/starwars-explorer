import {
  AppShell,
  Header,
  Group,
  Button,
  Text,
  ActionIcon,
  useMantineColorScheme,
} from "@mantine/core";
import { FaMoon } from "react-icons/fa";
import { LuSun } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store";

export default function Shell({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuthStore();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <AppShell
      padding="md"
      header={
        <Header height={60} p="xs">
          <Group position="apart">
            <Text
              size="xl"
              weight={700}
              sx={{ cursor: "pointer" }}
              onClick={() => navigate("/")}
            >
              Star Wars Explorer
            </Text>
            <Group>
              <ActionIcon
                variant="outline"
                color={colorScheme === "dark" ? "yellow" : "blue"}
                onClick={() => toggleColorScheme()}
                title="Toggle color scheme"
              >
                {colorScheme === "dark" ? (
                  <LuSun size={18} />
                ) : (
                  <FaMoon size={18} />
                )}
              </ActionIcon>
              {isAuthenticated ? (
                <>
                  <Text>Welcome, {user?.username}</Text>
                  <Button variant="light" onClick={handleLogout}>
                    Logout
                  </Button>
                </>
              ) : (
                <Button variant="light" onClick={() => navigate("/login")}>
                  Login
                </Button>
              )}
            </Group>
          </Group>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
}
