let cart = {};

cartBlock = document.querySelector('#cart');
cartBlock.style.display = 'none';

function addToCart(item, price) {
    if (!cart[item]) {
        cart[item] = { price: price, quantity: 1 };
    } else {
        cart[item].quantity++;
    }
    updateCartDisplay();
}

function removeFromCart(item) {
    if (cart[item]) {
        cart[item].quantity--;
        if (cart[item].quantity <= 0) {
            delete cart[item];
        }
        updateCartDisplay();
    }
}

function updateCartDisplay() {
    console.log(cart)
    if (Object.keys(cart).length > 0){
        cartBlock.style.display = 'block';
    }
    const cartList = document.getElementById("cart-list");
    const totalEl = document.getElementById("total");
    cartList.innerHTML = "";
    let total = 0;

    for (let item in cart) {
        const entry = cart[item];
        total += entry.price * entry.quantity;

        const li = document.createElement("li");
        li.innerHTML = `${item} (${entry.quantity} шт) - $${(entry.price * entry.quantity).toFixed(2)}
        <button class="remove-btn" onclick="removeFromCart('${item}')">–</button>`;
        cartList.appendChild(li);
    }

    totalEl.textContent = `Загалом: $${total.toFixed(2)}`;
}

function placeOrder() {
    const tableNumber = document.getElementById("table-number").value.trim();
    if (tableNumber === "") {
        alert("Введіть номер столика перед оформленням замовлення!");
        return;
    }

    if (Object.keys(cart).length === 0) {
        alert("Ваш кошик порожній!");
        return;
    }

    let orderDetails = `Замовлення для столика №${tableNumber}:\n`;
    for (let item in cart) {
        orderDetails += `- ${item}: ${cart[item].quantity} шт.\n`;
    }

    alert(orderDetails + "\nДякуємо за замовлення!");
    cart = {};
    updateCartDisplay();
    document.getElementById("table-number").value = "";
}