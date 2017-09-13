var cart={};//моя корзина


$('document').ready(function () {
    loadGoods();
    checkCart();
    showMiniCart();
    setStars();
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('.scroll-top').fadeIn("slow");
        } else {
            $('.scroll-top').fadeOut("slow");
        }
    });
    $(".scroll-top").on('click', function() {
        $("body").animate({"scrollTop": 0},'slow');
        return false;
    });
});

function loadGoods() {
        //загружаю товары на страницу
        $.getJSON('goods.json',function (data) {
            var stars=0;
            var rating=0;
            var out='';
            for(var key in data)
        {
            out+='<div class="single-goods">';
            out+='<p class="goods-header">'+key+'</p>';
            out+='<p>'+data[key].rating*20+'</p>';
            out+='<div class="rating">';
                out+='<div class="rating-progress">';
                out+='</div>';
                out+='<div class="stars">';
                out+='</div>';
            out+='</div>';
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



function setStars() {
    var stars=0;
    var coun=0;
    $.getJSON('goods.json',function (data) {
        for(var key in data){
                stars=data[key].rating*20;

            console.log(stars);

                // console.log(stars);
                // foo(key);
                coun++;
                for(var i=1;i<=12;i++)
                    $(".rating-progress:nth-child(1)").css("width",stars+'%');
        }



    });

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