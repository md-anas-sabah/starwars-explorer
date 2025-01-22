import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import {
  Container,
  Table,
  Group,
  TextInput,
  Select,
  Paper,
  Button,
  Title,
  Loader,
  Text,
} from "@mantine/core";

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

  if (isLoading) return <Loader />;
  if (error) return <Text>Error loading characters</Text>;

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
    <Container size="xl">
      <Title order={2} mb="xl">
        Star Wars Characters
      </Title>

      <Paper p="md" mb="xl">
        <Group>
          <TextInput
            placeholder="Search characters..."
            icon={<FaSearch size={14} />}
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
            sx={{ flex: 1 }}
          />
          <Select
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
      </Paper>

      <Table highlightOnHover>
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
              <td>{character.name}</td>
              <td>{character.birth_year}</td>
              <td>{character.gender}</td>
              <td>
                <Button
                  variant="light"
                  size="xs"
                  onClick={() => handleRowClick(character.url)}
                >
                  View Details
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
