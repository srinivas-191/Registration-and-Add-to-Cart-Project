//load all the items from the local storage as soon as documenet loaded
document.addEventListener("DOMContentLoaded",()=>{
    let carticonbtn=document.querySelectorAll(".cart-btn")
    carticonbtn.forEach(ele=>{
    ele.addEventListener("click",()=>{
        window.location.href="cart.html"
    })
   })
    //loadcart function gets called as soon as dom(html) is loaded
    loadCart()
})
//array to store cart items
let loggedusername=localStorage.getItem("user-name")
let currentUser=loggedusername+"cart"
let currentUserValue=loggedusername+"value"
let cartItems=[]
//to get cart value
function handleCartIconVal(){
    let cartvalue=localStorage.getItem(currentUserValue)
    let cartIcon=document.querySelectorAll("#cart-val")
    
    let cartVal=cartvalue
    //cartIcon.textContent=cartVal
    cartIcon.forEach(ele=>ele.textContent=cartVal)
    // console.log(cartVal)
}
function loadCart(){
    let localCartItems=localStorage.getItem(currentUser)
    //it loads the cart icon values when if items exist in db-storage and parse it
    if(localCartItems){
        cartItems=JSON.parse(localCartItems)//converting string ito it's original format
        handleCartUi()
    }
}
//function to update the url
function handleCartUi(){
    //accessing the html from cart.html 
    let cartUiItem=document.querySelector("#cart")//row
    cartUiItem.innerHTML=``
    cartItems.forEach(ele=>{
        //creating dynamic columns and cards
        let cartCol=document.createElement("div")
        cartCol.className="col-sm-12 col-md-3 col-lg-3"
        cartCol.innerHTML=`
        <div class="card product">
            <img
              src="${ele.imgUrl}"
              class="card-img-top product-img"
              alt="..."
            />
            <div class="card-body product-info">
              <h5 class="card-title product-title">${ele.title}</h5>
              <p class="card-text product-description">
                ${ele.description}
              </p>
              <p class="card-text product-price">${ele.price}</p>
                <div class="quantity-container">
                    <button class="btn btn-success increment-btn">+</button>
                    <span class="quantity">${ele.quantity}</span>
                    <button class="btn btn-danger decrement-btn">-</button>
                    <button class="btn btn-success ms-3 delete-btn">delete</button>
                </div>
            </div>
        </div>`
        //adding functionalities to increment decrement delete
        let incrementBtn=cartCol.querySelector(".increment-btn")
        let decrementBtn=cartCol.querySelector(".decrement-btn")
        let deleteBtn=cartCol.querySelector(".delete-btn")
        let quantity=cartCol.querySelector(".quantity")
        //adding events to the buttons
        incrementBtn.addEventListener("click",()=>{
            console.log("incrementing")
            incrementQty(quantity,ele)
        })
        decrementBtn.addEventListener("click",()=>{
            console.log("decrementing")
            decrementQty(quantity,ele)
        })
        deleteBtn.addEventListener("click",()=>{
            console.log("deleting")
            deleteItem(ele)
        })
        //adding the cols to row dynamically (appending the child)
        cartUiItem.appendChild(cartCol)
    })
    cartTotalVal()
    handleCartIconVal()
}
//function to increment the items quantity
function incrementQty(quantity,ele){
    ele.quantity++;
    quantity.textContent = ele.quantity;
    localStorage.setItem(currentUser, JSON.stringify(cartItems));
    let totalQty = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    localStorage.setItem(currentUserValue, totalQty);
    handleCartUi();
}
//function to decrement the items quantity
function decrementQty(quantity,ele){
    if(ele.quantity>=1){
        ele.quantity--
        quantity.textContent=ele.quantity
        if(ele.quantity==0) deleteItem(ele)
        localStorage.setItem(currentUser,JSON.stringify(cartItems))
        let totalQty = cartItems.reduce((subtract, item) =>subtract + item.quantity, 0);
        localStorage.setItem(currentUserValue,totalQty)
    }
    handleCartUi()
}
//function to delete the single products
function deleteItem(ele){
    cartItems=cartItems.filter(item=>item.title!==ele.title)
    let totalQty = cartItems.reduce((sum,item)=>sum+item.quantity,0)
    localStorage.setItem(currentUser,JSON.stringify(cartItems))
    localStorage.setItem(currentUserValue,totalQty)
    handleCartUi()
}
//function to clear entire cart
//function to calculate the total
function cartTotalVal(){
    let cartInformation=document.querySelector(".cart-info")
    let cartTotal=document.querySelector("#cart-total")
    let totalVal=cartItems.reduce((total,ele)=>total+ele.quantity*ele.price.replace(/,/g,""),0)
    let totalQty=localStorage.getItem(currentUserValue)
    cartTotal.textContent=`Total price Value of all ${totalQty} items is ${totalVal}`
    // console.log(totalQty)
    let discountRate=0
    if(totalQty>0 && totalQty<=2){
        discountRate=0.75
    }else if(totalQty>2 && totalQty<=5){
        discountRate=3
    }else if(totalQty>5 && totalQty<=10){
        discountRate=10
    }else if(totalQty>10 && totalQty<=15){
        discountRate=15
    }else if(totalQty>15 && totalQty<=20){
        discountRate=20
    }else{
        cartInformation.innerHTML=`
            <h2>Cart Tnformation</h2>
            <h3 id="cart-total"></h3>
            <h3 id="cart-discount"></h3>
            <h3 id="cart-final-price"></h3>
        `
    }
    let discountAmount=totalVal*(discountRate/100)
    let finalPrice=(totalVal-discountAmount).toFixed(0)
    console.log(finalPrice)
    let discount=discountRate
    let discountElement=document.querySelector("#cart-discount")
    console.log(discountElement)
    discountElement.textContent=`Discount applied on all ${totalQty} items is ${discount}%`
    let cartFinalPrice=document.querySelector("#cart-final-price")
    cartFinalPrice.textContent=`Final Price of all ${totalQty} items is ${finalPrice}`
}
//function to checkout