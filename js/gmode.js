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
if (document.querySelector('#select')) {
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
}

// dropdown actions
let dropdownItems = document.querySelectorAll('[data-dropdown]');
const thData = [
   document.querySelector('[data-label-name]').textContent,
   document.querySelector('[data-label-description]').textContent,
   document.querySelector('[data-label-duration]').textContent,
   document.querySelector('[data-label-quantity]').textContent,
   document.querySelector('[data-label-price]').textContent,
]
dropdownItems.forEach(item => {
   item.addEventListener('click', function (e) {
      const { dropdown: type } = item.dataset
      if (type === 'edit') {
         let student = item.closest('tr')
         const name = student.querySelector('[data-name]').textContent
         const description = student.querySelector('[data-description]').textContent
         const duration = student.querySelector('[data-duration]').textContent
         const quantity = student.querySelector('[data-quantity]').textContent
         const price = student.querySelector('[data-price]').textContent

         const content = generateEditContent({
            name,
            description,
            duration,
            quantity,
            price,
         })

         showDefaultModal('Edit user', content, [
            {
               text: 'Save',
               type: 'primary',
               handler: () => {
                  console.log({
                     name: document.querySelector('#name').value,
                     description: document.querySelector('#description').value,
                     duration: document.querySelector('#duration').value,
                     quantity: document.querySelector('#quantity').value,
                     price: document.querySelector('#price').value,
                  })
               }
            }
         ])
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

function generateEditContent(data) {
   console.log(data);
   let result = ``
   let count = 0
   for (const label in data) {
      const value = data[label]

      if (label === 'description') {
         result += `
         <div class="item-block__inputs">
         <label class="gmode-edit__label" for="description">${thData[count]}</label>
         <textarea class="input" id="description"
            class="item-block__textarea">${value}</textarea>
      </div>
      `
      }
      else if (label === 'name') {
         result += `
         <div class="item-inputs">
            <label class="gmode-edit__label" for="${label}">${thData[count]}</label>
            <input id="${label}" placeholder="" class="input" type="text" value="${value}">
            <span class="item-inputs__span"></span>
         </div>
      `
      }
      else {
         result += `
         <div class="item-inputs">
            <label class="gmode-edit__label" for="${label}">${thData[count]}</label>
            <input id="${label}" placeholder="" class="input" type="number" value="${value}">
            <span class="item-inputs__span"></span>
         </div>
      `
      }

      count++
   }

   return result
}