// kemarin digunakan => langsung menggunakan fetch
const origin = "https://openlibrary.org";
// const path = "/search.json";
// const params = "?q=laskar+pelangi";

// fetch(`${origin}${path}${params}`)
//   .then((response) => {
//     // lakukan parsing terhadap response yang diterima
//     return response.json();
//   })
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

async function searchBook(event) {
  event.preventDefault();
  // event.target.inputName
  const params = new URLSearchParams({
    title: event.target.search.value,
  });
  const searchBtn = document.querySelector("form button[type=submit]");
  const searchBtnText = document.querySelector("button p");
  const loader = document.querySelector("button .loader");
  try {
    // gunakan fetch dengan melalui objek request
    const url = `${origin}/search.json?${params.toString()}`;
    const request = new Request(url);
    // disable button, hide text and show loader
    searchBtn.disabled = true;
    searchBtnText.classList.add("hidden");
    loader.classList.remove("hidden");

    const response = await fetch(request);
    // biasanya error akan ditangani oleh catch
    // ada beberapa error yg tidak masuk catch, 404
    if (!response.ok) throw new Error(response.statusText);

    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.log(error);
  } finally {
    // enable button, show text and hide loader
    searchBtn.disabled = false;
    searchBtnText.classList.remove("hidden");
    loader.classList.add("hidden");
  }
}

async function createList(event) {
  event.preventDefault();
  const createBtn = document.querySelector("form:nth-child(2) button");
  const createBtnText = createBtn.querySelector("p");
  const loader = createBtn.querySelector(".loader");
  const body = {
    name: event.target.listname.value,
    description: event.target.description.value,
  };
  try {
    const user = "8hikki8";
    const url = `${origin}/people/${user}/lists`;
    const request = new Request(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body, // body: body
    });
    createBtn.disabled = true;
    createBtnText.classList.add("hidden");
    loader.classList.remove("hidden");

    const response = await fetch(request);
    if (!response.ok) throw new Error(response.statusText);
    const json = await response.json();
    console.log(json);
    response.headers.forEach((val, key) => {
      console.log(`${key} = ${val}`);
    });
  } catch (error) {
    console.log(error);
  } finally {
    createBtn.disabled = false;
    createBtnText.classList.remove("hidden");
    loader.classList.add("hidden");
  }
}
