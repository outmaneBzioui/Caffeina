    let parent = document.getElementById("parent");
    let one = document.getElementById("one");
    let two = document.getElementById("two");
let container = document.getElementById("container");
let select = document.getElementById("select");

let getdata = async function(){
let {data} = await axios.get("/api/products/achat");
let allid = [];
let alltitle = [];
let alldesc = [];
let allprice = [];
let allquantite = [];
let allimgs = [];
let price = "";
let totalprice = 0;
data.achat.forEach(e => {
    allid.push(e.id);
    alltitle.push(e.title);
    alldesc.push(e.desc);
    allprice.push(e.price);
    allquantite.push(e.quantite);
    allimgs.push(e.img);
});

for(let x=0;x<allimgs.length;x++){
    price = parseFloat((allprice[x].split("$")[0])*allquantite[x]).toFixed(2);
    totalprice +=parseFloat(price);
  let product = ` 
            <div class="product" >
                <img src="${allimgs[x]}" alt="cc">
                  <div class="product-2" >
                    <span class="title" >${alltitle[x]}</span>
                    <span class="desc" >${alldesc[x]}</span>
                    <p>${price}$</p>
                  </div>
             </div><hr>`;
             container.innerHTML += product;
}

let orderproduct = `
<div class="Delivery" >
    <p>Delivery</p>
    <p>$4.95</p>
</div>
<div class="Total" >
    <p>TOTAL</p>
    <p>${(totalprice+4.95).toFixed(2)}$</p>
</div>
`;

one.innerHTML += orderproduct;
}
getdata();

select.onchange = function(){
    if(select.value==="visa"){
       document.querySelector(".visa").src="visa.png";
    }else{
        document.querySelector(".visa").src="mastercard.png";
    }
}


