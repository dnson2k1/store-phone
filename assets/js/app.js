// SLIDER

$(document).ready(function () {
  const $cont = $(".cont");
  const $slider = $(".slider");
  const $nav = $(".nav-slider");
  const winW = $(window).width();
  const animSpd = 750; // Change also in CSS
  const distOfLetGo = winW * 0.2;
  let curSlide = 1;
  let animation = false;
  let autoScrollVar = true;
  let diff = 0;

  // Generating slides
  let arrCities = ["Amsterdam", "Rome", "New—York", "Singapore", "Prague"]; // Change number of slides in CSS also
  let numOfCities = arrCities.length;
  let arrCitiesDivided = [];

  arrCities.map((city) => {
    let length = city.length;
    let letters = Math.floor(length / 4);
    let exp = new RegExp(".{1," + letters + "}", "g");

    arrCitiesDivided.push(city.match(exp));
  });

  let generateSlide = function (city) {
    let frag1 = $(document.createDocumentFragment());
    let frag2 = $(document.createDocumentFragment());
    const numSlide = arrCities.indexOf(arrCities[city]) + 1;
    const firstLetter = arrCitiesDivided[city][0].charAt(0);

    const $slide =
      $(`<div data-target="${numSlide}" class="slide slide--${numSlide}">
							<div class="slide__darkbg slide--${numSlide}__darkbg"></div>
							<div class="slide__text-wrapper slide--${numSlide}__text-wrapper"></div>
						</div>`);

    const letter = $(`<div class="slide__letter slide--${numSlide}__letter">
							${firstLetter}
						</div>`);

    for (let i = 0, length = arrCitiesDivided[city].length; i < length; i++) {
      const text = $(`<div class="slide__text slide__text--${i + 1}">
								${arrCitiesDivided[city][i]}
							</div>`);
      frag1.append(text);
    }

    const navSlide = $(
      `<li data-target="${numSlide}" class="nav-slider__slide nav-slider__slide--${numSlide}"></li>`
    );
    frag2.append(navSlide);
    $nav.append(frag2);

    $slide
      .find(`.slide--${numSlide}__text-wrapper`)
      .append(letter)
      .append(frag1);
    $slider.append($slide);

    if (arrCities[city].length <= 4) {
      $(".slide--" + numSlide)
        .find(".slide__text")
        .css("font-size", "12vw");
    }
  };

  for (let i = 0, length = numOfCities; i < length; i++) {
    generateSlide(i);
  }

  $(".nav-slider__slide--1").addClass("nav-active");

  // Navigation
  function bullets(dir) {
    $(".nav-slider__slide--" + curSlide).removeClass("nav-active");
    $(".nav-slider__slide--" + dir).addClass("nav-active");
  }

  function timeout() {
    animation = false;
  }

  function pagination(direction) {
    animation = true;
    diff = 0;
    $slider.addClass("animation");
    $slider.css({
      transform: "translate3d(-" + (curSlide - direction) * 100 + "%, 0, 0)",
    });

    $slider.find(".slide__darkbg").css({
      transform: "translate3d(" + (curSlide - direction) * 50 + "%, 0, 0)",
    });

    $slider.find(".slide__letter").css({
      transform: "translate3d(0, 0, 0)",
    });

    $slider.find(".slide__text").css({
      transform: "translate3d(0, 0, 0)",
    });
  }

  function navigateRight() {
    if (!autoScrollVar) return;
    if (curSlide >= numOfCities) return;
    pagination(0);
    setTimeout(timeout, animSpd);
    bullets(curSlide + 1);
    curSlide++;
  }

  function navigateLeft() {
    if (curSlide <= 1) return;
    pagination(2);
    setTimeout(timeout, animSpd);
    bullets(curSlide - 1);
    curSlide--;
  }

  function toDefault() {
    pagination(1);
    setTimeout(timeout, animSpd);
  }

  // Events
  $(document).on("mousedown touchstart", ".slide", function (e) {
    if (animation) return;
    let target = +$(this).attr("data-target");
    let startX = e.pageX || e.originalEvent.touches[0].pageX;
    $slider.removeClass("animation");

    $(document).on("mousemove touchmove", function (e) {
      let x = e.pageX || e.originalEvent.touches[0].pageX;
      diff = startX - x;
      if ((target === 1 && diff < 0) || (target === numOfCities && diff > 0))
        return;
      $slider.css({
        transform:
          "translate3d(-" + ((curSlide - 1) * 100 + diff / 30) + "%, 0, 0)",
      });
      $slider.find(".slide__darkbg").css({
        transform:
          "translate3d(" + ((curSlide - 1) * 50 + diff / 60) + "%, 0, 0)",
      });
      $slider.find(".slide__letter").css({
        transform: "translate3d(" + diff / 60 + "vw, 0, 0)",
      });
      $slider.find(".slide__text").css({
        transform: "translate3d(" + diff / 15 + "px, 0, 0)",
      });
    });
  });

  $(document).on("mouseup touchend", function (e) {
    $(document).off("mousemove touchmove");
    if (animation) return;
    if (diff >= distOfLetGo) {
      navigateRight();
    } else if (diff <= -distOfLetGo) {
      navigateLeft();
    } else {
      toDefault();
    }
  });
  $(document).on("click", ".nav-slider__slide:not(.nav-active)", function () {
    let target = +$(this).attr("data-target");
    bullets(target);
    curSlide = target;
    pagination(1);
  });
  $(document).on("click", ".side-nav", function () {
    let target = $(this).attr("data-target");
    if (target === "right") navigateRight();
    if (target === "left") navigateLeft();
  });
  $(document).on("keydown", function (e) {
    if (e.which === 39) navigateRight();
    if (e.which === 37) navigateLeft();
  });
  $(document).on("mousewheel DOMMouseScroll", function (e) {
    if (animation) return;
    let delta = e.originalEvent.wheelDelta;
    if (delta > 0 || e.originalEvent.detail < 0) navigateLeft();
    if (delta < 0 || e.originalEvent.detail > 0) navigateRight();
  });
});
// END SLIDER
//DATE
const time = document.querySelector(".date");
const today = new Date();
let date =
  "Ho Chi Minh " +
  today.getDate() +
  "-" +
  today.getMonth() +
  "-" +
  today.getFullYear() +
  " " +
  today.getHours() +
  "h" +
  ":" +
  today.getMinutes();

