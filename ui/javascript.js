//////api calling fn/////////////////
const getData = async (url, method) => {
  const settings = {
    method: method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  try {
    const fetchResponse = await fetch(url);
    const data = await fetchResponse.json();
    console.log("data", data, url);
    return data;
  } catch (e) {
    return e;
  }
};

//////////////fn calling  for get banners///////////////////
window.onload = function () {
  getData("http://localhost:5000/banners", "GET").then((res) => {
    console.log("banner", res);
    let bannerImg = "";
    res.map((el) => {
      bannerImg += `<div class="mySlides fade">
    <div class="numbertext">1 / 3</div>
    <img src=${"http://127.0.0.1:5500/ui/" + el.bannerImageUrl} alt=${
        el.bannerImageAlt
      } class="slider_img" style="width:100%; height:220px;">
    <div class="text">${el.bannerImageAlt}</div>
  </div>`;
    });
    if (document.getElementById("bannerimg")) {
      document.getElementById("bannerimg").innerHTML = bannerImg;
    }
  });
  //////////////fn calling  for get categories///////////////////
  getData("http://localhost:5000/categories", "GET").then((res) => {
    console.log("catsss", res);
    const cats = res.map((el) => {
      return `  <div><div class="OfferSec">
      <div class="row">
        <div class="column" >
          <img src=${
            "http://127.0.0.1:5500/ui/" + el.imageUrl
          } style="width: 300px" >
        </div>
        <div class="column">
          <h2>${el.name}</h2>
            <p>  ${el.description}.</p>
              <div class="btnSec">
                <a href=${
                  "products.html?product=" + el.id
                } class="cta_btn">Explore  ${el.key}</a>
                  ]              </div>
             
        </div>
      </div>
    </div>
    <div class="boxShadow">

    </div>
  </div>`;
    });
    if (document.getElementById("offerdiv")) {
      document.getElementById("offerdiv").innerHTML = cats;
    }

    ////////////////fn caliing product page/////////////////////////
   let catsprod = "";
    res.map((el) => {
      catsprod += `<a href=${
        "products.html?product=" + el.id
      } style="text-decoration: none;"><p>${el.name}</p></a><hr>`;
    });
    console.log(catsprod, "happy");
    if (document.getElementById("product")) {
      document.getElementById("product").innerHTML = catsprod;
    }
    //document.getElementById("").innerHTML=catsprod;
  });

  if (window.location.href.includes("products")) {
    var url_string = window.location.href; //window.location.href
    var url = new URL(url_string);
    var c = url.searchParams.get("product");
    console.log("c", c);
    let productArr;
    let productscart = [];
    getData("http://localhost:5000/products", "GET").then((res) => {
      if (c) {
        productArr = res.filter((el) => {
          return el.category === c;
        });
      } else {
        productArr = res;
      }
      console.log("productArr", productArr);
      let productsdiv = "";
      let addToCart1 = (e)=>{alert(e);}
      // function add2cart1() {
      //   document.getElementById("test").style.color = "red";
      // }
      productArr.map((el) => {
        productsdiv += ` <div class="col-sm-3">
          <div class="card" style="padding:10px">
            <h5 class="card-title" style="text-align:left" >${el.name}</h5>
            <img class="card-img-top" src=${
              "http://127.0.0.1:5500/ui/" + el.imageURL
            } alt="Card image cap">
            <div class="card-block" style="padding:0px">
            <div style="overflow: hidden;background: #8080806b;height: 100px;">
            <p class="card-text" style="padding:0.5px">${el.description}</p>
            </div>
            <div style="display: flex;margin-top:10px;justify-content: space-between;align-item:center"><p class="card-text">MRP:$${
              el.price
            }</p>
                <button  onclick="addToCart1(el)" data-img=${
                  el.imageURL
                } data-name=${el.name} data-price=${
          el.price
        } class="add-to-cart btn btn-danger">Buy now</button></div>
                </div>
          </div>
        </div>
`;
      });
      console.log("productscart", productscart);
      document.getElementById("productdiv").innerHTML = productsdiv;
    });
  }
};
