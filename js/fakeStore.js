const API_URL = 'https://fakestoreapi.com/products';
let allProducts = [];

const fetchProducts = async () => {
    try {
        const res = await fetch(API_URL);
        allProducts = await res.json();
    } catch (error) {
        console.error("Fel vid hämtning av produkter:", error);
        document.getElementById('productContainer').innerHTML = `<p class="text-danger">Kunde inte ladda produkter. Försök igen senare.</p>`;
    }
};

const renderProducts = (products) => {
    const container = document.getElementById('productContainer');
    container.innerHTML = '';

    if (products.length === 0) {
        container.innerHTML = `<p class="text-danger">Inga produkter hittades i denna kategori.</p>`;
        return;
    }

    products.forEach(product => {
        container.innerHTML += `
            <div class="col mb-5">
                <div class="card h-100 d-flex flex-column align-items-center">
                    <div class="d-flex justify-content-center align-items-center" style="height: 200px; width: 100%;">
                        <img class="img-fluid" src="${product.image}" alt="${product.title}" style="max-height: 100%; max-width: 80%; object-fit: contain;">
                    </div>
                    <div class="card-body text-center">
                        <h6 class="card-title">${product.title}</h6>
                        <p class="card-text">$${product.price}</p>
                        <div class="d-grid gap-2">
                            <button class="btn btn-primary btn-sm">Add to cart</button>
                            <button class="btn btn-success btn-sm">Buy Now</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    document.getElementById('homeBanner').style.display = 'none';
};

const filterProducts = (category) => {
    if (allProducts.length === 0) {
        console.log("Produkter laddas fortfarande...");
        return;
    }
    const filtered = allProducts.filter(p => p.category.toLowerCase() === category);
    renderProducts(filtered);
};

document.addEventListener('DOMContentLoaded', async () => {
    await fetchProducts();

    document.getElementById('homeLink').addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('productContainer').innerHTML = '';
        document.getElementById('homeBanner').style.display = 'block';
    });

    document.querySelectorAll('.categoryLink').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = e.target.getAttribute('data-category') ||
                (e.target.id === 'womenLink' ? "women's clothing" :
                    e.target.id === 'menLink' ? "men's clothing" :
                        e.target.id === 'jewelryLink' ? "jewelery" : "electronics");
            filterProducts(category);
        });
    });
});