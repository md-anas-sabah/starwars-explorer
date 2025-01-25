import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Group,
  TextInput,
  Select,
  Title,
  Loader,
  Text,
  Box,
} from "@mantine/core";
import { FaSearch } from "react-icons/fa";
import "../../styles/starwars.scss";
import SpaceBackground from "../../components/UI/SpaceBackground";

interface Character {
  name: string;
  birth_year: string;
  gender: string;
  url: string;
}

const fetchCharacters = async () => {
  const response = await fetch("https://swapi.dev/api/people");
  return response.json();
};

export default function ResourceList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [genderFilter, setGenderFilter] = useState<string | null>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["characters"],
    queryFn: fetchCharacters,
  });

  if (isLoading)
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

  const filteredCharacters = data?.results.filter((char: Character) => {
    const matchesSearch = char.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesGender = !genderFilter || char.gender === genderFilter;
    return matchesSearch && matchesGender;
  });

  const handleRowClick = (url: string) => {
    const id = url.split("/").filter(Boolean).pop();
    navigate(`/resources/${id}`);
  };

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
      <Container size="xl">
        <Title
          order={2}
          mb="xl"
          className="sw-glow"
          sx={{
            color: "var(--sw-yellow)",
            fontFamily: "Orbitron, sans-serif",
            paddingTop: "2rem",
          }}
        >
          Star Wars Characters
        </Title>

        <div className="sw-card" style={{ marginBottom: "2rem" }}>
          <Group>
            <TextInput
              className="sw-input"
              placeholder="Search characters..."
              icon={<FaSearch size={14} />}
              value={search}
              onChange={(e) => setSearch(e.currentTarget.value)}
              sx={{ flex: 1 }}
            />
            <Select
              className="sw-input"
              placeholder="Filter by gender"
              value={genderFilter}
              onChange={setGenderFilter}
              data={[
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
                { value: "n/a", label: "N/A" },
              ]}
              clearable
            />
          </Group>
        </div>

        {filteredCharacters?.length === 0 ? (
          <div
            className="sw-card"
            style={{
              textAlign: "center",
              padding: "3rem",
              background: "rgba(0, 0, 0, 0.7)",
            }}
          >
            <Text
              size="xl"
              sx={{ color: "var(--sw-yellow)" }}
              className="sw-glow"
            >
              No characters found in this galaxy...
            </Text>
          </div>
        ) : (
          <table className="sw-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Birth Year</th>
                <th>Gender</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCharacters?.map((character: Character) => (
                <tr key={character.url}>
                  <td className="sw-hologram">{character.name}</td>
                  <td>{character.birth_year}</td>
                  <td>
                    {character.gender.charAt(0).toUpperCase() +
                      character.gender.slice(1)}
                  </td>
                  <td>
                    <button
                      className="sw-button"
                      onClick={() => handleRowClick(character.url)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Container>
    </Box>
  );
}
