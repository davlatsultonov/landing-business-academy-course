
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

    $('.phone-mask').mask('+7 (000) 000-00-00', {
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
    });
});