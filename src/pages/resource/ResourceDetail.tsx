import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Container,
  Grid,
  Paper,
  Text,
  Title,
  Group,
  Button,
  Loader,
  Stack,
  Badge,
} from "@mantine/core";
import { FaArrowLeft } from "react-icons/fa";

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
          background: "linear-gradient(45deg, #000000 0%, #1a1a1a 100%)",
          gap: "1rem",
        }}
      >
        <Text
          size={42}
          weight={700}
          variant="gradient"
          gradient={{ from: "yellow", to: "orange", deg: 45 }}
        >
          STAR WARS
        </Text>
        <Loader color="yellow" size="xl" variant="bars" />
      </div>
    );

  return (
    <Container size="xl">
      <Group position="apart" mb="xl">
        <Button
          leftIcon={<FaArrowLeft size={14} />}
          variant="light"
          onClick={() => navigate("/resources")}
        >
          Back to List
        </Button>
      </Group>

      <Grid>
        <Grid.Col md={8}>
          <Paper p="xl" withBorder>
            <Title order={2} mb="xl">
              {character.name}
            </Title>

            <Grid>
              <Grid.Col span={6}>
                <Stack spacing="xs">
                  <Text weight={500}>Height</Text>
                  <Text>{character.height} cm</Text>

                  <Text weight={500} mt="md">
                    Mass
                  </Text>
                  <Text>{character.mass} kg</Text>

                  <Text weight={500} mt="md">
                    Birth Year
                  </Text>
                  <Text>{character.birth_year}</Text>
                </Stack>
              </Grid.Col>

              <Grid.Col span={6}>
                <Stack spacing="xs">
                  <Text weight={500}>Hair Color</Text>
                  <Text>{character.hair_color}</Text>

                  <Text weight={500} mt="md">
                    Eye Color
                  </Text>
                  <Text>{character.eye_color}</Text>

                  <Text weight={500} mt="md">
                    Gender
                  </Text>
                  <Text>{character.gender}</Text>
                </Stack>
              </Grid.Col>
            </Grid>
          </Paper>
        </Grid.Col>

        <Grid.Col md={4}>
          <Paper p="xl" withBorder>
            <Title order={3} mb="xl">
              Homeworld
            </Title>
            {homeworldLoading ? (
              <Loader size="sm" />
            ) : (
              <Stack spacing="xs">
                <Text weight={500}>Name</Text>
                <Text>{homeworld?.name}</Text>

                <Text weight={500} mt="md">
                  Climate
                </Text>
                <Text>{homeworld?.climate}</Text>

                <Text weight={500} mt="md">
                  Terrain
                </Text>
                <Text>{homeworld?.terrain}</Text>

                <Text weight={500} mt="md">
                  Population
                </Text>
                <Text>{homeworld?.population}</Text>
              </Stack>
            )}
          </Paper>

          <Paper p="xl" withBorder mt="md">
            <Title order={3} mb="xl">
              Films
            </Title>
            {filmsLoading ? (
              <Loader size="sm" />
            ) : (
              <Stack spacing="md">
                {films?.map((film: Film) => (
                  <Group key={film.title}>
                    <Badge size="lg">{film.title}</Badge>
                    <Text size="sm" color="dimmed">
                      {film.release_date}
                    </Text>
                  </Group>
                ))}
              </Stack>
            )}
          </Paper>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
