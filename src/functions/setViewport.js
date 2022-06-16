export default function setViewport() {
    addEventListener("load", function () {
        var viewport = document.querySelector("meta[name=viewport]");
        viewport.setAttribute("content", viewport.content + ", height=" + window.innerHeight);
    })
}