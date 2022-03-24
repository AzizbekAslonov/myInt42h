// HTML text template
function getTemplate(placeholder, data = [], iconDown) {
   let text = placeholder || 'Выберите элемент';

   // Setting content
   const content = data.map((item, index) => `
         <li class="select__item" data-type="item" data-value="${index}">${item}</li>
      `).join('')

   return `
      <div class="select__content">
         <div class="select__input" data-type="input">
            <span data-type="placeholder">${text}</span>
            ${iconDown}
         </div>
         <div class="select__dropdown">
            <ul class="select__list">
               ${content}
            </ul>
         </div>
      </div>`
}

// <Klass Select>
class Select {
   constructor(selector, options) {
      // Знак доллара обозначает дом элемента ($)
      this.$el = document.querySelector(selector)
      this.options = options
      this.onChange = options.onChange
      this.openClass = options.openClass || '_open'
      this.selectedClass = options.selectedClass || '_selected'
      this.selectedId = null

      this.#render()
      this.#setUp()
   }
   // Prototypes
   #render() {
      const { placeholder, data, iconDown = '' } = this.options
      this.$el.classList.add('select')
      this.$el.innerHTML = getTemplate(placeholder, data, iconDown)
   }

   #setUp() {
      this.clickHandler = this.clickHandler.bind(this)
      this.$el.addEventListener('click', this.clickHandler)
      this.$placeholder = this.$el.querySelector(`[data-type="placeholder"]`)
   }

   clickHandler(e) {
      const { type } = e.target.dataset

      if (type === 'input' || e.target.parentElement.dataset.type) {
         this.toggle()
      }
      else if (type === 'item') {
         const { value } = e.target.dataset
         this.select(value)
         if (this.onChange) this.onChange(this.current)
      }
   }

   toggle() {
      this.isOpen ? this.close() : this.open()
   }

   open() {
      this.$el.classList.add(this.openClass)
   }

   close() {
      this.$el.classList.remove(this.openClass)
   }

   get isOpen() {
      return this.$el.classList.contains(this.openClass)
   }

   select(value) {
      this.selectedId = value
      this.$placeholder.textContent = this.current
      this.close()
      this.deleteOldActives()
      this.addNewActive()
   }

   get current() {
      for (let i = 0; i < this.options.data.length; i++) {
         if (i == this.selectedId) {
            return this.options.data[i]
         }
      }
   }

   addNewActive() {
      this.$el.querySelector(`[data-value="${this.selectedId}"]`).classList.add(this.selectedClass)
   }

   deleteOldActives() {
      this.$el.querySelectorAll(`[data-type="item"]`).forEach(elem => {
         elem.classList.remove(this.selectedClass)
      })
   }

   destroy() {
      this.$el.removeEventListener('click', this.clickHandler)
      this.$el.innerHTML = ''
   }
}
// </Klass Select>