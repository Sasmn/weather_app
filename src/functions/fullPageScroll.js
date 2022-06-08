import domElements from "..";



function fullPageScroll() {
    /* ON PC */
    let scrollDirection = 'down';

    var timer = null;
    window.addEventListener('wheel', function (e) {
        if (e.deltaY < 0) {
            scrollDirection = 'up';
        }
        else if (e.deltaY > 0) {
            scrollDirection = 'down';
        }

        if (timer !== null) {
            clearTimeout(timer);
        }

        timer = setTimeout(function () {
            if (scrollDirection == 'up') {
                domElements.main.style.backgroundColor = 'black';
                scrollToPrevious();
            }
            else {
                domElements.main.style.backgroundColor = 'white';
                scrollToNext();
            }
        }, 50);
    }, false);


    /* ON TOUCHSCREENS */
    let touchDirection = 'down';
    let touchPosition = 0;
    document.addEventListener('touchmove', (e) => {
        if (e.changedTouches[0].clientY > touchPosition) {
            touchDirection = 'up';
        }
        else {
            touchDirection = 'down';
        }

        touchPosition = e.changedTouches[0].clientY;
        domElements.main.innerHTML = touchDirection;

        e.preventDefault();
    })
    document.addEventListener('touchend', (e) => {
        if (touchDirection == 'up') {
            domElements.main.style.backgroundColor = 'black';
            scrollToPrevious();
        }
        else {
            domElements.main.style.backgroundColor = 'white';
            scrollToNext();
        }
    })
}

function scrollToNext() {
    window.scrollTo(0, domElements.main.offsetTop)
}


function scrollToPrevious() {
    window.scrollTo(0, domElements.header.container.offsetTop)
}




export default fullPageScroll;