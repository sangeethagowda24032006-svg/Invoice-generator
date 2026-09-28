const addItemBtn = document.getElementById("addItemBtn");
const itemsContainer = document.getElementById("itemsContainer");

function calculateLineTotal(item) {
    const quantity = Number(item.querySelector(".quantity").value) || 0;
    const unitPrice = Number(item.querySelector(".unitPrice").value) || 0;
    const total = quantity * unitPrice;

    item.querySelector(".lineTotal").value = `₹${total.toFixed(2)}`;
}

function addItem() {
    const item = document.createElement("article");

    item.className = "invoice-item";

    item.innerHTML = `
        <div>
            <label>Item Name</label>
            <input type="text" class="itemName" placeholder="Enter item name">
        </div>

        <div>
            <label>Quantity</label>
            <input type="number" class="quantity" min="1" placeholder="0">
        </div>

        <div>
            <label>Unit Price</label>
            <input type="number" class="unitPrice" min="0" step="0.01" placeholder="0.00">
        </div>

        <div>
            <label>Line Total</label>
            <input type="text" class="lineTotal" value="₹0.00" readonly>
        </div>

        <div>
            <button type="button" class="deleteBtn">Delete</button>
        </div>
    `;

    itemsContainer.appendChild(item);

    const quantity = item.querySelector(".quantity");
    const unitPrice = item.querySelector(".unitPrice");

    quantity.addEventListener("input", () => {
        calculateLineTotal(item);
    });

    unitPrice.addEventListener("input", () => {
        calculateLineTotal(item);
    });

    item.querySelector(".deleteBtn").addEventListener("click", () => {
        item.remove();
    });
}

addItemBtn.addEventListener("click", addItem);