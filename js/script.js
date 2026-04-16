const navbarNav = document.querySelector('.navbar-nav');

document.querySelector('#hamburger-menu').onclick = () => {
    navbarNav.classList.toggle('active');
};

const hamburger = document.querySelector('#hamburger-menu');

document.addEventListener('click', function(e) {
    if(!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
        navbarNav.classList.remove('active');
    }
});


function goToDetail(id) {
    window.location.href = `product-detail.html?id=${id}`;
}

const containerProducts = document.getElementById("product-list");
products.forEach(product => {
    const card = `
        <div class="product-card item-detail-button">
            <div class="product-image">
                <img src="img/menu/${product.img}-white.png" alt="${product.name}" class="product-card-img">
            </div>
            <div class="product-content">
                <h3 class="product-card-title">${product.name}</h3>
                <p class="product-card-desc">${product.shortdesc}</p>
            </div>
            <div class="product-btn">
                <button onclick="goToDetail(${product.id})">AR</button>
                <button onclick="productDetail(${product.id})" class="item-detail-button">Detail</button>
            </div>
        </div>
    `;
    containerProducts.insertAdjacentHTML("beforeend", card);
});

let selectedProduct = null;
const itemDetailModal = document.querySelector('#item-detail-modal');

function productDetail(id) {
    selectedProduct = products.find(p => p.id === id);

    document.querySelector('#colwhite').classList.add('active');
    document.querySelector('#colblack').classList.remove('active');

    document.querySelector('#modal-img').src = `img/menu/${selectedProduct.img}-white.png`;
    document.querySelector('#modal-title').innerHTML = selectedProduct.name;
    document.querySelector('#modal-desc').innerHTML = selectedProduct.desc;

    document.querySelector('.details table tr td.tipe').innerHTML = selectedProduct.tipe;
    document.querySelector('.details table tr td.jk').innerHTML = selectedProduct.jk;
    document.querySelector('.details table tr td.fungsi').innerHTML = selectedProduct.fungsi;
    document.querySelector('.details table tr td.berat').innerHTML = selectedProduct.berat;
    document.querySelector('.details table tr td.bentuk').innerHTML = selectedProduct.bentuk;
    document.querySelector('.details table tr td.gaya').innerHTML = selectedProduct.gaya;

    itemDetailModal.style.display = 'flex';
}

document.querySelectorAll('.color-options li').forEach(item => {
    item.addEventListener('click', () => {
        const color = item.dataset.color;

        document.querySelector('#modal-img').src = `img/menu/${selectedProduct.img}-${color}.png`;

        document.querySelectorAll('.color-options li').forEach(i => i.classList.remove('active'));

        item.classList.add('active');
    })
})

document.querySelector('.modal .close-icon').onclick = async (e) => {
    itemDetailModal.style.display = 'none';
    e.preventDefault();
}

const modal = document.querySelector('#item-detail-modal');
window.onclick = (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
}