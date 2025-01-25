import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Container,
  Grid,
  Text,
  Title,
  Group,
  Loader,
  Stack,
  Badge,
  Box,
} from "@mantine/core";
import { FaArrowLeft } from "react-icons/fa";
import SpaceBackground from "../../components/UI/SpaceBackground";

interface Character {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
}

interface Planet {
  name: string;
  climate: string;
  terrain: string;
  population: string;
}

interface Film {
  title: string;
  release_date: string;
  director: string;
}

const fetchCharacter = async (id: string) => {
  const response = await fetch(`https://swapi.dev/api/people/${id}`);
  return response.json();
};

const fetchPlanet = async (url: string) => {
  const response = await fetch(url);
  return response.json();
};

const fetchFilms = async (urls: string[]) => {
  const promises = urls.map((url) => fetch(url).then((res) => res.json()));
  return Promise.all(promises);
};

export default function ResourceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: character, isLoading: characterLoading } = useQuery({
    queryKey: ["character", id],
    queryFn: () => fetchCharacter(id!),
  });

  const { data: homeworld, isLoading: homeworldLoading } = useQuery({
    queryKey: ["homeworld", character?.homeworld],
    queryFn: () => fetchPlanet(character.homeworld),
    enabled: !!character?.homeworld,
  });

  const { data: films, isLoading: filmsLoading } = useQuery({
    queryKey: ["films", character?.films],
    queryFn: () => fetchFilms(character.films),
    enabled: !!character?.films,
  });

  if (characterLoading)
    return (
      <div
        style={{
          height: "100vh",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "black",
          gap: "1rem",
        }}
      >
        <Text
          size={42}
          weight={700}
          className="sw-glow"
          sx={{ color: "var(--sw-yellow)" }}
        >
          STAR WARS
        </Text>
        <Loader color="yellow" size="xl" variant="bars" />
      </div>
    );

  return (
    <Box
      className="sw-fade-in"
      sx={{
        minHeight: "100vh",
        background: "black",
        position: "relative",
        paddingBottom: "2rem",
      }}
    >
      <SpaceBackground />
      <Container size="xl" sx={{ position: "relative", paddingTop: "2rem" }}>
        <Group position="apart" mb="xl">
          <button
            className="sw-button"
            onClick={() => navigate("/resources")}
            style={{
              padding: "0.5rem 1rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <FaArrowLeft size={14} />
            Back to List
          </button>
        </Group>

        <Grid>
          <Grid.Col md={8}>
            <div className="sw-card">
              <Title
                order={2}
                mb="xl"
                className="sw-glow"
                sx={{
                  color: "var(--sw-yellow)",
                  fontFamily: "Orbitron, sans-serif",
                }}
              >
                {character.name}
              </Title>

              <Grid>
                <Grid.Col span={6}>
                  <Stack spacing="xs">
                    <Text
                      weight={500}
                      className="sw-glow"
                      sx={{ color: "var(--sw-yellow)" }}
                    >
                      Height
                    </Text>
                    <Text sx={{ color: "#fff" }}>{character.height} cm</Text>

                    <Text
                      weight={500}
                      mt="md"
                      className="sw-glow"
                      sx={{ color: "var(--sw-yellow)" }}
                    >
                      Mass
                    </Text>
                    <Text sx={{ color: "#fff" }}>{character.mass} kg</Text>

                    <Text
                      weight={500}
                      mt="md"
                      className="sw-glow"
                      sx={{ color: "var(--sw-yellow)" }}
                    >
                      Birth Year
                    </Text>
                    <Text sx={{ color: "#fff" }}>{character.birth_year}</Text>
                  </Stack>
                </Grid.Col>

                <Grid.Col span={6}>
                  <Stack spacing="xs">
                    <Text
                      weight={500}
                      className="sw-glow"
                      sx={{ color: "var(--sw-yellow)" }}
                    >
                      Hair Color
                    </Text>
                    <Text sx={{ color: "#fff" }}>{character.hair_color}</Text>

                    <Text
                      weight={500}
                      mt="md"
                      className="sw-glow"
                      sx={{ color: "var(--sw-yellow)" }}
                    >
                      Eye Color
                    </Text>
                    <Text sx={{ color: "#fff" }}>{character.eye_color}</Text>

                    <Text
                      weight={500}
                      mt="md"
                      className="sw-glow"
                      sx={{ color: "var(--sw-yellow)" }}
                    >
                      Gender
                    </Text>
                    <Text sx={{ color: "#fff" }}>{character.gender}</Text>
                  </Stack>
                </Grid.Col>
              </Grid>
            </div>
          </Grid.Col>

          <Grid.Col md={4}>
            <div className="sw-card">
              <Title
                order={3}
                mb="xl"
                className="sw-glow"
                sx={{
                  color: "var(--sw-yellow)",
                  fontFamily: "Orbitron, sans-serif",
                }}
              >
                Homeworld
              </Title>
              {homeworldLoading ? (
                <Loader color="yellow" size="sm" />
              ) : (
                <Stack spacing="xs">
                  <Text
                    weight={500}
                    className="sw-glow"
                    sx={{ color: "var(--sw-yellow)" }}
                  >
                    Name
                  </Text>
                  <Text sx={{ color: "#fff" }}>{homeworld?.name}</Text>

                  <Text
                    weight={500}
                    mt="md"
                    className="sw-glow"
                    sx={{ color: "var(--sw-yellow)" }}
                  >
                    Climate
                  </Text>
                  <Text sx={{ color: "#fff" }}>{homeworld?.climate}</Text>

                  <Text
                    weight={500}
                    mt="md"
                    className="sw-glow"
                    sx={{ color: "var(--sw-yellow)" }}
                  >
                    Terrain
                  </Text>
                  <Text sx={{ color: "#fff" }}>{homeworld?.terrain}</Text>

                  <Text
                    weight={500}
                    mt="md"
                    className="sw-glow"
                    sx={{ color: "var(--sw-yellow)" }}
                  >
                    Population
                  </Text>
                  <Text sx={{ color: "#fff" }}>{homeworld?.population}</Text>
                </Stack>
              )}
            </div>

            <div className="sw-card" style={{ marginTop: "1rem" }}>
              <Title
                order={3}
                mb="xl"
                className="sw-glow"
                sx={{
                  color: "var(--sw-yellow)",
                  fontFamily: "Orbitron, sans-serif",
                }}
              >
                Films
              </Title>
              {filmsLoading ? (
                <Loader color="yellow" size="sm" />
              ) : (
                <Stack spacing="md">
                  {films?.map((film: Film) => (
                    <div
                      key={film.title}
                      className="sw-card"
                      style={{
                        padding: "0.5rem",
                        marginBottom: "0.5rem",
                        border: "1px solid rgba(255, 232, 31, 0.2)",
                      }}
                    >
                      <Text
                        sx={{ color: "var(--sw-yellow)" }}
                        size="lg"
                        weight={500}
                      >
                        {film.title}
                      </Text>
                      <Text sx={{ color: "#fff" }} size="sm">
                        {film.release_date}
                      </Text>
                    </div>
                  ))}
                </Stack>
              )}
            </div>
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
}
