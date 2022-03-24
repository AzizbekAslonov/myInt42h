(function () {
   // Filtratsiya kursov
   const ANIM_TIME = 50
   let animFlag = true

   function addActiveFilter(filterItem) {
      filterItem.style.display = 'flex'
      filterItem.classList.remove('_hide')
      filterItem.classList.add('_active')
   }
   function removeActiveFilter(filterItem) {
      filterItem.classList.add('_hide')
      filterItem.classList.remove('_active')
      setTimeout(() => {
         filterItem.style.display = 'none'
      }, ANIM_TIME);
   }

   function onChangeSelect(value) {
      if (animFlag) {
         animFlag = false
         let filterItems = document.querySelectorAll('[data-filter-item]')
         filterItems.forEach(filterItem => {
            if (value == 'all' || filterItem.dataset.filterGroup == value) {
               addActiveFilter(filterItem)
            }
            else removeActiveFilter(filterItem)
         })
         setTimeout(() => animFlag = true, ANIM_TIME)
      }
   }
   function onChangeInput(value, currentGroup) {
      if (animFlag) {
         // variables
         animFlag = false
         let isFound = 0
         const filterItems = currentGroup == 'all'
            ? document.querySelectorAll(`[data-filter-item]`)
            : document.querySelectorAll(`[data-filter-group='${currentGroup}']`)

         filterItems.forEach(filterItem => {
            if (filterItem.dataset.filterName.includes(value)) {
               isFound++
               return addActiveFilter(filterItem)
            }
            removeActiveFilter(filterItem)
         })
         isFound == 0 ? notFound.hidden = false : notFound.hidden = true
         setTimeout(() => animFlag = true, ANIM_TIME)
      }
   }

   // # instance Select
   const select = new Select('#select', {
      placeholder: 'Choose courses',
      data: ['all', 'programming', 'design', 'math', 'physics'],
      // myClass: '',
      openClass: '_open',
      selectedClass: '_selected',
      iconDown: '<i class="fas fa-angle-down"></i>',
      onChange: onChangeSelect
   })
   select.select(0)

   let searchInput = document.querySelector('.all-courses__search')
   if (searchInput) {
      searchInput.addEventListener('input', event => {
         onChangeInput(event.target.value.toLowerCase(), select.current)
      })
   }
}())