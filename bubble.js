function addItemToCookies(category, item)
{
    // Get items from cookies and put into items list
    let items = [];
    const itemsJSON = localStorage.getItem("items");
    if (itemsJSON)
    {
        items = JSON.parse(itemsJSON);
    }

    // See if item is already in list
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

    localStorage.setItem("items", JSON.stringify(items));
}