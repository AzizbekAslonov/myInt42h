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

      // !!!!!!! <Mobile search responsive> !!!!!!
      // if (targetElement.classList.contains('search-form__icon')) {
      //    document.querySelector('.search-form').classList.toggle('_active')
      // } else if (!targetElement.closest('.search-form') && document.querySelectorAll('.search-form._active').length > 0) {
      //    document.querySelector('.search-form').classList.remove('_active')
      // }
   }
   // Set ibg, header scroll anim
   _setBasicTemplate()

   let iconMenu = document.querySelector('.icon-menu')
   if (iconMenu) {
      iconMenu.addEventListener('click', () => {
         document.querySelector('.menu__body')?.classList.toggle('_active')
         document.body.classList.toggle('_lock')
         iconMenu.classList.toggle('_active')
      })
   }
   // Main title animation
   // let mainTitle = document.querySelector('.intro-main__title span')
   // if (mainTitle) {
   //    new TypeWriter(mainTitle, ['Прервись! Образовывайся по-умному'])
   // }
}