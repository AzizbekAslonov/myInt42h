const filesPreview = document.getElementById('fileNames');
uploadFile('#coursesFile', {
   once: false,
   acceptArr: [],
   then(files) {
      filesPreview.innerHTML = ''
      for (let i = 0; i < files.length; i++) {
         const file = files.item(i);
         // File block
         let fileBlock = document.createElement('div')
         fileBlock.classList.add('files__item')
         fileBlock.textContent = file.name

         // Icon block
         let icon = document.createElement('i')
         icon.classList.add('_icon-cog')
         fileBlock.appendChild(icon)

         filesPreview.appendChild(fileBlock)
      }
   },
   catch: err => console.log(err)
})