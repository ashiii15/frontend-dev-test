document.addEventListener("DOMContentLoaded", function () {
  // Collect table data
  const tableRows = document.querySelectorAll("table tbody tr");
  const tableData = [];

  tableRows.forEach((row) => {
    const cells = row.querySelectorAll("td");
    tableData.push({
      firstName: cells[0]?.textContent.trim() || "",
      lastName: cells[1]?.textContent.trim() || "",
      year: cells[2]?.textContent.trim() || "",
    });
  });

  // Function to create accordion
  function createAccordion(data) {
    const bottomSection = document.querySelector(".bottom-data-section");
    if (!bottomSection) {
      console.error("Bottom data section not found.");
      return;
    }

    bottomSection.innerHTML = ""; // Clear previous content

    data.forEach((item) => {
      const accordionItem = document.createElement("div");
      accordionItem.className = "accordion-item";
      accordionItem.style.border = "1px solid #ddd";
      accordionItem.style.margin = "10px 0";
      accordionItem.style.padding = "10px";
      accordionItem.style.cursor = "pointer";
      accordionItem.style.borderRadius = "5px";
      accordionItem.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.1)";

      const header = document.createElement("h3");
      header.className = "accordion-header";
      header.textContent = `${item.firstName} ${item.lastName}`;

      const body = document.createElement("div");
      body.className = "accordion-body";
      body.textContent = `Year of Birth: ${item.year}`;

      accordionItem.appendChild(header);
      accordionItem.appendChild(body);
      bottomSection.appendChild(accordionItem);
    });
  }

  // Function to apply filters
  function applyFilters() {
    const firstNameInput = document.querySelector(
      'input[placeholder="First name"]'
    );
    const nameFilterInput = document.querySelector(
      'input[placeholder="Give name filter"]'
    );

    if (!firstNameInput || !nameFilterInput) {
      console.error("Input fields not found.");
      return;
    }

    const firstNameValue = firstNameInput.value.toLowerCase();
    const nameFilterValue = nameFilterInput.value.toLowerCase();

    const filteredData = tableData.filter((item) => {
      const fullName = `${item.firstName.toLowerCase()} ${item.lastName.toLowerCase()}`;
      return (
        (!firstNameValue ||
          item.firstName.toLowerCase().includes(firstNameValue)) &&
        (!nameFilterValue || fullName.includes(nameFilterValue))
      );
    });

    createAccordion(filteredData);
  }

  // Attach event listeners to input fields
  const firstNameInput = document.querySelector(
    'input[placeholder="First name"]'
  );
  const nameFilterInput = document.querySelector(
    'input[placeholder="Give name filter"]'
  );

  if (firstNameInput) {
    firstNameInput.addEventListener("input", applyFilters);
  } else {
    console.error("First name input field not found.");
  }

  if (nameFilterInput) {
    nameFilterInput.addEventListener("input", applyFilters);
  } else {
    console.error("Name filter input field not found.");
  }

  // Add custom button to calculate age
  const customButton = document.createElement("button");
  customButton.textContent = "Add Age Column";
  customButton.className = "custom-age-button";
  customButton.style.display = "block"; // Ensure the button is visible
  customButton.addEventListener("click", addAgeColumn);

  // Insert the custom button between the input fields and the table
  const inputFieldsContainer = document.querySelector(".row.mb-12.container");
  if (inputFieldsContainer) {
    inputFieldsContainer.parentNode.insertBefore(
      customButton,
      inputFieldsContainer.nextSibling
    );
  } else {
    console.error(
      "Input fields container not found. Check your HTML structure."
    );
  }

  // Function to add the age column
  function addAgeColumn() {
    const currentYear = new Date().getFullYear();

    tableRows.forEach((row, index) => {
      const ageCell = document.createElement("td");
      const birthYear = parseInt(tableData[index].year, 10);
      ageCell.textContent = currentYear - birthYear;
      row.appendChild(ageCell);
    });

    // Hide the custom button after clicking
    customButton.style.display = "none";

    // Update the accordion with the new data
    applyFilters();
  }

  // Initial load
  createAccordion(tableData);
});
