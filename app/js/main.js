$(function () {
    AOS.init({
        once: true
    });

    let slidesList, slickSlides, currentSlide, currentSlideIndex,
        slickSlidesLength, slideIndentFromMiddle = 12, slideIndent = 24,
        tariffTitle = $('.tariff__title');

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
        speed: 320,
        arrows: false,
        dots: true,
        infinite: false,
        cssEase: 'linear'
    }).on('afterChange', function () {
        currentSlide = slidesList.find('.slick-slide.slick-active');
        currentSlideIndex = $(slickSlides).index(currentSlide);
        const isLastSlide = currentSlideIndex === 2;
        tariffTitle.css({
            'margin-bottom': isLastSlide ? '46px' : '0',
            'color': function () {
                return isLastSlide ? '#060b40' : (currentSlideIndex === 1) ? '#e6c69a' : '#3a6e80'
            }
        });

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
                $(nextSibling).css({
                    'transform': 'scale(0.85) translateX(-80px)'
                });
                $(prevSibling).css(setTransform(40));
            }
        }
    }

    function setTransform(x = 0) {
        return x ? {
            'transform': `scale(.9) translateX(${x}px)`,
        } : {
            'transform': 'scale(1)'
        }
    }


    // dom els for accordion
    const infoBlockItemEls = $('[data-aos-id="info-block"]'),
          infoBlockFAQItemEls = $('[data-aos-id="info-block-faq"]'),
          infoBlockFAQItemBtnEls = infoBlockFAQItemEls.find('.info-block-item__top'),
          infoBlockItemBtnEls = infoBlockItemEls.find('.info-block-item__top');

    checkAOSEnd('info-block', infoBlockItemEls.last()[0]);
    checkAOSEnd('info-block-faq', infoBlockFAQItemEls.last()[0]);

    function checkAOSEnd(idName = '', el = false, transitionDuration = 0.4) {
        if (!el && !idName) return;

        document.addEventListener(`aos:in:${idName}`, ({ detail }) => {
            if (el === detail) {
                $(`[data-aos-id='${idName}'].info-block-item`).css({
                    'transition-duration':  `${transitionDuration}s`
                })
            }
        });
    }

    $('.js--video-block__btn').on('click', function(ev) {
        ev.preventDefault();
        setTimeout(() => {
            $("#video")[0].src += "&autoplay=1";
            $(this).closest('.video-block').addClass('video-block--active')
        }, 800);
    });

    // accordion blocks
    function makeAccordion(els, elsParent, activeClass, borderCancelClass) {
        if (!els.length) return;
        const isBlockOfAnswers = $(elsParent).closest('.info-block--answers').length;
        els.on('click', function () {
            const thisParent = $(this).parent();
            const thisParentPrevSibling = thisParent.prev();
            const thisHeight = $(this).outerHeight();
            const descriptionEl = thisParent.find('.info-block-item__des');
            const descriptionElCount = descriptionEl.length;
            const descriptionHeight = descriptionElCount < 2 ? descriptionEl.outerHeight() :
                                      descriptionEl.toArray().reduce((acc, el) => acc + $(el).outerHeight(), 0) + 26;
            console.log(descriptionHeight);

            if (thisParent.hasClass(activeClass)) {
                thisParent.removeClass(activeClass);
                // minus 2 cause when active info-block-item__top adds 20px
                thisParent.css('max-height', thisHeight - (isBlockOfAnswers ? 7 : 2));
                if (thisParentPrevSibling.length) thisParentPrevSibling.removeClass(borderCancelClass);
                return;
            }

            elsParent.each(function () {
                if (!$(this).hasClass(activeClass)) {
                    $(this).removeClass(borderCancelClass);
                    return;
                }
                $(this).removeClass(activeClass);
                $(this).css('max-height', $(this).find('.info-block-item__top').outerHeight() - (isBlockOfAnswers ? 7 : 2));
                $(this).removeClass(borderCancelClass);
            })

            thisParent.addClass(activeClass);
            thisParent.css('max-height',
                thisHeight +
                descriptionHeight + (isBlockOfAnswers ? 10 : 6)
            )
            thisParentPrevSibling.addClass(borderCancelClass);
        });
    }

    setTimeout(() => {
        infoBlockItemEls.each(function () {
            $(this).css('max-height', $(this).find('.info-block-item__top').outerHeight() + 2);
        });

        infoBlockFAQItemEls.each(function () {
            $(this).css('max-height', $(this).find('.info-block-item__top').outerHeight() + 1);
        });

        makeAccordion(infoBlockItemBtnEls, infoBlockItemEls, 'info-block-item--active', 'info-block-item--no-border');
        makeAccordion(infoBlockFAQItemBtnEls, infoBlockFAQItemEls, 'info-block-item--active', 'info-block-item--no-border');
    }, 100);
});