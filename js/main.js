document.addEventListener("DOMContentLoaded", () => {

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".menu a");

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach((section) => {

            const sectionTop = section.offsetTop - 180;

            if (window.scrollY >= sectionTop) {
                current = section.getAttribute("id");
            }

        });

        navLinks.forEach((link) => {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + current) {
                link.classList.add("active");
            }

        });

    });



    //Button Wa
    const waButton = document.getElementById("waButton");
const waBox = document.getElementById("waBox");

if (waButton && waBox) {

    waButton.addEventListener("click", () => {
        waBox.classList.toggle("active");
    });

    document.addEventListener("click", (e) => {

        if (
            !waBox.contains(e.target) &&
            !waButton.contains(e.target)
        ) {
            waBox.classList.remove("active");
        }

    });

}

});


