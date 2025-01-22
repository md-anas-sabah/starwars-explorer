const BASE_URL = "https://swapi.dev/api";

export interface Character {
  name: string;
  height: string;
  mass: string;
  birth_year: string;
  url: string;
}

export interface Planet {
  name: string;
  climate: string;
  terrain: string;
  population: string;
}

export const api = {
  async getCharacters(page = 1, search = "") {
    const response = await fetch(
      `${BASE_URL}/people/?page=${page}&search=${search}`
    );
    return response.json();
  },

  async getCharacter(id: string) {
    const response = await fetch(`${BASE_URL}/people/${id}`);
    return response.json();
  },

  async getCharacterHomeworld(url: string) {
    const response = await fetch(url);
    return response.json();
  },
};
