const getPokemonBtn = document.querySelector(".list-control > button");
const inputs = document.querySelectorAll(".list-control > input");
const pokemonView = document.querySelector(".pokemon");
const pokemonList = pokemonView.querySelector("ol");
const loader = pokemonView.querySelector(".loader");
getPokemonBtn.addEventListener("click", async () => {
  const baseUrl = "https://pokeapi.co/api/v2";
  const path = "/pokemon";
  try {
    const params = {};
    const re = /\D/g;
    for (let [_, input] of inputs.entries()) {
      if (re.test(input.value)) {
        throw new Error(`Invalid Input at ${input.name}`);
      }
      Object.assign(params, {
        [input.name]: input.value,
      });
    }
    const offset = (Number(params.page) - 1) * Number(params.limit);

    const searchParams = new URLSearchParams({
      limit: params.limit,
      offset,
    });
    const url = `${baseUrl}${path}?${searchParams}`;
    const request = new Request(url);

    getPokemonBtn.disabled = true;
    while (pokemonList.firstChild) {
      pokemonList.removeChild(pokemonList.firstChild);
    }
    loader.classList.remove("hidden");
    const response = await fetch(request);
    if (!response.ok) throw new Error(response.statusText);
    const json = await response.json();
    // console.log(json);
    const pokemons = [];
    for (let pokemon of json.results) {
      const li = document.createElement("li");
      li.textContent = pokemon.name;
      pokemons.push(li);
    }
    loader.classList.add("hidden");
    pokemonList.append(...pokemons);
    getPokemonBtn.disabled = false;
  } catch (error) {
    console.log(error);
  }
});
