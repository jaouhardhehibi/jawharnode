const express = require ('express');
const bodyparser = require ('body-parser');
const cors = require ('cors');
const mysql = require('mysql');
//const { CLIENT_LONG_PASSWORD } = require('mysql/lib/protocol/constants/client');


const app = express();
// 
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(cors());
app.use(bodyparser.json());


//database connection
const db = mysql.createPool ({
    host: "127.0.0.1",
    database: "worldtech",
   port: "3306",
    user :"root",
    password: ""
})


// test connection
db.query(err => {
    if (err) {console.log(err,'erreur db');}
console.log('database connected');
})


// get all familles
db.query(`SELECT * FROM famille`,(err,res,fields) => {
    return console.log(res);
});


// get all articles
     let qr =`SELECT * FROM articles`;
     db.query(qr,(err,result) => {
         if(err) {  console.log(err,'erreur affiche article')};
         if (result.length>0) {
             
                console.log('tous les articles',result);
          
         }
     });
// ajout article
/*let qr2 = "INSERT INTO articles (id,famille,sous_famille,nom_article,prix) VALUES ('6','telephone','huawei','p8','900') ";
db.query(qr2,(err,result2) => {
    if(err) {
        return console.log("erreur d insertion");

    }
    if (result2){
       return console.log("article ajoutee",result2);
    }
});*/
// get artilces http
app.get('/articles',(req,result3) =>{

let qr3 = `SELECT * FROM articles`;
db.query(qr3,(err,res2) => {
    if(err) { console.log("erreur",err)}
  //  if (res2.length>0)
 //   {
        result3.send({
            message:'afficher articles',
            data:res2
        });
        console.log(res2);
   // }
});
});

// get single data
app.get('/articles/:id',(req,res) => {
    let gID = req.params.id;
    let qr = `select * from articles where id_article=${gID}`;
    db.query(qr,(err,result) =>{
        if(err) { console.log(err,"erreur id");}
     //  if (result.length>0) {
            res.send({
                message:'article trouve',
                data:result
                
            });
            console.log(result)
      //  }
       /* else {
            res.send({
                message:'article non trouvé'
            })
        }*/
    });
});

//create row 

app.post('/articles',(req,res)=> {

    console.log('create data');

    let idA = req.body.id;
    let familleA = req.body.famille;
    let ssfamilleA = req.body.ssfamille;
    let Narticle = req.body.article;
    let prixA = req.body.prix;

    let qr = `insert into articles (id_article, nom_famille, nom_ssfamille, nom_article, prix) values ('${idA}' ,'${familleA}','${ssfamilleA}','${Narticle}','${prixA}')`;

    db.query(qr,(err, result) => {
        
        if (err){ console.log(err,"erreur")}
        // aficher requete sql
         console.log(qr)
        if (result.length>0)
        {
            res.send({
                message:'article ajouté'
            })
        }
        else
        {
            res.send({
                message: 'article non ajoute'
            })
        }
    });
});
 // update single row

 app.put('/articles/:id',(req,res) => {

        let gID = req.params.id;
        let famille = req.body.nom_famille;
        let ssfamille = req.body.nom_ssfamille;
        let article = req.body.nom_article;
        let prix = req.body.prix;
    let qr = `update articles set nom_famille = '${famille}',  nom_ssfamille = '${ssfamille}', nom_article = '${article}', prix='${prix}' where id_article = ${gID}`;
 
    db.query(qr,(err,result) => {
        console.log(qr);
        if (err) {console.log("erreur",err);}
        res.send ({
            message:'article modifiee'
        })

    });
});

// delete single row

app.delete('/articles/:id',(req,res)=> {

    let qID = req.params.id;

    let qr = `delete from articles where id_article = '${qID}'`;

    db.query(qr,(err,result)=>{
        if (err) {
            console.log(err,"erreur");
        }
        else
        {
            res.send ({
                message:"article supprimer"
            })
        }
    });

});



// runing server
app.listen(3000,()=> {
    console.log("server running");
})