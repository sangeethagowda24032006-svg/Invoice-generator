const addItemBtn = document.getElementById("addItemBtn");
const itemsContainer = document.getElementById("itemsContainer");
const taxRate = document.getElementById("taxRate");

function calculateTotal() {
    let subtotal = 0;

    document.querySelectorAll(".invoice-item").forEach(item => {
        let quantity = Number(item.querySelector(".quantity").value) || 0;
        let price = Number(item.querySelector(".unitPrice").value) || 0;
        let total = quantity * price;

        item.querySelector(".lineTotal").value = "₹" + total.toFixed(2);
        subtotal = subtotal + total;
    });

    let tax = subtotal * (Number(taxRate.value) || 0) / 100;
    let grandTotal = subtotal + tax;

    document.getElementById("subtotal").textContent =
        "₹" + subtotal.toFixed(2);

    document.getElementById("taxAmount").textContent =
        "₹" + tax.toFixed(2);

    document.getElementById("grandTotal").textContent =
        "₹" + grandTotal.toFixed(2);
}

function saveData() {
    localStorage.setItem(
        "customerName",
        document.getElementById("customerName").value
    );

    localStorage.setItem(
        "customerEmail",
        document.getElementById("customerEmail").value
    );

    localStorage.setItem(
        "customerPhone",
        document.getElementById("customerPhone").value
    );

    localStorage.setItem(
        "invoiceDate",
        document.getElementById("invoiceDate").value
    );

    localStorage.setItem("taxRate", taxRate.value);
}

function loadData() {
    document.getElementById("customerName").value =
        localStorage.getItem("customerName") || "";

    document.getElementById("customerEmail").value =
        localStorage.getItem("customerEmail") || "";

    document.getElementById("customerPhone").value =
        localStorage.getItem("customerPhone") || "";

    document.getElementById("invoiceDate").value =
        localStorage.getItem("invoiceDate") || "";

    taxRate.value =
        localStorage.getItem("taxRate") || 0;
}

addItemBtn.addEventListener("click", function() {
    let item = document.createElement("article");

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
            <button type="button" class="editBtn">Edit</button>
            <button type="button" class="deleteBtn">Delete</button>
        </div>
    `;

    itemsContainer.appendChild(item);
});

itemsContainer.addEventListener("input", function() {
    calculateTotal();
});

itemsContainer.addEventListener("click", function(event) {

    if (event.target.classList.contains("deleteBtn")) {
        event.target.closest(".invoice-item").remove();
        calculateTotal();
    }

    if (event.target.classList.contains("editBtn")) {
        let item = event.target.closest(".invoice-item");
        let inputs = item.querySelectorAll("input");

        inputs[0].focus();
    }
});

document.getElementById("invoiceForm").addEventListener("input", function() {
    saveData();
});

taxRate.addEventListener("input", function() {
    calculateTotal();
    saveData();
});

document.getElementById("resetBtn").addEventListener("click", function() {
    localStorage.clear();
    location.reload();
});

document.getElementById("previewBtn").addEventListener("click", function() {
    alert(
        "Customer: " +
        document.getElementById("customerName").value +
        "\n\nSubtotal: " +
        document.getElementById("subtotal").textContent +
        "\nTax: " +
        document.getElementById("taxAmount").textContent +
        "\nGrand Total: " +
        document.getElementById("grandTotal").textContent
    );
});

loadData();
calculateTotal();