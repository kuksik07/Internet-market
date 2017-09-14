var cart={};//Корзина
var p=0;

$(function () {
    checkCart();
    showMiniCart();
});


$.getJSON('goods.json', function (data) {
    var goods=data;//все товары в массиве

    checkCart();
    loadGoodsCart();

    function loadGoodsCart() {
        //загружаю товары на страницу
        if($.isEmptyObject(cart)) {
            //Корзина пуста
            var out='Корзина пуста. Добавьте диски в корзину <a href="index.html">Главная страница</a>';
            $(".my-cart").html(out);
            $(".price").html('');
        }
        else {
            var out='';
            var rezalt=[];
            for(var key in cart)
            {
                out+='<div class="single-goods">';
                out+='<p class="goods-header">'+key+'</p><span><button class="delete" data-art="' + key + '">✖</button></span>';
                out+='<p>Цена: '+goods[key].cost+'</p>';
                out+='<img src="'+goods[key].image+'">';
                out+='<p>'+goods[key].description;
                out+='<span>'+goods[key].count+'</span>'+'</p>';
                out += '<button class="minus" data-art="' + key + '">-</button>';
                out+='<span>'+cart[key]+'</span>';
                out += '<span><button class="plus" data-art="' + key + '">+</button></span>';
                out+='<p class="p">'+goods[key].cost*cart[key]+'</p>';
                out+='</div>';

                p = goods[key].cost * cart[key];
                rezalt.push(p);
            }
            var rezu=0;
            for(var i=0;i<rezalt.length;i++)
                rezu+=rezalt[i];

            $(".my-cart").html(out);

            $(".plus").click(plusGoods);
            $(".minus").click(minusGoods);
            $(".delete").click(deleteGoods);
            $(".price").html(rezu);


        }
    }
    function plusGoods() {
        //добавляем по 1 товару
        var counter;
        var articul=$(this).attr('data-art');
        cart[articul]++;
        $.getJSON('goods.json',function (data) {
            for (var key in data)
            {
                counter=data[articul].count;
            }

            if(counter<cart[articul])
            {
                alert("Вы выбрали больше дисков, чем на складе");
                cart[articul]=counter;
                saveCartToLS();
                loadGoodsCart();
                showMiniCart();
            }
        });
        saveCartToLS();
        loadGoodsCart();
        showMiniCart();
    }

    function minusGoods() {
        //убираем по 1 товару
        var articul=$(this).attr('data-art');

        if(cart[articul]>1)
            cart[articul]--;
        else
            delete cart[articul];

        saveCartToLS();
        loadGoodsCart();
        showMiniCart();
    }

    function deleteGoods() {
        //удаляем товары

        var articul=$(this).attr('data-art');
        delete cart[articul];
        saveCartToLS();
        loadGoodsCart();
        showMiniCart();


    }

    function s(cart) {
        var count = 0;
        for(key in cart) {
            count += cart[key];
        }
        return count;
    }
});



function showMiniCart() {
    var out = '';
    var price='';
    if (s(cart)<=100)
        out += s(cart);

    else
        out+="100+";

    $('#mini-cart').html(out);
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
