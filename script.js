// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

// Tabs
const tabs = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));

    tab.classList.add('active');
    document.getElementById(tab.dataset.tab).classList.add('active');
  });
});

// Auto-capitalize input fields
function capitalizeWords(str) {
  return str.replace(/\b\w/g, char => char.toUpperCase());
}

['firstName', 'lastName', 'company', 'address'].forEach(id => {
  document.getElementById(id).addEventListener('input', (e) => {
    e.target.value = capitalizeWords(e.target.value);
  });
});

// Malaysian Phone Number Validation
function isValidMalaysianPhone(phone) {
  phone = phone.replace(/\D/g, '');
  if (phone.startsWith('01')) {
    if (phone.startsWith('011')) {
      return phone.length === 11; // 011-XXXX XXXX (11 digits)
    } else {
      return phone.length === 10; // 010,012,013, etc. (10 digits)
    }
  }
  return false;
}

// Email Validation
function isValidEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

// Birthday Validation
function isValidBirthday(birthday) {
  const regex = /^([0-2]\d|3[01])\/(0\d|1[0-2])\/\d{4}$/;
  return regex.test(birthday);
}

// Handle Form Submit
const contactForm = document.getElementById('contact-form');
const contactsTableBody = document.querySelector('#contactsTable tbody');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const firstName = document.getElementById('firstName').value.trim();
  const lastName = document.getElementById('lastName').value.trim();
  const company = document.getElementById('company').value.trim();
  const phone1 = document.getElementById('phone1').value.trim();
  const phone2 = document.getElementById('phone2').value.trim();
  const email = document.getElementById('email').value.trim();
  const address = document.getElementById('address').value.trim();
  const birthday = document.getElementById('birthday').value.trim();
  const category = document.getElementById('category').value;
  const photoFile = document.getElementById('photo').files[0];

  if (phone1 && !isValidMalaysianPhone(phone1)) {
    alert('Phone 1: Please enter a valid Malaysian number starting with 01.');
    return;
  }
  if (phone2 && !isValidMalaysianPhone(phone2)) {
    alert('Phone 2: Please enter a valid Malaysian number starting with 01.');
    return;
  }
  if (email && !isValidEmail(email)) {
    alert('Please enter a valid email address.');
    return;
  }
  if (birthday && !isValidBirthday(birthday)) {
    alert('Birthday must be in DD/MM/YYYY format.');
    return;
  }

  let photoURL = '';
  if (photoFile) {
    photoURL = URL.createObjectURL(photoFile);
  }

  const row = document.createElement('tr');
  row.innerHTML = `
    <td><input type="checkbox" /></td>
    <td>${photoURL ? `<img src="${photoURL}" alt="Photo" />` : ''}</td>
    <td>${firstName}</td>
    <td>${lastName}</td>
    <td>${company}</td>
    <td>${phone1}</td>
    <td>${phone2}</td>
    <td>${email}</td>
    <td>${birthday}</td>
    <td>${category}</td>
    <td><button class="edit-btn">Edit</button></td>
  `;
  contactsTableBody.appendChild(row);

  contactForm.reset();
});

// Delete Selected
document.getElementById('deleteSelected').addEventListener('click', () => {
  const checkboxes = contactsTableBody.querySelectorAll('input[type="checkbox"]:checked');
  checkboxes.forEach(checkbox => {
    checkbox.closest('tr').remove();
  });
});

// Select All
document.getElementById('selectAll').addEventListener('change', function() {
  const checkboxes = contactsTableBody.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(cb => cb.checked = this.checked);
});

// Export to CSV
document.getElementById('exportCsv').addEventListener('click', () => {
  let csv = 'First Name,Last Name,Company,Phone 1,Phone 2,Email,Birthday,Tags\n';
  contactsTableBody.querySelectorAll('tr').forEach(row => {
    const cells = row.querySelectorAll('td');
    csv += `${cells[2].innerText},${cells[3].innerText},${cells[4].innerText},${cells[5].innerText},${cells[6].innerText},${cells[7].innerText},${cells[8].innerText},${cells[9].innerText}\n`;
  });
  
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'contacts.csv';
  a.click();
  URL.revokeObjectURL(url);
});

// Export to VCF (Placeholder Simple)
document.getElementById('exportVcf').addEventListener('click', () => {
  let vcf = '';
  contactsTableBody.querySelectorAll('tr').forEach(row => {
    const cells = row.querySelectorAll('td');
    vcf += `BEGIN:VCARD\nVERSION:3.0\n`;
    vcf += `N:${cells[3].innerText};${cells[2].innerText};;;\n`;
    vcf += `FN:${cells[2].innerText} ${cells[3].innerText}\n`;
    if (cells[4].innerText) vcf += `ORG:${cells[4].innerText}\n`;
    if (cells[5].innerText) vcf += `TEL;TYPE=CELL:${cells[5].innerText}\n`;
    if (cells[6].innerText) vcf += `TEL;TYPE=HOME:${cells[6].innerText}\n`;
    if (cells[7].innerText) vcf += `EMAIL:${cells[7].innerText}\n`;
    if (cells[8].innerText) vcf += `BDAY:${cells[8].innerText}\n`;
    vcf += `CATEGORIES:${cells[9].innerText}\n`;
    vcf += `END:VCARD\n`;
  });

  const blob = new Blob([vcf], { type: 'text/vcard' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'contacts.vcf';
  a.click();
  URL.revokeObjectURL(url);
});
