const express = require('express'); //É uma forma de importar uma biblioteca sem utilizar o type module em package
const mongoose = require("mongoose");
const ShortUrl = require("./models/shorturl");
const { isAfter } = require("date-fns");
const app = express()

mongoose.connect("mongodb://localhost/urlShortener", { //conecta na DB Local do mongoDB
    useNewUrlParser: true,
    useUnifiedTopology: true //useUnifiedTopology e useNewUrlParser: true são recomendações da equipe do MongoDB para um melhor monitoramento, se não passar vai ficar vários warnings aparecendo
});

app.set("view engine", "ejs") //O motivo de utilizar EJS é por causa do modelo do template que será utilizado(para fazer a listagem dos links com ForEach)
//o app.set é para definir configurações no express, nesse caso esta definindo qual engine será utilizado nesse projeto para renderizar os arquivos, "view engine" é default, o segundo parâmetro é a engine
app.use(express.urlencoded({ extended: false }))//urlencoded serve para o express tratar o body e retornar um objeto, como estamos trabalhando com JSON, é posto false para que o body continue como JSON

app.get("/", async (req, res) => { //para renderizar a página index ejs
    const shortUrls = await ShortUrl.find() //Find vai pegar todas as urls na tabela (Função do mongoose)
    res.render('index', { shortUrls: shortUrls })
});

app.post("/shortUrls", async (req, res) => {
    const sameUrl = await ShortUrl.findOne({ full: req.body.fullUrl });

    if (sameUrl == null) { //Caso o link não exista vai retornar null e salvar na DB, se não retorna 404
        await ShortUrl.create({ full: req.body.fullUrl }) //Vai criar o objeto na base pegando a url inserida no input fullUrl no index.ejs e salvando em full e outros parametros serão salvos da forma definida no schema
        res.redirect("/") //Após fazer a operação vai chamar a função get inicial e listar todos novamente (para atualizar a lista)
    } else {
        return res.send("O link já foi cadastrado")
    }
});

app.get("/:shortUrl", async (req, res) => { //o shortUrl será o id encurtado da url que será passada como parametro logo abaixo para fazer uma busca com o findOne (req.params.shortUrl)
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl }) //utilizando o findOne desta forma é como uma comparação, se o parametro passado na URL for igual a algum parametro dentro do mongoDb ele retorna, se não null

    if (shortUrl == null) {
        return res.sendStatus(404)
    }
    shortUrl.clicks++
    shortUrl.save();//Para fazer update na db da adição do click acima


    if (isAfter(shortUrl.expireDate, new Date()) && shortUrl.activity == "enabled") {
        res.redirect(shortUrl.full)
    } else {
        return res.send("O link já expirou ou foi desabilitado")
    }
});

app.patch("/", async (req, res) => {
    const activity = await ShortUrl.findOne({ activity: req.body.botaoEnableDisable})
    console.log(activity)
})

app.listen(process.env.PORT || 5000) //Configuração da porta, setando a porta como 5000