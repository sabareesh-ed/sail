document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger);
  
    const timelineImgWrapper = `.timeline-img-wrapper`;
    const timelineImgPrefix = `.timeline-img`;
    const timelineBgImgPrefix = `.timeline-bg`;
    const maskIncrement = 8;
  
    function createTimeline(
      serial,
      maskStart,
      maskEnd,
      maskPosStart,
      maskPosEnd,
      currBgImage,
      prevBgImage,
      currImage,
      prevImage
    ) {
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: `.link-wrap[data-serial='${serial}']`,
          start: "top center",
          end: "bottom center",
          toggleActions: "play none none reverse",
          scrub: true,
          markers: true,
          onEnter: () => {
            gsap.fromTo(
              timelineImgWrapper,
              { "--mask-size": maskStart, "--mask-position-x": maskPosStart },
              { "--mask-size": maskEnd, "--mask-position-x": maskPosEnd }
            );
            if (serial === 1) {
              gsap.set(currBgImage, { opacity: "1" });
              gsap.set(currImage, { opacity: "1" });
            } else {
              gsap.to(currBgImage, { opacity: "1", duration: 0.1 });
              gsap.to(currImage, { opacity: "1", duration: 0.1 });
              if (prevImage && prevBgImage) {
                gsap.to(prevBgImage, { opacity: "0", duration: 0.1 });
                gsap.to(prevImage, { opacity: "0", duration: 0.1 });
              }
            }
          },
          onLeaveBack: () => {
            gsap.fromTo(
              timelineImgWrapper,
              { "--mask-size": maskEnd, "--mask-position-x": maskPosEnd },
              { "--mask-size": maskStart, "--mask-position-x": maskPosStart }
            );
            if (serial !== 1) {
              gsap.to(currBgImage, { opacity: "0", duration: 0.1 });
              gsap.to(currImage, { opacity: "0", duration: 0.1 });
              if (prevImage && prevBgImage) {
                gsap.to(prevBgImage, { opacity: "1", duration: 0.1 });
                gsap.to(prevImage, { opacity: "1", duration: 0.1 });
              }
            }
          },
        },
      });
  
      tl.add(
        gsap.fromTo(
          `.link-wrap[data-serial='${serial}'] .link-item`,
          { rotateY: -90, force3D: false },
          { rotateY: 97, force3D: false }
        ),
        0
      );
    }
  
    function initAnimation() {
      if (window.innerWidth >= 992) {
        gsap.set(timelineImgWrapper, {
          css: {
            "--mask-size": "25vw",
            width: "100vw",
          },
        });
  
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  
        for (let serial = 1; serial <= 13; serial++) {
          let maskSizeStart = `${25 + (serial - 1) * maskIncrement}vw`;
          let maskSizeEnd = `${25 + serial * maskIncrement}vw`;
          let maskPosStart = 100;
          let maskPosEnd = 100;
  
          if (serial === 12) {
            maskSizeStart = "200vw";
            maskSizeEnd = "200vw";
            maskPosStart = 100;
            maskPosEnd = 85;
          }
  
          if (serial >= 12) {
            maskSizeStart = "200vw";
            maskSizeEnd = "200vw";
            maskPosEnd = 85;
          }
  
          createTimeline(
            serial,
            maskSizeStart,
            maskSizeEnd,
            `${maskPosStart}%`,
            `${maskPosEnd}%`,
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
  
    if (window.innerWidth >= 992) {
      initAnimation();
    }
  
    let resizeTimeout;
    let lastWidth = window.innerWidth;
  
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);
  
      resizeTimeout = setTimeout(() => {
        const currentWidth = window.innerWidth;
        if (
          (lastWidth < 992 && currentWidth >= 992) ||
          (lastWidth >= 992 && currentWidth < 992)
        ) {
          location.reload();
        }
        lastWidth = currentWidth;
      }, 150);
    });
  });
  