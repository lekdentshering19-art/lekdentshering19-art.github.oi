
// ===================================
// SHERUBTSE COLLEGE INVENTORY SYSTEM
// ===================================


// SAMPLE INVENTORY RECORDS

const inventory = {

  Chemistry: [
    {
      id: "CH001",
      name: "Hydrochloric Acid",
      category: "Chemical",
      quantity: 20,
      location: "Chemical Store",
      reorder: 5
    },
    {
      id: "CH002",
      name: "Beaker 500ml",
      category: "Glassware",
      quantity: 30,
      location: "Cupboard A",
      reorder: 10
    }
  ],

  Physics: [
    {
      id: "PH001",
      name: "Digital Multimeter",
      category: "Equipment",
      quantity: 15,
      location: "Physics Room 01",
      reorder: 3
    }
  ],

  "Life Science": [
    {
      id: "LS001",
      name: "Microscope",
      category: "Equipment",
      quantity: 12,
      location: "Life Science Room 02",
      reorder: 3
    }
  ],

  CIF: [
    {
      id: "CIF001",
      name: "UV-Vis Spectrophotometer",
      category: "Instrument",
      quantity: 2,
      location: "Instrument Room",
      reorder: 1
    }
  ]

};


// GET ALL INVENTORY ITEMS

function getAllItems() {

  return Object.values(inventory).flat();

}


// UPDATE DASHBOARD STATISTICS

function updateDashboard() {

  const items = getAllItems();

  const total = items.length;

  const available = items.filter(
    item => item.quantity > 0
  ).length;

  const low = items.filter(
    item => item.quantity <= item.reorder
  ).length;

  document.getElementById("totalItems").textContent = total;

  document.getElementById("availableItems").textContent =
    available;

  document.getElementById("lowStock").textContent = low;

}


// SHOW MAIN DASHBOARD

function showDashboard() {

  location.reload();

}


// SHOW INDIVIDUAL LABORATORY

function showLab(lab) {

  const items = inventory[lab];

  let html = `
    <h2>${lab} Laboratory Inventory</h2>

    <p>View and search laboratory inventory records.</p>

    <input
      class="search-box"
      type="text"
      id="searchInput"
      placeholder="Search item name or ID..."
      oninput="searchInventory()"
    >

    <table class="inventory-table">

      <thead>
        <tr>
          <th>Item ID</th>
          <th>Item Name</th>
          <th>Category</th>
          <th>Quantity</th>
          <th>Location</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody id="inventoryRows">
  `;

  items.forEach(item => {

    html += `
      <tr>
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td>${item.category}</td>
        <td>${item.quantity}</td>
        <td>${item.location}</td>
        <td>
          ${
            item.quantity <= item.reorder
              ? "Low Stock"
              : "Available"
          }
        </td>
      </tr>
    `;

  });

  html += `
      </tbody>
    </table>
  `;

  document.getElementById("content").innerHTML = html;

  window.selectedLab = lab;

}


// SEARCH INVENTORY

function searchInventory() {

  const search = document
    .getElementById("searchInput")
    .value.toLowerCase();

  const items = inventory[window.selectedLab];

  const filtered = items.filter(item =>

    item.name.toLowerCase().includes(search) ||

    item.id.toLowerCase().includes(search)

  );

  document.getElementById("inventoryRows").innerHTML =

    filtered.map(item => `

      <tr>
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td>${item.category}</td>
        <td>${item.quantity}</td>
        <td>${item.location}</td>
        <td>
          ${
            item.quantity <= item.reorder
              ? "Low Stock"
              : "Available"
          }
        </td>
      </tr>

    `).join("");

}


// INITIALISE WEBSITE

updateDashboard();
