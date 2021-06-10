$(function () {
    AOS.init({
        once: true
    });

    let slidesList, slickSlides, currentSlide, currentSlideIndex,
        slickSlidesLength, slideIndentFromMiddle = 12, slideIndent = 24;

    $('.tariff-list-group').on('init', function () {
        slidesList = $('.slick-list');
        slickSlides = slidesList.find('.slick-slide');
        currentSlide = slidesList.find('.slick-slide.slick-active');
        currentSlideIndex = $(slickSlides).index(currentSlide);
        slickSlidesLength = slickSlides.length - 1;
        updateSlider({
            slidesList, currentSlide, currentSlideIndex, slidesLength: slickSlidesLength
        });
    }).slick({
        mobileFirst: true,
        speed: 220,
        arrows: false,
        dots: true,
        infinite: false,
        cssEase: 'linear'
    }).on('afterChange', function () {
        currentSlide = slidesList.find('.slick-slide.slick-active');
        currentSlideIndex = $(slickSlides).index(currentSlide);
        updateSlider({
            slidesList, currentSlide, currentSlideIndex, slidesLength: slickSlidesLength
        });
    });

    // function to update paddings of a slider to make visible next and previous sliders
    function updateSlider(
        {
            slidesList,
            currentSlide,
            currentSlideIndex,
            slidesLength= 0
        } = {}
    ) {
        if (!slidesLength) return;
        if (currentSlideIndex !== 0 && currentSlideIndex < slidesLength) {
            // set padding left and right for element when it is in the middle of a slider
            slidesList.css({
                'padding-left': `${slideIndentFromMiddle}px`,
                'padding-right': `${slideIndentFromMiddle}px`,
            });
            updateTransform('middle');
        } else if (currentSlideIndex === slidesLength) {
            // set padding left for the last element when slider reaches end
            slidesList.css({
                'padding-left': `${slideIndent}px`,
                'padding-right': '0',
            });
            updateTransform('last');
        } else {
            // set padding right for the first element when slider is in the starting position
            slidesList.css({
                'padding-left': '0',
                'padding-right': `${slideIndent}px`,
            });
            updateTransform();
        }

        // function to update transform of the previous and next sibling of an active slide
        function updateTransform(pos = 'first') {
            let prevSibling = currentSlide.prev()[0],
                nextSibling = currentSlide.next()[0];

            // reset first value
            $(currentSlide).css(setTransform());

            // then assign value
            if (pos === 'first') {
                $(nextSibling).css(setTransform(-40));
            } else if (pos === 'last') {
                $(prevSibling).css(setTransform(40));
            } else {
                $(nextSibling).css(setTransform(-40));
                $(prevSibling).css(setTransform(40));
            }
        }
    }

    function setTransform(x = 0) {
        return x ? {
            'transform': `scale(.95) translateX(${x}px)`,
        } : {
            'transform': 'scale(1)'
        }
    }

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