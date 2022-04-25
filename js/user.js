document.addEventListener('click', clickHandler)

function clickHandler(e) {
   const target = e.target
   if (window.innerWidth > 768 && isMobile.any()) {
      if (target.closest('.item-lang__title')) {
         target.closest('.menu__item').classList.toggle('_hover')
      }
      if (!target.closest('.menu__item') && document.querySelectorAll('.menu__item._hover').length > 0) {
         document.querySelectorAll('.menu__item._hover').forEach(el => el.classList.remove('_hover'))
      }
   }
   if (window.innerWidth <= 768) {
      if (target.closest('.icon-menu')) {
         document.querySelector('.icon-menu').classList.toggle('_active')
         document.querySelector('.sidebar-menu__body').classList.toggle('_active')
         document.body.classList.toggle('_lock')
      }
   }
}

// Set min functions
_setBasicTemplate()

// Tabs
function tab({ cnt, controls, contents }) {
   let $cnt = document.querySelector(cnt);
   let $controls = $cnt.querySelectorAll(controls);
   let $contents = $cnt.querySelectorAll(contents);

   if ($controls.length == $contents.length) {
      for (let i = 0; i < $controls.length; i++) {
         const control = $controls[i];

         control.addEventListener('click', e => {
            if (!control.classList.contains('_active')) {
               for (let j = 0; j < $controls.length; j++) {
                  $controls[j].classList.remove('_active')
                  $contents[j].classList.remove('_active')
               }

               control.classList.add('_active')
               $contents[i].classList.add('_active')
            }
            e.preventDefault()

            // Mobile click
            if (isMobile.any() && window.innerWidth <= 768) {
               document.querySelector('.sidebar-menu__body').classList.toggle('_active')
               document.body.classList.toggle('_lock')
               document.querySelector('.icon-menu').classList.toggle('_active')
            }
         })
      }
   } else console.log('length !=');
}

tab({
   cnt: '.user',
   controls: '.sidebar-menu__list > li',
   contents: '.page-content',
})

// ****************************************************************
const formPreview = document.getElementById('avatar');
uploadFile('#avatarInput', {
   once: true,
   acceptArr: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
   errorText: 'Разрешены только изображение',
   then(file) {
      let reader = new FileReader();
      reader.onload = e => {
         formPreview.innerHTML = `<img src="${e.target.result}">`
         formPreview.classList.add('_image')
      };
      reader.onerror = () => {
         alert(`Faylni ochishda xatolik ro'y berdi!`)
      };
      reader.readAsDataURL(file);
   },
   catch: err => console.log(err)
})