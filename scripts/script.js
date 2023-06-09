// GLOBALs
const MAX_CHARS = 150;
const BASE_API_URL = "https://bytegrad.com/course-assets/js/1/api";

const textareaEl = document.querySelector(".form__textarea");
const counterEl = document.querySelector(".counter");
const formEl = document.querySelector(".form");
const feedbackListEl = document.querySelector(".feedbacks");
const submitBtnEl = document.querySelector(".submit-btn");
const spinnerEl = document.querySelector(".spinner");
const hashtagListEl = document.querySelector(".hashtags");

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

// this does not work; hashtagItem.querySelector(".hashtag") gives an error
// as if querySelector is not a function
const addHashTag = (hashtag) => {
  const feedbackItemHashTag = `
        <li class="hashtags__item">
          <button class="hashtag">${`#${hashtag}`}</button>
        </li>
`;
  console.log(hashtag);

  hashtagListEl.childNodes.forEach((childnode) => {
    console.log(childnode.nodeType);
    if (childnode.nodeType === 3) {
      return;
    }
    const companyFrmHashTagLst = childnode
      .querySelector(".hashtag")
      .textContent.substring(1)
      .toLowerCase()
      .trim();

    console.log(companyFrmHashTagLst);
    if (companyFrmHashTagLst === `${hashtag.trim()}`) {
      return;
    }
  });
  hashtagListEl.insertAdjacentHTML("beforeend", feedbackItemHashTag);
};

function hasScript(text) {
  const scriptPattern = /<[\s\S]*?script[\s\S]*?>/i;
  return scriptPattern.test(text);
}

// COUNTER COMPONENT
(() => {
  const inputHandler = () => {
    const nrCharsTyped = textareaEl.value.length;
    const remainingChars = MAX_CHARS - nrCharsTyped;
    counterEl.textContent = remainingChars;
  };

  textareaEl.addEventListener("input", inputHandler);
})();

// FORM COMPONENT
(() => {
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

    if (text.length > 4 && text.includes("#") && !hasScript(text)) {
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

    // const searchRegex = /#/;
    // const hashtag2 = text.split(" ").filter((word) => word.match(searchRegex));
    // console.log("regex:", hashtag2);

    // console.log(text.split(" ").filter((item) => item.includes("#")));
    renderFeedbackItems(feedbackItem);
    addHashTag(feedbackItem.company);

    fetch(`${BASE_API_URL}/feedbacks`, {
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
})();

// Ajax programming allows to update elements without refrefreshing page
// FEEDBACK LIST COMPONENT
(() => {
  const clickHandler = (event) => {
    const clickedEl = event.target;
    console.log(event);
    console.log(event.target);

    if (clickedEl.className.includes("upvote")) {
      const upvoteBtnEl = clickedEl.closest(".upvote");
      upvoteBtnEl.disabled = true;

      const upvoteCountEl = upvoteBtnEl.querySelector(".upvote__count");
      // + sign turns string into number
      let upvoteCount = +upvoteCountEl.textContent;
      upvoteCountEl.textContent = ++upvoteCount;
    } else {
      clickedEl.closest(".feedback").classList.toggle("feedback--expand");
    }
  };

  feedbackListEl.addEventListener("click", clickHandler);

  // fetch("https://jsonplaceholder.typicode.com/todos");
  fetch(`${BASE_API_URL}/feedbacks`)
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
})();

// HASHTAG LIST COMPONENT
// additional (()=>{})() is to have those function within that
// specific scope therefore prevent name clash; (old way of doing)
// modern way is to have in seperate files and components
(() => {
  const clickHandler = (event) => {
    const clickedEl = event.target;
    if (clickedEl.className === "hashtags") return;

    console.log(event);
    console.log(clickedEl);
    const companyNameFrmHshTag = clickedEl.textContent
      .substring(1)
      .toLowerCase()
      .trim();
    console.log(companyNameFrmHshTag);

    feedbackListEl.childNodes.forEach((childnode) => {
      if (childnode.nodeType === 3) return;
      // console.log(childnode);
      const companyName = childnode
        .querySelector(".feedback__company")
        .textContent.toLowerCase()
        .trim();
      if (companyName !== companyNameFrmHshTag) {
        childnode.remove();
      }
    });
  };

  hashtagListEl.addEventListener("click", clickHandler);
})();
