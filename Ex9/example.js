const cart = JSON.parse(localStorage.getItem("cart")) || [];


function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function changeProductQuantity(productId, change) {
  const quantityInput = document.getElementById(`quantity-${productId}`);
  
  let currentQuantity = parseInt(quantityInput.value, 10);
  currentQuantity += change;
  if (currentQuantity < 1) {
    currentQuantity = 1;
  }
  quantityInput.value = currentQuantity;
}

function addToCart(productId, price, quantity) {
  quantity = parseInt(quantity, 10);
  if (isNaN(quantity) || quantity < 1) {
    quantity = 1;
  }

  const existingItem = cart.find((item) => item.productId === productId);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ productId, price, quantity });
  }
  saveCart();
  renderCart();
}

function renderCart() {
  const cartTableBody = document.querySelector("#cart-table tbody");
  cartTableBody.innerHTML = "";
  cart.forEach((item, index) => {
    const totalAmount = item.price * item.quantity;
    const row = `<tr data-product-id="${item.productId}">
              <td>${index + 1}</td>
              <td>Sản phẩm ${item.productId}</td>
              <td>${item.price}</td>
              <td>
                  <button onclick="changeQuantity(${
                    item.productId
                  }, -1)">-</button>
                  <input type="number" value="${
                    item.quantity
                  }" min="1" onchange="updateQuantity(${
      item.productId
    }, this.value)">
                  <button onclick="changeQuantity(${
                    item.productId
                  }, 1)">+</button>
              </td>
              <td class="total-amount">${totalAmount}</td>
              <td><button onclick="removeItem(${
                item.productId
              })">Xoá</button></td>
          </tr>`;
    cartTableBody.insertAdjacentHTML("beforeend", row);
  });
  updateCartSummary();
}

function changeQuantity(productId, change) {
  const item = cart.find((item) => item.productId === productId);
  if (item) {
    item.quantity += change;
    if (item.quantity < 1) {
      item.quantity = 1;
    }
    saveCart();
    renderCart();
  }
}

function updateQuantity(productId, quantity) {
  if(quantity < 1) return alert("quantity phai lon hon 0")
  const item = cart.find((item) => item.productId === productId);
  if (item) {
    item.quantity = Math.max(1, parseInt(quantity, 10));
    renderCart();
  }
}

function removeItem(productId) {
  const index = cart.findIndex((item) => item.productId === productId);
  if (confirm("Are u sure ?")) {
    if (index > -1) {
      cart.splice(index, 1);
      alert("Xóa sản phẩm khỏi giỏ hàng thành công");
      saveCart();
      renderCart();
    }
  }
  
}

function updateCartSummary() {
  const totalAmountElement = document.getElementById("total-amount");
  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  totalAmountElement.textContent = totalAmount;
}

function clearCart() {
  if (confirm("Are u sure ?")) {
    alert("Xóa giỏ hàng thành công");
    cart.length = 0;
    saveCart();
    renderCart();
  }
}

function updateCart() {
  renderCart();
  alert("Giỏ hàng đã được cập nhật!");
}

renderCart();