const container = document.getElementById("review");
const prevBtn = document.querySelector(".arrow-btn.prev");
const nextBtn = document.querySelector(".arrow-btn.next");
let isMouseDown = false;
let startX, scrollLeft;
let scrollSnapDisabled = false;

container.addEventListener("mousedown", (e) => {
    isMouseDown = true;
    startX = e.pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;
    disableScrollSnap();
});

container.addEventListener("mouseleave", () => {
    isMouseDown = false;
    enableScrollSnap();
});

container.addEventListener("mouseup", () => {
    isMouseDown = false;
    enableScrollSnap();
});

container.addEventListener("mousemove", (e) => {
    if (!isMouseDown) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 1;
    container.scrollLeft = scrollLeft - walk;
});

container.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    scrollLeft = container.scrollLeft;
    disableScrollSnap();
});

container.addEventListener("touchmove", (e) => {
    const x = e.touches[0].clientX;
    const walk = (x - startX) * 1;
    container.scrollLeft = scrollLeft - walk;
});

function disableScrollSnap() {
    if (!scrollSnapDisabled) {
        container.style.scrollSnapType = "none";
        scrollSnapDisabled = true;
    }
}

function enableScrollSnap() {
    if (scrollSnapDisabled) {
        container.style.scrollSnapType = "x mandatory";
        scrollSnapDisabled = false;
    }
}

prevBtn.addEventListener("click", () => {
    const itemWidth = container.scrollWidth / container.childElementCount;
    container.scrollLeft -= itemWidth;
});

nextBtn.addEventListener("click", () => {
    const itemWidth = container.scrollWidth / container.childElementCount;
    container.scrollLeft += itemWidth;
});