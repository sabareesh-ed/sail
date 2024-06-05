import PhotoSwipeLightbox from "https://cdn.jsdelivr.net/npm/photoswipe@5.4.4/dist/photoswipe-lightbox.esm.min.js";
import PhotoSwipe from "https://cdn.jsdelivr.net/npm/photoswipe@5.4.4/dist/photoswipe.esm.min.js";
$(document).ready(function () {
  console.log("ready!");

  const galleryElements = $("#gallery--1 a");

  console.log(galleryElements);
  const dataSource = Array.from(galleryElements).map((element) => {
    var img = element.querySelector(".placeholder-img");
    return {
      srcset: element.href,
      src: element.href,
      width: element.getAttribute("data-pswp-width"),
      height: element.getAttribute("data-pswp-height"),
      alt: img.alt,
      msrc: "https://upload.wikimedia.org/wikipedia/commons/f/f2/16x9_Transparent.png",
    };
  });

  const openPhotoSwipe = (e) => {
    e.preventDefault();
    const options = {
      // gallery: "#gallery--1",
      // children: "a",
      dataSource: dataSource,
      showHideAnimationType: "none",
      zoomAnimationDuration: false,
      maxZoomLevel: 4,
      pswpModule: PhotoSwipe,
    };

    // const lightbox = new PhotoSwipeLightbox({
    //   gallery: "#gallery--1",
    //   children: "a",

    //   dataSource: dataSource,
    //   initialZoomLevel: "fit",
    //   showHideAnimationType: "none",
    //   pswpModule: PhotoSwipe,
    //   showAnimationDuration: 0,
    // });

    const lightbox = new PhotoSwipeLightbox(options);
    lightbox.init();
    lightbox.loadAndOpen();
  };

  // initializing PhotoSwipe core adds it to DOM
  document.getElementById("btn").addEventListener("click", function (e) {
    openPhotoSwipe(e); // Simulate click on the first image
  });
});
