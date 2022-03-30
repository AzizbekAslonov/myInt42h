if (document.querySelector('.sidebar__arrow')) {
    const sidebar = document.querySelector('.sidebar-lesson')
    const sidebarArrow = document.querySelectorAll('.sidebar__arrow')
    const sidebarArrowAnim = document.querySelector('.sidebar__arrow_animate')

    sidebarArrow.forEach(arrow => {
        arrow.addEventListener('click', () => {
            sidebar.classList.toggle('_open')
            sidebarArrowAnim.classList.toggle('_open')
        })
    })
}