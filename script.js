document.addEventListener("DOMContentLoaded", function () {
  // Collect table data
  const tableRows = document.querySelectorAll("table tbody tr");
  const tableData = [];
  // console.log(tableRows)

  tableRows.forEach((row) => {
    // console.log(row)
    const cells = row.querySelectorAll("td");
    // console.log(cells)
    tableData.push({
      firstName: cells[0].textContent.trim(),
      lastName: cells[1].textContent.trim(),
      year: cells[2].textContent.trim(),
    });
  });
  // You can now use tableData for further tasks
  // console.log(tableData)
});

// display the data in the accodian formate

function createAccordion(data) {
  const bottomSection = document.querySelector(".bottom-data-section");
  bottomSection.innerHTML = ""; // Clear previous content

  data.forEach((item) => {
    // console.log(item);
    const accordionItem = document.createElement("div");
    accordionItem.className = "accordion-item";

    const header = document.createElement("h3");
    header.className = "accordion-header";
    header.textContent = `${item.firstName} ${item.lastName}`;
    header.addEventListener("click", () => {
      body.classList.toggle("show"); // Toggle visibility
    });

    const body = document.createElement("div");
    body.className = "accordion-body";
    body.textContent = `Year of Birth: ${item.year}`;

    accordionItem.appendChild(header);
    accordionItem.appendChild(body);
    bottomSection.appendChild(accordionItem);
  });
}

// implementing filter functionality

function applyFilters() {
    const firstNameInput = document.querySelector('input[placeholder="First name"]').value.toLowerCase();
    const nameFilterInput = document.querySelector('input[placeholder="Give name filter"]').value.toLowerCase();

    const filteredData = tableData.filter(item => {
        console.log(item)
        const fullName = `${item.firstName.toLowerCase()} ${item.lastName.toLowerCase()}`;
        return (!firstNameInput || item.firstName.toLowerCase().includes(firstNameInput)) &&
               (!nameFilterInput || fullName.includes(nameFilterInput));
    });

    createAccordion(filteredData);
}

// Attach event listeners to input fields
document.querySelector('input[placeholder="First name"]').addEventListener('input', applyFilters);
document.querySelector('input[placeholder="Give name filter"]').addEventListener('input', applyFilters);

