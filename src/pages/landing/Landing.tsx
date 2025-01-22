import { Container, Title, Text, Button, Group } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store";

export default function Landing() {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <Container size="lg" py={120}>
      <Title order={1} size={68} weight={900} align="center" mb={50}>
        Explore the{" "}
        <Text
          component="span"
          variant="gradient"
          gradient={{ from: "blue", to: "cyan" }}
          inherit
        >
          Star Wars
        </Text>{" "}
        Universe
      </Title>

      <Text
        color="dimmed"
        size="xl"
        align="center"
        mx="auto"
        mb={50}
        sx={{ maxWidth: 600 }}
      >
        Discover detailed information about characters, their homeworlds, and
        the films they appear in from the Star Wars saga.
      </Text>

      <Group position="center">
        <Button
          size="lg"
          onClick={() => navigate(isAuthenticated ? "/resources" : "/login")}
        >
          {isAuthenticated ? "View Characters" : "Get Started"}
        </Button>
      </Group>
    </Container>
  );
}