time.innerHTML = date;

//END DATE

//TOP TOP
const back = document.querySelector(".totop");
window.addEventListener("scroll", function () {
  const x = this.pageYOffset;
  if (x > 300) {
    back.classList.add("totop-active");
  } else {
    back.classList.remove("totop-active");
  }
});
// END TO TOP
// MENU
$(document).ready(function () {
  $(".nav-item").on("click", function (event) {
    $(this).siblings().removeClass("nav-item-active");
    $(this).addClass("nav-item-active");
  });
});
// END MENU

// Product Slider
AOS.init({
  offset: 100,
  duration: 600,
  easing: "ease-in-sine",
  delay: 100,
  once: true,
});
// Cart click
const cartClick = document.querySelectorAll(".product-cart");
cartClick.forEach((item) => {
  item.addEventListener("click", () => {
    alert("Thêm vào giỏ hàng thành công !!!");
  });
});

// Like
const heart = document.querySelectorAll(".product-heart");

heart.forEach((item) => {
  item.addEventListener("click", () => {
    item.classList.toggle("heart-active");
  });
});

// console.log(heart);

//End Like

// Quick View
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-content-close");
const number = document.getElementById("modal-content-number");
const modalImg = document.querySelector(".modal-content-img");
const modalName = document.querySelector(".modal-content-name");
const modalPrice = document.querySelector(".modal-content-price");
const productCard = document.querySelectorAll(".product-card");
productCard.forEach((item) => {
  const view = item.querySelector(".product-view");
  const productImg = item
    .querySelector(".product-card-img")
    .getAttribute("src");
  const productName = item.querySelector(".product-card-content-name");
  const productPrice = item.querySelector(".product-card-content-price");

  view.addEventListener("click", () => {
    modal.classList.add("modal--show");
    modalContent.classList.add("modal-content--show");
    modalImg.setAttribute("src", productImg);

    console.log(productName);

    if (productName != null || productPrice != null) {
      const name = productName.innerText;
      const price = productPrice.innerText;
      modalName.innerText = name;
      modalPrice.innerText = price;
    }
  });
});

