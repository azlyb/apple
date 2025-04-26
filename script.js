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
function capitalize(word) {
  if (!word) return '';
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

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
    company: document.getElementById('company').value.trim(),
    phone1: formatPhone(document.getElementById('phone1').value.trim()),
    phone2: formatPhone(document.getElementById('phone2').value.trim()),
    email: document.getElementById('email').value.trim(),
    address: document.getElementById('address').value.trim(),
    birthday: document.getElementById('birthday').value.trim(), // DD/MM/YYYY
    category: document.getElementById('category').value,
    photo: "" // Placeholder for photo
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
// LOAD CONTACTS FUNCTION
// =====================
function loadContacts() {
  fetch('http://localhost:3000/contacts')
    .then(response => response.json())
    .then(data => {
      const tbody = document.querySelector('#contactsTable tbody');
      tbody.innerHTML = '';

      data.forEach((contact, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td><input type="checkbox" data-id="${index}"></td>
          <td>${capitalize(contact.firstName)} ${capitalize(contact.lastName)}</td>
          <td>${contact.email}</td>
          <td>${contact.phone1}</td>
          <td>${contact.phone2}</td>
          <td>${contact.address}</td>
          <td>${contact.birthday}</td>
          <td>${contact.category}</td>
          <td>
            <button onclick="deleteContact(${index})">Delete</button>
          </td>
        `;
        tbody.appendChild(row);
      });
    })
    .catch((error) => {
      console.error('Error loading contacts:', error);
    });
}

// =====================
// DELETE CONTACT FUNCTION
// =====================
function deleteContact(id) {
  fetch(`http://localhost:3000/contacts/${id}`, {
    method: 'DELETE'
  })
  .then(response => response.json())
  .then(data => {
    console.log('Deleted:', data);
    alert('Contact deleted!');
    loadContacts();
  })
  .catch((error) => {
    console.error('Error deleting contact:', error);
  });
}

// =====================
// BIRTHDAY FORMAT (AFTER PAGE LOAD)
// =====================
document.addEventListener('DOMContentLoaded', () => {
  loadContacts();

  const birthdayInput = document.getElementById('birthday');
  if (birthdayInput) {
    birthdayInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length >= 2) value = value.slice(0,2) + '/' + value.slice(2);
      if (value.length >= 5) value = value.slice(0,5) + '/' + value.slice(5,9);
      e.target.value = value.slice(0, 10);
    });
  }
});

// =====================
// MANAGE CONTACTS SECTION EXTRAS (PLACEHOLDER ACTIONS)
// =====================
import VCF from 'vcf'; // 👈 Top of your script.js if using modules

document.getElementById('vcfInput').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(event) {
    const vcardText = event.target.result;

    // Parse manually without library
    const vcardEntries = vcardText.split('END:VCARD');
    const tbody = document.querySelector('#contactsTable tbody');
    tbody.innerHTML = '';

    vcardEntries.forEach(entry => {
      if (entry.trim() === '') return;

      const fullNameMatch = entry.match(/FN:(.+)/);
      const nameMatch = entry.match(/N:(.+)/);
      const phoneMatch = entry.match(/TEL(?:;[^:]+)?:([^\\n]+)/);
      const emailMatch = entry.match(/EMAIL(?:;[^:]+)?:([^\\n]+)/);
      const bdayMatch = entry.match(/BDAY:(.+)/);

      const firstName = nameMatch ? nameMatch[1].split(';')[1] || '' : '';
      const lastName = nameMatch ? nameMatch[1].split(';')[0] || '' : '';

      const row = document.createElement('tr');
      row.innerHTML = `
        <td><input type="checkbox" /></td>
        <td>${firstName}</td>
        <td>${lastName}</td>
        <td>${phoneMatch ? phoneMatch[1].replace(/\s/g, '') : ''}</td>
        <td></td>
        <td>${emailMatch ? emailMatch[1] : ''}</td>
        <td>${bdayMatch ? formatBirthday(bdayMatch[1]) : ''}</td>
        <td>Others</td>
      `;
      tbody.appendChild(row);
    });

    alert('Contacts loaded successfully! 🚀');
  };
  reader.readAsText(file);
});

// Helper to format Birthday YYYY-MM-DD ➔ DD/MM/YYYY
function formatBirthday(birthday) {
  if (birthday.length !== 10) return birthday;
  const [year, month, day] = birthday.split('-');
  return `${day}/${month}/${year}`;
}

document.getElementById('deleteSelected').addEventListener('click', () => {
  alert('Selected contacts deleted! 🚀 (Placeholder action)');
});

document.getElementById('exportCsv').addEventListener('click', () => {
  alert('Exported as CSV! 🚀 (Placeholder action)');
});

document.getElementById('exportVcf').addEventListener('click', () => {
  alert('Exported as VCF! 🚀 (Placeholder action)');
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
