// Hard
// if (document.querySelector('.className')) {
//    new Swiper('.className', {
//       // Стрелки ==========================
//       navigation: {
//          nextEl: '.swiper-button-next',
//          prevEl: '.swiper-button-prev'
//       },
//       // Пагинация ==========================
//       pagination: {
//          el: '.swiper-pagination',
//          // clickable: true,
//          // dynamicBullets: true,
//          // renderBullet: function (index, className) {
//          //    return `<span class="${className}">${index + 1}</span>`
//          // },

//          // type buttets to => ...
//          type: 'fraction',
//          // renderFraction: function (currentClass, totalClass) {
//          //    return `
//          //    Фото <span class='${currentClass}'> </span> из
//          //    <span class='${totalClass}'></span>
//          //    `
//          // },

//          // type fraction to => ...
//          // type: 'progressbar',

//       },
//       // Scroll ==========================
//       scrollbar: {
//          el: '.swiper-scrollbar',
//          // Возможность перетаскивать Scroll
//          draggable: true,
//       },

//       // Навигация по хешу ==========================
//       hashNavigation: {
//          watchState: true,
//       },

//       // Управление клавиатурой ==========================
//       keyboard: {
//          // Включить
//          enabled: true,
//          // Управление клавиатурами
//          pageUpDown: true,
//       },
//       // Управление колесом мыши
//       mousewheel: {
//          // Чувствительность колеса мыши
//          sensitivity: 1,
//          // Класс объекта на котором 
//          // будет срабатывать прокрутка мышью
//          // eventsTarget: '.image-slider',
//       },
//       // Включение / отключение PK (default = false) ==========================
//       simulateTouch: true,

//       // Включение при клике на слайд ==========================
//       slideToClickedSlide: false,

//       // Чувствительность (default) ==========================
//       touchRatio: 1,

//       // Авто высота ==========================
//       // autoHeight: true,

//       // Количество слайдов для показа ==========================
//       slidesPerView: 1,

//       // Количество пролиствоимих слайдов ==========================
//       slidesPerGroup: 1,

//       // Отключение функционала
//       //  если слайдов меньше чем нужно (true) ==========================
//       watchOverflow: false,

//       // Отступ между слайдами ==========================
//       spaceBetween: 0,

//       // Бесконечный слайдер ==========================
//       loop: true,

//       // Автопрокрутка ==========================
//       // autoplay: {
//       //    // Пауза между прокруткой
//       //    delay: 2000,
//       //    // На коньчить на последнем слайде
//       //    stopOnLastSlide: true,
//       //    // Отключить после ручного переключения(default = false)
//       //    disableOnInteraction: false,
//       // },
//       // Скорость ==========================
//       speed: 1000,

//       // Вертикальный слайдер (vertical) ==========================
//       direction: 'horizontal',

//       // Breakpoint (адаптив) ==========================
//       //  ширина экрана
//       breakpoints: {
//          320: {
//             slidesPerView: 1,
//          },
//          480: {
//             slidesPerView: 2,
//          },
//       },

//       // ==============================================================================
//       // Эффекты переключения слайдов
//       //  смена прозрачность
//       // effect: 'fade',

//       // // Дополнение к fade
//       // fadeEffect: {
//       //    // Параллельная
//       //    //  смена прозрачность
//       //    crossFade: true
//       // },
//       // ----------------------
//       // Эффекты переключения слайдов_2
//       //  Переворот
//       // effect: 'flip',

//       // // Дополнение к flip
//       // flipEffect: {
//       //    // Тень
//       //    slideShadows: true,
//       //    // Показать только активного слайда
//       //    limitRotation: true,
//       // },
//       // ----------------------
//       // Эффекты переключения слайдов_3
//       //  C U B E
//       // effect: 'cube',

//       // // // Дополнение к cube
//       // cubeEffect: {
//       //    // Настройки меню
//       //    slideShadows: true,
//       //    shadow: true,
//       //    shadowOffset: 20,
//       //    shadowScale: 0.94
//       // },
//       // ----------------------
//       // Эффекты переключения слайдов_4
//       //  coverflow
//       // effect: 'coverflow',

//       // // Дополнение к coverflow
//       // coverflowEffect: {
//       //    // Угл
//       //    rotate: 20,
//       //    // Наложение
//       //    stretch: 50,
//       //    // Тень
//       //    slideShadows: true
//       // },


//       // Tegmagan maqul :) uglda keyingisiga o'tish ?... 
//       // touchAngle: 20,

//       // Курсор перетаскивания ( o'tish payti qo'l rasmni qisib olishi)==========================
//       // grabCursor: true,
//    });
// }












// <Swiper Заготовка>
let sliders = document.querySelectorAll('._swiper');
for (let i = 0; i < sliders.length; i++) {
   const slider = sliders[i];

   if (!slider.classList.contains('swiper-bild')) {
      let slider_items = slider.children;
      if (slider_items) {
         for (let j = 0; j < slider_items.length; j++) {
            const el = slider_items[j];
            el.classList.add('swiper-slide')
         }
      }
      let slider_content = slider.innerHTML;
      let slider_wrapper = document.createElement('div');
      slider_wrapper.classList.add('swiper-wrapper');
      slider_wrapper.innerHTML = slider_content;
      slider.innerHTML = '';
      slider.appendChild(slider_wrapper);
      slider.classList.add('swiper-bild');
   }

}
// </Swiper Заготовка>

if (document.querySelector('.slider-main__body')) {
   new Swiper('.slider-main__body', {
      observer: true,
      observeParents: true,
      slidesPerView: 1,
      watchOverflow: true,
      speed: 800,
      loop: true,
      loopAdditionalSlides: 5,
      preloadImages: false,
      parallax: true,
      // Пагинация
      pagination: {
         el: '.controls-main-slider__dotts',
         clickable: true,
      },
      // Автопрокрутка
      autoplay: {
         delay: 2000,
         stopOnLastSlide: false,
         disableOnInteraction: false,
      },
   })
}

if (document.querySelector('.advantages__body')) {
   new Swiper('.advantages__body', {
      observer: true,
      observeParents: true,
      slidesPerView: 1,
      watchOverflow: true,
      speed: 800,
      loop: true,
      loopAdditionalSlides: 5,
      preloadImages: false,
      parallax: true,
      spaceBetween: 15,
      breakpoints: {
         768: {
            slidesPerView: 2,
         },
      },
      // Автопрокрутка
      autoplay: {
         delay: 5000,
         stopOnLastSlide: false,
         disableOnInteraction: false,
      },
   })
}