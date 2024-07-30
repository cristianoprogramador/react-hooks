let products = [];
let cart = [];

const mockProducts = [
  { id: 1, name: "Apple", price: 1.50, img: "https://i.imgur.com/1kpkHfX.jpg" },
  { id: 2, name: "Banana", price: 1.99, img: "https://i.imgur.com/GpSyH4v.jpg" },
  { id: 3, name: "Carrot", price: 3, img: "https://i.imgur.com/MSiIfh3.jpg" },
];

function fetchProducts() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockProducts);
    }, 1000);
  });
}

function renderProducts() {
  const productList = document.getElementById('product-list');
  productList.innerHTML = '<h2 class="subtitle">Product List</h2>';
  const ul = document.createElement('ul');
  ul.className = 'grid';
  products.forEach(product => {
    const li = document.createElement('li');
    li.className = 'product-item';
    li.innerHTML = `
      <img src="${product.img}" alt="${product.name}" class="product-img">
      <div class="product-details">
        <div class="product-name">${product.name}</div>
        <div class="product-price">$${product.price.toFixed(2)}</div>
      </div>
      <button onclick="addToCart(${product.id})" class="add-to-cart">Add to Cart</button>
    `;
    ul.appendChild(li);
  });
  productList.appendChild(ul);
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (product) {
    const cartItem = cart.find(item => item.product.id === productId);
    if (cartItem) {
      cartItem.quantity += 1;
    } else {
      cart.push({ product, quantity: 1 });
    }
    renderCart();
  }
}

function removeFromCart(productId) {
  const cartItemIndex = cart.findIndex(item => item.product.id === productId);
  if (cartItemIndex !== -1) {
    cart.splice(cartItemIndex, 1);
    renderCart();
  }
}

function decreaseQuantity(productId) {
  const cartItem = cart.find(item => item.product.id === productId);
  if (cartItem) {
    if (cartItem.quantity > 1) {
      cartItem.quantity -= 1;
    } else {
      removeFromCart(productId);
    }
    renderCart();
  }
}

function clearCart() {
  cart = [];
  renderCart();
}

function calculateTotal() {
  return cart.reduce((total, item) => total + item.product.price * item.quantity, 0).toFixed(2);
}

function renderCart() {
  const cartElement = document.getElementById('cart');
  cartElement.innerHTML = '<h2 class="subtitle">Shopping Cart</h2>';
  const ul = document.createElement('ul');
  ul.className = 'cart-list';

  if (cart.length === 0) {
    ul.innerHTML = '<li class="empty-cart"><p>Your cart is empty</p></li>';
  } else {
    cart.forEach(item => {
      const li = document.createElement('li');
      li.className = 'cart-item';
      li.innerHTML = `
        <div>
          <div>
            ${item.product.name}
          </div>
          <div class="cart-item-name">$${item.product.price.toFixed(2)} x ${item.quantity}</div>
        </div>
        <div class="cart-item-buttons">
          <button class="cart-item-button-decrease" onclick="decreaseQuantity(${item.product.id})">Decrease</button>
          <button class="cart-item-button-remove" onclick="removeFromCart(${item.product.id})">Remove</button>
        </div>
      `;
      ul.appendChild(li);
    });
  }

  cartElement.appendChild(ul);

  if (cart.length > 0) {
    const totalDiv = document.createElement('div');
    totalDiv.className = 'total';
    totalDiv.innerHTML = `
      <div>Total: $<span id="total-value">${calculateTotal()}</span></div>
      <button onclick="clearCart()" class="clear-cart">Clear Cart</button>
    `;
    cartElement.appendChild(totalDiv);
  }
}


document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  renderCart();
  fetchProducts().then(data => {
    products = data;
    renderProducts();
    renderCart();
  });
});
