
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

      // filter each .flower element
      $filteredResults = $filteredResults.filter(function() {

        var matched = false,
          currentFilterValues = $(this).data('category').split(' ');

        // loop over each category value in the current .flower's data-category
        $.each(currentFilterValues, function(_, currentFilterValue) {

          // if the current category exists in the selected filters array
          // set matched to true, and stop looping. as we're ORing in each
          // set of filters, we only need to match once

          if ($.inArray(currentFilterValue, filterValues) != -1) {
            matched = true;
            return false;
          }
        });

        // if matched is true the current .flower element is returned
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





// shopping cart
/* Set rates + misc */
var taxRate = 0.05;
var shippingRate = 15.00; 
var fadeTime = 300;


/* Recalculate cart */
function recalculateCart()
{
  var subtotal = 0;
  
  /* Sum up row totals */
  $('.product').each(function () {
    subtotal += parseFloat($(this).children('.product-line-price').text());
  });
  
  /* Calculate totals */
  var tax = subtotal * taxRate;
  var shipping = (subtotal > 0 ? shippingRate : 0);
  var total = subtotal + tax + shipping;
  
  /* Update totals display */
  $('.totals-value').fadeOut(fadeTime, function() {
    $('#cart-subtotal').html(subtotal.toFixed(2));
    $('#cart-tax').html(tax.toFixed(2));
    $('#cart-shipping').html(shipping.toFixed(2));
    $('#cart-total').html(total.toFixed(2));
    if(total == 0){
      $('.checkout').fadeOut(fadeTime);
    }else{
      $('.checkout').fadeIn(fadeTime);
    }
    $('.totals-value').fadeIn(fadeTime);
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
    $(this).fadeOut(fadeTime, function() {
      $(this).text(linePrice.toFixed(2));
      recalculateCart();
      $(this).fadeIn(fadeTime);
    });
  });  
}


/* Remove item from cart */
function removeItem(removeButton)
{
  /* Remove row from DOM and recalc cart total */
  var productRow = $(removeButton).parent().parent();
  productRow.slideUp(fadeTime, function() {
    productRow.remove();
    recalculateCart();
  });
}





// side shopping cart 
jQuery(document).ready(function($){
	//if you change this breakpoint in the style.css file (or _layout.scss if you use SASS), don't forget to update this value as well
	var $L = 1200,
		$menu_navigation = $('#main-nav'),
		$cart_trigger = $('#cd-cart-trigger'),
		$hamburger_icon = $('#cd-hamburger-menu'),
		$lateral_cart = $('#cd-cart'),
		$shadow_layer = $('#cd-shadow-layer');

	//open lateral menu on mobile
	$hamburger_icon.on('click', function(event){
		event.preventDefault();
		//close cart panel (if it's open)
		$lateral_cart.removeClass('speed-in');
		toggle_panel_visibility($menu_navigation, $shadow_layer, $('body'));
	});

	//open cart
	$cart_trigger.on('click', function(event){
		event.preventDefault();
		//close lateral menu (if it's open)
		$menu_navigation.removeClass('speed-in');
		toggle_panel_visibility($lateral_cart, $shadow_layer, $('body'));
	});

	//close lateral cart or lateral menu
	$shadow_layer.on('click', function(){
		$lateral_cart.removeClass('speed-in');
		$menu_navigation.removeClass('speed-in');
		$shadow_layer.removeClass('is-visible');
		$('body').removeClass('overflow-hidden');
	});

	//move #main-navigation inside header on laptop
	//insert #main-navigation after header on mobile
	move_navigation( $menu_navigation, $L);
	$(window).on('resize', function(){
		move_navigation( $menu_navigation, $L);
		
		if( $(window).width() >= $L && $menu_navigation.hasClass('speed-in')) {
			$menu_navigation.removeClass('speed-in');
			$shadow_layer.removeClass('is-visible');
			$('body').removeClass('overflow-hidden');
		}

	});
});

function toggle_panel_visibility ($lateral_panel, $background_layer, $body) {
	if( $lateral_panel.hasClass('speed-in') ) {
		$lateral_panel.removeClass('speed-in');
		$background_layer.removeClass('is-visible');
		$body.removeClass('overflow-hidden');
	} else {
		$lateral_panel.addClass('speed-in');
		$background_layer.addClass('is-visible');
		$body.addClass('overflow-hidden');
	}
}

function move_navigation( $navigation, $MQ) {
	if ( $(window).width() >= $MQ ) {
		$navigation.detach();
		$navigation.appendTo('header');
	} else {
		$navigation.detach();
		$navigation.insertAfter('header');
	}
}




// Add to cart feature
/*
Experimenting with the jquery offset and position
*/
$(document).ready(function() {
  var cartCountValue = 0;
  var cartCount = $('.cart .count');
  $(cartCount).text(cartCountValue);

  $('.cart-btn').on('click', function() {
    var cartBtn = this;
    var cartCountPosition = $(cartCount).offset();
    var btnPosition = $(this).offset();
    var leftPos =
      cartCountPosition.left < btnPosition.left
        ? btnPosition.left - (btnPosition.left - cartCountPosition.left)
        : cartCountPosition.left;
    var topPos =
      cartCountPosition.top < btnPosition.top
        ? cartCountPosition.top
        : cartCountPosition.top;
    $(cartBtn)
      .append("<span class='count'>1</span>");
    
    $(cartBtn).find(".count").each(function(i,count){
      $(count).offset({
        left: leftPos,
        top: topPos
      })
      .animate(
        {
          opacity: 0
        },
        800,
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





// select items
var size_item = 0;
var color_item = 0;
function get_size(id) {
  let lis = document.getElementById("change-size").getElementsByTagName('li');
  size_item = parseInt(id);
  for (let i=0; i<lis.length; i++) {
    if (i != size_item) {
      lis[i].style.backgroundColor = "#E0EFD6";
    }
  }
  lis[size_item].style.backgroundColor = "#f7bf26";
}


function get_color(id) {
  let lis = document.getElementById("change-color").getElementsByTagName('li');
  color_item = parseInt(id);
  for (let i=0; i<lis.length; i++) {
    if (i != color_item) {
      lis[i].style.backgroundColor = "#E0EFD6";
    }
  }
  lis[color_item].style.backgroundColor = "#f7bf26";
}


