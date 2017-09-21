var cart={};//Корзина
var p=0;
var dataTab=0;
var dataTabKr=0;

$(function () {
    checkCart();
    showMiniCart();


    $('.visa').click(function () {
        dataTab=0;
        fTabs();
        fTabsTexterea();
    });
    $('.mastercard').click(function () {
        dataTab=1;
        fTabs();
        fTabsTexterea();
    });
    $('.yamoney').click(function () {
        dataTab=2;
        fTabs();
        fTabsTexterea();
    });
    $('.paypal').click(function () {
        dataTab=3;
        fTabs();
        fTabsTexterea();
    });
    $('.webmoney').click(function () {
        dataTab=4;
        fTabs();
        fTabsTexterea();
    });






    $('.privat').click(function () {
        dataTabKr=0;
        fTabs_2();
    });
    $('.pumb').click(function () {
        dataTabKr=1;
        fTabs_2();
    });
    $('.oshad').click(function () {
        dataTabKr=2;
        fTabs_2();
    });
    $('.otpbank').click(function () {
        dataTabKr=3;
        fTabs_2();
    });
    $('.alfa').click(function () {
        dataTabKr=4;
        fTabs_2();
    });
    $('.kredo').click(function () {
        dataTabKr=5;
        fTabs_2();
    });

    $('.back').click(function () {
        $('.numberOpl').css('display','block');
        $('.oplata textarea').css('display','none');
        $('.back').css('display','none');
        $('.kreditForm').css('display','none');
    });

    $("select").change(function(){
        if($(this).val() == '')
            return false;

        if($(this).val()=="Наличными") {
            $(".kredit").css('display', 'none');
            $(".oplata").css('display', 'block');
            $('.kreditForm').css('display','none');
            $('.numberOpl').css('display','block');
            $('.back').css('display','none');
        }

        if($(this).val()=="Кредит") {
            $(".oplata").css('display', 'none');
            $(".kredit").css('display', 'block');
            $('.kreditForm').css('display','none');
            $('.numberOplKredit').css({
                'width':'',
                'height':''
            })
        }
    });


    $('.kredit img, .oplata img').click(function () {

        $('.kreditForm').css('display','block');
    });

    $(".kreditForm .right").click(function () {
        $('.kreditForm').css('display','none');
        $('.numberOplKredit').css({
            'width':'',
            'height':''
        });
    });


    function CVC() {
        $('.CVC2').css('display', 'none');
    }

    var timer=setTimeout(CVC, 3000);

    $('.cvc input')
        .click(function () {
            $('.CVC2').css('display','block');
        })
        .mouseenter(function () {
            clearTimeout(timer);
        })
        .mouseleave(function () {
            setTimeout(CVC, 5000);
        });

    $('.CVC2')
        .mouseenter(function () {
             clearTimeout(timer);
         })
        .mouseleave(function () {
            setTimeout(CVC, 3000);
        });

    $('.cvv2-key').click(function () {
       var id=$(this).attr('id');
       id=parseInt(id);
       const CVC = $('.inputCVC').val();

       if($('.inputCVC').val().length<3)  {
            $('.inputCVC').val(CVC+id);
       }
    });
    
    $('.deleteCVC').click(function () {
        $('.inputCVC').val('');
    });

    $('.inputCVC').keydown(function(e){
        e.preventDefault()
    });

    $('.inpNumber').bind("change keyup input click", function() {
        if (this.value.match(/[^0-9]/g)) {
            this.value = this.value.replace(/[^0-9]/g, '');
        }
    });


});

function fTabs() {
    var number=$('.numberOpl');

    for(var i=0;i<number.length;i++){
        if(dataTab==i)
        {
            number[i].style.display='block';
            $('div .back').css('display','block');
        }

        else
            number[i].style.display='none';
    }
}
function fTabs_2() {
    var number_2 = $('.numberOplKredit');

    for (var i = 0; i < number_2.length; i++) {
        if (dataTabKr==i) {
            number_2[i].style.width = 200+'px';
            number_2[i].style.height = 200+'px';
        }
        else {
            number_2[i].style.width = '';
            number_2[i].style.height ='';
        }
    }
}

function fTabsTexterea() {
    var texterea=$('.oplata textarea');
    for(var i=0;i<texterea.length;i++){
        if(dataTab==i)
            texterea[i].style.display='block';
        else
            texterea[i].style.display='none';
    }
}

$.getJSON('goods.json', function (data) {
    var goods=data;//все товары в массиве

    checkCart();
    loadGoodsCart();

    function loadGoodsCart() {
        //загружаю товары на страницу
        if($.isEmptyObject(cart)) {
            //Корзина пуста
            var out='<div class="sad-icon"></div>' +
                'Корзина пуста. Добавьте товар в корзину <br><a href="index.html">Главная страница</a>';

            $(".my-cart").html(out);
            $("#price").html('0');
            $(".price").html('');
            $(".cost").css("display","none");
            $(".form").css("display","none");
        }
        else {
            var out='';
            var rezalt=[];
            for(var key in cart)
            {
                out+='<div class="single-goods">';
                out+='<p class="goods-header">'+key+'</p><span><button class="delete" data-art="' + key + '">✖</button></span>';
                out+='<p>Цена: '+goods[key].cost+" $ / шт."+'</p>';
                out+='<img src="'+goods[key].image+'">';
                out +='<p></p>'+'<button class="minus" data-art="' + key + '">-</button>';
                out+='<span class="outCount">'+cart[key]+'</span>';
                out += '<span><button class="plus" data-art="' + key + '">+</button></span>'+'<p></p>';
                out+='<p></p>'+'<span class="outText cost">'+goods[key].cost*cart[key]+'</span>';
                out+='<p></p>'+'<span class="outText">'+goods[key].description+' '+
                    '<span>'+goods[key].count+'</span>'+'</span>';
                out+='</div>';

                p = goods[key].cost * cart[key];
                rezalt.push(p);
            }
            var rezu=0;
            for(var i=0;i<rezalt.length;i++)
                rezu+=rezalt[i];

            $(".my-cart").html(out);
            $(".plus").click(plusGoodsCart);
            $(".minus").click(minusGoodsCart);
            $(".delete").click(deleteGoods);
            $("#price").html(rezu);
            $(".price").html(rezu);
        }
    }
    function plusGoodsCart() {
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

    // function plusGoods(e) {
    //     //добавляем по 1 товару
    //
    //     var counter;
    //     var element = e.target;
    //     var articul = $(this).attr('data-art');
    //
    //     if((cart[articul]!=null)) {
    //         cart[articul]++;
    //     }
    //     else{
    //         cart[articul]=1;
    //     }
    //
    //
    //
    //     $.getJSON('goods.json', function (data) {
    //         for (var key in data)
    //             counter = data[articul].count;
    //
    //         if (counter < cart[articul]) {
    //             alert("Вы выбрали больше дисков, чем на складе");
    //             cart[articul] = counter;
    //             saveCartToLS();
    //             loadGoods();
    //             showMiniCart();
    //         }
    //     });
    //
    //
    //     saveCartToLS();
    //     loadGoods();
    //     showMiniCart();
    //
    //     function inputType() {
    //
    //         for(var key in cart) {
    //             if (articul == key) {
    //                 $(element).siblings(1).val(cart[articul]);
    //             }
    //
    //         }
    //     }
    //     inputType();
    //
    // }

    function minusGoodsCart() {
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
