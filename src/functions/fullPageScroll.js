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

    /*
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
            e.stopImmediatePropagation();
        }

        timer = setTimeout(function () {
            isScrolling = false;
        }, 350);
    }, { passive: false });
    */


    /*
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
*/
    window.addEventListener("wheel", e => e.preventDefault(), { passive: false })

    /*
    window.addEventListener('scroll', (e) => {
        window.scrollTo(0, 0)
        console.log('BENNVAGYUNK')
        console.log(window.pageYOffset)
        e.preventDefault();
    }, { passive: false })
    */

    var timer = null;
    /*
        for (let i = 0; i < panels.length; i++) {
            panels[i].addEventListener('wheel', stop, { passive: false });
            panels[i].addEventListener('wheel', (e) => {
            });
        }
    
        
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
    
            panels.forEach(p => {
                p.removeEventListener('wheel', stop, { passive: false });
                e.preventDefault();
            });
            /*
            if (timer !== null) {
                clearTimeout(timer);
            }
            *//*
(e.wheelDelta > 0) ? -5 : 5;

console.log(e);
e.stopPropagation();
setTimeout(function () {
isScrolling = false;
console.log(isScrolling)

panels[activePanel].addEventListener('wheel', stop, { passive: false })

// panels.forEach(p => {
//     p.removeEventListener('wheel', stop, { passive: false });
// });
}, 850);

}
*/

    let lefele = false;
    let felfele = false;
    let c = 0;

    window.addEventListener('wheel', throttle(damnIt, 800))

    function damnIt() {
        console.log("hey");
        console.log(event.deltaY)


        console.log(c)
        if (event.deltaY < 0) {
            scrollDirection = 'down';
        }
        else if (event.deltaY > 0) {
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
        // window.addEventListener('wheel', throttle(damnIt, 2000), { once: true });
    }

    function throttle(cb, timeout) {
        console.log('eeeee')
        let lastCall = 0;
        return function () {



            if (Math.abs(event.deltaY) < 20 || Math.abs(event.deltaY) > 40) return;

            if (new Date() - lastCall > timeout) {
                console.log(new Date() - lastCall)
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

