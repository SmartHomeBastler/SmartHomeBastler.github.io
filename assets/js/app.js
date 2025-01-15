// Warten, bis der DOM vollständig geladen ist
document.addEventListener("DOMContentLoaded", function () {
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");

    // Button anzeigen/verstecken
    window.addEventListener("scroll", function () {
        if (window.scrollY > 200) { // Ab 200px Scrolltiefe anzeigen
            scrollToTopBtn.style.display = "block";
        } else {
            scrollToTopBtn.style.display = "none";
        }
    });

    // Nach oben scrollen bei Klick
    scrollToTopBtn.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth", // Weiches Scrollen
        });
    });
});
