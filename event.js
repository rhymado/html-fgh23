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
