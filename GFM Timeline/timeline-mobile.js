document.addEventListener("DOMContentLoaded", (event) => {

gsap.registerPlugin(ScrollTrigger);

const timelineImgWrapper = `.timeline-img-wrapper`;
const timelineImgPrefix = `.timeline-img`;
const timelineBgImgPrefix = `.timeline-bg`;
const maskIncrement = 11;
const maskPositionIncrement = (100 - 70) / 11; // Decrement mask position from 100% to 85% over 13 images
const widthIncrement = (100 - 50) / 7; // Increased width increment
const widthIncrementMobile = (100 - 50) / 13; // Adjusted width increment for mobile
const maskIncrementMobile = (120 - 30) / 12; // Adjusted mask increment for mobile
function createMobileTimeline(
  serial,
  maskStart,
  maskEnd,
  currBgImage,
  prevBgImage,
  currImage,
  prevImage
) {
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: `.spacer-100vh[data-serial='${serial}']`,
      start: "top bottom",
      end: "bottom center",
      scrub: true,
    //   markers: true,
      onEnter: () => {
        if (serial === 1) {
          gsap.set(timelineImgWrapper, { "--mask-size": maskEnd });
          gsap.set(currBgImage, { opacity: "1" });
          gsap.set(currImage, { opacity: "1" });
        } else {
          gsap.fromTo(
            timelineImgWrapper,
            { "--mask-size": maskStart },
            { "--mask-size": maskEnd }
          );
          gsap.to(currImage, { opacity: "1", duration: 0.1 });
          gsap.to(currBgImage, { opacity: "1", duration: 0.1 });

          if (prevImage && prevBgImage) {
            gsap.to(prevBgImage, { opacity: "0", duration: 0.1 });
            gsap.to(prevImage, { opacity: "0", duration: 0.1 });
          }
        }
      },
      onLeaveBack: () => {
        if (serial !== 1) {
          gsap.fromTo(
            timelineImgWrapper,
            { "--mask-size": maskEnd },
            { "--mask-size": maskStart }
          );
          gsap.to(currImage, { opacity: "0", duration: 0.1 });
          gsap.to(currBgImage, { opacity: "0", duration: 0.1 });

          if (prevImage && prevBgImage) {
            gsap.to(prevBgImage, { opacity: "1", duration: 0.1 });
            gsap.to(prevImage, { opacity: "1", duration: 0.1 });
          }
        }
      },
    },
  });
  tl.add(
    [
      gsap.fromTo(
        `.link-wrap[data-serial='${serial}'] .link-item`,
        { rotateY: -90 },
        { rotateY: 100, duration: 1 }
      ),
    ],
    0
  );
}

function initMobileAnimation() {
  if (window.innerWidth <= 991) {
    gsap.set(timelineImgWrapper, {
      css: { "--mask-size": "30vh", width: "100vw" },
    });
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    for (let serial = 1; serial <= 13; serial++) {
      createMobileTimeline(
        serial,
        `${30 + (serial - 1) * maskIncrementMobile}vh`,
        `${30 + serial * maskIncrementMobile}vh`,
        `${timelineBgImgPrefix}[data-serial='${serial}']`,
        serial > 1
          ? `${timelineBgImgPrefix}[data-serial='${serial - 1}']`
          : null,
        `${timelineImgPrefix}[data-serial-img='${serial}']`,
        serial > 1
          ? `${timelineImgPrefix}[data-serial-img='${serial - 1}']`
          : null
      );
    }
  }
}

if (window.innerWidth <= 991) {
  initMobileAnimation();
}
})