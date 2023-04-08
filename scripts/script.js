// GLOBALs
const MAX_CHARS = 150;
const BASE_API = "https://bytegrad.com/course-assets/js/1/api";

const textareaEl = document.querySelector(".form__textarea");
const counterEl = document.querySelector(".counter");
const formEl = document.querySelector(".form");
const feedbackListEl = document.querySelector(".feedbacks");
const submitBtnEl = document.querySelector(".submit-btn");
const spinnerEl = document.querySelector(".spinner");

const renderFeedbackItems = (feedbackItem) => {
  const feedbackItemHTML = `
    <li class="feedback">
        <button class="upvote">
            <i class="fa-solid fa-caret-up upvote__icon"></i>
            <span class="upvote__count">${feedbackItem.upvoteCount}</span>
        </button>
        <section class="feedback__badge">
            <p class="feedback__letter">${feedbackItem.badgeLetter}</p>
        </section>
        <div class="feedback__content">
            <p class="feedback__company">${feedbackItem.company}</p>
            <p class="feedback__text">${feedbackItem.text}</p>
        </div>
        <p class="feedback__date">${
          feedbackItem.daysAgo === 0 ? "NEW" : `${feedbackItem.daysAgo}d`
        }</p>
    </li>
  `;

  feedbackListEl.insertAdjacentHTML("beforeend", feedbackItemHTML);
};

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
  const company = hashtag.replace("#", "");
  const badgeLetter = company.substring(0, 2).toUpperCase();
  const upvoteCount = 0;
  const daysAgo = 0;

  const feedbackItem = {
    upvoteCount,
    company,
    badgeLetter,
    text,
    daysAgo,
  };

  // const searchHash = /#/;
  // const hashtag2 = text.split(" ").filter((word) => word.match(searchHash));
  // console.log("regex:", hashtag2);

  // console.log(text.split(" ").filter((item) => item.includes("#")));
  renderFeedbackItems(feedbackItem);

  fetch(`${BASE_API}/feedbacks`, {
    method: "POST",
    body: JSON.stringify(feedbackItem),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        console.log(`Something went wrong: ${response.status} `);
        return;
      }
      console.log("successfully submitted");
    })
    .catch((error) => console.log(error));

  textareaEl.value = "";
  submitBtnEl.blur();
  counterEl.textContent = MAX_CHARS;
};
formEl.addEventListener("submit", submitHandler);

// Ajax programming allows to update elements without refrefreshing page
// FEEDBACK LIST COMPONENT

const clickHandler = async (event) => {
  const clickedEl = event.target;
  console.log(event);
  console.log(event.target);

  if (clickedEl.className.includes("upvote")) {
    const upvoteBtnEl = clickedEl.closest(".upvote");
    upvoteBtnEl.disabled = true;
  } else {
    clickedEl.closest(".feedback").classList.toggle("feedback--expand");
  }
};

feedbackListEl.addEventListener("click", clickHandler);

// fetch("https://jsonplaceholder.typicode.com/todos");
fetch(`${BASE_API}/feedbacks`)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    // console.log(data.feedbacks[0]);
    spinnerEl.remove();

    data.feedbacks.forEach((item) => renderFeedbackItems(item));
  })
  .catch((error) => {
    feedbackListEl.textContent = `Failed to fetch feedback items: ${error.message}`;
  });
