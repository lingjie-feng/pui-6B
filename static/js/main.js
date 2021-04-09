
// product filtering based on categories. 
var filtering = function () {
  var $filterCheckboxes = $('input[type="checkbox"]');

  var filterFunc = function() {
    var selectedFilters = {};

    $filterCheckboxes.filter(':checked').each(function() {

      if (!selectedFilters.hasOwnProperty(this.name)) {
        selectedFilters[this.name] = [];
      }

      selectedFilters[this.name].push(this.value);
    });

    // create a collection containing all of the filterable elements
    var $filteredResults = $('.product-grid__product-wrapper');

    // loop over the selected filter name -> (array) values pairs
    $.each(selectedFilters, function(name, filterValues) {

      $filteredResults = $filteredResults.filter(function() {

        var matched = false,
          currentFilterValues = $(this).data('category').split(' ');

        $.each(currentFilterValues, function(_, currentFilterValue) {

          if ($.inArray(currentFilterValue, filterValues) != -1) {
            matched = true;
            return false;
          }
        });

        // if matched is true the current matched items are returned.
        return matched;

      });
    });

    $('.product-grid__product-wrapper').hide().filter($filteredResults).show();
  }

  $filterCheckboxes.change(filterFunc());
}



// Banner images slide show
function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slideIndex = n;
  var slides = document.getElementsByClassName("banner-img");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}


// display the text after the user has subscribed
function display_sub() {
  const newp = document.createElement("p");
  newp.style.color = "#193b19";
  newp.style.fontFamily = 'Raleway';
  const success = document.createTextNode("You have successfully subscribed.");
  newp.appendChild(success);

  var subscript = document.getElementById("subscript");
  subscript.appendChild(newp);
}


// hide the "email address" value in the input box
function hidevalue() {
  var input = document.getElementById("input-box");
  if (input.value == 'email address') {
    input.value='';
  }
}



// select items
var size_item = 0;
var color_item = 0;
function get_size(id) {
  let lis = document.getElementById("change-size").getElementsByTagName('li');
  let image = document.getElementById('product_image');
  size_item = parseInt(id);
  
  // change the color of the unselected item to the default 
  for (let i=0; i<lis.length; i++) {
    if (i != size_item) {
      lis[i].style.backgroundColor = "#E0EFD6";
    }
  }

  // change the color of the selected item
  lis[size_item].style.backgroundColor = "#f7bf26";


  // change the main image corresponding to the size
  if (size_item == 0) {
    image.src = image.src.replace(/tiny|small|medium|large/, 'tiny');
  } else if (size_item == 1) {
    image.src = image.src.replace(/tiny|small|medium|large/, 'small');
  } else if (size_item == 2) {
    image.src = image.src.replace(/tiny|small|medium|large/, 'medium');
  } else {
    image.src = image.src.replace(/tiny|small|medium|large/, 'large');
  }

}


function get_color(id) {
  let lis = document.getElementById("change-color").getElementsByTagName('li');
  let image = document.getElementById('product_image');
  color_item = parseInt(id);
  
  // change the color of the unselected item to the default 
  for (let i=0; i<lis.length; i++) {
    if (i != color_item) {
      lis[i].style.backgroundColor = "#E0EFD6";
    }
  }
  // change the color of the selected item
  lis[color_item].style.backgroundColor = "#f7bf26";

  // change the main image corresponding to the color
  if (color_item == 0) {
    image.src = image.src.replace(/strawberry|blackberry|crazyberry|fireorange/, 'strawberry');
  } else if (color_item == 1) {
    image.src = image.src.replace(/strawberry|blackberry|crazyberry|fireorange/, 'blackberry');
  } else if (color_item == 2) {
    image.src = image.src.replace(/strawberry|blackberry|crazyberry|fireorange/, 'crazyberry');
  } else {
    image.src = image.src.replace(/strawberry|blackberry|crazyberry|fireorange/, 'fireorange');
  }
}




