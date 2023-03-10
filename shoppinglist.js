function loadListFromCookies()
{
    // Get items from storage
    let items = [];
    const itemsText = localStorage.getItem("items");
    if (itemsText)
    {
        items = JSON.parse(itemsText);
    }

    // Get table
    const tableBodyElement = document.getElementById("shopping-list-table-body");

    if (items.length > 0)
    {
        for (const item of items)
        {
            const categoryElement = document.createElement("td.bg-info-subtle");
            const itemElement = document.createElement("td.bg-success-subtle");
            const quantityElement = document.createElement("td.bg-dark-subtle");

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

loadListFromCookies();