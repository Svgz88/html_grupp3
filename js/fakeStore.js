const link = 'https://fakestoreapi.com/products';

const visaData = async () => {
    try {
        const res = await fetch(link);
        const data = await res.json();
        console.log(data);

        const contenedorProductos = document.querySelector('.row.justify-content-center'); // Välj rätt behållare
        contenedorProductos.innerHTML = ''; // Rensa behållaren

        // Loopar igenom varje produkt och skapar HTML
        data.forEach(producto => {
            const productoHTML = `
        <div class="col mb-5 mx-0">
            <div class="card h-100 d-flex flex-column align-items-center">

                <div class="d-flex justify-content-center align-items-center" style="height: 200px; width: 100%;">
                    <img class="img-fluid" src="${producto.image}" alt="${producto.title}" style="max-height: 100%; max-width: 80%; object-fit: contain;">
                </div>

                
                <div class="card-body d-flex flex-column text-center">

                    <hr class="mt-auto">
            
                    <h6 class="card-title">${producto.title}</h6>
                    <p class="card-text">$${producto.price}</p>

    <!--Ge funktionalitet-->
                <div class="d-grid gap-2 d-md-block">

                    <button class="rounded btn btn-primary btn-sm" type="button">Add to cart</button>

                    <button class="rounded btn btn-primary btn-sm" type="button">Buy Now</button>
                </div>

                </div>

            </div>
        </div>
    `;
            contenedorProductos.innerHTML += productoHTML;
        });

    } catch (error) {
        console.error("Kunde inte läsa filen", error);
        document.querySelector('.row.justify-content-center').innerHTML = `<p>Fel att läsa filen.</p>`;
    }
};
visaData();