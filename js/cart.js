var cart = {};//Корзина
var rezu = 0;
var rezuk;
var p = 0;
var dataTab = 0;
var dataTabKr = 0;

$(function () {
    checkCart();
    showMiniCart();


    $('.visa').click(function () {
        dataTab = 0;
        fTabs();
    });
    $('.mastercard').click(function () {
        dataTab = 1;
        fTabs();
    });
    $('.paypal').click(function () {
        dataTab = 2;
        fTabs();
    });
    $('.webmoney').click(function () {
        dataTab = 3;
        fTabs();
    });


    $('.privat').click(function () {
        dataTabKr = 0;
        fTabs_2();
    });
    $('.pumb').click(function () {
        dataTabKr = 1;
        fTabs_2();
    });
    $('.oshad').click(function () {
        dataTabKr = 2;
        fTabs_2();
    });
    $('.alfa').click(function () {
        dataTabKr = 3;
        fTabs_2();
    });

    $('.back').click(function () {
        $('.numberOpl').css('display', 'inline-block');
        $('.oplata input').css('display', 'none');
        $('.back').css('display', 'none');
        $('.kartForm').css('display', 'none');
    });


    $('.dropeddown li').click(function () {
    if ($(this).parents('.drop-menu').find('input').val() == '')
            return false;

        if ($(this).parents('.drop-menu').find('input').val() == "Наличными") {
            $('.kartForm').css('display', 'none');
            $(".kreditForm").css('display', 'none');
            $(".kredit").css('display', 'none');
            $(".oplata").css('display', 'none');
        }

        if ($(this).parents('.drop-menu').find('input').val() == "Карточкой") {
            $(".kredit").css('display', 'none');
            $(".oplata").css('display', 'block');
            $('.kartForm').css('display', 'none');
            $('.kreditForm').css('display', 'none');
            $('.numberOpl').css('display', 'inline-block');
            $('.back').css('display', 'none');
        }

        if ($(this).parents('.drop-menu').find('input').val() == "Кредит") {
            $(".oplata").css('display', 'none');
            $(".kredit").css('display', 'block');
            $('.kartForm').css('display', 'none');
            $('.kreditForm').css('display', 'none');
            $('.numberOplKredit').css({
                'opacity': '0.5'
            });
        }
    });


    $('.oplata img').click(function () {
        $('.kartForm').css('display', 'inline-block');
        $('.kartForm .inpNumber, .kartForm input').css('display', 'inline-block');
    });

    $('.kredit img').click(function () {
        $('.kreditForm').css('display', 'block');
    });

    $(".kartForm .right").click(function () {
        $('.kartForm').css('display', 'none');
    });

    $(".kreditForm .right").click(function () {
        $('.kreditForm').css('display', 'none');
    });


    function CVC() {
        $('.CVC2').css('display', 'none');
    }

    var timer = setTimeout(CVC, 3000);

    $('.cvc input')
        .click(function () {
            $('.CVC2').css('display', 'block');
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
        var id = $(this).attr('id');
        id = parseInt(id);
        const CVC = $('.inputCVC').val();

        if ($('.inputCVC').val().length < 3) {
            $('.inputCVC').val(CVC + id);
        }
    });

    $('.deleteCVC').click(function () {
        $('.inputCVC').val('');
    });

    $('.inputCVC').keydown(function (e) {
        e.preventDefault()
    });

    $('.inpNumber').bind("change keyup input click", function () {
        if (this.value.match(/[^0-9]/g)) {
            this.value = this.value.replace(/[^0-9]/g, '');
        }
    });


    var RangeSlider = function (containerID) {
        var self = this,
            $RangeSlider = $('#' + containerID),
            $SliderThumnb = $RangeSlider.find('.RangeSlider_Thumb'),
            $SliderTrack = $RangeSlider.find('.RangeSlider_Track'),
            $SliderTrackFill = $RangeSlider.find('.RangeSlider_TrackFill'),
            $ClickArea = $RangeSlider.find('.RangeSlider_ClickArea'),
            $SliderPoints = $RangeSlider.find('.RangeSlider_Point');

        this.value = 0;

        /* helper to find slider value based on filled track width */
        var findValueFromTrackFill = function (trackFillWidth) {
            var totalWidth = $SliderTrack.width(),
                onePercentWidth = totalWidth / 100,
                value = Math.round((trackFillWidth / onePercentWidth) / 10);
            return value;
        };

        /* change highlighted number based on new value */
        var updateSelectedValue = function (newValue) {
            $SliderPoints.removeClass('RangeSlider_PointActive');
            $SliderPoints.eq(newValue).addClass('RangeSlider_PointActive');
        };

        /* highlight track based on new value (and move thumb) */
        var updateHighlightedTrack = function (newPosition) {
            newPosition = newPosition + '0%';
            $SliderTrackFill.css('width', newPosition);
        };

        /* set up drag funcationality for thumbnail */
        var setupDrag = function ($element, initialXPosition) {
            $SliderTrackFill.addClass('RangeSlider_TrackFill-stopAnimation');
            var trackWidth = $SliderTrackFill.width();

            var newValue = findValueFromTrackFill(trackWidth);
            updateSelectedValue(newValue);

            $element.on('mousemove', function (e) {
                var newPosition = trackWidth + e.clientX - initialXPosition;
                self.imitateNewValue(newPosition);

                newValue = findValueFromTrackFill($SliderTrackFill.width());
                updateSelectedValue(newValue);
            });
        };
        /* remove drag functionality for thumbnail */
        var finishDrag = function ($element) {
            $SliderTrackFill.removeClass('RangeSlider_TrackFill-stopAnimation');
            $element.off('mousemove');
            var newValue = findValueFromTrackFill($SliderTrackFill.width());
            self.updateSliderValue(newValue);
        };

        /* method to update all things required when slider value updates */
        this.updateSliderValue = function (newValue) {
            updateSelectedValue(newValue);
            updateHighlightedTrack(newValue);
            self.value = newValue;
            console.log('this.value = ', self.value);

            if (self.value == 0) {
                $('.monye').html('');
            }
            if (self.value == 1) {
                $('.monye').html(((rezuk / 6) + (rezuk * 0.03)).toFixed(2));
            }
            if (self.value == 2) {
                $('.monye').html(((rezuk / 12) + (rezuk * 0.03)).toFixed(2));
            }
            if (self.value == 3) {
                $('.monye').html(((rezuk / 18) + (rezuk * 0.03)).toFixed(2));
            }
            if (self.value == 4) {
                $('.monye').html(((rezuk / 24) + (rezuk * 0.03)).toFixed(2));
            }
            if (self.value == 5) {
                $('.monye').html(((rezuk / 30) + (rezuk * 0.03)).toFixed(2));
            }
            if (self.value == 6) {
                $('.monye').html(((rezuk / 36) + (rezuk * 0.03)).toFixed(2));
            }
            if (self.value == 7) {
                $('.monye').html(((rezuk / 42) + (rezuk * 0.03)).toFixed(2));
            }
            if (self.value == 8) {
                $('.monye').html(((rezuk / 48) + (rezuk * 0.03)).toFixed(2));
            }
            if (self.value == 9) {
                $('.monye').html(((rezu / 54) + (rezu * 0.03)).toFixed(2));
            }
            if (self.value == 10) {
                $('.monye').html(((rezu / 60) + (rezu * 0.03)).toFixed(2));
            }
        };

        /* method to imitate new value without animation */
        this.imitateNewValue = function (XPosition) {
            $SliderTrackFill.addClass('RangeSlider_TrackFill-stopAnimation');
            if (XPosition > $SliderTrack.width()) {
                XPosition = $SliderTrack.width();
            }
            $SliderTrackFill.css('width', XPosition + 'px');
        };

        /*
         * bind events when instance created
         */
        $ClickArea.on('mousedown', function (e) {
            /* if a number or thumbnail has been clicked, use their event instead */
            var $target = $(e.target);
            if ($target.hasClass('RangeSlider_Thumb')) {
                return false;
            }
            /* now we can continue based on where the clickable area was clicked */
            self.imitateNewValue(e.offsetX);
            setupDrag($(this), e.clientX);
        });

        $ClickArea.on('mouseup', function (e) {
            finishDrag($(this));
        });

        // update value when markers are clicked
        $SliderPoints.on('mousedown', function (e) {
            e.stopPropagation();
            var XPos = $(this).position().left + ($(this).width() / 2);
            self.imitateNewValue(XPos);
            setupDrag($ClickArea, e.clientX);
        });

        // when thumbnail is clicked down, init the drag stuff
        $SliderThumnb.on('mousedown', function (e) {
            e.stopPropagation();
            setupDrag($(this), e.clientX);
        });

        // when the thumbnail is released, remove the drag stuff
        $SliderThumnb.on('mouseup', function (e) {
            finishDrag($(this));
        });
    };

    var rangeSlider = new RangeSlider('RangeSlider');
    var rangeSlider2 = new RangeSlider('RangeSlider2');


});

