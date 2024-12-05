window.addEventListener('load', () => {
    CargarAPIConsola();
    CargarAPIPantalla();
});

function CargarAPIConsola() {
    fetch('https://api.yumserver.com/17001/products')
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
}

function CargarAPIPantalla() {
    const contenedorRelleno = document.querySelector('.contenedor');
    fetch('https://api.yumserver.com/17001/products')
        .then(response => response.json())
        .then(data => {
            renderizarTabla(data, contenedorRelleno);
            configurarFiltro(data, contenedorRelleno);
        })
        .catch(error => console.error('Error:', error));
}

function renderizarTabla(data, contenedor) {
    let tablaHTML = `
        <table class="tabla-datos">
            <thead>
                <tr>
                    <th>Producto</th>
                    <th>Precio (ARS)</th>
                    <th>Precio (USD)</th>
                    <th>Fecha</th>
                    <th>ID</th>
                </tr>
            </thead>
            <tbody>
    `;
    data.forEach(({ idcod, titulo, precioPeso, precioDolar, fecha }) => {
        tablaHTML += `
            <tr>
                <td>${titulo}</td>
                <td>$ ${precioPeso}</td>
                <td>U$D ${precioDolar}</td>
                <td>${fecha}</td>
                <td>${idcod}</td>
            </tr>
        `;
    });
    tablaHTML += `
            </tbody>
        </table>
    `;
    contenedor.innerHTML = tablaHTML;
}

function configurarFiltro(data, contenedor) {
    const filtro = document.getElementById('filtro');
    filtro.addEventListener('input', () => {
        const textoFiltro = filtro.value.toLowerCase();
        const datosFiltrados = data.filter(item =>
            item.titulo.toLowerCase().includes(textoFiltro)
        );
        renderizarTabla(datosFiltrados, contenedor);
    });
}