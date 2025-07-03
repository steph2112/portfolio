document.addEventListener("DOMContentLoaded", () => {

    let currentIndex = 0;
    const carouselSlides = document.getElementById("carousel--slides");
    const carouselContainer = document.getElementById("carousel");
    let clonesOut = 0;

    const updateCarouselPosition = (shoudlBeSmooth) => {

        const firstChild = carouselSlides.children[0];

        if (!firstChild) {
            return;
        }

        const slideWidth = firstChild.offsetWidth;
        const gap = parseFloat(getComputedStyle(carouselSlides).gap);
        const itemFullWidth = slideWidth - gap;

        const visualIndex = currentIndex;

        let offset = visualIndex * itemFullWidth;

        const containerVisibleWidth = carouselContainer.offsetWidth;
        const centerAdjustment = 0 ?? (containerVisibleWidth / 2) - (itemFullWidth / 2);
        carouselSlides.style.transition = shoudlBeSmooth ? "transform 500ms ease-in-out" : "none";
        carouselSlides.style.transform = `translateX(${-offset + centerAdjustment}px)`
    }

    const nextSlide = () => {
        currentIndex++;
        handleInfiniteJump();
        updateCarouselPosition(true);
    }

    const handleInfiniteJump = () => {
        const containerVisibleWidth = carouselContainer.offsetWidth;
        const firstChild = carouselSlides.children[0];

        if (!firstChild) {
            return;
        }

        const slideWidth = firstChild.offsetWidth;
        const gap = parseFloat(getComputedStyle(carouselSlides).gap);
        const itemFullWidth = slideWidth - gap;
        const offset = (containerVisibleWidth / itemFullWidth) - 1;

        if (currentIndex >= carouselSlides.children.length - offset) {
            currentIndex = 0;
            updateCarouselPosition(false);
        }
    }

    setInterval(nextSlide, 2500);

})