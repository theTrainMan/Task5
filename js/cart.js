$(document).ready(function() {

    $("img").slideUp(100).slideDown(600);
    $('img').animate({ left: '0px' }, 500);

    //   Scroll in Effect
    $("img").animate({
        marginRight: "30px"
    }, 400);

});

// Load products from the server via dynamic JS or AJAX
var products = {
    1: {
        name: "Collection - FREE",
        desc: " Choose your Delivery Option",
        img: "delivery.jpg",
        price: 0,
        vat: 0.00
    },
    2: {
        name: "Delivery - POSTNET",
        desc: " Choose your Delivery Option",
        img: "postnet.jpg",
        price: 89,
        vat: 11.61
    },
    3: {
        name: "Delivery - COURIER",
        desc: " Choose your Delivery Option",
        img: "dhl.png",
        price: 179,
        vat: 23.35
    },
    4: {
        name: "FREE COUPON",
        desc: " Add Coupon",
        img: "coupon.jpg",
        price: -150,
        vat: 19.57
    },
    5: {
        name: "Red Velvet CupCake",
        desc: " Fluffy and moist, these buttery red velvet cupcakes are my favorite. The tangy cream cheese frosting puts them over the top!",
        img: "red-velvet-4.jpg",
        price: 50,
        vat: 6.52
    },
    6: {
        name: "Chcolate Chip Cupcake",
        desc: "There is no need to frost these rich, buttery vanilla chocolate chip cupcakes as they are tasty as is",
        img: "choc-chip.jpg",
        price: 26,
        vat: 3.39
    },
    7: {
        name: "Key Lime Cupcake",
        desc: " Light, fluffy cupcakes full of key lime flavor! With lime juice and zest, topped with a tangy sweet lime frosting.",
        img: "key-lime.jpg",
        price: 35,
        vat: 4.56

    },
    8: {
        name: "Vegan Banana Cupcake",
        desc: "This banana recipe is easy for vegans to make because the bananas act as a binder and provide moisture, so you don't need eggs.",
        img: "vegan-banana.jpg",
        price: 40,
        vat: 6.01
    },
    9: {
        name: "3 Layer Red Velvet Cake",
        desc: " Fluffy and moist, these buttery red velvet cupcakes are my favorite. The tangy cream cheese frosting puts them over the top!",
        img: "menu-cake3.jpg",
        price: 350,
        vat: 52.50
    },
    10: {
        name: "Frosted Carrot Cake",
        desc: "There is no need to frost these rich, buttery vanilla chocolate chip cupcakes as they are tasty as is",
        img: "menu-cake4.jpg",
        price: 725,
        vat: 108.75
    },
    11: {
        name: "Chocolate Cake",
        desc: " Light, fluffy cupcakes full of key lime flavor! With lime juice and zest, topped with a tangy sweet lime frosting.",
        img: "menu-cake8.jpg",
        price: 355,
        vat: 53.25
    },
    12: {
        name: "Ganache Vanilla Cake",
        desc: "This banana recipe is easy for vegans to make because the bananas act as a binder and provide moisture, so you don't need eggs.",
        img: "menu-cake1.jpg",
        price: 470,
        vat: 70.50
    }

};


/* [B] PRODUCTS HTML GRID GENERATOR */
window.addEventListener("load", function() {
    var container = document.getElementById("cart-products"),
        item = null,
        part = null;
    for (let i in products) {
        item = document.createElement("div");
        item.classList.add("p-item");

        // Product Image
        part = document.createElement("img");
        part.src = products[i]['img'];
        part.classList.add("p-img");
        item.appendChild(part);

        // Product Name
        part = document.createElement("div");
        part.innerHTML = products[i]['name'];
        part.classList.add("p-name");
        item.appendChild(part);

        // Product Price
        part = document.createElement("div");
        part.innerHTML = "R" + products[i]['price'];
        part.classList.add("p-price");
        item.appendChild(part);

        // Product Description
        part = document.createElement("div");
        part.innerHTML = products[i]['desc'];
        part.classList.add("p-desc");
        item.appendChild(part);

        //VAT
        part = document.createElement('div');
        part.innerHTML = "VAT" + " - " + "R" + products[i]['vat'];
        part.classList.add['p-vat'];
        item.appendChild(part);

        // Add to cart
        part = document.createElement("input");
        part.type = "button";
        part.value = "Add to Cart";
        part.classList.add("p-add");
        part.onclick = cart.add;
        part.dataset.id = i;
        item.appendChild(part);

        container.appendChild(item);
    }
});


