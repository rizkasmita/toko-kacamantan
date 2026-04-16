function setVisibleToFalse() {
    const entities = products.map(item => item.class);
    entities.forEach(classname => {
        const elements = document.querySelectorAll('.' + classname + '-entity');

        elements.forEach((el) => {
            el.setAttribute("visible", "false");
        })
    })
}

let product = null;

function loadProductDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");

    product = products.find(p => p.id == productId);

    if (!product) {
        window.location.replace('/');
        alert("Produk tidak ditemukan!");
        // return;
    }

    setVisibleToFalse();
    document.querySelector('#btn-3d').setAttribute("disabled", true);

    const viewer = document.querySelector("#mviewer");
    if (viewer) {
        viewer.src = product.model + '-white.glb';
    }

    const armodel = document.querySelector("." + product.class + "-entity");
    if (armodel) {
        armodel.setAttribute("visible", true);
    }
}

window.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname.includes("product-detail.html")) {
        loadProductDetail();
    }
});

const vtoContainer = document.querySelector('.vto-container');
const vtoScene = document.querySelector('#vto-scene');
const modelContainer = document.querySelector('.model-container');

document.querySelector('#btn-ar').addEventListener('click', async () => {
    console.log('ok');
    modelContainer.style.display = 'none';
    vtoContainer.style.display = 'block';

    document.querySelector('#btn-ar').setAttribute("disabled", true);
    document.querySelector('#btn-3d').removeAttribute("disabled");
    
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const mindarSystem = vtoScene.systems["mindar-face-system"];
    await mindarSystem.start();

    window.dispatchEvent(new Event('resize'));
})

document.querySelector('#btn-3d').addEventListener('click', async () => {
    vtoContainer.style.display = 'none';

    document.querySelector('#btn-3d').setAttribute("disabled", false);
    document.querySelector('#btn-ar').removeAttribute("disabled");

    const mindarSystem = vtoScene.systems["mindar-face-system"];
    await mindarSystem.stop();

    modelContainer.style.display = 'block';
});

document.querySelectorAll('.color-options li').forEach(item => {
    item.addEventListener('click', () => {
        if (!product) return;

        const color = item.dataset.color;

        const viewer = document.querySelector("#mviewer");
        if (viewer) {
            viewer.src = product.model + `-${color}.glb`;
        }

        const modelEntity = document.querySelector(`.${product.class}-entity`);

        if (modelEntity) {
            modelEntity.setAttribute(
                "gltf-model",
                `${product.model}-${color}.glb`
            );
        }

        document.querySelectorAll('a-gltf-model').forEach(el => {
            el.setAttribute("visible", false);
        });

        if (modelEntity) {
            modelEntity.setAttribute("visible", true);
        }
        
        document.querySelectorAll('.color-options li').forEach(i => i.classList.remove('active'));

        item.classList.add('active');
    })
})