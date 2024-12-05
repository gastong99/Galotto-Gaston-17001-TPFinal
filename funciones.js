function AgregarProducto() {
    let titulo = document.getElementById('titulo').value;
    let precioPeso = document.getElementById('precioPeso').value;
    let precioDolar = document.getElementById('precioDolar').value;
    let fecha = document.getElementById('fecha').value;

    if (titulo && precioPeso && precioDolar && fecha) {
        fetch('https://api.yumserver.com/17001/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                titulo: titulo,
                precioPeso: precioPeso,
                precioDolar: precioDolar,
                fecha: fecha
            })
        })
        .then(response => {
            if (response.ok) return response.text(); 
            throw new Error('Error en la solicitud: ' + response.status);
        })
        .then(data => {
            console.log('Respuesta de la API:', data);
            if (data === "OK") { 
                alert('Producto agregado con exito');
                actualizarListado();
                document.getElementById('titulo').value = "";
                document.getElementById('precioPeso').value = "";
                document.getElementById('precioDolar').value = "";
                document.getElementById('fecha').value = "";
            } else {
                alert('Error: ' + data);
            }
        })
        .catch(error => console.error('Error al agregar producto:', error));
    } else {
        alert('Todos los campos son obligatorios. Por favor, completelos.');
    }
}

function ModificarProducto()
{
    let id = document.getElementById('id').value
    let titulo = document.getElementById('titulo').value
    let precioPeso = document.getElementById('precioPeso').value
    let precioDolar = document.getElementById('precioDolar').value
    let fecha = document.getElementById('fecha').value
    
    if(titulo && precioPeso && precioDolar && fecha)
    {
        fetch('https://api.yumserver.com/17001/products', 
        {
            method: 'PATCH',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(
                {
                    idcod: id,
                    titulo: titulo,
                    precioPeso: precioPeso,
                    precioDolar: precioDolar,
                    fecha: fecha
                })
        })
        .then(response=>response.json())
        .then(data=>console.log(data))
        .catch(error=>console.error('Error:', error));
        alert('Producto modificado con exito');
        document.getElementById('id').value = "";
        document.getElementById('titulo').value = "";
        document.getElementById('precioPeso').value = "";
        document.getElementById('precioDolar').value = "";
        document.getElementById('fecha').value = "";
    }
    else
    {
        alert('Los campos no pueden ser nulos')
    }
}

function actualizarListado() {
    fetch('https://api.yumserver.com/17001/products')
        .then(response => response.json())
        .then(data => {
            console.log('Productos actualizados con exito:', data);

        })
        .catch(error => console.error('Error al actualizar el listado:', error));
}

function EliminarProducto()
{
    let id = document.getElementById('id').value
    if(id != "")
    {
    let confirmar = confirm('¿Seguro que desea eliminar el producto?')
    if (confirmar)
    {
       fetch('https://api.yumserver.com/17001/products', 
            {
                method: 'DELETE',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify(
                 {
                     idcod: id
                 })
            })
            .then(response=>response.json())
            .then(data=>console.log(data))
            .catch(error=>console.error('Error:', error));
             document.getElementById('id').value = "";
             alert('Producto eliminado con exito')
    }
    else
    {
     alert('Se detuvo el proceso')
    }
    }
    else
    {
        alert('Apartado ID nulo');
    }
}