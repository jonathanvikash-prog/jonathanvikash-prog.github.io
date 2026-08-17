/* =========================================
   MOBILE NAVIGATION
   ========================================= */

function toggleMobileMenu() {

    const nav =
        document.getElementById("nav-links");

    const button =
        document.getElementById("menu-button");


    nav.classList.toggle("mobile-open");

    button.classList.toggle("active");


    const isOpen =
        nav.classList.contains("mobile-open");


    button.setAttribute(
        "aria-expanded",
        isOpen
    );


    button.setAttribute(
        "aria-label",
        isOpen
            ? "Close navigation menu"
            : "Open navigation menu"
    );

}


function closeMobileMenu() {

    const nav =
        document.getElementById("nav-links");

    const button =
        document.getElementById("menu-button");


    nav.classList.remove(
        "mobile-open"
    );

    button.classList.remove(
        "active"
    );


    button.setAttribute(
        "aria-expanded",
        "false"
    );


    button.setAttribute(
        "aria-label",
        "Open navigation menu"
    );

}


/* Close mobile menu when window becomes desktop */

window.addEventListener(
    "resize",
    function() {

        if (window.innerWidth > 800) {

            closeMobileMenu();

        }

    }
);



/* =========================================
   PROFILE IMAGE MODAL
   ========================================= */

function openProfile() {

    document.getElementById(
        "profile-modal"
    ).style.display = "flex";

}


function closeProfile() {

    document.getElementById(
        "profile-modal"
    ).style.display = "none";

}



/* =========================================
   PROJECT IMAGES
   ========================================= */

const projectImages = {

    sorting: [

        "images/project-sorting/project-sorting1.jpeg",

        "images/project-sorting/project-sorting2.jpeg",

        "images/project-sorting/project-sorting3.jpeg",

        "images/project-sorting/project-sorting4.jpeg"

    ],


    ros2: [

        "images/project-ros2/project-ros21.jpeg",

        "images/project-ros2/project-ros22.jpeg",

        "images/project-ros2/project-ros23.jpeg",

        "images/project-ros2/project-ros24.jpeg"

    ],


    pet: [

        "images/project-pet-feeder/project-pet-feeder1.jpeg",

        "images/project-pet-feeder/project-pet-feeder2.jpeg"

    ],


    street: [

        "images/project-street-light/project-street-light1.jpeg",

        "images/project-street-light/project-street-light2.jpeg",

        "images/project-street-light/project-street-light3.jpeg",

        "images/project-street-light/project-street-light4.jpeg"

    ]

};



const currentImages = {

    sorting: 0,

    ros2: 0,

    pet: 0,

    street: 0

};



function changeProjectImage(
    project,
    direction
) {

    const images =
        projectImages[project];


    currentImages[project] += direction;


    if (
        currentImages[project] >=
        images.length
    ) {

        currentImages[project] = 0;

    }


    if (
        currentImages[project] < 0
    ) {

        currentImages[project] =
            images.length - 1;

    }


    updateProjectImage(project);

}



function updateProjectImage(project) {

    document.getElementById(
        project + "-image"
    ).src =
        projectImages[project][
            currentImages[project]
        ];


    updateDots(project);

}



function createDots(project) {

    const container =
        document.getElementById(
            project + "-dots"
        );


    projectImages[project].forEach(
        function(_, index) {

            const dot =
                document.createElement(
                    "span"
                );


            dot.classList.add(
                "gallery-dot"
            );


            if (index === 0) {

                dot.classList.add(
                    "active"
                );

            }


            dot.onclick =
                function(event) {

                    event.stopPropagation();

                    currentImages[project] =
                        index;

                    updateProjectImage(
                        project
                    );

                };


            container.appendChild(dot);

        }
    );

}



function updateDots(project) {

    const dots =
        document.querySelectorAll(
            "#" +
            project +
            "-dots .gallery-dot"
        );


    dots.forEach(
        function(dot, index) {

            dot.classList.toggle(
                "active",
                index ===
                currentImages[project]
            );

        }
    );

}



/* =========================================
   PROJECT IMAGE MODAL
   ========================================= */

let activeProject = null;

let modalImageIndex = 0;



function openProjectGallery(project) {

    activeProject = project;

    modalImageIndex =
        currentImages[project];

    updateModalImage();


    document.getElementById(
        "project-modal"
    ).style.display = "flex";

}



function closeProjectGallery() {

    document.getElementById(
        "project-modal"
    ).style.display = "none";

    activeProject = null;

}



function changeModalImage(direction) {

    if (!activeProject) {

        return;

    }


    const images =
        projectImages[
            activeProject
        ];


    modalImageIndex += direction;


    if (
        modalImageIndex >=
        images.length
    ) {

        modalImageIndex = 0;

    }


    if (
        modalImageIndex < 0
    ) {

        modalImageIndex =
            images.length - 1;

    }


    updateModalImage();

}



