// =====================
// TAB SWITCHING
// =====================
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

// =====================
// DARK MODE
// =====================
const darkModeToggle = document.getElementById('darkModeToggle');
darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

// =====================
// HELPERS
// =====================

// Capitalize helper
function capitalize(word) {
  if (!word) return '';
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

// BIRTHDAY FORMAT (DD/MM/YYYY)
const birthdayInput = document.getElementById('birthday');
birthdayInput.addEventListener('input', (e) => {
  let value = e.target.value.replace(/\D/g, '');
  if (value.length >= 2) value = value.slice(0,2) + '/' + value.slice(2);
  if (value.length >= 5) value = value.slice(0,5) + '/' + value.slice(5,9);
  e.target.value = value.slice(0, 10);
});

// Malaysian phone number format
function formatPhone(phone) {
  phone = phone.replace(/\D/g, '');
  if (phone.startsWith('601')) {
    return '+' + phone;
  } else if (phone.startsWith('1')) {
    return '+60' + phone;
  }
  return phone;
}

// =====================
// SAVE CONTACT (CREATE CONTACT SECTION)
// =====================
document.getElementById('saveButton').addEventListener('click', () => {
  const contact = {
    firstName: capitalize(document.getElementById('firstName').value.trim()),
    lastName: capitalize(document.getElementById('lastName').value.trim()),
    company: capitalize(document.getElementById('company').value.trim()),
    phone1: formatPhone(document.getElementById('phone1').value.trim()),
    phone2: formatPhone(document.getElementById('phone2').value.trim()),
    email: document.getElementById('email').value.trim(),
    address: capitalize(document.getElementById('address').value.trim()),
    birthday: document.getElementById('birthday').value.trim(),
    category: document.getElementById('category').value,
    photo: "" // Placeholder
  };

  fetch('http://localhost:3000/contacts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(contact)
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
    alert('Contact saved successfully!');
    document.getElementById('contactForm').reset();
    loadContacts();
  })
  .catch((error) => {
    console.error('Error:', error);
    alert('Failed to save contact.');
  });
});

// =====================
// MANAGE CONTACTS SECTION
// =====================

// Dummy VCF upload (placeholder)
document.getElementById('vcfInput').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(event) {
      const vcfText = event.target.result;
      alert('VCF Contacts loaded successfully! 🚀');
      
      // 👉 After loading, refresh Manage Contacts
      setTimeout(loadContacts, 500);
    };
    reader.readAsText(file);
  }
});

// Dummy Actions (delete / export buttons)
document.getElementById('deleteSelected').addEventListener('click', () => {
  alert('Selected contacts deleted! 🚀 (Placeholder)');
});

document.getElementById('exportCsv').addEventListener('click', () => {
  alert('Exported as CSV! 🚀 (Placeholder)');
});

document.getElementById('exportVcf').addEventListener('click', () => {
  alert('Exported as VCF! 🚀 (Placeholder)');
});

// =====================
// SELECT ALL CHECKBOX
// =====================
const selectAll = document.getElementById('selectAll');
selectAll.addEventListener('change', (e) => {
  document.querySelectorAll('#contactsTable tbody input[type="checkbox"]').forEach(cb => {
    cb.checked = e.target.checked;
  });
});

// =====================
// LOAD CONTACTS (Manage Contacts Table)
// =====================
function loadContacts() {
  fetch('http://localhost:3000/contacts')
    .then(response => response.json())
    .then(contacts => {
      const tbody = document.querySelector('#contactsTable tbody');
      tbody.innerHTML = '';

      contacts.forEach(contact => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td><input type="checkbox" /></td>
          <td>${contact.firstName}</td>
          <td>${contact.lastName}</td>
          <td>${contact.phone1}</td>
          <td>${contact.phone2}</td>
          <td>${contact.email}</td>
          <td>${contact.birthday}</td>
          <td>${contact.category}</td>
        `;
        tbody.appendChild(tr);
      });
    })
    .catch(error => {
      console.error('Error loading contacts:', error);
    });
}
