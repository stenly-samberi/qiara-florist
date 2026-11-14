document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       ACTIVE MENU ON SCROLL
    ========================= */

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



    /* =========================
       WHATSAPP WIDGET
    ========================= */

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



    /* =========================
       SHOPPING CART
    ========================= */

    const cart = [];

    const buttons = document.querySelectorAll(".add-cart");
    const cartItems = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");
    const checkoutWA = document.getElementById("checkoutWA");



    buttons.forEach((btn) => {

        btn.addEventListener("click", () => {

            const product = {
                name: btn.dataset.name,
                price: parseInt(btn.dataset.price)
            };

            cart.push(product);
            btn.innerHTML = "✅ Ditambahkan";
            btn.disabled = true;
            btn.style.background = "#28a745";

            renderCart();
        });

    });



    function renderCart() {

    cartCount.innerHTML =
        `🛒 ${cart.length} Produk Dipilih`;

    }



    if (checkoutWA) {

    checkoutWA.addEventListener("click", () => {

        if (cart.length === 0) {
            alert("Pilih produk terlebih dahulu");
            return;
        }

        navigator.geolocation.getCurrentPosition(

            function (position) {

                const lat = position.coords.latitude;
                const lng = position.coords.longitude;

                let total = 0;

                let message =
                    "Halo Qiara Florist,%0A%0A" +
                    "Saya ingin memesan:%0A%0A";

                cart.forEach((item, index) => {

                    total += item.price;

                    message +=
                        `${index + 1}. ${item.name} - Rp ${item.price.toLocaleString("id-ID")}%0A`;

                });

                message += "%0A";
                message += "====================%0A";
                message += `💰 Total Belanja : Rp ${total.toLocaleString("id-ID")}%0A`;
                message += "====================%0A%0A";

                message +=
                    "📍 Tolong antar ke lokasi saya:%0A";

                message +=
                    `https://maps.google.com/?q=${lat},${lng}`;

                const url =
                    `https://wa.me/6282198285990?text=${message}`;

                window.open(url, "_blank");

            },

            function () {

                alert(
                    "Mohon izinkan akses lokasi agar kami dapat mengetahui alamat pengiriman."
                );

            }

        );

    });

}

});