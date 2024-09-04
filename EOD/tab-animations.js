document.addEventListener("DOMContentLoaded", (event) => {
    const PSWrapper = document.querySelector(".problems-solutions-wrapper");
    const toggleBtn = PSWrapper.querySelector(".toggle-btn");
  
    gsap.registerPlugin(ScrollTrigger);
  
    toggleBtn.addEventListener("click", function (e) {
      console.log(e.target);
      toggleBtn
        .querySelector(".toggle-dot")
        .classList.remove("toggle-dot-animate");
  
      const currentTab = PSWrapper.getAttribute("current-tab");
  
      if (currentTab === "challenges") {
        PSWrapper.setAttribute("current-tab", "solutions");
  
        const pointWrapper = PSWrapper.querySelectorAll(".tab-content_point");
        const solutionsTab = PSWrapper.querySelectorAll(
          ".tab-content_point.solution"
        );
        const challengesTab = PSWrapper.querySelectorAll(
          ".tab-content_point.challenge"
        );
  
        const tl = gsap.timeline();
        tl.to(solutionsTab, {
          x: "-100%",
          opacity: 1,
          stagger: 0.15,
          ease: "sine.out",
        }).to(
          challengesTab,
          {
            x: "-100%",
            opacity: 0,
            stagger: 0.15,
            ease: "sine.out",
          },
          0
        );
      } else if (currentTab === "solutions") {
        PSWrapper.setAttribute("current-tab", "challenges");
  
        const solutionsTab = PSWrapper.querySelectorAll(
          ".tab-content_point.solution"
        );
        const challengesTab = PSWrapper.querySelectorAll(
          ".tab-content_point.challenge"
        );
  
        const tl = gsap.timeline();
        tl.to(solutionsTab, {
          x: "-200%",
          opacity: 0,
          stagger: 0.15,
          ease: "sine.out",
        }).to(
          challengesTab,
          {
            x: "0%",
            opacity: 1,
            stagger: 0.15,
            ease: "sine.out",
          },
          0
        );
      }
    });
  });
  