import { once } from "lodash";
import domElements from "..";

function fullPageScroll() {
    /* INITIAL POSITIONS */
    const panels = document.querySelectorAll('.panel');
    for (let i = 0; i < panels.length; i++) {
        const p = panels[i];

        p.style.transform = `translateY(CALC(${(i)}*100vh))`
    }


    let activePanel = 0;

    /* ON PC */
    let scrollDirection = 'down';

    let y = 0;
    let y2 = 0;
    let y3 = 0;
    let y4 = 0;
    let asc = false;

    window.addEventListener('wheel', throttle(damnIt, 300), { passive: false })

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

            if (Math.abs(event.deltaY) < 20) return;

            
            if (e.deltaY - (y + y2 + y3 + y4) / 4 > 0) {
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
        if (e.changedTouches[0].clientY > touchPosition) {
            touchDirection = 'down';
        }
        else {
            touchDirection = 'up';
        }

        touchPosition = e.changedTouches[0].clientY;
    })

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
    for (let i = 0; i < panels.length; i++) {
        const p = panels[i];

        p.style.transform = `translateY(CALC(${(i - activePanel)}* 100vh))`;
    }
}

export default fullPageScroll;