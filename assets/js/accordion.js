const elements = document.querySelectorAll('.accordion-item-trigger');

const display = (text) => {
    let height = 35;
    text.style.height = height + 'px';
    const interval = setInterval(() => {
        height += 40; // Increase height by 10 pixels
        text.style.height = height + 'px';

        if (height >= 100) {
            text.style.height = '100%';
            clearInterval(interval); // Stop the interval when desired size is reached
        }
    }, 150);
}
const hide = (text) => {
    let height = text.offsetHeight - 60;
    text.style.height = height + 'px';
    const interval = setInterval(() => {
        height -= 50; // Increase height by 10 pixels
        text.style.height = height + 'px';

        if (height <= 0) {
            text.style.height = '0';
            clearInterval(interval); // Stop the interval when desired size is reached
        }
    }, 50);
}

// Loop through each element and attach a click event listener
elements.forEach(element => {
    element.addEventListener('click', (e) => {
        if (e?.currentTarget?.dataset?.acItem) {

            const text = document.getElementById(e?.currentTarget?.dataset?.acItem);
            text?.classList?.toggle('target');

            const wasClicked = text?.classList.contains('target');
            if (!wasClicked) {
                e.preventDefault();
            }
            if (wasClicked) {
                display(text);
            } else {
                hide(text);
            }
            const icons = element?.getElementsByClassName('vertical');
            for (let i = 0; i < icons.length; i++) {
                icons[i]?.classList?.toggle('open');
            }
        }
    });
});