function updateModalImage() {

    if (!activeProject) {

        return;

    }


    document.getElementById(
        "modal-project-image"
    ).src =
        projectImages[
            activeProject
        ][
            modalImageIndex
        ];


    document.getElementById(
        "modal-counter"
    ).textContent =

        (modalImageIndex + 1) +
        " / " +
        projectImages[
            activeProject
        ].length;

}



/* =========================================
   CERTIFICATIONS
   ========================================= */

const certificateImages = [

    "images/certificates/fortinet-nse3.jpeg",

    "images/certificates/fortinet-nse2.jpeg",

    "images/certificates/fortinet-nse1.jpeg",

    "images/certificates/fortinet-ot-security.jpeg",

    "images/certificates/matlab-onramp.jpeg"

];


let certificateIndex = 0;


/*
   Two certificates are visible on desktop.
   One certificate is visible on mobile.
*/

function getCertificatesPerView() {

    if (window.innerWidth <= 800) {

        return 1;

    }

    return 2;

}



function getMaximumCertificateIndex() {

    const perView =
        getCertificatesPerView();

    return Math.max(
        0,
        certificateImages.length - perView
    );

}



function moveCertificates(direction) {

    certificateIndex += direction;


    const maximumIndex =
        getMaximumCertificateIndex();


    if (
        certificateIndex >
        maximumIndex
    ) {

        certificateIndex = 0;

    }


    if (
        certificateIndex < 0
    ) {

        certificateIndex =
            maximumIndex;

    }


    updateCertificates();

}



function updateCertificates() {

    const track =
        document.getElementById(
            "certificates-track"
        );


    const perView =
        getCertificatesPerView();


    const percentage =
        certificateIndex *
        (100 / perView);


    track.style.transform =
        "translateX(-" +
        percentage +
        "%)";


    updateCertificateDots();

}



function createCertificateDots() {

    const container =
        document.getElementById(
            "certificate-dots"
        );


    container.innerHTML = "";


    const maximumIndex =
        getMaximumCertificateIndex();


    for (
        let i = 0;
        i <= maximumIndex;
        i++
    ) {

        const dot =
            document.createElement(
                "span"
            );


        dot.classList.add(
            "certificate-dot"
        );


        if (
            i === certificateIndex
        ) {

            dot.classList.add(
                "active"
            );

        }


        dot.onclick =
            function() {

                certificateIndex = i;

                updateCertificates();

            };


        container.appendChild(dot);

    }

}



function updateCertificateDots() {

    const dots =
        document.querySelectorAll(
            ".certificate-dot"
        );


    dots.forEach(
        function(dot, index) {

            dot.classList.toggle(
                "active",
                index === certificateIndex
            );

        }
    );

}



/* =========================================
   CERTIFICATE IMAGE MODAL
   ========================================= */

function openCertificate(index) {

    document.getElementById(
        "certificate-modal-image"
    ).src =
        certificateImages[index];


    document.getElementById(
        "certificate-modal"
    ).style.display = "flex";

}



function closeCertificate() {

    document.getElementById(
        "certificate-modal"
    ).style.display = "none";

}



/* =========================================
   KEYBOARD CONTROLS
   ========================================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Escape"
        ) {

            closeProfile();

            closeProjectGallery();

            closeCertificate();

            closeMobileMenu();

        }


        if (
            activeProject &&
            event.key === "ArrowLeft"
        ) {

            changeModalImage(-1);

        }


        if (
            activeProject &&
            event.key === "ArrowRight"
        ) {

            changeModalImage(1);

        }

    }
);



/* =========================================
   PROJECT MODAL BACKGROUND CLICK
   ========================================= */

document.getElementById(
    "project-modal"
).addEventListener(
    "click",
    function(event) {

        if (
            event.target === this
        ) {

            closeProjectGallery();

        }

    }
);



/* =========================================
   CERTIFICATE MODAL BACKGROUND CLICK
   ========================================= */

document.getElementById(
    "certificate-modal"
).addEventListener(
    "click",
    function(event) {

        if (
            event.target === this
        ) {

            closeCertificate();

        }

    }
);



/* =========================================
   INITIALIZE PROJECT DOTS
   ========================================= */

createDots("sorting");

createDots("ros2");

createDots("pet");

createDots("street");



/* =========================================
   INITIALIZE CERTIFICATE SLIDER
   ========================================= */

createCertificateDots();

updateCertificates();



/* =========================================
   RESPONSIVE CERTIFICATE SLIDER
   ========================================= */

window.addEventListener(
    "resize",
    function() {

        const maximumIndex =
            getMaximumCertificateIndex();


        if (
            certificateIndex >
            maximumIndex
        ) {

            certificateIndex =
                maximumIndex;

        }


        createCertificateDots();

        updateCertificates();

    }
);