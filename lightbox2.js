import PhotoSwipeLightbox from "https://cdn.jsdelivr.net/npm/photoswipe@5.4.4/dist/photoswipe-lightbox.esm.min.js";
import PhotoSwipe from "https://cdn.jsdelivr.net/npm/photoswipe@5.4.4/dist/photoswipe.esm.min.js";

$(document).ready(function () {
  const omrMenu = $("#omr-menu a");
  const omrSpecials = $("#omr-specials a");
  const rjrMenu = $("#rjr-menu a");
  const rjrSpecials = $("#rjr-specials a");
  const hennurMenu = $("#hennur-menu a");
  const hennurSpecials = $("#hennur-specials a");

  const dataSourceOmrMenu = Array.from(omrMenu).map((element) => {
    var img = element.querySelector(".placeholder-img");
    return {
      src: element.href,
      width: element.getAttribute("data-pswp-width"),
      height: element.getAttribute("data-pswp-height"),
      alt: img.alt,
    };
  });
  const dataSourceOmrSpecials = Array.from(omrSpecials).map((element) => {
    var img = element.querySelector(".placeholder-img");
    return {
      src: element.href,
      width: element.getAttribute("data-pswp-width"),
      height: element.getAttribute("data-pswp-height"),
      alt: img.alt,
    };
  });
  const dataSourceRjrMenu = Array.from(rjrMenu).map((element) => {
    var img = element.querySelector(".placeholder-img");
    return {
      src: element.href,
      width: element.getAttribute("data-pswp-width"),
      height: element.getAttribute("data-pswp-height"),
      alt: img.alt,
    };
  });
  const dataSourceRjrSpecials = Array.from(rjrSpecials).map((element) => {
    var img = element.querySelector(".placeholder-img");
    return {
      src: element.href,
      width: element.getAttribute("data-pswp-width"),
      height: element.getAttribute("data-pswp-height"),
      alt: img.alt,
    };
  });
  const dataSourceHennurMenu = Array.from(hennurMenu).map((element) => {
    var img = element.querySelector(".placeholder-img");
    return {
      src: element.href,
      width: element.getAttribute("data-pswp-width"),
      height: element.getAttribute("data-pswp-height"),
      alt: img.alt,
    };
  });
  const dataSourceHennurSpecials = Array.from(hennurSpecials).map((element) => {
    var img = element.querySelector(".placeholder-img");
    return {
      src: element.href,
      width: element.getAttribute("data-pswp-width"),
      height: element.getAttribute("data-pswp-height"),
      alt: img.alt,
    };
  });

  const openPhotoSwipe = (e, dataSource) => {
    e.preventDefault();
    const options = {
      dataSource: dataSource,
      pswpModule: PhotoSwipe,
      showHideAnimationType: "none",
      zoomAnimationDuration: false,
      maxZoomLevel: 4,
      showAnimationDuration: 0,
      preloaderDelay: 0,
      closeOnVerticalDrag: false,
    };

    const lightbox = new PhotoSwipeLightbox(options);
    lightbox.init();
    lightbox.loadAndOpen();
  };

  // initializing PhotoSwipe core adds it to DOM
  $("#open-omr-menu").on("click", function (e) {
    openPhotoSwipe(e, dataSourceOmrMenu); //Open OMR Menu
  });
  // initializing PhotoSwipe core adds it to DOM
  $("#open-omr-specials").on("click", function (e) {
    openPhotoSwipe(e, dataSourceOmrSpecials); // Open OMR Specials Menu
  });
  // initializing PhotoSwipe core adds it to DOM
  $("#open-rjr-menu").on("click", function (e) {
    openPhotoSwipe(e, dataSourceRjrMenu); // Open RJR Menu
  });
  // initializing PhotoSwipe core adds it to DOM
  $("#open-rjr-specials").on("click", function (e) {
    openPhotoSwipe(e, dataSourceRjrSpecials); // Open RJR Specials
  });
  // initializing PhotoSwipe core adds it to DOM
  $("#open-hennur-menu").on("click", function (e) {
    openPhotoSwipe(e, dataSourceHennurMenu); // Open Hennur Menu
  });
  // initializing PhotoSwipe core adds it to DOM
  $("#open-hennur-specials").on("click", function (e) {
    openPhotoSwipe(e, dataSourceHennurSpecials); // Open Hennur Specials
  });
});
