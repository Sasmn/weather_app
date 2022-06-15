import { once } from "lodash";
import domElements from "..";

function fullPageScroll() {
    /* INITIAL POSITIONS */
    const panels = document.querySelectorAll('.panel');
    for (let i = 1; i < panels.length; i++) {
        const p = panels[i];

        p.style.transform = `translateY(CALC(${(i)}*150vh)) scale(0.5)`
    }
    panels[0].children[0].style.transform = "translateX(0)";
    panels[0].children[0].style.opacity = 1;

    let activePanel = 0;

    /* ON PC (MOUSE AND TRACKPAD) */
    let scrollDirection = 'down';

    let y = 0;
    let y2 = 0;
    let y3 = 0;
    let y4 = 0;
    let asc = false;


    window.addEventListener('wheel', throttle(damnIt, 700), { passive: false })

    function damnIt() {
        if (panels.length - 1 !== activePanel && scrollDirection == 'up') {
            activePanel++;
        }
        else if (activePanel !== 0 && scrollDirection == 'down') {
            activePanel--;
        }
        scrollPanels(activePanel);
    }

    function throttle(cb, timeout) {
        let lastCall = 0;
        return function (e) {
            e.preventDefault()

            if (Math.abs(e.deltaY) < 10) return;

            if (Math.abs(e.wheelDeltaY) == 120) {
                y4 = 0;
            }

            if (e.deltaY - 2 * y4 > 0) {
                asc = true;
            }
            else {
                asc = false;
            }

            y4 = y3;
            y3 = y2;
            y2 = y;
            y = e.deltaY;

            if (e.deltaY < 0) {
                scrollDirection = 'down';
            }
            else if (e.deltaY > 0) {
                scrollDirection = 'up';
            }

            if (asc == false && scrollDirection == 'up') {
                return;
            }
            else if (asc == true && scrollDirection == 'down') {
                return;
            }

            if (scrollDirection == 'up' && activePanel == panels.length - 1) {
                return;
            }
            else if (scrollDirection == 'down' && activePanel == 0) {
                return;
            }

            if (new Date() - lastCall > timeout) {
                lastCall = new Date();

                cb();
            }
        }
    }

    /* ON TOUCHSCREENS */
    let touchDirection = 'down';
    let touchPosition = 0;

    document.addEventListener('touchmove', (e) => {
        e.preventDefault();
        if (e.changedTouches[0].clientY > touchPosition) {
            touchDirection = 'down';
        }
        else {
            touchDirection = 'up';
        }

        touchPosition = e.changedTouches[0].clientY;
    }, { passive: false })

    document.addEventListener('touchend', (e) => {
        if (panels.length - 1 !== activePanel && touchDirection == 'up') {
            activePanel++;
        }
        else if (activePanel !== 0 && touchDirection == 'down') {
            activePanel--;
        }
        scrollPanels(activePanel);
    })
}

function scrollPanels(activePanel) {
    const panels = document.querySelectorAll('.panel');
    panels.forEach(p => {
        p.children[0].style.transitionDelay = "0s";
        p.children[0].style.opacity = 0;
        p.children[0].style.transform = "translateX(50%)"
    });
    panels[activePanel].children[0].style.transitionDelay = "0.3s";
    panels[activePanel].children[0].style.opacity = 1;
    panels[activePanel].children[0].style.transform = "translateX(0)"


    let y = 1;

    for (let i = 0; i < panels.length; i++) {
        const p = panels[i];
        if (activePanel != i) {
            y = 0.5;
        }
        else {
            y = 1;
        }
        p.style.transform = `scale(${y}) translateY(CALC(${(i - activePanel)}* 150vh))`;
    }
}

export default fullPageScroll;