// TAB SWITCHING
const createTab = document.getElementById('createTab');
const manageTab = document.getElementById('manageTab');
const createContact = document.getElementById('createContact');
const manageContacts = document.getElementById('manageContacts');

createTab.addEventListener('click', () => {
  createTab.classList.add('active');
  manageTab.classList.remove('active');
  createContact.style.display = 'block';
  manageContacts.style.display = 'none';
});

manageTab.addEventListener('click', () => {
  manageTab.classList.add('active');
  createTab.classList.remove('active');
  manageContacts.style.display = 'block';
  createContact.style.display = 'none';
});

// DARK MODE
const darkModeToggle = document.getElementById('darkModeToggle');
darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

// AUTO CAPITALIZATION
const capitalizeInputs = ['firstName', 'lastName', 'company', 'address'];
capitalizeInputs.forEach(id => {
  const input = document.getElementById(id);
  input.addEventListener('input', () => {
    input.value = input.value.replace(/\b\w/g, char => char.toUpperCase());
  });
});

// BIRTHDAY FORMAT (DD/MM/YYYY)
const birthdayInput = document.getElementById('birthday');
birthdayInput.addEventListener('input', (e) => {
  let value = e.target.value.replace(/\D/g, '');
  if (value.length >= 2) value = value.slice(0,2) + '/' + value.slice(2);
  if (value.length >= 5) value = value.slice(0,5) + '/' + value.slice(5,9);
  e.target.value = value.slice(0, 10);
});

// MALAYSIA PHONE VALIDATION
function isValidMalaysianPhone(phone) {
  const regex = /^(01[0-46-9]{1}\d{7}|011\d{8})$/;
  return regex.test(phone);
}

// SAVE CONTACT (CREATE CONTACT SECTION)
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const firstName = document.getElementById('firstName').value.trim();
  const lastName = document.getElementById('lastName').value.trim();
  const company = document.getElementById('company').value.trim();
  const phone1 = document.getElementById('phone1').value.trim().replace(/\D/g, '');
  const phone2 = document.getElementById('phone2').value.trim().replace(/\D/g, '');
  const email = document.getElementById('email').value.trim();
  const address = document.getElementById('address').value.trim();
  const birthday = document.getElementById('birthday').value.trim();
  const category = document.getElementById('category').value;
  const photo = document.getElementById('photo').files[0];

  // Phone validation
  if (phone1 && !isValidMalaysianPhone(phone1)) {
    alert('Phone 1 is invalid. It must start with 01 and be 10 or 11 digits.');
    return;
  }
  if (phone2 && !isValidMalaysianPhone(phone2)) {
    alert('Phone 2 is invalid. It must start with 01 and be 10 or 11 digits.');
    return;
  }

  // Email validation (optional)
  if (email && !/^\S+@\S+\.\S+$/.test(email)) {
    alert('Invalid email format.');
    return;
  }

  alert('✅ Contact saved successfully! (In real app it will save to storage or export)');
  contactForm.reset();
});

// =====================
// MANAGE CONTACTS SECTION
// =====================

// Dummy placeholder — You can enhance later for VCF parsing/export
document.getElementById('vcfInput').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    alert('VCF File uploaded: ' + file.name);
  }
});

// Dummy actions
document.getElementById('deleteSelected').addEventListener('click', () => {
  alert('Selected contacts deleted! 🚀 (Placeholder action)');
});

document.getElementById('exportCsv').addEventListener('click', () => {
  alert('Exported as CSV! 🚀 (Placeholder action)');
});

document.getElementById('exportVcf').addEventListener('click', () => {
  alert('Exported as VCF! 🚀 (Placeholder action)');
});

// SELECT ALL checkbox
const selectAll = document.getElementById('selectAll');
selectAll.addEventListener('change', (e) => {
  document.querySelectorAll('#contactsTable tbody input[type="checkbox"]').forEach(cb => {
    cb.checked = e.target.checked;
  });
});
