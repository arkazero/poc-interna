exports = module.exports = function(app, mongoose) {
    console.log('Ingresando a crear la BD');
    var proxyReversoSchema = new mongoose.Schema({
        idEds: { type: String },
        ip: { type: String },
        nombre: { type: String },
        ciudad: { type: String },
        departamento: { type: String },
        ventas: { type: Number },
        tipo: {
            type: String,
            enum: ['Propia', 'Afiliada']
        }
    });

    mongoose.model('ProxyReverso', proxyReversoSchema);
};