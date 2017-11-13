var cart={};//моя корзина


$('document').ready(function () {
    loadGoods();
    checkCart();
    showMiniCart();
    $(window).scroll(function() {
        if ($(this).scrollTop() > 390) {
            var p=$(this).scrollTop();
            $('.menu-top .home').css("display", "none");
            $('.menu-logo-home').css("display", "inline-block");
        } else{
            $('.menu-top .home').css("display", "inline-block");
            $('.menu-logo-home').css("display", "none");
        }
    });

    $(window).scroll(function(){
        if ($(this).scrollTop() > 100) {
            $('.scroll-top').fadeIn();
        } else {
            $('.scroll-top').fadeOut();
        }
    });

    //Click event to scroll to top
    $('.scroll-top').click(function(){
        $('html, body').animate({scrollTop : 0},800);
        return false;
    });
    var more_button=document.getElementById('more');
    var isClicked = false;
    $('#more').click(function(){
        if(isClicked){
            isClicked=false;
            $('#goods').css('height','1100px');
            $(this).css('background-position','-10px 10px');
            $("html, body").animate({"scrollTop": 400},'slow');
        }else{
            isClicked=true;
            $('#goods').css('height','auto');
            $(this).css('background-position','-10px -30px');
            $("html, body").animate({"scrollDown": 800},'slow');
        }
    });
});

function loadGoods() {
    //загружаю товары на страницу
    $.getJSON('goods.json',function (data) {

        var count=1;
        var out='';
        var p='';
        p=parseInt(p);
        for(var key in data)
        {
            out+='<div class="single-goods">';
            out+='<p class="goods-header" data-id="${id}">'+key+'</p><br>';
            stars=data[key].rating;
            count=0;
            out+='<div class="rating">';
            while(count<5){
                if(stars!=0) {
                    out+='<div class="star-color"></div>';
                    stars--;
                    ++count;
                }
                if(stars==0&&count!=5){
                    out+='<div class="star-empty"></div>';
                    ++count;
                }
            }

            p=cart[key];

            if(p==undefined)
                p='Кол-во';



            out+='</div>';
            out+='<p class="cost">Цена: '+data[key].cost+'</p>';
            out+='<div class="frame-img"><img src="'+data[key].image+'"></div>';
            out+='<div class="kolvo"><button class="minus" data-art="'+ key +'">-</button>' +
                '<span class="items">'+p+'</span>' +
                '<button class="plus" data-art="'+ key +'">+</button></div>';
            out+='<button class="add-to-cart" data-art="'+key+'" >Купить</button>';
            out+='<p></p>'+'<span class="outText">'+data[key].description+
                 '<span>'+data[key].count+'</span>'+'</p>';
            out+='</div>';
        }



        $('#goods').html(out);
        $('button.add-to-cart').click(addToCart);
        $(".kolvo .plus").click(plusGoods);
        $(".kolvo .minus").click(minusGoods);

        function plusGoods(e) {
            //добавляем по 1 товару
            var counter;
            var element = e.target;
            var articul = $(this).attr('data-art');

            if((cart[articul]!=null)) {
                cart[articul]++;
            }
            else{
                cart[articul]=1;
            }
            $.getJSON('goods.json', function (data) {
                for (var key in data)
                    counter = data[articul].count;

                if (counter < cart[articul]) {
                    alert("Вы выбрали больше дисков, чем на складе");
                    cart[articul] = counter;
                    saveCartToLS();
                    loadGoods();
                    showMiniCart();
                }
            });
            saveCartToLS();
            loadGoods();
            showMiniCart();

            function inputType() {

                for(var key in cart) {
                    if (articul == key) {
                        $(element).siblings(1).val(cart[articul]);
                    }
                }
            }
            inputType();
        }

        function minusGoods(e) {
            //убираем по 1 товару
            var articul=$(this).attr('data-art');
            var element = e.target;

            if(cart[articul]>1)
            {
                cart[articul]--;
                function inputType() {
                    for (var key in cart) {
                        if (articul == key) {
                            $(element).siblings(1).val(cart[articul]);
                        }
                    }
                }

                inputType();
            }
            else
            {
                delete cart[articul];
                $(element).siblings(1).val('');
            }
            saveCartToLS();
            loadGoods();
            showMiniCart();
        }
    })
}

function s(cart) {
    var count = 0;
    for(key in cart) {
        count += cart[key];
    }
    return count;
}

function addToCart(e) {
    //Добавляем товары в корзину
    var counter;
    var articul=$(this).attr('data-art');
    var element = e.target;

    if(cart[articul]!=undefined)
        cart[articul]++;
    else
        cart[articul]=1;


    $.getJSON('goods.json',function (data) {
        for (var key in data)
        {
            counter=data[articul].count;
        }

        if(counter<cart[articul])
        {
            alert("Вы выбрали больше дисков, чем на складе");
            cart[articul]=counter;
            localStorage.setItem('cart',JSON.stringify(cart));
            showMiniCart();
        }
    });


    saveCartToLS();
    loadGoods();
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
    var out = '';
    if (s(cart)<=100)
        out += s(cart);

    else
        out+="100+";

    $('#mini-cart').html(out);
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