// const phoneInp = document.querySelector('#phone');

// const temp = 'xxx xx xxx xx xx'
// phoneInp.addEventListener('input', function (e) {
//     const { value } = e.target;
//     const charCode = e.data.charCodeAt() || 100
//     if (charCode >= 48 && charCode <= 57) {
//         if (value.length === 3) {
//             e.target.value = `(+${value.slice(0, 3)}) `
//         }
//         else if (value.length === 9) {
//             e.target.value = value + ' '
//         }
//         else if (value.length === 13 || value.length === 16) {
//             e.target.value = value + '-'
//         }
//     } else {
//         console.log(charCode, value);
//         e.target.value = value.slice(0, -1)
//     }
// })