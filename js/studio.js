const menuButton = document.getElementById("menuButton");
const mobileMenu = document.querySelector(".mobile-menu");

if (menuButton && mobileMenu) {
    menuButton.addEventListener("click", () => {
        mobileMenu.classList.toggle("active");
        menuButton.classList.toggle("active");
    });
}


window.addEventListener("scroll", () => {

    const navbar = document.querySelector(".navbar");

    if (!navbar) return;

    if (window.scrollY > 40) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

});


const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;


if (!reducedMotion && typeof gsap !== "undefined") {

    gsap.from(".studio-meta", {
        opacity: 0,
        y: -20,
        duration: 1,
        ease: "power3.out"
    });

    gsap.from(".studio-hero-content .eyebrow", {
        opacity: 0,
        y: 25,
        duration: .8,
        delay: .2,
        ease: "power3.out"
    });

    gsap.from(".studio-hero-content h1", {
        opacity: 0,
        y: 70,
        duration: 1.2,
        delay: .35,
        ease: "power4.out"
    });

    gsap.from(".studio-hero-content p", {
        opacity: 0,
        y: 30,
        duration: .9,
        delay: .65,
        ease: "power3.out"
    });

    gsap.from(".studio-hero-actions", {
        opacity: 0,
        y: 25,
        duration: .8,
        delay: .85,
        ease: "power3.out"
    });

    gsap.from(".studio-hero-bottom", {
        opacity: 0,
        duration: 1,
        delay: 1.2
    });

}


const revealElements = document.querySelectorAll(
    ".manifesto-content, .vision-content, .principle-card, .culture-content, .culture-item, .studio-cta-card"
);


if (!reducedMotion) {

    const observer = new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("active");

                observer.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.12
    });


    revealElements.forEach((element, index) => {

        element.classList.add("studio-reveal");

        element.style.transition =
            `opacity .9s ease ${index * 0.04}s,
             transform .9s cubic-bezier(.22,1,.36,1) ${index * 0.04}s`;

        observer.observe(element);

    });

}


const systemVisual = document.querySelector(".system-visual");

if (systemVisual && !reducedMotion) {

    document.addEventListener("mousemove", (event) => {

        const x = (event.clientX / window.innerWidth - 0.5) * 2;
        const y = (event.clientY / window.innerHeight - 0.5) * 2;

        systemVisual.style.transform =
            `perspective(1000px)
             rotateX(${y * -2}deg)
             rotateY(${x * 2}deg)`;

    });

}


const principleCards = document.querySelectorAll(".principle-card");

if (!reducedMotion) {

    principleCards.forEach((card) => {

        card.addEventListener("mousemove", (event) => {

            const rect = card.getBoundingClientRect();

            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const rotateX =
                ((y / rect.height) - 0.5) * -4;

            const rotateY =
                ((x / rect.width) - 0.5) * 4;

            card.style.transform =
                `perspective(800px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-4px)`;

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform =
                "perspective(800px) rotateX(0) rotateY(0) translateY(0)";

        });

    });

}