// Add to cart feature
$(document).ready(function() {
  var items = JSON.parse(localStorage.getItem('itemsInCart'));
  console.log(items);
  if (items == null) {
    items = [];
  }
  var counter = 0;
  for (var i=0; i<items.length; i++) {
    counter += parseInt(items[i].quantity);
  }
  var cartCountValue = counter;
  var cartCount = $('.cart .count');
  $(cartCount).text(cartCountValue);

  $('.cart-btn').on('click', function() {
    var cartBtn = this;
    var cartCountPosition = $(cartCount).offset();
    var btnPosition = $(this).offset();
    var leftPos =
      cartCountPosition.left < btnPosition.left ? btnPosition.left - (btnPosition.left - cartCountPosition.left)
        : cartCountPosition.left;
    var topPos = cartCountPosition.top < btnPosition.top  ? cartCountPosition.top : cartCountPosition.top;
    
    var quantity = parseInt($('.product-quantity input').val());
    $(cartBtn)
      .append(`<span class='count'>${quantity}</span>`);
    
    $(cartBtn).find(".count").each(function(i,count){
      $(count).offset({
        left: leftPos,
        top: topPos
      }) .animate(
        { opacity: 0  },  800,
        function() {
          $(this).remove();
          cartCountValue += quantity;
          $(cartCount).text(cartCountValue);
        }
      );
    }); 
  });

  function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
});





// save items in cart
//var itemInCart = [];
// two global variables
var colors = ["strawberry", "crazyberry", "blackberry", "fire orange"];
var sizes = ["tiny", "small", "medium", "large"];

// example of prototypes
function Item(name, price, size, color, image, alt, quantity) {
  this.item_name = name;
  this.price = price.substring(1, );
  this.size = size; 
  this.color = color;
  this.image = image;
  this.alt = alt;
  this.quantity = quantity;
}

// save items to the shopping cart 
function saveItems() {
  var itemInCart = JSON.parse(localStorage.getItem('itemsInCart'));
  console.log(itemInCart);
  if (itemInCart == null) {
    itemInCart = [];
  }
  var item_name = document.getElementById('product-name').innerHTML;
  var price = document.getElementById('price').innerHTML;
  var image = document.getElementById('product_image').src;
  var alt = document.getElementById('product_image').alt;
  var quantity = $('.product-quantity input').val();
  if (!isDuplicateItem(item_name, size_item, color_item, quantity, itemInCart)) {
    var itemObject = new Item(item_name, price, size_item, color_item, image, alt, quantity);
    itemInCart.push(itemObject);
    localStorage.setItem("itemsInCart", JSON.stringify(itemInCart));
  }
}

// check if the selected item is already in the shopping cart; 
// if yes, return true
// if not, return false
function isDuplicateItem(name, size, color, quantity, itemInCart) {
  console.log(itemInCart);
  for (var i=0; i<itemInCart.length; i++) {
    var item = itemInCart[i];
    if ((item.item_name == name) && (item.size == size) && (item.color == color)) {
      var n = parseInt(item.quantity) + parseInt(quantity);
      item.quantity = n;
      itemInCart[i] = item
      localStorage.setItem("itemsInCart", JSON.stringify(itemInCart));
      return true;
    }
  }
  return false;
}

// create a product element 
function createProductElement(i, items) {
      var product = document.createElement("div");
      product.className = "product";

      // image 
      var image = document.createElement("div");
      image.className = "product-image";
      var img = document.createElement("img");
      img.src = items[i].image;
      img.alt = items[i].alt;
      image.appendChild(img);
      product.appendChild(image);

      // details
      var details = document.createElement("div");
      details.className="product-details";
      var title = document.createElement("div");
      title.className = "product-title";
      title.innerHTML = items[i].item_name;
      var size = document.createElement("div");
      size.className = "product-size";
      size.innerHTML = sizes[items[i].size];
      var color = document.createElement("div");
      color.className = "product-color";
      color.innerHTML = colors[items[i].color];
      details.appendChild(title);
      details.appendChild(size);
      details.appendChild(color);
      product.appendChild(details);

      // price 
      var price = document.createElement("div");
      price.className = "product-price";
      price.innerHTML = items[i].price;
      product.appendChild(price);


      // quantity
      var quantity = document.createElement("div");
      quantity.className = "product-quantity";
      var input = document.createElement("input");
      input.type = "number";
      input.min = "1";
      input.setAttribute("value", items[i].quantity);
      input.setAttribute("onchange", "updateQuantity(this);");
      quantity.appendChild(input);
      product.appendChild(quantity);

      // remove button
      var remove = document.createElement("div");
      remove.className = "product-removal";
      var btn = document.createElement("button");
      btn.className = "remove-product";
      btn.setAttribute("value", i);
      btn.setAttribute("onclick", "removeItem(this);");
      btn.innerHTML = "Remove";
      remove.appendChild(btn);
      product.appendChild(remove);

      // line price 
      var linePrice = document.createElement("div");
      linePrice.className = "product-line-price";
      var n = items[i].price * items[i].quantity
      linePrice.innerHTML = n.toFixed(2);;
      product.appendChild(linePrice);

      var cart = document.getElementById("shopping-cart");
      var totals = document.getElementById("totals");
      cart.insertBefore(product,totals);
      recalculateCart();
}

