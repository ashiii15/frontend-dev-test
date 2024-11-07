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
    bottomSection.style.marginLeft = "105px";
    if (!bottomSection) {
      console.error("Bottom data section not found.");
      return;
    }

    bottomSection.innerHTML = ""; // Clear previous content

    data.forEach((item) => {
      const accordionItem = document.createElement("div");
      accordionItem.className = "accordion-item";
      accordionItem.style.width = "1138px";
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
      body.textContent = `Year of Birth: ${item.year}, Age: ${
        item.age || "N/A"
      }`; // Include age here
      body.style.display = "none"; // Hidden by default
      body.style.paddingTop = "8px";
      body.style.color = "#555";

      // Toggle visibility on header click
      header.addEventListener("click", () => {
        body.style.display = body.style.display === "none" ? "block" : "none";
      });

      accordionItem.appendChild(header);
      accordionItem.appendChild(body);
      bottomSection.appendChild(accordionItem);
    });
  }

  // Initial load
  createAccordion(tableData);

  // Function to apply filters
  function applyFilters() {
    const columnFilterInput = document.querySelector(
      'input[placeholder="Table filed names with comma seperate"]'
    );
    const nameFilterInput = document.querySelector(
      'input[placeholder="Give name filter"]'
    );

    if (!columnFilterInput || !nameFilterInput) {
      console.error("Input fields not found.");
      return;
    }

    const columnFilterValue = columnFilterInput.value.toLowerCase().trim();
    const nameFilterValue = nameFilterInput.value.toLowerCase().trim();

    const filteredData = tableData.filter((item) => {
      // console.log(item)
      const matchesFirstName =
        columnFilterValue.includes("first") &&
        item.firstName.toLowerCase().includes(nameFilterValue);
      const matchesLastName =
        columnFilterValue.includes("last") &&
        item.lastName.toLowerCase().includes(nameFilterValue);

      // Check which column should be filtered based on input
      if (columnFilterValue.includes("first") && columnFilterValue.includes("last")) {
        return matchesFirstName || matchesLastName;
      } else if (columnFilterValue.includes("first")) {
        return matchesFirstName;
      } else if (columnFilterValue.includes("last")) {
        return matchesLastName;
      } else {
        // Fallback filter: match either first or last name
        return item.firstName.toLowerCase().includes(nameFilterValue) ||
               item.lastName.toLowerCase().includes(nameFilterValue);
      }
    });

    createAccordion(filteredData);
  }

  // Attach event listeners to input fields
  const firstNameInput = document.querySelector(
    'input[placeholder="Table filed names with comma seperate"]'
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
  customButton.textContent = "Add Age";
  customButton.className = "custom-age-button";
  customButton.style.color = "#fff";
  customButton.style.backgroundColor = "#337ab7";
  customButton.style.borderColor = "#2e6da4";
  customButton.style.display = "block"; // Ensure the button is visible
  customButton.style.marginBottom = "7px";
  customButton.style.borderRadius = "5px";
  customButton.addEventListener("click", addAgeColumn);

  // Insert the custom button between the input fields and the table
  const inputFieldsContainer = document.querySelector(".row.container");
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

    // Add the "Age" heading dynamically to the table header
    const tableHeader = document.querySelector("table thead tr");
    if (tableHeader) {
      const ageHeading = document.createElement("th");
      ageHeading.textContent = "Age"; // Add text for the Age column heading
      tableHeader.appendChild(ageHeading); // Append the new heading
    }

    tableRows.forEach((row, index) => {
      const ageCell = document.createElement("td");
      const birthYear = parseInt(tableData[index].year, 10);
      ageCell.textContent = currentYear - birthYear;
      row.appendChild(ageCell);
    });

    // Hide the custom button after clicking
    customButton.style.display = "none";

    // Add age to tableData and update the accordion
    const updatedData = tableData.map((item, index) => {
      const birthYear = parseInt(item.year, 10);
      const age = currentYear - birthYear;
      return { ...item, age }; // Add age to each item
    });

    // Update the accordion with new data (which includes age)
    createAccordion(updatedData);
  }
});
