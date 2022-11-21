function confirmOrder(){
    const newOrder = new URL(location.href).searchParams.get("orderId")
    document.getElementById("orderId").textContent = newOrder
}

confirmOrder()