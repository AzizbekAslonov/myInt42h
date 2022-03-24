Element.prototype.appendAfter = function (element) {
   element.parentNode.insertBefore(this, element.nextSibling)
}

function _createFooterButtons(buttons = []) {
   const wrap = document.createElement('div');

   if (buttons.length === 0) return wrap

   wrap.classList.add('modal-footer');
   buttons.forEach(btn => {
      let $btn = document.createElement('button')
      $btn.textContent = btn.text;
      $btn.classList.add('btn', `btn_${btn.type || primary}`)
      btn.handler ? $btn.onclick = btn.handler : null

      wrap.appendChild($btn)
   })

   return wrap
}

function _createModal(options) {
   const modal = document.createElement('div');
   modal.classList = `vmodal ${options.addClass || ''}`

   modal.insertAdjacentHTML('afterbegin', `
   <div class="modal-overlay" data-close="true">
      <div class="modal-window">
         <div class="modal-header">
            <span class="modal-title">${options.title || ''}</span>
            ${options.closable ? '<i data-close="true" class="fas fa-times modal-close"></i>' : ''}
         </div>
         <div class="modal-body" data-content>
          ${options.content || ''}
         </div>
      </div>
   </div>
`)
   const footer = _createFooterButtons(options.footerButtons);
   footer.appendAfter(modal.querySelector('[data-content]'))

   document.body.appendChild(modal);
   return modal;
}

const $ = {}
$.modal = function (options) {
   const $modal = _createModal(options)
   const SPEED = 400
   let destroyed = false
   let isClose = true

   const localModal = {
      open() {
         // If modal DESTROYED!
         if (destroyed) return console.log('Modal is destroyed!');
         if (isClose) {
            document.body.classList.add('_lock')
            options.onOpen && options.onOpen()
            $modal.classList.add('open')

            setTimeout(() => {
               isClose = false
            }, SPEED)
         }
      },

      close() {
         if (!isClose) {
            options.onClose && options.onClose()
            document.body.classList.remove('_lock')
            $modal.classList.remove('open')

            setTimeout(() => {
               isClose = true;
            }, SPEED)
         }
      },
   }

   const listener = e => {
      if (e.target.dataset.close) {
         localModal.close()
      }
   }

   $modal.addEventListener('click', listener)

   return Object.assign(localModal, {
      destroy() {
         $modal.remove();
         $modal.removeEventListener('click', listener);
         destroyed = true;
      },
      setContent(html) {
         $modal.querySelector(`.${options.addClass} [data-content]`).innerHTML = html;
      }
   })
}