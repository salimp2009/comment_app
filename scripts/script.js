// GLOBALs
const textareaEl = document.querySelector(".form__textarea");
const counterEl = document.querySelector(".counter");
const formEl = document.querySelector(".form");

// COUNTER COMPONENT
const inputHandler = () => {
  const maxNrChars = 150;
  const nrCharsTyped = textareaEl.value.length;
  const remainingChars = maxNrChars - nrCharsTyped;
  counterEl.textContent = remainingChars;
  console.log(remainingChars);
};

textareaEl.addEventListener("input", inputHandler);

// FORM COMPONENT
const submitHandler = (event) => {
  event.preventDefault();
  const text = textareaEl.value.toString();
  console.log(text);

  if (text.length > 5 && text.includes("#")) {
    console.log(true);
    formEl.classList.add("form--valid");
  } else {
    formEl.classList.add("form--invalid");
    console.log(false);
  }
};
formEl.addEventListener("submit", submitHandler);
