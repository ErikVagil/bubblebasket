async function loadListFromCookies()
{
    // Get items from storage
    let items = [];

    try
    {
        const response = await fetch("/api/cart");
        items = await response.json();

        localStorage.setItem("cart", JSON.stringify(items));
    }
    catch
    {
        const itemsText = localStorage.getItem("cart");
        if (itemsText)
        {
            items = JSON.parse(itemsText);
        }
    }

    // Get table
    const tableBodyElement = document.getElementById("shopping-list-table-body");

    // Add items to the table
    if (items.length > 0)
    {
        for (const item of items)
        {
            const categoryElement = document.createElement("td");
            const itemElement = document.createElement("td");
            const quantityElement = document.createElement("td");
            
            categoryElement.className = "bg-info-subtle";
            itemElement.className = "bg-success-subtle";
            quantityElement.className = "bg-dark-subtle";

            categoryElement.textContent = item.categoryValue;
            itemElement.textContent = item.itemValue;
            quantityElement.textContent = item.quantityValue;

            const rowElement = document.createElement("tr");
            rowElement.appendChild(categoryElement);
            rowElement.appendChild(itemElement);
            rowElement.appendChild(quantityElement);

            tableBodyElement.appendChild(rowElement);
        }
    }
    else
    {
        tableBodyElement.innerHTML = `<tr><td class="bg-dark-subtle" colSpan=3>Put some items in your shopping list!</td></tr>`;
    }
}

async function clearList()
{
    try
    {
        await fetch("/api/cart/clear", { method: "DELETE" });
    }
    catch
    {
        localStorage.removeItem("cart");
    }

    const tableBodyElement = document.getElementById("shopping-list-table-body");
    tableBodyElement.innerHTML = ``;
    loadListFromCookies();
}

loadListFromCookies();