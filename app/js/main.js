$(function () {
    AOS.init({
        once: true
    });

    $('.js--video-block__btn').on('click', function(ev) {
        ev.preventDefault();
        setTimeout(() => {
            $("#video")[0].src += "&autoplay=1";
            $(this).closest('.video-block').addClass('video-block--active')
        }, 800);
    });

    let isValidMask = false;

/*    $('.phone-mask').mask('+7 (000) 000-00-00', {
        onComplete: function (cep) {
            isValidMask = true;
        },
        onInvalid: function (cep) {
            isValidMask = false;
        },

    });

    // Отправка заявки
    $('.js-zayavka').submit(function (e) {
        e.preventDefault();

        if (isValidMask) {
            ym(70783414,'reachGoal','mama_lead')
            VK.Goal('lead')
            fbq('track', 'Lead')

            $.post('/mail.php', $(this).serialize(), function (response) {
                if (response && response.status === false) {
                    alert(response.error);
                } else if (response && response.status === true) {
                    //alert(response.msg)
                    location.href = '/thanks'
                } else {
                    alert('Ошибка отправки. Пожалуйста свяжитесь с администратором!')
                }
            })
        }
    });*/

    // accordion blocks
    function makeAccordion(els, elsParent, activeClass, borderCancelClass) {
        els.on('click', function () {
            const thisParent = $(this).parent();
            const thisParentPrevSibling = thisParent.prev();

            if (thisParent.hasClass(activeClass)) {
                thisParent.removeClass(activeClass);
                if (thisParentPrevSibling.length) thisParentPrevSibling.removeClass(borderCancelClass);
                return;
            }

            elsParent.each(function () {
                $(this).removeClass(activeClass);
                $(this).removeClass(borderCancelClass);
            })

            thisParent.addClass(activeClass);
            thisParentPrevSibling.addClass(thisParentPrevSibling.length ? borderCancelClass : '');
        });
    }

    // dom els for accordion
    const infoBlockItemEls = $('.info-block-item');
    const infoBlockItemBtnEls = infoBlockItemEls.find('.info-block-item__top');
    makeAccordion(infoBlockItemBtnEls, infoBlockItemEls, 'info-block-item--active', 'info-block-item--no-border');
});