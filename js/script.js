document.addEventListener("DOMContentLoaded", () => {

    const navbar = document.querySelector(".navbar");
    const menuButton = document.querySelector(".menu-button");
    const mobileMenu = document.querySelector(".mobile-menu");



    window.addEventListener("scroll", () => {

        if (window.scrollY > 40) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

    });


 

    if (menuButton && mobileMenu) {

        menuButton.addEventListener("click", () => {
            mobileMenu.classList.toggle("active");
        });

        mobileMenu.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {
                mobileMenu.classList.remove("active");
            });

        });

    }


  

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


    if (typeof gsap !== "undefined" && !reducedMotion) {

        const heroTimeline = gsap.timeline({
            defaults: {
                ease: "power3.out"
            }
        });

        heroTimeline
            .from(".navbar", {
                y: -30,
                opacity: 0,
                duration: 0.8
            })
            .from(".hero .eyebrow", {
                y: 30,
                opacity: 0,
                duration: 0.7
            }, "-=0.4")
            .from(".hero h1", {
                y: 70,
                opacity: 0,
                duration: 1
            }, "-=0.4")
            .from(".hero-description", {
                y: 30,
                opacity: 0,
                duration: 0.7
            }, "-=0.5")
            .from(".hero-buttons", {
                y: 25,
                opacity: 0,
                duration: 0.7
            }, "-=0.4")
            .from(".hero-3d", {
                scale: 0.85,
                opacity: 0,
                duration: 1.2
            }, "-=0.8");

    }




    const canvas = document.getElementById("threeCanvas");

    if (!canvas || typeof THREE === "undefined") {
        return;
    }


    

    let renderer;

    try {

        renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true,
            alpha: true,
            powerPreference: "high-performance"
        });

    } catch (error) {

        console.log("WebGL is not available.");

        const hero3D = document.getElementById("hero3D");

        if (hero3D) {
            hero3D.style.background =
                "radial-gradient(circle, rgba(139,92,246,.18), transparent 60%)";
        }

        return;
    }


    

    const scene = new THREE.Scene();


  

    const camera = new THREE.PerspectiveCamera(
        42,
        1,
        0.1,
        100
    );

    camera.position.set(
        0,
        0,
        6
    );




    renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, 2)
    );

    renderer.setClearColor(
        0x000000,
        0
    );


    const ambientLight = new THREE.AmbientLight(
        0xffffff,
        0.35
    );

    scene.add(ambientLight);


    const purpleLight = new THREE.PointLight(
        0x8b5cf6,
        5,
        10
    );

    purpleLight.position.set(
        3,
        2,
        4
    );

    scene.add(purpleLight);


    const cyanLight = new THREE.PointLight(
        0x22d3ee,
        4,
        10
    );

    cyanLight.position.set(
        -3,
        -2,
        3
    );

    scene.add(cyanLight);


    const whiteLight = new THREE.PointLight(
        0xffffff,
        1.5,
        8
    );

    whiteLight.position.set(
        0,
        4,
        2
    );

    scene.add(whiteLight);



    const mainGroup = new THREE.Group();

    scene.add(mainGroup);


    const crystalGeometry = new THREE.IcosahedronGeometry(
        1.45,
        3
    );

    const crystalMaterial = new THREE.MeshPhysicalMaterial({

        color: 0x7c3aed,

        metalness: 0.75,

        roughness: 0.18,

        transmission: 0.12,

        transparent: true,

        opacity: 0.92,

        clearcoat: 1,

        clearcoatRoughness: 0.12

    });


    const crystal = new THREE.Mesh(
        crystalGeometry,
        crystalMaterial
    );

    mainGroup.add(crystal);



    const innerGeometry = new THREE.IcosahedronGeometry(
        0.72,
        2
    );

    const innerMaterial = new THREE.MeshBasicMaterial({

        color: 0x22d3ee,

        transparent: true,

        opacity: 0.18,

        wireframe: true

    });


    const innerCore = new THREE.Mesh(
        innerGeometry,
        innerMaterial
    );

    mainGroup.add(innerCore);



    const wireGeometry = new THREE.IcosahedronGeometry(
        1.7,
        2
    );

    const wireMaterial = new THREE.MeshBasicMaterial({

        color: 0x8b5cf6,

        transparent: true,

        opacity: 0.18,

        wireframe: true

    });


    const wireSphere = new THREE.Mesh(
        wireGeometry,
        wireMaterial
    );

    mainGroup.add(wireSphere);



    const ringGroup = new THREE.Group();

    mainGroup.add(ringGroup);


    function createRing(
        radius,
        rotationX,
        rotationY,
        rotationZ,
        color
    ) {

        const geometry =
            new THREE.TorusGeometry(
                radius,
                0.008,
                16,
                160
            );

        const material =
            new THREE.MeshBasicMaterial({
                color: color,
                transparent: true,
                opacity: 0.45
            });

        const ring =
            new THREE.Mesh(
                geometry,
                material
            );

        ring.rotation.x = rotationX;
        ring.rotation.y = rotationY;
        ring.rotation.z = rotationZ;

        ringGroup.add(ring);

        return ring;
    }


    const ringOne = createRing(
        1.85,
        Math.PI / 2.8,
        0.3,
        0.2,
        0x8b5cf6
    );


    const ringTwo = createRing(
        2.05,
        0.7,
        Math.PI / 2.8,
        1,
        0x22d3ee
    );


    const ringThree = createRing(
        1.95,
        -0.4,
        0.5,
        0.9,
        0xffffff
    );




    const particleCount = window.innerWidth < 700
        ? 500
        : 1100;

    const particleGeometry =
        new THREE.BufferGeometry();

    const particlePositions =
        new Float32Array(
            particleCount * 3
        );


    for (
        let i = 0;
        i < particleCount;
        i++
    ) {

        const radius =
            2.5 + Math.random() * 3.5;

        const theta =
            Math.random() * Math.PI * 2;

        const phi =
            Math.acos(
                (Math.random() * 2) - 1
            );

        const x =
            radius *
            Math.sin(phi) *
            Math.cos(theta);

        const y =
            radius *
            Math.sin(phi) *
            Math.sin(theta);

        const z =
            radius *
            Math.cos(phi);

        particlePositions[i * 3] = x;
        particlePositions[i * 3 + 1] = y;
        particlePositions[i * 3 + 2] = z;

    }


    particleGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(
            particlePositions,
            3
        )
    );


    const particleMaterial =
        new THREE.PointsMaterial({

            color: 0x8b5cf6,

            size:
                window.innerWidth < 700
                    ? 0.025
                    : 0.035,

            transparent: true,

            opacity: 0.7,

            depthWrite: false

        });


    const particles =
        new THREE.Points(
            particleGeometry,
            particleMaterial
        );

    scene.add(particles);



    const floatingGroup =
        new THREE.Group();

    scene.add(floatingGroup);


    for (let i = 0; i < 45; i++) {

        const geometry =
            new THREE.OctahedronGeometry(
                0.025 +
                Math.random() * 0.045,
                0
            );

        const material =
            new THREE.MeshBasicMaterial({
                color:
                    i % 2 === 0
                        ? 0x8b5cf6
                        : 0x22d3ee,

                transparent: true,

                opacity:
                    0.3 +
                    Math.random() * 0.4
            });

        const particle =
            new THREE.Mesh(
                geometry,
                material
            );


        particle.position.set(

            (Math.random() - 0.5) * 6,

            (Math.random() - 0.5) * 5,

            (Math.random() - 0.5) * 5

        );


        particle.userData = {

            speed:
                0.001 +
                Math.random() * 0.003,

            offset:
                Math.random() * 100

        };


        floatingGroup.add(
            particle
        );

    }


  

    const mouse = {
        x: 0,
        y: 0
    };

    const targetMouse = {
        x: 0,
        y: 0
    };


    window.addEventListener(
        "pointermove",
        (event) => {

            targetMouse.x =
                (event.clientX /
                    window.innerWidth) *
                    2 - 1;

            targetMouse.y =
                -(event.clientY /
                    window.innerHeight) *
                    2 + 1;

        }
    );




    function resizeScene() {

        const container =
            document.getElementById(
                "hero3D"
            );

        if (!container) return;

        const width =
            container.clientWidth;

        const height =
            container.clientHeight;

        camera.aspect =
            width / height;

        camera.updateProjectionMatrix();

        renderer.setSize(
            width,
            height,
            false
        );

    }


    resizeScene();

    window.addEventListener(
        "resize",
        resizeScene
    );




    let scrollY = 0;

    window.addEventListener(
        "scroll",
        () => {

            scrollY =
                window.scrollY;

        }
    );



    const clock =
        new THREE.Clock();


    function animate() {

        requestAnimationFrame(
            animate
        );
 

        const elapsed =
            clock.getElapsedTime();


      

        mouse.x +=
            (targetMouse.x - mouse.x) *
            0.04;

        mouse.y +=
            (targetMouse.y - mouse.y) *
            0.04;




        if (!reducedMotion) {

            crystal.rotation.x += 0.0025;
            crystal.rotation.y += 0.004;

            innerCore.rotation.x -= 0.003;
            innerCore.rotation.y += 0.005;

            wireSphere.rotation.x -= 0.001;
            wireSphere.rotation.y -= 0.002;

            ringGroup.rotation.z += 0.0015;

            particles.rotation.y += 0.00025;

        }




        mainGroup.rotation.y +=
            (
                mouse.x * 0.22 -
                mainGroup.rotation.y
            ) * 0.025;


        mainGroup.rotation.x +=
            (
                mouse.y * 0.14 -
                mainGroup.rotation.x
            ) * 0.025;



        floatingGroup.children.forEach(
            (particle) => {

                particle.position.y +=
                    Math.sin(
                        elapsed *
                        particle.userData.speed *
                        1000 +
                        particle.userData.offset
                    ) * 0.00015;

            }
        );



        const scale =
            1 +
            Math.sin(
                elapsed * 1.3
            ) * 0.025;

        mainGroup.scale.set(
            scale,
            scale,
            scale
        );



        const scrollProgress =
            Math.min(
                scrollY / 900,
                1
            );

        camera.position.z =
            6 -
            scrollProgress * 0.7;

        camera.position.y =
            scrollProgress * 0.4;



        renderer.render(
            scene,
            camera
        );

    }


    animate();


  

    if (!reducedMotion) {

        const revealElements =
            document.querySelectorAll(
                ".service-card, .project, .technology-content, .technology-visual, .process-item, .final-card"
            );


        const revealObserver =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "active"
                                );

                                revealObserver.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(
            (element) => {

                element.classList.add(
                    "reveal"
                );

                revealObserver.observe(
                    element
                );

            }
        );

    }

});
