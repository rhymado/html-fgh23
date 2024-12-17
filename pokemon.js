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
    // validasi pada input page dan limit
    const re = /\D/g; // mencari yang non digit
    for (let [_, input] of inputs.entries()) {
      if (re.test(input.value)) {
        throw new Error(`Invalid Input at ${input.name}`);
      }
      // bagi yg lolos validasi, dimasukkan ke dalam object params
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
    // disable button, hilangkan elemen li didalam ol, munculkan loader
    getPokemonBtn.disabled = true;
    while (pokemonList.firstChild) {
      pokemonList.removeChild(pokemonList.firstChild);
    }
    loader.classList.remove("hidden");

    const response = await fetch(request);
    // handler status gagal yang tidak masuk catch
    if (!response.ok) throw new Error(response.statusText);
    const json = await response.json();
    // buat elemen li berdasarkan response dari fetch
    const pokemons = [];
    for (let pokemon of json.results) {
      const li = document.createElement("li");
      li.textContent = pokemon.name;
      pokemons.push(li);
    }
    // loader disembunyikan, li dimasukkan ke ol, enable button
    loader.classList.add("hidden");
    pokemonList.append(...pokemons);
    getPokemonBtn.disabled = false;
  } catch (error) {
    console.log(error);
  }
});
