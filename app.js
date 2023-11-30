const express = require("express");
const app = express();
const path = require("path");
let { products } = require("./db/products");
const {writeFile} = require("fs").promises;

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(express.static("./mycss"));
app.use(express.static("./imgs"));
app.use(express.static("./script"));


let searchProducts=[];
let buyproducts= [];
app.get("/",function(req,res){
res.sendFile(path.join(__dirname,"./views/index.html"));
});

app.get("/api/products",function(req,res){
    res.status(200).json({myproducts:products});
});

app.post("/api/products",function(req,res){
    let {id,addtocard} = req.body;
   let newproducts=  products.map(function(e){
        if(e.id === id){
            e.addtocard = true;
            return e;
        }else{
            return e;
        }
    });
    for(let x=0;x<products.length;x++){
        products[x] = newproducts[x];
    }
    res.send();
});

app.post("/api/products/favorite",function(req,res){
    let {id,favorite} = req.body;
    let newproducts=  products.map(function(e){
         if(e.id === id){
             e.favorite = true;
             return e;
         }else{
             return e;
         }
     });
     for(let x=0;x<products.length;x++){
         products[x] = newproducts[x];
     }
     res.send();
});

app.post("/api/products/quantite",function(req,res){
    let {id,quantite,price} = req.body;
let newproducts=  products.map(function(e){
    if(e.id === id){
        e.quantite = quantite;
        return e;
    }else{
        return e;
    }
});
for(let x=0;x<products.length;x++){
    products[x] = newproducts[x];
}
    res.send();
})

app.post("/api/products/title",function(req,res){
    let {title} = req.body;
    searchProducts = products.filter(function(e){
        return e.title.startsWith(title.trim());
    });
    res.send();
});

app.get("/api/products/title",function(req,res){
    res.status(200).json({search:searchProducts});
});

app.get("/achat",function(req,res){

res.sendFile(path.join(__dirname,"./views/achat.html"));
});

app.post("/achat",function(req,res){
     let {id,quantite} = req.body;
     let x=0;
      buyproducts = products.filter(function(e){
      for(let x=0;x<id.length;x++){
        if(e.id === id[x]){
            e.quantite = quantite[x];
            return e;
        }
      }
        
     }); 
    res.send();
});
app.get("/api/products/achat",function(req,res){
    res.status(200).json({achat:buyproducts});
});

app.post("/api/products/removefromcard",function(req,res){
  let {id,quantite} = req.body;
 let newp= products.map(function(e){
    if(e.id===id){
        e.addtocard = false;
        e.quantite = quantite;
    }
    return e;
});
products = newp;
    res.send();
});

app.post("/api/products/removefavorites",function(req,res){
let {id} = req.body;
let newp = products.map(function(e){
    if(e.id===id){
        e.favorite = false;
    }
    return e;
});
    res.send();
    products = newp;
});

app.listen(5000);