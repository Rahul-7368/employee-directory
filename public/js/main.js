let allEmployees = [];
let currentPage = 1;
let rowsPerPage = 10;
let searchQuery = "";
let filter = {
  firstName: "",
  department: "",
  role: ""
};

window.onload = async function () {

  const headerHTML = await fetch('./partials/header.html').then(res => res.text());
  document.getElementById('headerComponent').innerHTML = headerHTML;

  const controlsHTML = await fetch('./partials/control.html').then(res => res.text());
  document.getElementById('controlsComponent').innerHTML = controlsHTML;

  const stored = localStorage.getItem("employees");

  let storedEmployees = stored ? JSON.parse(stored) : [];

  const response = await fetch('../data/employees.json');
  const fileEmployees = await response.json();

  const merged = [...fileEmployees];

  for (let emp of storedEmployees) {
    const duplicate = merged.find(e => e.email === emp.email);
    if (!duplicate) merged.push(emp);
  }

  allEmployees = merged;


  localStorage.setItem("employees", JSON.stringify(allEmployees));


  const templateText = await fetch('../templates/employee-list.ftl').then(res => res.text());
  const handlebarsTemplate = Handlebars.compile(templateText);

  const addBtn = document.getElementById("addEmployeeBtn");
  if (addBtn) {
    addBtn.onclick = function () {
      window.location.href = "./add-employee/add.html";
    };
  }

  function render() {
    const filteredEmployees = allEmployees.filter(emp => {
      const query = searchQuery.toLowerCase();

      const matchesSearch =
        emp.firstName.toLowerCase().includes(query) ||
        emp.lastName.toLowerCase().includes(query) ||
        emp.email.toLowerCase().includes(query);

      const matchesFilters =
        (filter.firstName === "" || emp.firstName.toLowerCase().includes(filter.firstName.toLowerCase())) &&
        (filter.department === "" || emp.department.toLowerCase().includes(filter.department.toLowerCase())) &&
        (filter.role === "" || emp.role.toLowerCase().includes(filter.role.toLowerCase()));

      return matchesSearch && matchesFilters;
    });

    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const visibleEmployees = filteredEmployees.slice(start, end);

    const rendered = handlebarsTemplate({ employees: visibleEmployees });
    document.getElementById('app').innerHTML = rendered;
    bindCardActions();
  }

  function bindCardActions() {
    // DELETE
    document.querySelectorAll(".delete-btn").forEach(button => {
      button.onclick = function () {
        const id = parseInt(this.dataset.id);
        allEmployees = allEmployees.filter(emp => emp.id !== id);
        localStorage.setItem("employees", JSON.stringify(allEmployees));
        render();
      };
    });

    // EDIT
    document.querySelectorAll(".edit-btn").forEach(button => {
      button.onclick = function () {
        const id = parseInt(this.dataset.id);
        localStorage.setItem("editEmployeeId", id);
        window.location.href = "./add-employee/add.html";
      };
    });
  }

  document.getElementById("sortSelect").onchange = function () {
    const option = this.value;
    if (option !== "select") {
      allEmployees.sort((a, b) => a[option].localeCompare(b[option]));
      currentPage = 1;
      render();
    }
  };

  document.getElementById("rowsPerPage").onchange = function () {
    rowsPerPage = parseInt(this.value);
    currentPage = 1;
    render();
  };

  document.getElementById("searchInput").addEventListener("input", function () {
    searchQuery = this.value.trim();
    currentPage = 1;
    render();
  });

  document.getElementById("filterBtn").onclick = async function () {
    const container = document.getElementById("filterComponent");

    if (container.innerHTML.trim() !== "") {
      container.style.display = "block";
      return;
    }

    const response = await fetch('./partials/filter.html');
    const html = await response.text();
    container.innerHTML = html;
    container.style.display = "block";

    document.getElementById("applyFilterBtn").onclick = function () {
      filter.firstName = document.getElementById("filterFirstName").value.trim();
      filter.department = document.getElementById("filterDepartment").value.trim();
      filter.role = document.getElementById("filterRole").value.trim();
      currentPage = 1;
      render();
      container.style.display = "none";
    };

    document.getElementById("resetFilterBtn").onclick = function () {
      filter = { firstName: "", department: "", role: "" };
      document.getElementById("filterFirstName").value = "";
      document.getElementById("filterDepartment").value = "";
      document.getElementById("filterRole").value = "";
      currentPage = 1;
      render();
      container.style.display = "none";
    };
  };

  render();
};

