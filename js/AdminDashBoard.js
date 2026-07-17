var toggleBtn = document.getElementById('toggleBtn');
var sidebar = document.getElementById('sidebar');
var toggleIcon = document.getElementById('toggleIcon');
var bookingTable = document.querySelector('.booking-table');
var confirmPopup = document.getElementById('confirmPopup');
var cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
var confirmDeleteBtn = document.getElementById('confirmDeleteBtn');

var rowToDelete = null;

function toggleSidebar() {
    sidebar.classList.toggle('collapsed');
    updateToggleIcon();
}

function openPopup(row) {
    rowToDelete = row; 
    confirmPopup.classList.add('active'); 
}

function closePopup() {
    rowToDelete = null; 
    confirmPopup.classList.remove('active'); 
}

function executeDelete() {
    if (rowToDelete) {
        rowToDelete.classList.add('removing');
        rowToDelete.remove();
        closePopup();
    }
}

function handleTableClick(event) {
    const deleteButton = event.target.closest('.btn-delete');
    if (deleteButton) {
        var targetRow = deleteButton.closest('tr');
        openPopup(targetRow);
    }
}

function handleOutsideClick(event) {
    if (event.target === confirmPopup) {
        closePopup();
    }
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
bookingTable.addEventListener('click', handleTableClick);
cancelDeleteBtn.addEventListener('click', closePopup);
confirmDeleteBtn.addEventListener('click', executeDelete);
confirmPopup.addEventListener('click', handleOutsideClick);