var toggleBtn = document.getElementById('toggleBtn');
var sidebar = document.getElementById('sidebar');
var toggleIcon = document.getElementById('toggleIcon');

function toggleSidebar() {
    sidebar.classList.toggle('collapsed');
    updateToggleIcon();
}

function updateToggleIcon() {
    var isCollapsed = sidebar.classList.contains('collapsed');
    if (isCollapsed) {
        toggleIcon.className = "fa-solid fa-angles-right";
        toggleBtn.style.left = "-15px";
    } 
    else {
        toggleIcon.className = "fa-solid fa-angles-left";
        toggleBtn.style.left = "220px";
    }
}

toggleBtn.addEventListener('click', toggleSidebar);