const btnDec = document.getElementById("decrease");
const btnInc = document.getElementById("increase");
const number = document.querySelector(".qty > div > p");
const errorMsg = document.querySelector(".qty > p");

const minQtyReached = new Event("minqtyreached");

btnDec.addEventListener("click", function () {
  if (Number(number.textContent) === 0) {
    errorMsg.dispatchEvent(minQtyReached);
    return;
  }
  number.textContent = Number(number.textContent) - 1;
});

btnInc.addEventListener("click", () => {
  if (btnDec.disabled) {
    btnDec.disabled = false;
  }
  //   if (errorMsg.style.display === "block") {
  //     errorMsg.style.display = "none";
  //   }
  if (errorMsg.checkVisibility({ visibilityProperty: true })) {
    errorMsg.style.visibility = "hidden";
  }
  number.textContent = Number(number.textContent) + 1;
});

errorMsg.addEventListener("minqtyreached", function () {
  //   console.log("error");
  //   this.style.display = "block";
  this.style.visibility = "visible";
  btnDec.disabled = true;
});

function colorRandomizer(element) {
  console.log(element);
  function randomizer() {
    const number = Math.floor(Math.random() * 255);
    return number;
  }
  const newColor = `rgb(${randomizer()}, ${randomizer()}, ${randomizer()})`;
  //   console.log(newColor);
  element.style.background = newColor;
}

function colorRandomizer2(event) {
  console.log(event.target);
  function randomizer() {
    const number = Math.floor(Math.random() * 255);
    return number;
  }
  const newColor = `rgb(${randomizer()}, ${randomizer()}, ${randomizer()})`;
  //   console.log(newColor);
  event.target.style.background = newColor;
}

// document.querySelectorAll(".box").forEach((el) => {
//   el.addEventListener("click", function (event) {
//     event.stopPropagation();
//     colorRandomizer(this);
//   });
// });

document.querySelector(".parent").addEventListener("click", colorRandomizer2);
