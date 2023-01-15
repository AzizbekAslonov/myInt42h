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