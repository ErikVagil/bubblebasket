async function addItemToCookies(category, item)
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

    console.log(items);

    // See if item is already in list and update or add accordingly
    let foundItemIndex = items.findIndex((itemObject) => 
    {
        return (itemObject.itemValue === item) && (itemObject.categoryValue === category);
    });
    if (foundItemIndex >= 0)
    {
        items[foundItemIndex].quantityValue += 1;
    }
    else
    {
        items.push({categoryValue: category, itemValue: item, quantityValue: 1});
    }

    console.log(items);

    try
    {
        await fetch("api/cart/update", 
        {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(items)
        });
    }
    catch
    {
        localStorage.setItem("cart", JSON.stringify(items));
    }
}