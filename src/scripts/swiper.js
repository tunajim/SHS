import Swiper from "swiper";
import { Navigation, Pagination, EffectCoverflow } from "swiper/modules";
// import Swiper and modules styles
// import "swiper/css";

console.log("Swiper initialized");

var swiper = new Swiper(".mySwiper", {
  modules: [Pagination, EffectCoverflow],
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: 'auto',
  coverflowEffect: {
    rotate: 0,
    stretch: -10,
    depth: 50,
    modifier: 5,
    slideShadows: false,
  },
  pagination: {
    el: ".swiper-pagination",
  },
});

var swiper2 = new Swiper(".mySwiper2", {
  modules: [Navigation, Pagination, EffectCoverflow],
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: 'auto',
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  },
  pagination: {
    el: ".swiper-pagination",
  },
});