function addYear(flag) {
    var s = document.forms[0].year;
    var val, o;
    if (flag) {
        val = s.options[s.length - 1].value * 1 + 1;
        o = new Option(val, val, false, true);
        try {
            s.add(o, null);
        } catch (e) {
            s.add(o);
        }
    }
    else {
        val = s.options[0].value * 1 - 1;
        o = new Option(val, val, false, true);
        try {
            s.add(o, s.options[0]);
        } catch (e) {
            s.add(o, 0);
        }
    }
}

function fTabs() {
    var number = $('.numberOpl');

    for (var i = 0; i < number.length; i++) {
        if (dataTab == i) {
            var card = number[i];
            $(card).clone().appendTo(".img-card");
            $(card).css('display','none');
            $('div .back').css('display', 'block');
        }

        else
            number[i].style.display = 'none';
    }
}

function fTabs_2() {
    var number_2 = $('.numberOplKredit');

    for (var i = 0; i < number_2.length; i++) {
        if (dataTabKr == i) {
            number_2[i].style.opacity = '1';
        }
        else {
            number_2[i].style.opacity = '0.5';
        }
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
            rezu=0;
            for(var i=0;i<rezalt.length;i++)
                rezu+=rezalt[i];
                rezuk=rezu;

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

/*Select Box js*/
$('.drop-menu').click(function () {
    $(this).attr('tabindex', 1).focus();
    $(this).toggleClass('active');
    $(this).find('.dropeddown').slideToggle(300);
});
$('.drop-menu').focusout(function () {
    $(this).removeClass('active');
    $(this).find('.dropeddown').slideUp(300);
});
$('.drop-menu .dropeddown li').click(function () {
    $(this).parents('.drop-menu').find('span').text($(this).text());
    $(this).parents('.drop-menu').find('input').attr('value', $(this).text());
});
/*End Select Box js*/
