window.onload = function () {
   document.addEventListener('click', documentActions)
   // Actions
   function documentActions(e) {
      const targetElement = e.target;

      if (window.innerWidth > 768 && isMobile.any()) {
         if (targetElement.closest('.item-lang__title')) {
            targetElement.closest('.menu__item').classList.toggle('_hover')
         }
         if (!targetElement.closest('.menu__item') && document.querySelectorAll('.menu__item._hover').length > 0) {
            document.querySelectorAll('.menu__item._hover').forEach(el => el.classList.remove('_hover'))
         }
      }
      if (targetElement.closest('.ui-lesson__checkbox')) {
         targetElement.closest('.ui-lesson__checkbox').classList.toggle('_checked')
      }

      if (targetElement.closest('.icon-menu')) {
         document.querySelector('.menu__body')?.classList.toggle('_active')
         document.body.classList.toggle('_lock')
         targetElement.closest('.icon-menu').classList.toggle('_active')
      }

      if (!targetElement.closest('.actions-gmode')) {
         console.log('w');
         document.querySelector('.actions-gmode._active')?.classList.remove('_active')
      }
      // !!!!!!! <Mobile search responsive> !!!!!!
      // if (targetElement.classList.contains('search-form__icon')) {
      //    document.querySelector('.search-form').classList.toggle('_active')
      // } else if (!targetElement.closest('.search-form') && document.querySelectorAll('.search-form._active').length > 0) {
      //    document.querySelector('.search-form').classList.remove('_active')
      // }
   }

   // Set ibg, header scroll anim
   _setBasicTemplate()

   // Main title animation
   // let mainTitle = document.querySelector('.intro-main__title span')
   // if (mainTitle) {
   //    new TypeWriter(mainTitle, ['Прервись! Образовывайся по-умному'])
   // }
}