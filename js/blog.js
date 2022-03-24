document.addEventListener('click', e => {
   e.preventDefault()

   if (e.target.classList.contains('item-blog__btn')) {
      const $parent = e.target.closest('.item-blog')
      const data = {
         content: $parent.querySelector('.item-blog__content').innerHTML,
         title: $parent.querySelector('.item-blog__title').textContent,
      }

      const modal = $.modal({
         title: data.title,
         content: data.content,
         closable: true,
         width: '60%',
         addClass: 'myModal',
         footerButtons: [{
            text: 'Close',
            type: 'primary',
            handler: function () {
               modal.close()
            }
         }],
         onClose() {
            setTimeout(() => {
               modal.destroy()
            }, 600);
         }
      })
      setTimeout(modal.open, 0)
   }
})