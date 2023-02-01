let dropdownActions = document.querySelectorAll('.actions-gmode');

if (dropdownActions.length > 0) {
   dropdownActions.forEach(item => {
      const trigger = item.querySelector('.actions-gmode__trigger')
      trigger.addEventListener('click', (e) => {
         const findingparent = document.querySelector('.actions-gmode._active')
         if (findingparent && item !== findingparent) {
            findingparent.classList.remove('_active')
         }
         item.classList.toggle('_active')
      })
   })
}

// filter by courses
const select = new Select('#select', {
   placeholder: 'Курс не выбран',
   data: ['All', 'programming', 'design', 'math', 'physics'],
   // myClass: '',
   openClass: '_open',
   selectedClass: '_selected',
   iconDown: '<i class="fas fa-angle-down"></i>',
   onchange(text) {
      console.log(text);
   }
})

// dropdown actions
let dropdownItems = document.querySelectorAll('[data-dropdown]');
dropdownItems.forEach(item => {
   item.addEventListener('click', function (e) {
      const { dropdown: type } = item.dataset
      if (type === 'edit') {
         let student = item.closest('tr')
         const fname = student.querySelector('[data-fname]').textContent
         const lname = student.querySelector('[data-lname]').textContent
         const phone = student.querySelector('[data-phone]').textContent

         const content = generateEditContent(fname, lname, phone)

         showDefaultModal('Edit user', content, [{ text: 'Save', type: 'success' }])
      } else if (type === '') {

      }
   })
})

function showDefaultModal(title = '', content = '', footerButtons) {
   footerButtons = footerButtons || [{
      text: 'Close',
      type: 'primary',
      handler: function () {
         modal.close()
      }
   }]
   const modal = $.modal({
      // static
      closable: true,
      width: '60%',
      addClass: 'myModal',
      onClose() {
         setTimeout(() => {
            modal.destroy()
         }, 600);
      },
      // changeable
      title,
      content,
      footerButtons,
   })
   setTimeout(modal.open, 0)
}

function generateEditContent(fname, lname, phone) {
   return `
      <div class="item-inputs">
         <label class="gmode-edit__label" for="fname">Firstname</label>
         <input id="name" placeholder="" class="input" type="text" value="${fname}">
         <span class="item-inputs__span"></span>
      </div>
      <div class="item-inputs">
         <label class="gmode-edit__label" for="lname">Lastname</label>
         <input id="lname" placeholder="" class="input" type="text" value="${lname}">
         <span class="item-inputs__span"></span>
      </div>
   `
}