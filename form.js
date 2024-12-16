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

function handleSubmit(event) {
  event.preventDefault();
  const inputs = document.querySelectorAll("form:last-of-type input");
  const formInput = {};
  inputs.forEach((input) => {
    if (input.type === "text") {
      Object.assign(formInput, { [input.name]: input.value });
    }
    if (input.type === "radio") {
      if (input.checked) {
        Object.assign(formInput, { [input.name]: input.value });
      }
    }
    if (input.type === "checkbox") {
      if (input.checked) {
        if (!formInput.hobbies) Object.assign(formInput, { hobbies: [] });
        Object.assign(formInput, { hobbies: [...formInput.hobbies, input.name] });
      }
    }
  });
  const selectInput = document.querySelector("form:last-of-type select");
  Object.assign(formInput, { [selectInput.name]: selectInput.value });
  const textareaInput = document.querySelector("form:last-of-type textarea");
  Object.assign(formInput, { [textareaInput.name]: textareaInput.value });
  console.log(formInput);
}

function handleSubmitForm(event) {
  event.preventDefault();

  const inputs = document.querySelectorAll("form:last-of-type input");
  const formInput = new FormData();
  const hobbies = [];
  inputs.forEach((input) => {
    if (input.type === "text") {
      formInput.append(input.name, input.value);
    }
    if (input.type === "radio") {
      if (input.checked) {
        formInput.append(input.name, input.value);
      }
    }
    if (input.type === "checkbox") {
      if (input.checked) {
        hobbies.push(input.name);
      }
    }
  });
  formInput.append("hobbies", hobbies);
  const selectInput = document.querySelector("form:last-of-type select");
  formInput.append(selectInput.name, selectInput.value);
  const textareaInput = document.querySelector("form:last-of-type textarea");
  formInput.append(textareaInput.name, textareaInput.value);
  for (let key of formInput.keys()) {
    console.log(key, formInput.get(key));
  }
  console.log(new URLSearchParams(formInput).toString());
}
