document.addEventListener("DOMContentLoaded", () => {

    // Use pixel-based offset for smooth continuous scrolling
    let currentOffset = 0;
    const step = 10;

    const carouselSlides = document.getElementById("carousel--slides");
    const carouselContainer = document.getElementById("carousel");

    const updateCarouselPosition = (shouldBeSmooth) => {
        // Apply transform based on pixel offset
        carouselSlides.style.transition = shouldBeSmooth ? "transform 300ms linear" : "none";
        carouselSlides.style.transform = `translateX(${-currentOffset}px)`;
    }

    const nextSlide = () => {
        currentOffset += step;
        // Wrap around when reaching the end
        const maxOffset = carouselSlides.scrollWidth - carouselContainer.offsetWidth;
        if (currentOffset > maxOffset) {
            currentOffset = 0;
        }
        updateCarouselPosition(true);
    }

    setInterval(nextSlide, 280);

})