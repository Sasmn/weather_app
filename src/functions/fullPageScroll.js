import domElements from "..";

function fullPageScroll() {
    /* INITIAL POSITIONS */
    const panels = document.querySelectorAll('.panel');
    for (let i = 0; i < panels.length; i++) {
        const p = panels[i];

        p.style.transform = `translateY(CALC(${(i)}*100vh))`
        console.log(p.style.transform, p)
    }


    let activePanel = 0;

    /* ON PC */
    let scrollDirection = 'down';

    var timer = null;
    window.addEventListener('wheel', function (e) {
        if (e.deltaY < 0) {
            scrollDirection = 'down';
        }
        else if (e.deltaY > 0) {
            scrollDirection = 'up';
        }

        if (timer !== null) {
            clearTimeout(timer);
        }

        timer = setTimeout(function () {
            if (panels.length - 1 !== activePanel && scrollDirection == 'up') {
                activePanel++;
            }
            else if (activePanel !== 0 && scrollDirection == 'down') {
                activePanel--;
            }
            scrollPanels(activePanel);
        }, 250);
    }, false);

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

        p.style.transform = `translateY(CALC(${(i - activePanel)}*100vh))`;
    }
}

export default fullPageScroll;