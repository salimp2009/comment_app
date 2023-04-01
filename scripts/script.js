// COUNTER COMPONENT
const textareaEl = document.querySelector(".form__textarea");
const counterEl = document.querySelector(".counter");
//
const inputHandler = () => {
  const maxNrChars = 150;
  const nrCharsTyped = textareaEl.value.length;
  const remainingChars = maxNrChars - nrCharsTyped;
  counterEl.textContent = remainingChars;
  console.log(remainingChars);
};

textareaEl.addEventListener("input", inputHandler);

// FORM COMPONENT
const formEl = document.querySelector(".form");

const submitHandler = (event) => {
  event.preventDefault();
  console.log(event);
};
formEl.addEventListener("submit", submitHandler);
