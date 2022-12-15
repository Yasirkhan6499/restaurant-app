import {menuArray} from "/data.js";


const item_cont = document.querySelector(".items-container"); //we will render items in it
const calculate_body = document.querySelector(".calculate__body"); //items calculation goes here
const total = document.querySelector(".total .price");
const calc_cont =  document.querySelector(".calculate-container");
const btn__order = document.querySelector(".btn--order");
const card_cont = document.querySelector(".card_container");
const btn__pay = document.querySelector(".btn--pay");
const card_form = document.querySelector(".card__form");
const thanks_cont = document.querySelector(".thanks-cont");

let total_price=0;

// Add items to the basket
item_cont.addEventListener("click",(e)=>{
    e.preventDefault();
   const name = e.target.dataset.name;
    if(name){
       handleItemIncrement(name);
    }
    
});

function handleItemIncrement(name){
    calc_cont.style.display = "block";

    const item = menuArray.filter(item=>name===item.name)[0];
    total_price +=item.price;

    const html = `
    <div class="item__cont">
    <div class="item_icon_info">
      <p class="item__name">${item.name}</p>
      <button type="button" class="btn__remove">remove</button>
    </div>
    <p class="item__price">$${item.price}</p>
  </div>
  `;

    calculate_body.insertAdjacentHTML("beforeend",html);

  total.textContent = "$"+total_price;

//   Add Event listener on the current "remove" button
calculate_body.lastElementChild.addEventListener("click",handleRemoveButton);

}


// handling remove button 
function handleRemoveButton(e){
    e.preventDefault();
    
    if(e.target.classList.contains("btn__remove")){
    const name = e.target.previousElementSibling.textContent;
    const item = menuArray.filter(item=>name===item.name)[0];
    //--- minus from total
   
    total_price-=item.price;
    total.textContent = "$"+total_price;
    //remove the element
    e.target.parentElement.parentElement.remove();
    }
    
    if(total_price===0)
    calc_cont.style.display = "none";

}
// render items
function render(){

    Array.from(menuArray).forEach(item=>{
        const item_ingredients = item.ingredients.toString();
        
        const html = 
         `<div class="item-container">
        <div class="item_icon_info">
          <p class="item__icon">${item.emoji}</p>
          <div class="item__info">
            <p class="item__name">${item.name}</p>
            <p class="item__ingredients">${item_ingredients}</p>
            <p class="item__price">$${item.price}</p>
          </div>
        </div>
        <i data-name="${item.name}" class="fa-thin fa-plus plus-sign"></i>
      </div>`

      item_cont.innerHTML+=html;
    });
}

render();


//  button order is clicked
btn__order.addEventListener("click",()=>{
  card_cont.classList.add("show"); //show the card details container
  document.body.style.backgroundColor = "gray";
});


//button pay is clicked
card_form.addEventListener("submit",(e=>{
  e.preventDefault();
  card_cont.classList.remove("show");

  const loginFormData = new FormData(card_form);
  const namee = loginFormData.get("name");

  // remove the claculate container and set the background to white
  calculate_body.parentElement.style.display="none";
  document.body.style.backgroundColor = "white";
  
//show the thankyou message
  thanks_cont.classList.add("show");
  thanks_cont.childNodes[0].textContent=`Thanks ${namee}, your order is on the way.`
  
}));
