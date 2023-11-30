let parent=document.querySelector(".parent");
let txt = document.getElementById("search");
let favorites = document.getElementById("favorites");
let buydiv = document.getElementById("buydiv");
let notification = document.getElementById("notification");

let videIcon = function(element,count){
    if(count.length===0){
        element.style.setProperty("background-image",`url("coffee-cup.png")`);
        element.style.setProperty("background-repeat","no-repeat");
        element.style.setProperty("background-size","150px 150px");
        element.style.setProperty("background-position","50% 50%");
    }else{element.style.setProperty("background-image",`url("")`);}}
///////////////////favorites
let favoritedata = async function(){
try{
favorites.innerHTML = `<p>favorites</p>`;
let {data} = await axios.get("/api/products");
let favoriteProduct = data.myproducts.filter(function(e){
return e.favorite === true;
});
let allid = [];
let alltitle = [];
let alldesc = [];
let allimgs = [];
let allprice = [];
let allabout= [];

favoriteProduct.forEach(function(e){
alltitle.push(e.title);
alldesc.push(e.desc);
allimgs.push(e.img);
allprice.push(e.price);
allid.push(e.id);
allabout.push(e.about);
});     
videIcon(favorites,allimgs);
for(let x=0;x<allimgs.length;x++){
let products = document.createElement("div");
let productsimg = document.createElement("img");
let productsdetails = document.createElement("div");
let productstitle = document.createElement("span");
let productsdesc = document.createElement("span");
let productsprice = document.createElement("span");
let productsaddmin1 = document.createElement("button");
let productsquatntite = document.createElement("span");
let txtmaintitle = document.createTextNode(alltitle[x]);
let txtdesc = document.createTextNode(alldesc[x]);
let mybr1 = document.createElement("br");
let mybr2 = document.createElement("br");
let addvalue = document.createTextNode("Learn More");
let myhr = document.createElement("hr");
let btndelete = document.createElement("div");
let btndeletetxt = document.createTextNode("delete");
let productsabout = document.createElement("div");
let txtproductsabout = document.createTextNode(allabout[x]);

products.setAttribute("class","products");
productsimg.setAttribute("src",allimgs[x]);
productsdetails.setAttribute("class","details")
productstitle.setAttribute("class","title");
productsdesc.setAttribute("class","desc");
productsprice.setAttribute("class","price");
productsaddmin1.setAttribute("class","addmin");
productsaddmin1.setAttribute("id","addmin"+x);
productsquatntite.setAttribute("id","quatntite"+x);
btndelete.setAttribute("class","favoritedelete");
productsabout.setAttribute("class","productsabout");
productsabout.setAttribute("style","height: 0px; display:block;");

productstitle.append(txtmaintitle);
productsdesc.append(txtdesc);
productsaddmin1.append(addvalue);
btndelete.append(btndeletetxt);

products.append(productsimg);
products.append(productsdetails);
productsdetails.append(productstitle);
productsdetails.append(mybr1);
productsdetails.append(productsdesc);
productsdetails.append(mybr2);
productsdetails.append(productsprice);
productsdetails.append(btndelete);
products.after(myhr);
productsabout.append(txtproductsabout);
favorites.append(products);
favorites.append(productsabout);


productsimg.onclick = function(){   
if(productsabout.style.height==="0px"){productsabout.style.height="100px";}
else if(productsabout.style.height==="100px"){productsabout.style.height="0px";}
}

btndelete.onclick = async function(){
let {data} = await axios.post("/api/products/removefavorites",{id:allid[x]});
favoritedata();
}

}
}catch(err){
console.log(err);
}
}
///////////////////add to card
let addtocarddata = async function(){
try{
nav.innerHTML = "<p>My Cart</p>";
let {data} = await axios.get("/api/products");
let addToCardProduct = data.myproducts.filter(function(e){
return e.addtocard === true;
});
let allid=[];
let alltitle = [];
let alldesc = [];
let allimgs = [];
let allprice = [];
let allquantite = [];
addToCardProduct.forEach(function(e){
alltitle.push(e.title);
alldesc.push(e.desc);
allimgs.push(e.img);
allprice.push(e.price);
allquantite.push(e.quantite);
allid.push(e.id);
});     

videIcon(nav,allimgs);

for(let x=0;x<allimgs.length;x++){
let products = document.createElement("div");
let productsimg = document.createElement("img");
let productsdetails = document.createElement("div");
let productstitle = document.createElement("span");
let productsdesc = document.createElement("span");
let productsprice = document.createElement("span");
let productsaddmin1 = document.createElement("button");
let productsquatntite = document.createElement("span");
let productsaddmin2 = document.createElement("button");
let txtmaintitle = document.createTextNode(alltitle[x]);
let txtdesc = document.createTextNode(alldesc[x]);
let txtprice = document.createTextNode(allprice[x]);
let txtquantite = document.createTextNode(allquantite[x]+"");
let mybr1 = document.createElement("br");
let mybr2 = document.createElement("br");
let mybr3 = document.createElement("br");
let addvalue = document.createTextNode("+");
let minvalue = document.createTextNode("-");
let myhr = document.createElement("hr");
let btndelete = document.createElement("div");
let btndeletetxt = document.createTextNode("delete");

products.setAttribute("class","products");
productsimg.setAttribute("src",allimgs[x]);
productsdetails.setAttribute("class","details")
productstitle.setAttribute("class","title");
productsdesc.setAttribute("class","desc");
productsprice.setAttribute("class","price");
productsaddmin1.setAttribute("class","addmin");
productsaddmin1.setAttribute("id","addmin"+x);
productsaddmin2.setAttribute("class","addmin");
productsaddmin2.setAttribute("id","addmin"+x+"s");
productsquatntite.setAttribute("id","quatntite"+x);
productsquatntite.setAttribute("class","productQuantite");
btndelete.setAttribute("class","btndelete");


productstitle.append(txtmaintitle);
productsdesc.append(txtdesc);
productsprice.innerHTML = (parseFloat( allprice[x].split("$")[0]) *allquantite[x]).toFixed(2) +"$" ;
productsquatntite.append(txtquantite);
productsaddmin1.append(addvalue);
productsaddmin2.append(minvalue);
btndelete.append(btndeletetxt);

products.append(productsimg);
products.append(productsdetails);
productsdetails.append(productstitle);
productsdetails.append(mybr1);
productsdetails.append(productsdesc);
productsdetails.append(mybr2);
productsdetails.append(productsprice);
productsdetails.append(productsaddmin1);
productsdetails.append(productsquatntite);
productsdetails.append(productsaddmin2);
productsdetails.append(mybr3);
productsdetails.append(btndelete);

let mmhr = document.createElement("hr");
mmhr.setAttribute("class","mmhr");
nav.append(products);
nav.append(mmhr);
document.getElementById("addmin"+x).onclick =async function(){
let myquatntite = document.getElementById("quatntite"+x);
myquatntite.innerHTML= ( parseInt(myquatntite.innerHTML)+1 ) +"" ;
productsprice.innerHTML = (parseFloat(productsprice.innerHTML.toString().split("$")[0]) + parseFloat(allprice[x].toString().split("$")[0])).toFixed(2) +"$";
allquantite[x]=myquatntite.innerHTML;
let {data} = await axios.post("/api/products/quantite",{id:allid[x],quantite:productsquatntite.innerHTML});
}

document.getElementById("addmin"+x+"s").onclick = function(){ 
let myquatntite = document.getElementById("quatntite"+x);
if(parseInt(myquatntite.innerHTML)>1){
document.getElementById("quatntite"+x).innerHTML=( parseInt(document.getElementById("quatntite"+x).innerHTML)-1 ) +"" ;
productsprice.innerHTML = (parseFloat(productsprice.innerHTML.toString().split("$")[0]) - parseFloat(allprice[x].toString().split("$")[0])).toFixed(2) +"$";
allquantite[x]=myquatntite.innerHTML;
}

}

buydiv.onclick =async function(){
let {data} = await axios.post("/achat",{
id:allid,
quantite:allquantite
});
location.href="/achat";
}
btndelete.onclick =async function(){
let {data} = await axios.post("/api/products/removefromcard",{id:allid[x],quantite:allquantite[x]});
addtocarddata();
}

}



}catch(err){
console.log(err);
}
}
document.getElementById("addtocard").addEventListener("click",function(){
buydiv.style.width = "300px";
addtocarddata();
});
////////////show products
let getdata = async function(){
try{
let {data} = await axios.get("/api/products");
let allid = [];
let alltitle = [];
let alldesc = [];
let allimgs = [];
let allprice = [];

data.myproducts.forEach(function(e){
alltitle.push(e.title);
alldesc.push(e.desc);
allimgs.push(e.img);
allprice.push(e.price);
allid.push(e.id);
});     

for(let x=0;x<allimgs.length;x++){
let masterdiv = document.createElement("div");
let img = document.createElement("img");
let maintitle = document.createElement("p");
let desc = document.createElement("p");
let txvalue = document.createElement("input");
let btnadd = document.createElement("button");
let nav = document.getElementById("nav");                                  
let favoriteicon = document.createElement("i");
favoriteicon.setAttribute("class","fa-solid fa-heart myfavorite");

masterdiv.setAttribute("class","master");
img.setAttribute("src",allimgs[x]);
img.setAttribute("class","img");
maintitle.innerHTML=alltitle[x];
maintitle.setAttribute("class","maintitle");
desc.innerHTML = alldesc[x];
desc.setAttribute("class","desc");
txvalue.setAttribute("type","text");
txvalue.setAttribute("value",allprice[x]);
txvalue.setAttribute("class","txvalue");
btnadd.setAttribute("class","btnadd");
txvalue.disabled=true;
btnadd.innerHTML="+";
btnadd.addEventListener("click",async function(){
let {data} = await axios.post("/api/products",{id:allid[x],addtocard:true});
addtocarddata();
});
favoriteicon.addEventListener("click",async function(){
let {data} = await axios.post("/api/products/favorite",{id:allid[x],favorite:true});
favoritedata();

});
masterdiv.append(favoriteicon);
masterdiv.append(document.createElement("br"));
masterdiv.append();
masterdiv.append(img);
masterdiv.append(maintitle);
masterdiv.append(desc);
masterdiv.append(txvalue);
masterdiv.append(btnadd);

parent.append(masterdiv);
}
}catch(err){
console.log(err);
}

}
getdata();
////////carte  style
let hideproductsabout = function(){document.querySelectorAll(".productsabout").forEach(function(e){
if(e.style.height==="100px"){e.style.display="none";}
});}
function addtocardstyle(){
hideproductsabout();
if(favorites.style.width ==="300px"){favorites.style.width="0px";}
if(notification.style.width==="300px"){ notification.style.width="0px"; }
if(nav.style.width ==="0px"){nav.style.width="300px"; buydiv.style.width="300px";}

else if(nav.style.width ==="300px"){   nav.style.width="0px"; buydiv.style.width="0px";  }}
document.getElementById("addtocard").onclick = function(){
addtocardstyle();
}
////////favorite  style
document.getElementById("myfavorites").onclick = function(){
hideproductsabout();
if(nav.style.width ==="300px"){nav.style.width="0px"; buydiv.style.width="0px";}
if(notification.style.width==="300px"){ notification.style.width="0px"; }
if(favorites.style.width ==="0px"){favorites.style.width="300px";  
favoritedata();
}
else if(favorites.style.width ==="300px"){
favorites.style.width="0px";
}
}
///////////home  style
document.getElementById("home").onclick = function(){
hideproductsabout();
if(notification.style.width==="300px"){notification.style.width="0px";}
if(favorites.style.width ==="300px"){favorites.style.width="0px"; }
if(nav.style.width ==="300px"){nav.style.width="0px"; buydiv.style.width="0px";}
};
////////////////////notification style
document.getElementById("mynotification").onclick = function(){
hideproductsabout();
if(nav.style.width ==="300px"){nav.style.width="0px"; buydiv.style.width="0px";}
if(favorites.style.width ==="300px"){favorites.style.width="0px"; }
if(notification.style.width==="0px"){ notification.style.width="300px"; }
else if(notification.style.width==="300px"){notification.style.width="0px";}
};
/////////////search
txt.onkeyup = async function(){
try{
await axios.post("/api/products/title",{title:txt.value});
let {data} = await axios.get("/api/products/title");
function run(){
parent.innerHTML = "";
let allid = [];
let alltitle = [];
let alldesc = [];
let allimgs = [];
let allprice = [];
data.search.forEach(function(e){
alltitle.push(e.title);
alldesc.push(e.desc);
allimgs.push(e.img);
allprice.push(e.price);
allid.push(e.id);
});    
////////////show products IN SEARCH
for(let x=0;x<allimgs.length;x++){
let masterdiv = document.createElement("div");
let img = document.createElement("img");
let maintitle = document.createElement("p");
let desc = document.createElement("p");
let txvalue = document.createElement("input");
let btnadd = document.createElement("button");
let nav = document.getElementById("nav");                                  
let favoriteicon = document.createElement("i");
favoriteicon.setAttribute("class","fa-solid fa-heart myfavorite");

masterdiv.setAttribute("class","master");
img.setAttribute("src",allimgs[x]);
img.setAttribute("class","img");
maintitle.innerHTML=alltitle[x];
maintitle.setAttribute("class","maintitle");
desc.innerHTML = alldesc[x];
desc.setAttribute("class","desc");
txvalue.setAttribute("type","text");
txvalue.setAttribute("value",allprice[x]);
txvalue.setAttribute("class","txvalue");
btnadd.setAttribute("class","btnadd");
txvalue.disabled=true;
btnadd.innerHTML="+";
btnadd.addEventListener("click",async function(){
let {data} = await axios.post("/api/products",{id:allid[x],addtocard:true});
});
favoriteicon.addEventListener("click",async function(){
let {data} = await axios.post("/api/products/favorite",{id:allid[x],favorite:true});
});
masterdiv.append(favoriteicon);
masterdiv.append(document.createElement("br"));
masterdiv.append();
masterdiv.append(img);
masterdiv.append(maintitle);
masterdiv.append(desc);
masterdiv.append(txvalue);
masterdiv.append(btnadd);

parent.append(masterdiv);
}


}
run();


}catch(err){
console.log(err);
}
}



