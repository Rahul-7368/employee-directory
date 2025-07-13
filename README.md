# Employee Directory 

This is a front-end-only Employee Directory application built with HTML, CSS, JavaScript, and Handlebars.js. It allows users to view, add, edit, delete, search, filter, and sort employees in an interactive UI, using localStorage for persistence.

---

##  Run Instructions

*Run with Live Server:*
- Open index.html inside the public/ folder (index.html) with any Live Server extension (e.g., in VS Code).
- Do not open using file:// path; use http://localhost:5500 or similar.

---

## Features

- View employee cards with name, email, department, role.
- Add new employees (with form validation).
- Edit or delete employees directly from their card.
- Persistent data using localStorage.
- Search (live), Filter (popup), Sort, and Pagination.
- Responsive design for mobile/tablet/desktop.
- Modular UI components (header, controls, filter, cards).

---

## Project Structure Overview

 Folder/File          Purpose                                  

 index.html             Main dashboard page                       
 main.js                Handles rendering, search/filter/sort     
 add-employee           Add employee form and logic               
 templates              Handlebars template for employee cards    
 partials               HTML snippets (header, controls, filter)  
 data/employees.json    Default initial employee list          
 styles/main.css        Global styling for all pages              

---




Challenges Faced:
- First time application created using handlebars
- Managing data persistence across multiple pages without a backend.
- Ensuring localStorage updates don’t overwrite original JSON data.
- Dynamically binding event listeners to elements loaded via partials.

## Improvements for future
- Add confirmation modals for delete operations.
- Add image/profile support for employees.
- Implement sorting by more fields (e.g., last name).
- Add backend API integration using Node.js or Firebase.
- Form-level accessibility and keyboard navigation enhancements.



