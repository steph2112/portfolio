document.addEventListener("DOMContentLoaded", () => {

    // Use pixel-based offset for smooth continuous scrolling
    let currentOffset = 0;
    const step = 10;

    const carouselSlides = document.getElementById("carousel--slides");

    // I need to duplicate the slides to create a seamless effect
    const cloneSlides = () => {
        if (carouselSlides?.children) {
            const originals = Array.from(carouselSlides.children);
            // e.g. duplicate 3 times
            for (let j = 0; j < 3; j++) {
                originals.forEach(slide => {
                    carouselSlides.appendChild(slide.cloneNode(true));
                });
            }
        }

    }

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

    if (carouselSlides) {
        setInterval(nextSlide, 280);
        cloneSlides(); // Clone slides for seamless effect
    }


})