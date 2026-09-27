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

    const heroTimeline = gsap.timeline();

    heroTimeline
        .from(".contact-meta", {
            opacity: 0,
            y: -20,
            duration: .8,
            ease: "power3.out"
        })
        .from(".contact-hero-content .eyebrow", {
            opacity: 0,
            y: 20,
            duration: .7,
            ease: "power3.out"
        })
        .from(".contact-hero-content h1", {
            opacity: 0,
            y: 70,
            duration: 1.1,
            ease: "power4.out"
        })
        .from(".contact-hero-content p", {
            opacity: 0,
            y: 25,
            duration: .7,
            ease: "power3.out"
        })
        .from(".contact-scroll", {
            opacity: 0,
            duration: .7
        });


    const revealElements = document.querySelectorAll(
        ".contact-info, .contact-form-wrapper, .statement-frame, .contact-final-content"
    );


    const observer = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) return;

                gsap.fromTo(
                    entry.target,
                    {
                        opacity: 0,
                        y: 50
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        ease: "power3.out"
                    }
                );

                observer.unobserve(entry.target);

            });

        },
        {
            threshold: .12
        }
    );


    revealElements.forEach((element) => {
        observer.observe(element);
    });

}


/* SERVICE SELECTION */

const serviceOptions =
    document.querySelectorAll(".service-option");

const serviceInput =
    document.getElementById("service");


serviceOptions.forEach((option) => {

    option.addEventListener("click", () => {

        serviceOptions.forEach((item) => {
            item.classList.remove("selected");
        });

        option.classList.add("selected");

        serviceInput.value =
            option.dataset.value;

    });

});


/* FORM */

const contactForm =
    document.getElementById("contactForm");

const formSuccess =
    document.getElementById("formSuccess");

const resetForm =
    document.getElementById("resetForm");


contactForm.addEventListener("submit", (event) => {

    event.preventDefault();


    if (!serviceInput.value) {

        serviceOptions[0].focus();

        return;

    }


    const submitButton =
        contactForm.querySelector(".submit-button");


    submitButton.disabled = true;

    submitButton.innerHTML =
        "<span>Sending...</span><span>•••</span>";


    setTimeout(() => {

        contactForm.style.display = "none";

        formSuccess.classList.add("active");


        if (!reducedMotion && typeof gsap !== "undefined") {

            gsap.from(".form-success > *", {
                opacity: 0,
                y: 25,
                duration: .7,
                stagger: .08,
                ease: "power3.out"
            });

        }

    }, 900);

});


/* RESET */

resetForm.addEventListener("click", () => {

    formSuccess.classList.remove("active");

    contactForm.style.display = "block";

    contactForm.reset();

    serviceOptions.forEach((option) => {
        option.classList.remove("selected");
    });

    serviceInput.value = "";

    const submitButton =
        contactForm.querySelector(".submit-button");

    submitButton.disabled = false;

    submitButton.innerHTML =
        "<span>Send Inquiry</span><span class=\"submit-arrow\">→</span>";

});


/* PARALLAX STATEMENT */

const statementFrame =
    document.querySelector(".statement-frame");


if (statementFrame && !reducedMotion) {

    statementFrame.addEventListener("mousemove", (event) => {

        const rect =
            statementFrame.getBoundingClientRect();

        const x =
            (event.clientX - rect.left) /
            rect.width - .5;

        const y =
            (event.clientY - rect.top) /
            rect.height - .5;


        const orbitOne =
            statementFrame.querySelector(
                ".statement-orbit-one"
            );

        const orbitTwo =
            statementFrame.querySelector(
                ".statement-orbit-two"
            );


        orbitOne.style.transform =
            `translate(${x * 20}px, ${y * 20}px)`;

        orbitTwo.style.transform =
            `rotate(35deg) translate(${x * -25}px, ${y * -25}px)`;

    });


    statementFrame.addEventListener("mouseleave", () => {

        const orbitOne =
            statementFrame.querySelector(
                ".statement-orbit-one"
            );

        const orbitTwo =
            statementFrame.querySelector(
                ".statement-orbit-two"
            );


        orbitOne.style.transform = "";

        orbitTwo.style.transform = "";

    });

}