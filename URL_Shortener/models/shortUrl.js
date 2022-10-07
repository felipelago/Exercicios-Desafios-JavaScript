const mongoose = require("mongoose")
const shortId = require("shortId")//Usando a biblioteca shortid para criar um identificador curto unico
const {addDays} = require("date-fns");

function dataExpiracao() {
    data = addDays(new Date(), 7);
    return data;
}

const shortUrlSchema = new mongoose.Schema({ //Aqui será o objeto onde será listado todas as diferentes colunas do DB
    full: { //Será o nome da coluna no DB (dentro dela você coloca as definições)
        type: String,
        required: true //Como o nome já diz, preencher essa chave é necessário para salvar no mongodb
    },
    short: {
        type: String,
        required: true,
        default: shortId.generate //Toda vez que for criado uma url, ele vai utilizar essa função da biblioteca, gerar um id e salvar na coluna short na DB
    },
    clicks: {
        type: Number,
        required: true,
        default: 0 //Para iniciar com contador no 0
    },
    expireDate: {
        type: Date,
        required: true,
        default: dataExpiracao()
    },
    activity: {
        type: String,
        required: true,
        default: "enabled"
    }
});

module.exports = mongoose.model("ShortUrl", shortUrlSchema); //(nome do model, o esquema)
//model é usado para criar uma coleção de um banco de dados específico do mongoDB, vai interligar o shortUrl ao modelo criado em shortUrlSchema