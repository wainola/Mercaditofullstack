const ROOT_URL = `${window.location.origin === 'http://localhost:3007' ? 'http://localhost:4500' : window.location.origin}`;

function calcFecha() {
    let dias = { 1: 'lunes', 2: 'martes', 3: 'miercoles', 4: 'jueves', 5: 'viernes', 6: 'sabado', 7: 'domingo' };
    let d = new Date().getDay();
    let dia = dias[d];
    let f = `${new Date().getDate() - (d - 1)}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`;
    return f;
}

export { calcFecha, ROOT_URL };
