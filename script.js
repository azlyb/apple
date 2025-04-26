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

// Format Malaysian phone number
function formatPhone(phone) {
  phone = phone.replace(/\D/g, '');
  if (phone.startsWith('601')) {
    return '+' + phone;
  } else if (phone.startsWith('1')) {
    return '+60' + phone;
  }
  return phone;
}

// SAVE CONTACT (CREATE CONTACT SECTION)
document.getElementById('saveButton').addEventListener('click', () => {
  const contact = {
    firstName: capitalize(document.getElementById('firstName').value.trim()),
    lastName: capitalize(document.getElementById('lastName').value.trim()),
    company: document.getElementById('company').value.trim(),
    phone1: formatPhone(document.getElementById('phone1').value.trim()),
    phone2: formatPhone(document.getElementById('phone2').value.trim()),
    email: document.getElementById('email').value.trim(),
    address: document.getElementById('address').value.trim(),
    birthday: document.getElementById('birthday').value.trim(),
    category: document.getElementById('category').value,
    photo: "" // Placeholder for now
  };

  fetch('http://localhost:3000/contacts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contact)
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
    alert('Contact saved successfully!');
    document.getElementById('contactForm').reset();
    loadContacts(); // Refresh contacts table
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Failed to save contact.');
  });
});

// LOAD CONTACTS (Manage Section)
function loadContacts() {
  fetch('http://localhost:3000/contacts')
    .then(response => response.json())
    .then(contacts => {
      const tbody = document.querySelector('#contactsTable tbody');
      tbody.innerHTML = '';

      contacts.forEach((contact, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
          <td><input type="checkbox" data-index="${index}"></td>
          <td>${contact.firstName} ${contact.lastName}</td>
          <td>${contact.phone1}</td>
          <td>${contact.email}</td>
          <td>${contact.category}</td>
        `;

        tbody.appendChild(row);
      });
    })
    .catch(error => {
      console.error('Error loading contacts:', error);
    });
}

// INITIAL LOAD
loadContacts();

// HANDLE VCF FILE UPLOAD (Placeholder)
document.getElementById('vcfInput').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      console.log('VCF Content:', text);
      alert('VCF File uploaded successfully! (Import feature coming soon)');
    };
    reader.readAsText(file);
  }
});

// SELECT ALL CHECKBOX
const selectAll = document.getElementById('selectAll');
selectAll.addEventListener('change', (e) => {
  document.querySelectorAll('#contactsTable tbody input[type="checkbox"]').forEach(cb => {
    cb.checked = e.target.checked;
  });
});

// Dummy delete
document.getElementById('deleteSelected').addEventListener('click', () => {
  alert('Delete selected contacts (Coming soon!)');
});

// Dummy export
document.getElementById('exportCsv').addEventListener('click', () => {
  alert('Export contacts to CSV (Coming soon!)');
});
document.getElementById('exportVcf').addEventListener('click', () => {
  alert('Export contacts to VCF (Coming soon!)');
});
