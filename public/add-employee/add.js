document.getElementById('employeeForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const firstName = document.getElementById('firstName').value.trim();
  const lastName = document.getElementById('lastName').value.trim();
  const email = document.getElementById('email').value.trim();
  const department = document.getElementById('department').value.trim();
  const role = document.getElementById('role').value.trim();

  if (!firstName || !lastName || !email || !department || !role) {
    showMessage('Please fill in all fields.', true);
    return;
  }

  if (!validateEmail(email)) {
    showMessage('Invalid email format.', true);
    return;
  }

  const employees = JSON.parse(localStorage.getItem('employees')) || [];
  const editId = localStorage.getItem("editEmployeeId");

  if (editId) {
    const index = employees.findIndex(emp => emp.id == editId);
    if (index !== -1) {
      employees[index] = {
        ...employees[index],
        firstName,
        lastName,
        email,
        department,
        role
      };
      showMessage("Employee updated successfully!");
    }
    localStorage.removeItem("editEmployeeId");
  } else {
    const newEmployee = {
      id: Date.now(),
      firstName,
      lastName,
      email,
      department,
      role
    };
    employees.push(newEmployee);
    showMessage("Employee added successfully!");
  }

  localStorage.setItem('employees', JSON.stringify(employees));

  this.reset();
  setTimeout(() => {
    window.location.href = "../index.html";
  }, 1000);
});

document.getElementById("cancelBtn").addEventListener("click", function () {
  window.location.href = "../index.html";
});

function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function showMessage(message, isError = false) {
  const msgEl = document.getElementById('formMessage');
  msgEl.textContent = message;
  msgEl.style.color = isError ? 'red' : 'green';
}

window.onload = function () {
  const editId = localStorage.getItem("editEmployeeId");
  if (editId) {
    const employees = JSON.parse(localStorage.getItem("employees")) || [];
    const emp = employees.find(emp => emp.id == editId);
    if (emp) {
      document.getElementById('firstName').value = emp.firstName;
      document.getElementById('lastName').value = emp.lastName;
      document.getElementById('email').value = emp.email;
      document.getElementById('department').value = emp.department;
      document.getElementById('role').value = emp.role;
    }
  }
};


