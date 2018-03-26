exports.getAllProducts = function(req, res, next){
    res.send({products: 'todos los productos'});
}

exports.saveProduct = function(req, res, next){
    res.send({save: 'Save Productos'});
}