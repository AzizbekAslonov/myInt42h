// Header
function _setHeaderScroll() {
   let headerEl = document.querySelector('.header');
   if (headerEl) {
      const callback = entries => {
         if (entries[0].isIntersecting) {
            headerEl.classList.remove('_scroll');
         } else {
            headerEl.classList.add('_scroll');
         }
      };
      const headerObserver = new IntersectionObserver(callback);
      headerObserver.observe(headerEl);
   }
}

// Ibg
function _ibg() {
   let ibg = document.querySelectorAll("._ibg");
   for (let i = 0; i < ibg.length; i++) {
      if (ibg[i].querySelector("img")) {
         ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
      }
   }
}

// Set basic template
function _setBasicTemplate() {
   _setHeaderScroll()
   _ibg()
}

function uploadFile(inputSelector, options) {
   if (!options || !options.acceptArr || options.once === undefined || !options.then || !options.catch) {
      return console.log('KONFIGURATSIYA!')
   }
   if (!document.querySelector(inputSelector)) {
      return console.log('SELECTOR')
   }

   let input = document.querySelector(inputSelector)
   setInputConfig()

   input.addEventListener('change', () => {
      if (input.files.length > 0) {
         if (options.once && options.acceptArr.length > 0) {
            if (!options.acceptArr.includes(input.files[0].type)) {
               const errorText = options.errorText || 'Fayl ruxsat etilgan kengaytmada emas!'
               return alert(errorText), options.catch(errorText)
            }
            options.then(input.files[0])
         }
         else if (!options.once && options.acceptArr.length > 0) {
            let isError = false;
            for (let i = 0; i < input.files.length; i++) {
               const file = input.files.item(i);
               if (!options.acceptArr.includes(file.type)) {
                  isError = true
                  break
               }
            }
            if (isError) {
               const errorText = options.errorText || 'Fayllar ruxsat etilgan kengaytmada emas!'
               return alert(errorText), options.catch(errorText)
            }
            options.then(input.files)
         }
         else options.then(input.files)
      }
   })
   function setInputConfig() {
      if (!options.once) input.multiple = true

      let acceptStr = ''
      options.acceptArr.forEach(accept => {
         acceptStr += '.' + accept.slice(accept.indexOf('/') + 1) + ','
      });
      input.accept = acceptStr
   }
}

const isMobile = {
   Android: function () {
      return navigator.userAgent.match(/Android/i);
   },
   BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
   },
   iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
   },
   Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
   },
   Windows: function () {
      return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
   },
   any: function () {
      return (
         isMobile.Android() ||
         isMobile.BlackBerry() ||
         isMobile.iOS() ||
         isMobile.Opera() ||
         isMobile.Windows());
   }
}

// SLIDE_UP, SLIDE_DOWN, SLIDE_TOGGLE!!!===================================================================================

let _slideUp = (target, duration = 300) => {
   if (!target.classList.contains('_slide')) {
      target.classList.add('_slide'),
         target.style.transitionProperty = "height, margin, padding",
         target.style.transitionDuration = duration + "ms",
         target.style.height = target.offsetHeight + "px",
         target.offsetHeight,
         target.style.overflow = "hidden",
         target.style.height = 0,
         target.style.paddingTop = 0,
         target.style.paddingBottom = 0,
         target.style.marginTop = 0,
         target.style.marginBottom = 0,
         window.setTimeout((function () {
            target.hidden = true,
               target.style.removeProperty("height"),
               target.style.removeProperty("padding-top"),
               target.style.removeProperty("padding-bottom"),
               target.style.removeProperty("margin-top"),
               target.style.removeProperty("margin-bottom"),
               target.style.removeProperty("overflow"),
               target.style.removeProperty("transition-duration"),
               target.style.removeProperty("transition-property"),
               target.classList.remove("_slide")
         }), duration)
   }

};
let _slideDown = (target, duration = 300) => {
   if (!target.classList.contains('_slide')) {
      target.classList.add('_slide')
      if (target.hidden) {
         target.hidden = false
      }
      let height = target.offsetHeight;
      target.style.overflow = "hidden",
         target.style.height = 0,
         target.style.paddingTop = 0,
         target.style.paddingBottom = 0,
         target.style.marginTop = 0,
         target.style.marginBottom = 0,
         target.offsetHeight,
         target.style.transitionProperty = "height, margin, padding",
         target.style.transitionDuration = duration + "ms",
         target.style.height = height + "px",
         target.style.removeProperty("padding-top"),
         target.style.removeProperty("padding-bottom"),
         target.style.removeProperty("margin-top"),
         target.style.removeProperty("margin-bottom"),
         window.setTimeout((() => {
            target.style.removeProperty("height"),
               target.style.removeProperty("overflow"),
               target.style.removeProperty("transition-duration"),
               target.style.removeProperty("transition-property"),
               target.classList.remove("_slide");
         }), duration);
   }
};
let _slideToggle = (target, duration = 300) => {
   target.hidden ? _slideDown(target, duration) : _slideUp(target, duration)
}

// SLIDE_UP, SLIDE_DOWN, SLIDE_TOGGLE!!!=====================================================================================