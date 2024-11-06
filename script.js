document.addEventListener("DOMContentLoaded", function() {
    // Collect table data
    const tableRows = document.querySelectorAll("table tbody tr");
    const tableData = [];

    tableRows.forEach(row => {
        const cells = row.querySelectorAll("td");
        tableData.push({
            firstName: cells[0].textContent.trim(),
            lastName: cells[1].textContent.trim(),
            year: cells[2].textContent.trim()
        });
    });
    // You can now use tableData for further tasks
    console.log(tableData)
});
