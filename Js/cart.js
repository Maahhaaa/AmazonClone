document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.querySelector('.cart-items');
    const subtotalElement = document.getElementById('subtotal');
    const itemCountElement = document.getElementById('item-count');
    const totalBeforeTaxElement = document.getElementById('total-before-tax');
    const estimatedTaxElement = document.getElementById('estimated-tax');
    const orderTotalElement = document.getElementById('order-total');
    const selectAllCheckbox = document.getElementById('select-all');
    const deleteSelectedButton = document.querySelector('.delete-selected');

    const cartItems = [
        {
            id: 1,
            name: 'Product 1',
            image: 'imgs/product_img.jpg', 
            price: 19.99,
            quantity: 1
        },
        {
            id: 2,
            name: 'Product 2',
            image: 'imgs/product_img.jpg',
            price: 29.99,
            quantity: 2
        }
    ];

    cartItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <input type="checkbox" class="item-checkbox">
            <img src="${item.image}" alt="Product Image" class="cart-item-image">
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p>In Stock</p>
                <p>Eligible for FREE Shipping &amp; FREE Returns</p>
                <select class="cart-item-quantity">
                    <option value="1" ${item.quantity === 1 ? 'selected' : ''}>Qty: 1</option>
                    <option value="2" ${item.quantity === 2 ? 'selected' : ''}>Qty: 2</option>
                    <!-- Add more options as needed -->
                </select>
            </div>
            <p class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</p>
            <button class="remove-item">Remove</button>
        `;
        cartItemsContainer.appendChild(itemElement);
    });

    function updateSummary() {
        const prices = Array.from(document.querySelectorAll('.cart-item-price')).map(el => parseFloat(el.textContent.replace('$', '')));
        const subtotal = prices.reduce((acc, price) => acc + price, 0).toFixed(2);
        const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
        const totalBeforeTax = subtotal;
        const estimatedTax = (subtotal * 0.08).toFixed(2); // Assuming 8% tax rate
        const orderTotal = (parseFloat(subtotal) + parseFloat(estimatedTax)).toFixed(2);

        subtotalElement.textContent = `$${subtotal}`;
        itemCountElement.textContent = itemCount;
        totalBeforeTaxElement.textContent = `$${totalBeforeTax}`;
        estimatedTaxElement.textContent = `$${estimatedTax}`;
        orderTotalElement.textContent = `$${orderTotal}`;
    }

    updateSummary();

    cartItemsContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-item')) {
            const itemToRemove = event.target.parentElement;
            itemToRemove.remove();
            updateSummary();
        }
    });

    selectAllCheckbox.addEventListener('change', () => {
        const itemCheckboxes = document.querySelectorAll('.item-checkbox');
        itemCheckboxes.forEach(checkbox => {
            checkbox.checked = selectAllCheckbox.checked;
        });
    });

    deleteSelectedButton.addEventListener('click', () => {
        const selectedItems = document.querySelectorAll('.item-checkbox:checked');
        selectedItems.forEach(item => {
            item.parentElement.remove();
        });
        updateSummary();
    });
});

