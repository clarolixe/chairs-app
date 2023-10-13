`use strict`;

// SLider component

const slider = function () {
  const slides = document.querySelectorAll(`.slide`);
  const btnLeft = document.querySelector(`.btn--left`);
  const btnRight = document.querySelector(`.btn--right`);
  const dotContainer = document.querySelector(`.dots`);
  const maxSlide = slides.length;

  let currentSlide = 0;

  // Functions
  const createDots = function () {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        `beforeend`,
        `<button class="dot" data-slide="${i}"></button>`
      );
    });
  };

  const activeDot = function (slide) {
    document
      .querySelectorAll(`.dot`)
      .forEach((d) => d.classList.remove(`dot--active`));
    document
      .querySelector(`.dot[data-slide="${slide}"]`)
      .classList.add(`dot--active`);
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${120 * (i - slide)}%)`)
    );
  };

  //   Next slide
  const nextSlide = function () {
    if (currentSlide === maxSlide - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    goToSlide(currentSlide);
    activeDot(currentSlide);
  };

  const prevSlide = function () {
    if (currentSlide === 0) {
      currentSlide = maxSlide - 1;
    } else {
      currentSlide--;
    }
    goToSlide(currentSlide);
    activeDot(currentSlide);
    console.log(currentSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();
    activeDot(0);
  };
  init();

  //   Event handlers
  btnRight.addEventListener(`click`, nextSlide);
  btnLeft.addEventListener(`click`, prevSlide);

  document.addEventListener(`keydown`, function (e) {
    e.preventDefault();
    if (e.key === `ArrowLeft`) prevSlide();
    e.key === `ArrowRight` && nextSlide();
  });

  dotContainer.addEventListener(`click`, function (e) {
    if (e.target.classList.contains(`dot`)) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activeDot(slide);
    }
  });
};
slider();

// Accordion component

const accordion = function () {
  const accordion = document.querySelector(`.accordion`);
  const hiddenBox = document.querySelectorAll(`.hidden-box`);
  const item = document.querySelectorAll(`.item`);

  const addIcons = function () {
    hiddenBox.forEach((b, i) =>
      b.insertAdjacentHTML(
        `beforebegin`,
        `<svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke-width="1.5"
  stroke="currentColor"
  class="icon"
  data-icon="${i + 1}"
>
  <path
    stroke-linecap="round"
    stroke-linejoin="round"
    d = "M19.5 8.25l-7.5 7.5-7.5-7.5"
  />
</svg>`
      )
    );
  };
  addIcons();

  // item.forEach((i) => i.classList.contains(`open`))
  //   ? (d = "M4.5 15.75l7.5-7.5 7.5 7.5")
  //   : (d = "M19.5 8.25l-7.5 7.5-7.5-7.5")

  // if (item.forEach((i) => i.classList.contains(`open`))) {
  //   d = "M4.5 15.75l7.5-7.5 7.5 7.5"
  // } else {
  //   d = "M19.5 8.25l-7.5 7.5-7.5-7.5"
  // }

  const icon = document.querySelectorAll(`.icon`);

  accordion.addEventListener(`click`, function (e) {
    e.preventDefault();

    const clicked = e.target.closest(`.item`);

    if (!clicked) return;

    const itemIndex = clicked.dataset.item;

    item.forEach((i) => {
      if (i.dataset.item !== itemIndex) i.classList.remove(`open`);
    });

    clicked.classList.contains(`open`)
      ? clicked.classList.remove(`open`)
      : clicked.classList.add(`open`);
  });
};

accordion();
