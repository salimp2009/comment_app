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

  if (text.length > 4 && text.includes("#")) {
    formEl.classList.add("form--valid");

    setTimeout(() => {
      formEl.classList.remove("form--valid");
      textareaEl.value = "";
    }, 2000);
  } else {
    formEl.classList.add("form--invalid");

    setTimeout(() => {
      formEl.classList.remove("form--invalid");
    }, 2000);

    textareaEl.focus();
    return;
  }

  const hashtag = text.split(" ").find((word) => word.includes("#"));
  // original was company
  const topic = hashtag.replace("#", "");
  const badgeLetter = topic.substring(0, 2).toUpperCase();
  const upvoteCount = 0;
  const daysAgo = 0;

  // const searchHash = /#/;
  // const hashtag2 = text.split(" ").filter((word) => word.match(searchHash));
  // console.log("regex:", hashtag2);

  // console.log(text.split(" ").filter((item) => item.includes("#")));
};
formEl.addEventListener("submit", submitHandler);
