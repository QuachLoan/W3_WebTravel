var toggleBtn = document.getElementById('toggleBtn');
var sidebar = document.getElementById('sidebar');
var toggleIcon = document.getElementById('toggleIcon');
var bookingTable = document.querySelector('.booking-table');
var confirmPopup = document.getElementById('confirmPopup');
var cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
var confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
var editPopup = document.getElementById('editPopup');
var cancelEditBtn = document.getElementById('cancelEditBtn');
var editForm = document.getElementById('editForm');
var closeViewBtn = document.getElementById('closeViewBtn');
var viewPopup = document.getElementById('viewPopup');

var rowToDelete = null;
var rowToEdit = null;
var rowToView = null;

function toggleSidebar() {
    sidebar.classList.toggle('collapsed');
    updateToggleIcon();
}

function openPopupDelete(row) {
    rowToDelete = row; 
    confirmPopup.classList.add('active'); 
}

function closePopupDelete() {
    rowToDelete = null; 
    confirmPopup.classList.remove('active'); 
}

function executeDelete() {
    if (rowToDelete) {
        rowToDelete.classList.add('removing');
        rowToDelete.remove();
        closePopupDelete();
    }
}

function handleTableClick(event) {
    var deleteButton = event.target.closest('.btn-delete');
    var editButton = event.target.closest('.btn-edit');
    var viewButton = event.target.closest('.btn-view');
    if (deleteButton) {
        var targetRow = deleteButton.closest('tr');
        openPopupDelete(targetRow);
    }
    else if (editButton) {
        var targetRow = editButton.closest('tr');
        openPopupEdit(targetRow);
    }
    else if (viewButton) {
        var targetRow = viewButton.closest('tr');
        openPopupView(targetRow);
    }
}

function openPopupEdit(row){
    rowToEdit = row;
    editPopup.classList.add('active');
}

function closePopupEdit(){
    rowToEdit = null;
    editPopup.classList.remove('active');
}

function saveEdit(name, date, status){
    if (rowToEdit){
        rowToEdit.querySelector('.name').innerText = name;
        rowToEdit.querySelector('.date').innerText = date;
        var statusEl = rowToEdit.querySelector('.status');
        statusEl.innerText = status;
        statusEl.classList.remove("status-pending", "status-confirmed", "status-cancelled");
        statusEl.classList.add("status-" + status.toLowerCase());
    }
}

function handleFormSubmit(e) {
    e.preventDefault();
    var customerName = document.getElementById('customerName').value;
    var rawDateTime = document.getElementById('dateTime').value;
    var status = document.getElementById('status').value;
    var formattedDateTime = rawDateTime.replace('T', ' ');
    saveEdit(customerName, formattedDateTime, status);
    console.log("Form submitted:")
    closePopupEdit();
}

function handleOutsideClick(event) {
    if (event.target === confirmPopup) {
        closePopupDelete();
    }
    else if (event.target === editPopup) {
        closePopupEdit();
    }
    else if (event.target === viewPopup) {
        closePopupView();
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

function openPopupView(row) {
    rowToView = row;
    var currentName = row.querySelector('.name').innerText;
    var currentDate = row.querySelector('.date').innerText;
    var currentStatus = row.querySelector('.status').innerText;
    document.getElementById('viewCustomerName').value = currentName;
    document.getElementById('viewDateTime').value = currentDate;
    document.getElementById('viewStatus').value = currentStatus;
    viewPopup.classList.add('active');
}

function closePopupView() {
    rowToView = null;
    viewPopup.classList.remove('active');
}

toggleBtn.addEventListener('click', toggleSidebar);
bookingTable.addEventListener('click', handleTableClick);
cancelDeleteBtn.addEventListener('click', closePopupDelete);
confirmDeleteBtn.addEventListener('click', executeDelete);
confirmPopup.addEventListener('click', handleOutsideClick);
editForm.addEventListener('submit', handleFormSubmit);
cancelEditBtn.addEventListener('click', closePopupEdit);
closeViewBtn.addEventListener('click', closePopupView);
viewPopup.addEventListener('click', handleOutsideClick);
editPopup.addEventListener('click', handleOutsideClick);