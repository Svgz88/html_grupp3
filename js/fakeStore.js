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
                <div class="card h-100 d-flex flex-column align-items-center py-3">
            
                    <div class="d-flex justify-content-center align-items-center" style="height: 200px; width: 100%;">
                        <img class="img-fluid" src="${product.image}" alt="${product.title}" style="max-height: 100%; max-width: 80%; object-fit: contain;">
                    </div>
                    
                    <div class="card-body d-flex flex-column align-items-center justify-content-center text-center">
                        <h6 class="card-title">${product.title}</h6>
                        <p class="card-text">$${product.price}</p>
                    </div>

                    <div class="d-grid gap-2 d-md-block">
                    <button class="btn btn-primary btn-sm px-4">Add to cart</button>
                    <button class="btn btn-success btn-sm px-4 buy-now" data-bs-toggle="modal"
                    data-title="${product.title}" 
                    data-description="${product.description}" 
                    data-image="${product.image}" 
                    data-price="${product.price}"
                    data-bs-target="#orderModal">Buy Now</button>
                    </div>

                </div>
            </div>
        `;
    });

    document.getElementById('homeBanner').style.display = 'none';

    buttonBuyNow();
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

document.getElementById("orderForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Stoppar formuläret från att skickas om valideringen misslyckas

    // Hämta fältvärden
    const name = document.getElementById("customerName").value.trim();
    const email = document.getElementById("customerEmail").value.trim();
    const phone = document.getElementById("customerPhone").value.trim();
    const address = document.getElementById("customerAddress").value.trim();
    const zip = document.getElementById("customerZip").value.trim();
    const city = document.getElementById("customerCity").value.trim();

    // Rensa tidigare felmeddelanden
    document.querySelectorAll(".error").forEach(el => el.remove());

    let isValid = true;

    // Validering av namn (minst 2 tecken, max 50)
    if (name.length < 2 || name.length > 50) {
        showError("customerName", "Namnet måste vara mellan 2 och 50 tecken.");
        isValid = false;
    }

    // Validering av e-post (max 50 tecken och måste innehålla @)
    if (!email.includes("@") || email.length > 50) {
        showError("customerEmail", "E-post måste innehålla '@' och vara max 50 tecken.");
        isValid = false;
    }

    // Validering av telefonnummer (siffror, bindestreck och parenteser tillåtna, max 50 tecken)
    const phonePattern = /^[0-9\-() ]{10}$/;
    if (!phonePattern.test(phone)) {
        showError("customerPhone", "Telefonnumret får endast innehålla siffror, bindestreck och parenteser.");
        isValid = false;
    }

    // Validering av gatuadress (minst 2 tecken, max 50)
    if (address.length < 2 || address.length > 50) {
        showError("customerAddress", "Gatuadressen måste vara mellan 2 och 50 tecken.");
        isValid = false;
    }

    // Validering av postnummer (exakt 5 siffror eller (format 123 45))
    const zipPattern1 = /^\d{5}$/;
    const zipPattern2 = /^\d{3} \d{2}$/;
    if (!zipPattern1.test(zip) && !zipPattern2.test(zip) ) {
        showError("customerZip", "Postnumret måste vara exakt 5 siffror.");
        isValid = false;
    }

    // Validering av ort (minst 2 tecken, max 50)
    if (city.length < 2 || city.length > 50) {
        showError("customerCity", "Orten måste vara mellan 2 och 50 tecken.");
        isValid = false;
    }

    // Om alla fält är korrekta, skicka formuläret
    if (isValid) {
        alert("Tack för din beställning!"); // Kan ersättas med att skicka datan till en server
        this.submit(); // Skickar formuläret om allt är rätt
    }
});

// Funktion för att visa felmeddelanden
function showError(inputId, message) {
    const inputField = document.getElementById(inputId);
    const errorElement = document.createElement("p");
    errorElement.className = "error text-danger small mt-1";
    errorElement.innerText = message;
    inputField.parentNode.appendChild(errorElement)};

// Buy now button functionality
const buttonBuyNow = () => {
    const buyNowButtons = document.querySelectorAll('.buy-now');
    buyNowButtons.forEach(button => {
    button.addEventListener("click", (event) => {
        let title = event.target.dataset.title;
        let description = event.target.dataset.description;
        let image = event.target.dataset.image;
        let price = event.target.dataset.price;
        let muestraHTML = `
            <div class="container">
                <div class="row">
                    <div class="row text-center">
                        <img class="img-fluid" src="${image}" alt="${title}" style="max-width: 150px;">
                        <div class="col text-center">
                        <p><strong>${title}</strong></p>
                        <p class="fw-bolder fs-2">$${price}</p>
                    </div>
                    </div>
                    <div class="row">
                        <!--Varje description börjar med stor bokstav.-->
                        <p class="m-0 pt-3 fst-italic fw-light fw-light">${description.charAt(0).toUpperCase() + description.substring(1)}</p>
                    </div>
                    
                </div>
            </div>
        `;
        const modalContent = document.querySelector("#productModalContent");
        modalContent.innerHTML = muestraHTML;
    });
});
}