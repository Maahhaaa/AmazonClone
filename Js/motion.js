const imgs = document.querySelectorAll('.header-slider ul img');
const prev_btn = document.querySelector('.control_previous');
const next_btn = document.querySelector('.control_next');

let n = 0;
const slideInterval = 3000; 
let slideTimer;

function changeSlide() {
    for (let i = 0; i < imgs.length; i++) {
        imgs[i].style.display = 'none'; 
    }
    imgs[n].style.display = 'block';
}

function nextSlide() {
    n = (n + 1) % imgs.length;
    changeSlide();
}

function prevSlide() {
    n = (n - 1 + imgs.length) % imgs.length;
    changeSlide();
}

changeSlide();

prev_btn.addEventListener('click', (e) => {
    e.preventDefault();
    prevSlide();
    resetSlideTimer();
});

next_btn.addEventListener('click', (e) => {
    e.preventDefault();
    nextSlide();
    resetSlideTimer();
});

function startAutoSlide() {
    slideTimer = setInterval(nextSlide, slideInterval);
}

function resetSlideTimer() {
    clearInterval(slideTimer);
    startAutoSlide();
}

startAutoSlide();

function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Product added to cart!');
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.btn').addEventListener('click', () => {
        const product = {
            title: "BENGOO G9000 Stereo Gaming Headset",
            price: 18.69,
            quantity: 1,
            image: "imgs/product_img.jpg"
        };
        addToCart(product);
    });
});


