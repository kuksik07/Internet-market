var cart={};//моя корзина


$('document').ready(function () {
    loadGoods();
    checkCart();
    showMiniCart();
    top_1();
});
    function top_1() {
        var scrolled;
        var timer;

        document.getElementById('top_1').onclick=function () {
            scrolled=window.pageYOffset;
            scrollToTop();
            // window.scrollTo(0,0);
        };

    function scrollToTop() {
        if(scrolled>0)
        {
            window.scrollTo(0,scrolled);
            scrolled=scrolled-100;//скорость прокрутки
            timer=setTimeout(scrollToTop,500);
        }
        else {
            clearTimeout(timer);
            window.scrollTo(0,0);
        }
    }
}

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


    out+='<a href="cart">Корзина</a>';
    $('#mini-cart').html(out);

}
// function showMiniCart_2() {
//     var out='';
//
//     for(var key in cart)
//         out+=cart[key]+'<br>';
//     $("a").html(out);
// }