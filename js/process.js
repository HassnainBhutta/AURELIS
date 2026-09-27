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

    gsap.from(".process-meta", {
        opacity: 0,
        y: -20,
        duration: 1,
        ease: "power3.out"
    });

    gsap.from(".process-hero-copy .eyebrow", {
        opacity: 0,
        y: 25,
        duration: .8,
        delay: .2,
        ease: "power3.out"
    });

    gsap.from(".process-hero-copy h1", {
        opacity: 0,
        y: 70,
        duration: 1.2,
        delay: .35,
        ease: "power4.out"
    });

    gsap.from(".process-hero-copy p", {
        opacity: 0,
        y: 30,
        duration: .8,
        delay: .65,
        ease: "power3.out"
    });

    gsap.from(".process-hero-copy .button", {
        opacity: 0,
        y: 25,
        duration: .8,
        delay: .85,
        ease: "power3.out"
    });

    gsap.from(".process-3d", {
        opacity: 0,
        scale: .85,
        duration: 1.5,
        delay: .3,
        ease: "power3.out"
    });

}


const canvas = document.getElementById("processCanvas");

if (canvas && typeof THREE !== "undefined") {

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
        45,
        canvas.clientWidth / canvas.clientHeight,
        0.1,
        100
    );

    camera.position.z = 7;


    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true
    });

    renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, 2)
    );

    renderer.setSize(
        canvas.clientWidth,
        canvas.clientHeight,
        false
    );


    const group = new THREE.Group();

    scene.add(group);


    const ambientLight = new THREE.AmbientLight(
        0xffffff,
        .7
    );

    scene.add(ambientLight);


    const purpleLight = new THREE.PointLight(
        0x8b5cf6,
        5,
        20
    );

    purpleLight.position.set(3, 2, 5);

    scene.add(purpleLight);


    const cyanLight = new THREE.PointLight(
        0x22d3ee,
        4,
        20
    );

    cyanLight.position.set(-3, -2, 4);

    scene.add(cyanLight);


    const coreGeometry = new THREE.IcosahedronGeometry(
        1.35,
        3
    );

    const coreMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x171923,
        metalness: .75,
        roughness: .2,
        transparent: true,
        opacity: .92,
        clearcoat: 1,
        clearcoatRoughness: .15
    });

    const core = new THREE.Mesh(
        coreGeometry,
        coreMaterial
    );

    group.add(core);


    const innerGeometry = new THREE.IcosahedronGeometry(
        1.05,
        2
    );

    const innerMaterial = new THREE.MeshBasicMaterial({
        color: 0x8b5cf6,
        wireframe: true,
        transparent: true,
        opacity: .4
    });

    const innerWire = new THREE.Mesh(
        innerGeometry,
        innerMaterial
    );

    group.add(innerWire);


    const outerGeometry = new THREE.IcosahedronGeometry(
        1.75,
        1
    );

    const outerMaterial = new THREE.MeshBasicMaterial({
        color: 0x22d3ee,
        wireframe: true,
        transparent: true,
        opacity: .18
    });

    const outerWire = new THREE.Mesh(
        outerGeometry,
        outerMaterial
    );

    group.add(outerWire);


    const ringOne = new THREE.Mesh(
        new THREE.TorusGeometry(2.1, .008, 8, 160),
        new THREE.MeshBasicMaterial({
            color: 0x8b5cf6,
            transparent: true,
            opacity: .5
        })
    );

    ringOne.rotation.x = Math.PI / 2.2;

    group.add(ringOne);


    const ringTwo = new THREE.Mesh(
        new THREE.TorusGeometry(2.45, .006, 8, 160),
        new THREE.MeshBasicMaterial({
            color: 0x22d3ee,
            transparent: true,
            opacity: .3
        })
    );

    ringTwo.rotation.y = Math.PI / 2.8;

    group.add(ringTwo);


    const particleCount = 900;

    const particleGeometry =
        new THREE.BufferGeometry();

    const particlePositions =
        new Float32Array(particleCount * 3);


    for (let i = 0; i < particleCount; i++) {

        const radius =
            2.7 + Math.random() * 2.8;

        const theta =
            Math.random() * Math.PI * 2;

        const phi =
            Math.acos(2 * Math.random() - 1);

        particlePositions[i * 3] =
            radius * Math.sin(phi) * Math.cos(theta);

        particlePositions[i * 3 + 1] =
            radius * Math.sin(phi) * Math.sin(theta);

        particlePositions[i * 3 + 2] =
            radius * Math.cos(phi);

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
            size: .018,
            transparent: true,
            opacity: .65
        });


    const particles = new THREE.Points(
        particleGeometry,
        particleMaterial
    );

    group.add(particles);


    let mouseX = 0;
    let mouseY = 0;

    window.addEventListener("mousemove", (event) => {

        mouseX =
            (event.clientX / window.innerWidth - .5);

        mouseY =
            (event.clientY / window.innerHeight - .5);

    });


    function resizeScene() {

        const width = canvas.clientWidth;
        const height = canvas.clientHeight;

        if (!width || !height) return;

        camera.aspect = width / height;

        camera.updateProjectionMatrix();

        renderer.setSize(
            width,
            height,
            false
        );

    }


    window.addEventListener(
        "resize",
        resizeScene
    );

    resizeScene();


    const clock = new THREE.Clock();


    function animate() {

        requestAnimationFrame(animate);

        const elapsed =
            clock.getElapsedTime();


        core.rotation.x =
            elapsed * .12;

        core.rotation.y =
            elapsed * .18;


        innerWire.rotation.x =
            -elapsed * .16;

        innerWire.rotation.y =
            -elapsed * .12;


        outerWire.rotation.y =
            elapsed * .08;

        outerWire.rotation.z =
            elapsed * .05;


        ringOne.rotation.z =
            elapsed * .12;

        ringTwo.rotation.x =
            elapsed * .1;


        particles.rotation.y =
            elapsed * .025;

        particles.rotation.x =
            elapsed * .01;


        group.rotation.y +=
            (mouseX * .25 - group.rotation.y) * .025;

        group.rotation.x +=
            (-mouseY * .15 - group.rotation.x) * .025;


        renderer.render(
            scene,
            camera
        );

    }


    animate();

}