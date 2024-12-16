function navigate(path, params = "") {
  const url = `${location.origin}${path}?${params}`;
  location.href = url;
}

function handleQuery() {
  const query = document.querySelector("form:first-child input[type=text]");
  //   console.log(query.value);
  const queryParams = new URLSearchParams({
    [query.name]: query.value,
  });
  navigate(location.pathname, queryParams);
  //   location.href += `?${query.name}=${query.value}`;
}

function handlePost() {
  const form = document.querySelector("body > form:nth-child(2)");
  const inputs = form.getElementsByTagName("input");
  const params = new URLSearchParams({});
  for (let input of inputs) {
    params.append(input.name, input.value);
  }
  navigate(location.pathname, params);
}
