const express = require("express")
const server = express() // Objeto de Servidor


//Pegar BD
const db = require("./database/db")

//Configurar pasta publica
server.use(express.static("public"))
//habilita o uso do req.body
server.use(express.urlencoded({extended: true}))

//Utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views",{
    express: server,
    noCache: true
})

//Configurar caminhos da minha aplicação
//pagina incial
// req: requisição
// res: resposta

server.get("/", (req,res)=>{
    return res.render("index.html", {title: "Um título "})//Envie um arquivo
})

server.get("/create-point", (req,res)=>{
    //Receber dados do formulario
    // req.query: Query Strings da nossa URL
    return res.render("create_point.html")//Envie um arquivo
})
server.post("/savepoint", (req,res)=>{   
    //console.log(req.body)
    
    //inserir dados no BD

    const query  = `
    INSERT INTO places (
        name,
        image,        
        address,
        address2,
        state,
        city,
        items
    ) VALUES (?,?,?,?,?,?,?);
    `
    const values = [
        req.body.name,
        req.body.image,         
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err){
        if(err){
            console.log(err)
            return res.send("Erro no Cadastro")
        }
        console.log("Cadastrado com Sucesso")
        console.log(this)
        return res.render("create_point.html", {saved: true})
    }

    db.run(query, values, afterInsertData)
    
})

server.get("/search", (req,res)=>{
    const search = req.query.search
        
    if(search == ""){
        return res.render("search-results.html", {total: 0})
    }
    // Pegar os dados de banco de dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows){
        if(err){
            return console.log(err)
        }

        const total = rows.length

        //Mostrar a Pagina html com os dados do banco de dados
        return res.render("search-results.html", {places: rows, total})
    })

    //Envie um arquivo
})

/*
server.get("/create-point", (req,res)=>{
    res.render(__dirname + "/views/create_point.html")//Envie um arquivo
})
*/


//ligar o servidor
server.listen(3000)

