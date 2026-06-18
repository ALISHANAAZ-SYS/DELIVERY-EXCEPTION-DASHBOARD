const form = document.getElementById("issueForm");
const tableBody = document.getElementById("tableBody");

form.addEventListener("submit", function(event) {

    event.preventDefault();

    const deliveryId = document.getElementById("deliveryId").value;
    const customerName = document.getElementById("customerName").value;
    const issueType = document.getElementById("issueType").value;
    const notes = document.getElementById("notes").value;

    const priority = document.querySelector(
        'input[name="priority"]:checked'
    ).value;

    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${deliveryId}</td>
        <td>${customerName}</td>
        <td>${issueType}</td>
        <td class="priority">${priority}</td>
        <td>Open</td>
        <td>
            <button class="resolve-btn">Resolve</button>
            <button class="delete-btn">Delete</button>
        </td>
    `;

    if(priority==="High"){
    row.children[3].style.color="red";
}
else if(priority==="Medium"){
    row.children[3].style.color="orange";
}
else{
    row.children[3].style.color="green";
}
tableBody.appendChild(row);
updateStats();

    form.reset();
});
tableBody.addEventListener("click", function(event) {

    if(event.target.classList.contains("delete-btn")) {

        event.target.parentElement.parentElement.remove();
        updateStats();

    }

    if(event.target.classList.contains("resolve-btn")) {

        const row = event.target.parentElement.parentElement;

        row.children[4].textContent = "Resolved";
        updateStats();

    }

});
const issueFilter = document.getElementById("issueFilter");
const statusFilter = document.getElementById("statusFilter");

function applyFilters() {

    const rows = tableBody.querySelectorAll("tr");

    rows.forEach(function(row) {

        const issue = row.children[2].textContent;
        const status = row.children[4].textContent;

        const issueMatch =
            issueFilter.value === "All" ||
            issue === issueFilter.value;

        const statusMatch =
            statusFilter.value === "All" ||
            status === statusFilter.value;

        if(issueMatch && statusMatch) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }

    });
}

issueFilter.addEventListener("change", applyFilters);
statusFilter.addEventListener("change", applyFilters);
function updateStats(){

    const total = tableBody.querySelectorAll("tr").length;

    const resolved = tableBody.querySelectorAll("tr td:nth-child(5)")
        .length;

    let resolvedCount = 0;

    tableBody.querySelectorAll("tr").forEach(row => {

        if(row.children[4].textContent === "Resolved"){
            resolvedCount++;
        }

    });

    const openCount = total - resolvedCount;

    document.getElementById("totalCount").textContent = total;
    document.getElementById("openCount").textContent = openCount;
    document.getElementById("resolvedCount").textContent = resolvedCount;
} 
updateStats();