modal.addEventListener("click", () => {
  modal.classList.remove("modal--show");
  modalContent.classList.remove("modal-content--show");
});
modalClose.addEventListener("click", () => {
  modal.classList.remove("modal--show");
  modalContent.classList.remove("modal-content--show");
});

// End Quick View
// Product Related

const tabs = document.querySelectorAll(".product-related-list-item");
const panes = document.querySelectorAll(".product-related-item");
const s = document.querySelector.bind(document);
tabs.forEach((tab, index) => {
  const pane = panes[index];
  tab.onclick = function () {
    s(
      ".product-related-list-item.product-related-list-item-active"
    ).classList.remove("product-related-list-item-active");
    s(".product-related-item.product-related-item-active").classList.remove(
      "product-related-item-active"
    );
    tab.classList.add("product-related-list-item-active");
    pane.classList.add("product-related-item-active");
  };
});
// End Product Related

// Show Cart
function showCart() {
  s(".tools-item-user-cart-table").classList.toggle(
    "tools-item-user-cart-table--show"
  );
  showMyCart();
}

//
// Add to Cart
let cart = new Array();
let quality = 1;

productCard.forEach((item, index) => {
  const productCart = item.querySelector(".product-cart");

  const productImg = item.querySelector(".product-card-img").src;
  const productPrice = item.querySelector(
    ".product-card-content-price"
  ).innerHTML;
  const productName = item.querySelector(
    ".product-card-content-name"
  ).innerText;

  productCart.addEventListener("click", () => {
    let sp = new Array(productImg, productName, productPrice, quality);
    cart.push(sp);
    localStorage.setItem("cart", JSON.stringify(cart));
    showMyCart();
  });
});
function showMyCart() {
  let cartInfo = "";
  let cartInfoFt = "";
  let sum = 0;
  for (let i = 0; i < cart.length; i++) {
    let money = cart[i][2] * quality;
    sum += money;
    cartInfo += `
    <tr>
    <td  ><img  src="${cart[i][0]}" alt=""></td>
    <td>${cart[i][1]} </td>
    <td >${quality} </td>
    <td > ${String(money).replace(/(.)(?=(\d{3})+$)/g, "$1,")}</td>
    <td> <a class = "tools-item-user-cart-table-btn" onclick = "remove(this)">X</> </td>
    </tr>`;
  }
  cartInfoFt += `
  <tr>
    <td><button class="tools-item-user-cart-table-removeAll" onclick="removeAll()">Xóa tất cả</button></td>
    <td class="tools-item-user-cart-table-sum"> Tổng Tiền
    ${String(sum).replace(/(.)(?=(\d{3})+$)/g, "$1,")}
    </td>
    <td></td>
    <td><a href="#" class="tools-item-user-cart-table-payment" onclick = "payment()">Thanh toán</a></td>
    </tr>
  `;
  document.getElementById("myCart").innerHTML = cartInfo;
  document.getElementById("myCartFt").innerHTML = cartInfoFt;
}
function remove(x) {
  const tr = x.parentElement.parentElement;
  const tensp = tr.children[1].innerText;
  tr.remove();

  for (let i = 0; i < cart.length; i++) {
    if (cart[i][1] == tensp) {
      cart.splice(i, 1);
    }
    showMyCart();
  }
}
function removeAll() {
  cart = [];
  showMyCart();
}
// Emd Add to Cart
payment = () => {
  if (cart.length > 0) {
    alert("Cảm ơn người anh em thiện lành đã mua hàng !!!");
  } else {
    alert("Chưa có sản phẩm để thanh toán ");
  }
};
