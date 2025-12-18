//модалка

const modal = document.querySelector(".modal");
const buttons = document.querySelectorAll(".modal__button");

buttons.forEach((btn) => {
  btn.addEventListener("click", openModal);
});
modal.addEventListener("click", closeModal);

function openModal(e) {
  e.preventDefault();
  document.body.classList.toggle("body--opened-modal");
}

function closeModal(e) {
  e.preventDefault();

  const target = e.target;

  if (target.closest(".modal__cancel") || target.classList.contains("modal")) {
    document.body.classList.remove("body--opened-modal");
  }
}

//скрол
(function () {
  const circle = document.querySelector(".scroll-circle");
  const ovalHeight = 37;
  const circleDiameter = 10;
  const topMargin = 4;
  const bottomMargin = ovalHeight - circleDiameter - 5;

  const maxTrajectory = 1000;

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    let scrollPercent = scrollTop / maxTrajectory;
    scrollPercent = Math.min(Math.max(scrollPercent, 0), 1);
    const newTop = topMargin + (bottomMargin - topMargin) * scrollPercent;
    circle.style.top = newTop + "px";
  });
})();

//аккардеон

const accordionLists = document.querySelectorAll(".accordion-list");

// При загрузке открыть первую вкладку в каждом аккордеоне
accordionLists.forEach((accordionList) => {
  const firstItem = accordionList.querySelector(".accordion-list__item");
  if (
    firstItem &&
    !firstItem.classList.contains("accordion-list_item--opened")
  ) {
    firstItem.classList.add("accordion-list_item--opened");
    const firstContent = firstItem.querySelector(
      ".accordion-list__control"
    ).nextElementSibling;
    if (firstContent) {
      firstContent.style.maxHeight = firstContent.scrollHeight + "px";
    }
  }
});

accordionLists.forEach((accordionList) => {
  accordionList.addEventListener("click", (e) => {
    const accordionControl = e.target.closest(".accordion-list__control");
    if (!accordionControl) return;
    e.preventDefault();

    const accordionItem = accordionControl.parentElement;
    const accordionContent = accordionControl.nextElementSibling;

    // Найти открытый элемент (если есть) в этом списке
    const openedItem = accordionList.querySelector(
      ".accordion-list_item--opened"
    );
    // if (openedItem && openedItem !== accordionItem) {
    //   // Закрыть ранее открытый элемент
    //   openedItem.classList.remove("accordion-list_item--opened");
    //   const openedContent = openedItem.querySelector(
    //     ".accordion-list__control"
    //   ).nextElementSibling;
    //   if (openedContent) {
    //     openedContent.style.maxHeight = null;
    //   }
    // }

    // Переключить класс у выбранного элемента
    accordionItem.classList.toggle("accordion-list_item--opened");

    // Установить/сбросить maxHeight у текущего содержимого
    if (accordionItem.classList.contains("accordion-list_item--opened")) {
      accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
    } else {
      accordionContent.style.maxHeight = null;
    }
  });
});

// слайдер-галерея

const advertisementsSwiper = new Swiper(".advertisements__slider", {
  slidesPerView: "auto",
  centeredSlides: false,
  spaceBetween: 0,
  slidesOffsetBefore: 0,
  slidesOffsetAfter: 20,
  navigation: {
    nextEl: ".advertisements__next",
    prevEl: ".advertisements__prev",
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
      spaceBetween: 20,
    centeredSlides: true,
    },
    901: {
      slidesPerView: 1.5,
    },
    1201: {
      slidesPerView: 3,
    },
  },
  on: {
    init: function () {
      updateSlideOpacity(this);
    },
    slideChange: function () {
      updateSlideOpacity(this);
    },
    resize: function () {
      updateSlideOpacity(this);
    },
  },
});

function updateSlideOpacity(swiper) {
  const containerWidth = swiper.width; // ширина видимой области слайдера

  swiper.slides.forEach((slide) => {
    const slideLeft = slide.offsetLeft - swiper.translate * -1;
    const slideRight = slideLeft + slide.offsetWidth;

    if (slideRight <= 0 || slideLeft >= containerWidth) {
      slide.style.opacity = "0.3"; // затемненные слайды, которые вне видимой области
    } else {
      slide.style.opacity = "1"; // слайды внутри видимой области
    }
  });
}

// Аккордеон внутри слайдов
document.querySelectorAll(".advertisements__info-text").forEach((block) => {
  const button = block.querySelector(".advertisements__toggle-text");
  const wrapper = block.querySelector(".advertisements__text-wrapper");

  button.addEventListener("click", () => {
    wrapper.classList.toggle("expanded");
    button.textContent = wrapper.classList.contains("expanded")
      ? "Скрыть"
      : "Подробнее";
  });
});
// слайдер для job
const jobSwiper = new Swiper(".job__slider", {
  slidesPerView: "auto",
  centeredSlides: false,
  spaceBetween: 0,
  slidesOffsetBefore: 0,
  slidesOffsetAfter: 20,
  navigation: {
    nextEl: ".job__next",
    prevEl: ".job__prev",
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
      spaceBetween: 20,
    centeredSlides: true,
    },
    901: {
      slidesPerView: 1.5,
    },
    1201: {
      slidesPerView: 3,
    },
  },
  on: {
    init: function () {
      updateSlideOpacity(this);
    },
    slideChange: function () {
      updateSlideOpacity(this);
    },
    resize: function () {
      updateSlideOpacity(this);
    },
  },
});

function updateSlideOpacity(swiper) {
  const containerWidth = swiper.width;

  swiper.slides.forEach((slide) => {
    const slideLeft = slide.offsetLeft - swiper.translate * -1;
    const slideRight = slideLeft + slide.offsetWidth;

    if (slideRight <= 0 || slideLeft >= containerWidth) {
      slide.style.opacity = "0.3";
    } else {
      slide.style.opacity = "1";
    }
  });
}

// Аккордеон внутри слайдов job__slider
document.querySelectorAll(".job__info-text").forEach((block) => {
  const button = block.querySelector(".job__toggle-text");
  const wrapper = block.querySelector(".job__text-wrapper");

  button.addEventListener("click", () => {
    wrapper.classList.toggle("expanded");
    button.textContent = wrapper.classList.contains("expanded")
      ? "Скрыть"
      : "Подробнее";
  });
});

//скрол вверх
document.getElementById("scrollUpBtn").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
