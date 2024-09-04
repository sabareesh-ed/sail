document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger, CustomEase, SplitType);
  
    function animatesectionOD() {
      const trigger = document.querySelector(".section_o-d-search");
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: trigger,
          start: "top top+=60%",
          once: true,
        },
      });
  
      tl.add([
        gsap.to(".o-d", {
          xPercent: 0,
          duration: 1,
          ease: CustomEase.create("zoom", ".9, 0, .1, 1"),
        }),
        gsap.to(
          ".o-d_content",
          {
            opacity: 1,
            duration: 1,
            ease: CustomEase.create("zoom", ".9, 0, .1, 1"),
          },
          "-=0.1"
        ),
      ]);
    }
  
    function animateMaskedSlideUp() {
      const elements = document.querySelectorAll("[animate='masked-slide-up']");
  
      elements.forEach((element) => {
        let typeSplit = new SplitType(element, {
          types: "lines, words, chars",
          tagName: "span",
        });
  
        gsap.from(element.querySelectorAll(".line"), {
          y: "100%",
          opacity: 0,
          duration: 0.5,
          ease: "power1.out",
          stagger: 0.05,
          scrollTrigger: {
            trigger: element,
            start: "top center",
            once: true, // Ensures the animation only plays once per element
          },
        });
      });
    }
  
    function animateFooterText() {
      const trigger = document.querySelector("[animate='slide-in-left']");
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: trigger,
          start: "top bottom-=20%",
          once: true,
        },
      });
  
      tl.add([
        gsap.fromTo(
          "[animate='slide-in-left']",
          {
            x: "-100%",
            opacity: 0,
          },
          {
            x: "0%",
            opacity: 1,
            duration: 1,
            ease: CustomEase.create("zoom", ".9, 0, .1, 1"),
          }
        ),
      ]);
    }
  
    animatesectionOD();
    animateMaskedSlideUp();
    animateFooterText();
  });
  