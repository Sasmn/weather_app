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
    let isScrolling = false;

    /*
        var timer = null;
        window.addEventListener('wheel', function (e) {
            e.preventDefault();
            if (e.deltaY < 0) {
                scrollDirection = 'down';
            }
            else if (e.deltaY > 0) {
                scrollDirection = 'up';
            }
    
            console.log(e.deltaY)
    
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
            }, 350);
        }, { passive: false });
    
        window.addEventListener('scroll', () => {
            console.log('help')
        })
    */

    function doScroll(e) {
        // positive deltas are top and left
        // down and right are negative

        // horizontal offset    e.deltaX
        // vertical offset      e.deltaY

        console.log(`x:${e.deltaX} y:${e.deltaY}`);

        e.preventDefault(); // disable the actual scrolling
    }

    window.addEventListener("wheel", doScroll, { passive: false });

    var timer = null;
    window.addEventListener('wheel', function (e) {
        e.preventDefault();
        // isScrolling = true;

        if (e.deltaY < 0) {
            scrollDirection = 'down';
        }
        else if (e.deltaY > 0) {
            scrollDirection = 'up';
        }

        console.log(e.deltaY)


        if (timer !== null) {
            clearTimeout(timer);
        }

        if (isScrolling == false) {
            if (panels.length - 1 !== activePanel && scrollDirection == 'up') {
                activePanel++;
            }
            else if (activePanel !== 0 && scrollDirection == 'down') {
                activePanel--;
            }
            scrollPanels(activePanel);
            isScrolling = true;
        }

        timer = setTimeout(function () {
            isScrolling = false;
        }, 350);
    }, { passive: false });

    function detectTrackPad(e) {
        var isTrackpad = false;
        if (e.wheelDeltaY) {
            if (Math.abs(e.wheelDeltaY) !== 120) {
                isTrackpad = true;
            }
        }
        else if (e.deltaMode === 0) {
            isTrackpad = true;
        }
        console.log(isTrackpad ? "Trackpad detected" : "Mousewheel detected");
    }

    document.addEventListener("mousewheel", detectTrackPad, false);
    document.addEventListener("DOMMouseScroll", detectTrackPad, false);

    /*
        var timer = null;
        window.addEventListener('wheel', () => {
            if (isScrolling == false) {
                console.log('heló')
     
                window.addEventListener('wheel', stop, { passive: false });
            }
            console.log('aaaa')
        })
     
        function stop(e) {
            e.preventDefault();
     
            if (e.deltaY < 0) {
                scrollDirection = 'down';
            }
            else if (e.deltaY > 0) {
                scrollDirection = 'up';
            }
     
            if (isScrolling == false) {
     
                if (panels.length - 1 !== activePanel && scrollDirection == 'up') {
                    activePanel++;
                }
                else if (activePanel !== 0 && scrollDirection == 'down') {
                    activePanel--;
                }
                scrollPanels(activePanel);
            }
     
            isScrolling = true;
     
            window.removeEventListener('wheel', stop, { passive: false });
            setTimeout(function () {
                isScrolling = false;
                console.log(isScrolling)
            }, 1000);
        }
    */

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

