// GLOBALs
const textareaEl = document.querySelector(".form__textarea");
const counterEl = document.querySelector(".counter");
const formEl = document.querySelector(".form");
const feedbackListEl = document.querySelector(".feedbacks");
const submitBtnEl = document.querySelector(".submit-btn");

// COUNTER COMPONENT
const inputHandler = () => {
  const maxNrChars = 150;
  const nrCharsTyped = textareaEl.value.length;
  const remainingChars = maxNrChars - nrCharsTyped;
  counterEl.textContent = remainingChars;
};

textareaEl.addEventListener("input", inputHandler);

// FORM COMPONENT
const submitHandler = (event) => {
  event.preventDefault();
  const text = textareaEl.value.toString();

  if (text.length > 4 && text.includes("#")) {
    formEl.classList.add("form--valid");

    setTimeout(() => {
      formEl.classList.remove("form--valid");
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

  const feedbackItemHTML = `
    <li class="feedback">
        <button class="upvote">
            <i class="fa-solid fa-caret-up upvote__icon"></i>
            <span class="upvote__count">${upvoteCount}</span>
        </button>
        <section class="feedback__badge">
            <p class="feedback__letter">${badgeLetter}</p>
        </section>
        <div class="feedback__content">
            <p class="feedback__company">${topic}</p>
            <p class="feedback__text">${text}</p>
        </div>
        <p class="feedback__date">${daysAgo === 0 ? "NEW" : `${daysAgo}d`}</p>
    </li>
  `;

  feedbackListEl.insertAdjacentHTML("beforeend", feedbackItemHTML);
  textareaEl.value = "";
  submitBtnEl.blur();
  counterEl.textContent = "150";
};
formEl.addEventListener("submit", submitHandler);
