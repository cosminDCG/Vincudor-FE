import { Component, OnInit } from '@angular/core';

@Component({
selector: 'app-cart',
templateUrl: './cart.component.html',
styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {

  public items : any = [{"id": "1", "wine_name": "Purcarii Wine", "price":"6", "description":"Acesta este o descriere"},{"id": "1", "wine_name": "Purcarii Wine", "price":"6", "description":"Acesta este o descriere"}];



  constructor() { }

  ngOnInit() {

  }

    recalculateCart()
      {
        var subtotal = 0;

        var taxRate = 0.05;
        var shippingRate = 0;
        var fadeTime = 300;
        /* Sum up row totals */
        $('.product').each(function () {
        subtotal += parseFloat($(this).children('.product-line-price').text());
        });

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

    removeItem(removeButton : number)
      {

          var productRow = $('#' + removeButton);
          console.log(productRow);
          productRow.slideUp(300, function() {
          productRow.remove();
          recalculateCart();

          });
      }

      updateQuantity(quantityInput: number)
        {
          /* Calculate line price */
          var productRow = $('#' + quantityInput);

          var price = parseFloat(productRow.children('.product-price').text());

          var quantity = $('#'+ quantityInput).val();
          var linePrice = price * quantity;
          console.log(linePrice);


          productRow.children('.product-line-price').each(function () {
            $(this).fadeOut(300, function() {
            $(this).text(linePrice.toFixed(2));
            recalculateCart();
            $(this).fadeIn(300);
            });
          });
        }

}
