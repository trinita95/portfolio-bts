const text = "Portfolio BTS SIO - [Votre Nom]";
let index = 0;
const element = document.getElementById("animated-text");

function writeText() {
    element.innerText = text.slice(0, index);
    index++;
    if (index > text.length) {
        index = 0;
    }
}
setInterval(writeText, 150);


document.addEventListener("DOMContentLoaded", () => {
    const faders = document.querySelectorAll(".fade-in");

    const appearOptions = {
        threshold: 0.5,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });
});
