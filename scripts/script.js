// GLOBALs
const textareaEl = document.querySelector(".form__textarea");
const counterEl = document.querySelector(".counter");
const formEl = document.querySelector(".form");
const feedbackListEl = document.querySelector(".feedbacks");
const submitBtnEl = document.querySelector(".submit-btn");

const MAX_CHARS = 150;

// COUNTER COMPONENT
const inputHandler = () => {
  const nrCharsTyped = textareaEl.value.length;
  const remainingChars = MAX_CHARS - nrCharsTyped;
  counterEl.textContent = remainingChars;
};

textareaEl.addEventListener("input", inputHandler);

// FORM COMPONENT
const formVisualValidator = (validation) => {
  const className = `form--${validation}`;

  formEl.classList.add(className);

  setTimeout(() => {
    formEl.classList.remove(className);
  }, 2000);
};

const submitHandler = (event) => {
  event.preventDefault();
  const text = textareaEl.value.toString();

  if (text.length > 4 && text.includes("#")) {
    formVisualValidator("valid");
  } else {
    formVisualValidator("invalid");
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
  counterEl.textContent = MAX_CHARS;
};
formEl.addEventListener("submit", submitHandler);

// Ajax programming allows to update elements without refrefreshing page
// FEEDBACK LIST COMPONENT

fetch("https://jsonplaceholder.typicode.com/todos");
fetch("https://bytegrad.com/course-assets/js/1/api/feedbacks")
  .then((response) => {
    return response.json();
  })
  .then((item) => {
    console.log(item.feedbacks[0]);
    item.feedbacks.forEach((item) => {
      const feedbackItemHTML = `
    <li class="feedback">
        <button class="upvote">
            <i class="fa-solid fa-caret-up upvote__icon"></i>
            <span class="upvote__count">${item.upvoteCount}</span>
        </button>
        <section class="feedback__badge">
            <p class="feedback__letter">${item.badgeLetter}</p>
        </section>
        <div class="feedback__content">
            <p class="feedback__company">${item.company}</p>
            <p class="feedback__text">${item.text}</p>
        </div>
        <p class="feedback__date">${
          item.daysAgo === 0 ? "NEW" : `${item.daysAgo}d`
        }</p>
    </li>
  `;

      feedbackListEl.insertAdjacentHTML("beforeend", feedbackItemHTML);
    });
  });
