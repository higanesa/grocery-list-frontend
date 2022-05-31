

const grocery_item_addButton = document.querySelector('.grocery_item_add_button');

const grocery_item_IP = document.querySelector('.grocery_item');

const To_buy_List_OP = document.querySelector('.To_buy_List');

const filter_option = document.querySelector('.to_buy');



console.log("Hello");


document.addEventListener("DOMContentLoaded", getToBuys);

grocery_item_addButton.addEventListener('click', add_Grocery_item);
To_buy_List_OP.addEventListener('click', deleteCheck);
filter_option.addEventListener('click', filterTodo);


//functions
async function fetchData() {
    const response = await fetch("https://grocerylistapp.azurewebsites.net/groceryList");
    const data = await response.json();
    return data;    
  }

var response = fetchData();
var data = JSON.parse(response);

data.forEach(item => {    
    console.log(item.itemName);
})



function add_Grocery_item(event){
    //prevent form from submitting
    event.preventDefault();

    //create a to_Buy Div in js and add a classlits
    const to_Buy_Div = document.createElement('div');
    to_Buy_Div.classList.add('To_buy');

    const to_Buy_Li = document.createElement('li');
    to_Buy_Li.innerText = grocery_item_IP.value;

    to_Buy_Li.classList.add('to_Buy_item');

    //making to_buy_li to come inside to_Buy_divx

    to_Buy_Div.appendChild(to_Buy_Li);

    //add tobuy to local storage

    saveToBuys(grocery_item_IP.value);

    //Ispurchased button
    const is_purchased = document.createElement('button');
    is_purchased.innerHTML = '<i class = "fas fa-check"></i>';
    is_purchased.classList.add('is_purchased_button');
    to_Buy_Div.appendChild(is_purchased);

    //Rem_groc button
    const Rem_groc = document.createElement('button');
    Rem_groc.innerHTML = '<i class = "fas fa-trash"></i>';
    Rem_groc.classList.add('Rem_groc_button');
    to_Buy_Div.appendChild(Rem_groc);

    To_buy_List_OP.appendChild(to_Buy_Div);

    grocery_item_IP.value = "";
}


function deleteCheck(e){

    const item = e.target;
    //Delete

    if(item.classList[0] === 'Rem_groc_button'){
        const to_buy = item.parentElement;
        to_buy.classList.add('delete_transition');
        remove_local_items(to_buy);
        to_buy.addEventListener('transitionend', function(){
            to_buy.remove();
        })
        
    }

    if(item.classList[0] === 'is_purchased_button'){
        const to_buy = item.parentElement;
        to_buy.classList.add('purchased');
    }
}

function filterTodo(e){
    const tobuys = To_buy_List_OP.childNodes;
    tobuys.forEach(function(tobuy){
        switch(e.target.value){
            case "all":
                tobuy.style.display = 'flex';
                break;
            case "purchased":
                
                if (tobuy.classList.contains('purchased')){
                    tobuy.style.display = 'flex';
                }else{
                    console.log(tobuy.style.display);
                    tobuy.style.display = 'none';
                }
                break;
            case "tobebought":
                if (!tobuy.classList.contains('purchased')){
                    tobuy.style.display = "flex";
                }else{
                    tobuy.style.display = "none";}
                break;
        }


    });

}


function saveToBuys(tobuy){
    //check -the things are already present?
    let tobuys;
    if (localStorage.getItem('tobuys') === null){
        tobuys = []
    }
    else{
        tobuys = JSON.parse(localStorage.getItem('tobuys'));
    }

    tobuys.push(tobuy);

    localStorage.setItem('tobuys', JSON.stringify(tobuys));



}

function getToBuys(){
    let tobuys;
    if (localStorage.getItem('tobuys') === null){
        tobuys = []
    }
    else{
        tobuys = JSON.parse(localStorage.getItem('tobuys'));
    }
    tobuys.forEach(function(tobuy){

        //create a to_Buy Div in js and add a classlits
        const to_Buy_Div = document.createElement('div');
        to_Buy_Div.classList.add('To_buy');

        const to_Buy_Li = document.createElement('li');
        to_Buy_Li.innerText = tobuy;

        to_Buy_Li.classList.add('to_Buy_item');

        //making to_buy_li to come inside to_Buy_divx

        to_Buy_Div.appendChild(to_Buy_Li);

        //Ispurchased button
        const is_purchased = document.createElement('button');
        is_purchased.innerHTML = '<i class = "fas fa-check"></i>';
        is_purchased.classList.add('is_purchased_button');
        to_Buy_Div.appendChild(is_purchased);

        //Rem_groc button
        const Rem_groc = document.createElement('button');
        Rem_groc.innerHTML = '<i class = "fas fa-trash"></i>';
        Rem_groc.classList.add('Rem_groc_button');
        to_Buy_Div.appendChild(Rem_groc);

        To_buy_List_OP.appendChild(to_Buy_Div);

    });
}

function remove_local_items(tobuy){
    let tobuys;
    if (localStorage.getItem('tobuys') === null){
        tobuys = []
    }
    else{
        tobuys = JSON.parse(localStorage.getItem('tobuys'));
    }
    tobuys.splice(tobuys.indexOf(tobuy.children[0].innerText), 1);
    localStorage.setItem('tobuys', JSON.stringify(tobuys));
    console.log(tobuys.indexOf(tobuy.children[0].innerText));
}