// Update the shopping cart page with items the user selected 
function updateShoppingCart() {
  var items = JSON.parse(localStorage.getItem("itemsInCart"));
  console.log(items);
  if (items == null) {
    items = [];
  }
  for (var i=0; i<items.length; i++) {
    createProductElement(i, items);
    
  }
  //updateQuantity($('.product-quantity input'));
}


/* Recalculate cart */
function recalculateCart()
{
  var subtotal = 0;
  
  /* Sum up row totals */
  $('.product').each(function () {
    subtotal += parseFloat($(this).children('.product-line-price').text());
  });
  
  /* Calculate totals */
  var tax = subtotal *  0.05;
  var shipping = (subtotal > 0 ? 15.00 : 0);
  var total = subtotal + tax + shipping;
  
  /* Update totals display */
  $('.totals-value').fadeOut(300, function() {
    $('#cart-subtotal').html(subtotal.toFixed(2));
    $('#cart-tax').html(tax.toFixed(2));
    $('#cart-shipping').html(shipping.toFixed(2));
    $('#cart-total').html(total.toFixed(2));
    if(total == 0){
      $('.checkout').fadeOut(300);
    }else{
      $('.checkout').fadeIn(300);
    }
    $('.totals-value').fadeIn(300);
  });
}


/* Update quantity */
function updateQuantity(quantityInput)
{
  /* Calculate line price */
  var productRow = $(quantityInput).parent().parent();
  var price = parseFloat(productRow.children('.product-price').text());
  var quantity = $(quantityInput).val();
  var linePrice = price * quantity;
  /* Update line price display and recalc cart totals */
  productRow.children('.product-line-price').each(function () {
    $(this).fadeOut(300, function() {
      $(this).text(linePrice.toFixed(2));
      recalculateCart();
      $(this).fadeIn(300);
    });
  });  
}


/* Remove item from cart */
function removeItem(removeButton)
{
  var index = removeButton.getAttribute("value");
  var items = JSON.parse(localStorage.getItem("itemsInCart"));
  items.splice(index,1);
  localStorage.setItem("itemsInCart", JSON.stringify(items));
  /* Remove row from DOM and recalc cart total */
  var productRow = $(removeButton).parent().parent();
  productRow.slideUp(300, function() {
    productRow.remove();
    recalculateCart();
  });
  updateIndex();
  storeCartNumber();
}


function storeCartNumber() {
  var items = JSON.parse(localStorage.getItem('itemsInCart'));
  console.log(items);
  if (items == null) {
    items = [];
  }
  var counter = 0;
  for (var i=0; i<items.length; i++) {
    counter += parseInt(items[i].quantity);
  }
  var cart_n = document.getElementsByClassName('count');
  cart_n[0].innerHTML = counter;
}

function updateIndex() {
  var x = document.getElementsByClassName('remove-product');
  for (var i=0; i<x.length; i++) {
    x[i].setAttribute('value', i);
  }
}





/* WISH LIST*/
// save the item to wishlist
function saveToWishlist(heart) {
  var color = heart.innerHTML;
  if (color == "\u2661") {
    heart.innerHTML = "\u2665";
    localStorage.setItem('savedwishlist', "true");
  } else {
    heart.innerHTML = "\u2661";
    localStorage.setItem('savedwishlist', "false");
  }
}

// update the wish list with saved items
function updateWishlist(){
  var saved = localStorage.getItem('savedwishlist');
  var item = document.getElementById('product-wishlist');
  if (saved == 'true') {
    item.style.display = 'block';
  } else {
    item.style.display = 'none';
  }
}

// display the saved condition 
function savedOnDetail() {  
  var saved = localStorage.getItem('savedwishlist');
  var heart = document.getElementById('add-to-wishlist');
  if (saved == 'true') {
    heart.innerHTML = "\u2665";
  } else {
    heart.innerHTML = "\u2661";
  }
}


// remove the item from wishlist
function removeItemWishlist(removeButton){
  /* Remove row from DOM and recalc cart total */
  var productRow = $(removeButton).parent().parent();
  productRow.slideUp(300, function() {
    productRow.remove();
  });
}