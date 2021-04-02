
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
    console.log(image.src);
  } else if (color_item == 1) {
    image.src = image.src.replace(/strawberry|blackberry|crazyberry|fireorange/, 'blackberry');
  } else if (color_item == 2) {
    image.src = image.src.replace(/strawberry|blackberry|crazyberry|fireorange/, 'crazyberry');
  } else {
    image.src = image.src.replace(/strawberry|blackberry|crazyberry|fireorange/, 'fireorange');
  }
}



// shopping cart
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
  /* Remove row from DOM and recalc cart total */
  var productRow = $(removeButton).parent().parent();
  productRow.slideUp(300, function() {
    productRow.remove();
    recalculateCart();
  });
}


// Add to cart feature
$(document).ready(function() {
  var cartCountValue = 0;
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
    $(cartBtn)
      .append("<span class='count'>1</span>");
    
    $(cartBtn).find(".count").each(function(i,count){
      $(count).offset({
        left: leftPos,
        top: topPos
      }) .animate(
        { opacity: 0  },  800,
        function() {
          $(this).remove();
          cartCountValue++;
          $(cartCount).text(cartCountValue);
        }
      );
    }); 
  });

  function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
});




