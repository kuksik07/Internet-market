var cart={};//моя корзина


$('document').ready(function () {
    loadGoods();
    checkCart();
    showMiniCart();

    $(".click").on('click', function() {
        $("body").animate({"scrollTop": 0},'slow');
        return false;
    });
    $("#out").mouseover(showMenu());
    // $("#out").mouseout(hideMenu());
});


function loadGoods() {
        //загружаю товары на страницу
        $.getJSON('goods.json',function (data) {
            // console.log(data);
            var out='';
            for(var key in data)
        {
            out+='<div class="single-goods">';
            out+='<p class="goods-header">'+key+'</p>';
            out+='<p>Цена: '+data[key].cost+'</p>';
            out+='<img src="'+data[key].image+'">';
            out+='<button class="add-to-cart" data-art="'+key+'">Купить</button>';
            out+='<p>'+data[key].description+'</p>';
            out+='</div>';
        }
        $('#goods').html(out);
        $('button.add-to-cart').click(addToCart);
    })
}

function addToCart() {
    //Добавляем товары в корзину
    var articul=$(this).attr('data-art');

    if(cart[articul]!=undefined)
        cart[articul]++;
    else
        cart[articul]=1;

    localStorage.setItem('cart',JSON.stringify(cart));
    showMiniCart();
}

function checkCart() {
    //проверяет наличие корзины в localStorege
    if(localStorage.getItem('cart')!=null)
        cart=JSON.parse(localStorage.getItem('cart'));
}


function saveCartToLS() {
    //сохраняю корзину в localStorage
    localStorage.setItem('cart',JSON.stringify(cart));
}



function showMiniCart() {
    var out='';

    for(var key in cart){
        out+=key+'---'+cart[key];
        out += '<button class="delete" data-art="' + key + '">x</button>'+'<br>';
    }

    $('#mini-cart').html(out);

    $(".delete").click(deleteGoods)

}
function deleteGoods() {
    var articul=$(this).attr('data-art');
    delete cart[articul];
    saveCartToLS();
    showMiniCart();
}
var hideTimes={};

function setVisibility(objID,visible) {
    var obj=document.getElementById(objID);
    obj.style.visibility=(visible)?"visible":"";
}

function showMenu(objID) {
    setVisibility(objID,true);
    clearTimeout(hideTimes[objID]);

}

function hideMenu(objID) {
    // setVisibility(objID,false);
    var cmd="setVisibility('"+objID+"', false)";
    hideTimes[objID]=setTimeout(cmd,1000);
}