/* [C] SHOPPING CART */
var cart = {
    data: null, // current shopping cart

    /* [C1] LOCALSTORAGE */
    load: function() {
        // load() : load previous shopping cart

        cart.data = localStorage.getItem("cart");
        if (cart.data == null) { cart.data = {}; } else { cart.data = JSON.parse(cart.data); }
    },

    save: function() {
        // save() : save current cart

        localStorage.setItem("cart", JSON.stringify(cart.data));
    },

    /* [C2] CART ACTIONS */
    add: function() {
        // add() : add selected item to cart

        // Update current cart
        if (cart.data[this.dataset.id] == undefined) {
            var product = products[this.dataset.id];
            cart.data[this.dataset.id] = {
                name: product['name'],
                desc: product['desc'],
                img: product['img'],
                price: product['price'],
                vat: product['vat'],
                qty: 1
            };
        } else {
            cart.data[this.dataset.id]['qty']++;
        }
        // Save local storage + HTML update
        cart.save();
        cart.list();
    },

    list: function() {
        // list() : update HTML

        var container = document.getElementById("cart-list"),
            item = null,
            part = null,
            product = null;
        container.innerHTML = "";

        // Empty cart
        // Credits : https://coderwall.com/p/_g3x9q/how-to-check-if-javascript-object-is-empty
        var isempty = function(obj) {
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) { return false; }
            }
            return true;
        };
        if (isempty(cart.data)) {
            item = document.createElement("div");
            item.innerHTML = "Cart is empty";
            container.appendChild(item);
        }

        // Not empty
        else {

            // List items
            var total = 0,
                subtotal = 0;


            for (var i in cart.data) {
                item = document.createElement("div");
                item.classList.add("c-item");
                product = cart.data[i];

                // Quantity
                part = document.createElement("input");
                part.type = "number";
                part.value = product['qty'];
                part.dataset.id = i;
                part.classList.add("c-qty");
                part.addEventListener("change", cart.change);
                item.appendChild(part);

                // Name
                part = document.createElement("span");
                part.innerHTML = product['name'];
                part.classList.add("c-name");
                item.appendChild(part);

                // Subtotal
                subtotal = product['qty'] * product['price'];
                total += subtotal;
                container.appendChild(item);

            }

            // EMPTY BUTTONS
            item = document.createElement("input");
            item.type = "button";
            item.value = "Empty";
            item.addEventListener("click", cart.reset);
            item.classList.add("c-empty");
            container.appendChild(item);

            // CHECKOUT BUTTONS
            item = document.createElement("input");
            item.type = "button";
            item.value = "checkout - " + "R" + total;
            item.addEventListener("click", cart.checkout);
            item.classList.add("c-checkout");
            container.appendChild(item);
            alert('Item was added ' + item.value);

        }
    },

    change: function() {
        // change() : change quantity

        if (this.value == 0) {
            delete cart.data[this.dataset.id];
        } else {
            cart.data[this.dataset.id]['qty'] = this.value;
        }
        cart.save();
        cart.list();
    },

    reset: function() {
        // reset() : empty cart

        if (confirm("Empty cart?")) {
            cart.data = {};
            cart.save();
            cart.list();
        }
    },

    checkout: function() {
        // checkout() : checkout the cart

        alert('Congratulations, your Order was Successful!');
        // Forward to confirmation page or directly add name, tel, email fields in the cart list.
        // Send cart.data to the server and do further processing - email or save to database.
    }
};

// Load previous cart and update HTML on load
window.addEventListener("load", function() {
    cart.load();
    cart.list();
});