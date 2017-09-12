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
    // showMiniCart_2();
}

function checkCart() {
    //проверяет наличие корзины в localStorege
    if(localStorage.getItem('cart')!=null)
        cart=JSON.parse(localStorage.getItem('cart'));
}
function showMiniCart() {
    var out='';

    for(var key in cart){
        out+=key+'---'+cart[key]+'<br>';
        // out+=cart[key]+'<br>';
    }

    $('#mini-cart').html(out);

}

// var hideTimes={};
//
//     function setVisiblity(visible) {
//         if($("#mini-cart").css("display","none")==true)
//         {
//             // noinspection JSAnnotator
//             continue;
//         }
//         // else
//
//
//
//
//
//     }
//
// // function setVisibility(objID,visible) {
// //     var obj=document.getElementById(objID);
// //     obj.style.visibility=(visible)?"visible":"";
// // }
//
// function showMenu() {
//     // debugger
//     $("#mini-cart")
//         .css("display","block")
//         .css("background","red");
//     // foo();
// }
//
// function hideMenu() {
//     $("#mini-cart").css("display","none");
//     // foo();
// }
// // function foo() {
// //     setTimeout(hideMenu,3000);
// // }
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