document.addEventListener('DOMContentLoaded', () => {
    // Cargar comentarios existentes
    cargarComentarios();

    // Manejar envío de comentarios
    document.getElementById('form-comentario').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nombre = document.getElementById('nombre').value;
        const mensaje = document.getElementById('mensaje').value;
        
        if(nombre && mensaje) {
            agregarComentario(nombre, mensaje);
            guardarComentario(nombre, mensaje);
            document.getElementById('form-comentario').reset();
        }
    });
});

function cargarComentarios() {
    const comentarios = JSON.parse(localStorage.getItem('comentarios')) || [];
    const contenedor = document.getElementById('comentarios-list');
    
    contenedor.innerHTML = comentarios.map(comentario => `
        <div class="comentario">
            <h5>${comentario.nombre}</h5>
            <p>${comentario.mensaje}</p>
            <small class="text-muted">${new Date(comentario.fecha).toLocaleDateString()}</small>
        </div>
    `).join('');
}

function agregarComentario(nombre, mensaje) {
    const contenedor = document.getElementById('comentarios-list');
    const nuevoComentario = `
        <div class="comentario">
            <h5>${nombre}</h5>
            <p>${mensaje}</p>
            <small class="text-muted">${new Date().toLocaleDateString()}</small>
        </div>
    `;
    contenedor.insertAdjacentHTML('afterbegin', nuevoComentario);
}

function guardarComentario(nombre, mensaje) {
    const comentarios = JSON.parse(localStorage.getItem('comentarios')) || [];
    comentarios.push({
        nombre,
        mensaje,
        fecha: new Date().toISOString()
    });
    localStorage.setItem('comentarios', JSON.stringify(comentarios));
}