import React from 'react';

const Presentacion = () => (
<div className="jumbotron" 
    style={{ backgroundImage: "url(./productos/campo2.jpg)", backgroundSize: "cover", height: "500px", backgroundPosition: "center center"}}>
    <div className="container text-center">
        <h1 className="text-white font-bold" style={{marginTop: "50px"}}>Mercadito de Larmahue</h1>
        <p className="lead text-white">Precios justos, mejores productos!</p>
    </div>
</div>
);

export default Presentacion;