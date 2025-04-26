iCloud Contact Manager

Welcome to your simple and clean iCloud Contact Manager app! 🚀

This app lets you:
	•	Create new contacts manually
	•	View and manage your contacts easily
	•	Upload VCF files (basic reading)
	•	Switch between Dark and Light Mode

⸻

Installation & Setup

1. Clone the Project

Or download the ZIP.

https://github.com/yourusername/icloud-contact-manager.git

2. Install JSON Server (for local backend)

Make sure you have Node.js installed.

npm install -g json-server

3. Create a db.json

Inside your project folder:

{
  "contacts": []
}

4. Run JSON Server

json-server --watch db.json --port 3000

5. Open your index.html

Just open it directly in the browser (no need for localhost server).

⸻

Project Structure

<p>/ (root folder)</p>
<p>|-- index.html</p>
<p>|-- styles.css</p>
<p>|-- script.js</p>
<p>|-- db.json</p>
<p>|-- README.md/p>



⸻

Features
	•	Create Contact
	•	Fill in First Name, Last Name, Company, Phones, Email, Address, Birthday, Category
	•	Click Save → Stored in db.json
	•	Manage Contacts
	•	View all saved contacts
	•	Select All / Select individual
	•	Future export/delete features
	•	VCF Upload
	•	Upload your VCF file (currently just reads the file, full import coming soon!)
	•	Dark Mode
	•	Toggle Light and Dark theme instantly
	•	Auto Formatting
	•	Birthday input automatically formats as DD/MM/YYYY
	•	Malaysian phone numbers auto-formatted

⸻

Coming Soon (BONUS!)
	•	Bulk Delete selected contacts
	•	Export contacts as CSV or VCF
	•	Full VCF file parsing and importing
	•	Upload Photo with contact
	•	Loading spinners and better UI effects

⸻

Developer Info
	•	Built lovingly with ❤️ using plain HTML, CSS, JS.
	•	Backend: JSON Server (local fake REST API)
	•	Inspired by iCloud style aesthetics ✨

⸻

License

This project is free to use, improve, remix, or go crazy with it! 😎
