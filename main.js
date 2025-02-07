fetch('accounts.json')
.then(response => response.json())
.then(data => {
    const tableBody = document.getElementById('accountsTableBody');
    data.forEach((account, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>  <!-- STT -->
            <td class="copy-target">${account.email}</td>
            <td class="copy-target">${account.username}</td>
            <td class="copy-target">${account.password}</td>
            <td style="display: flex; gap: 5px;">
                <button class="copy-button" onclick="copyToClipboard(this, '${account.email}', 'email')"> Email</button>
                <button class="copy-button" onclick="copyToClipboard(this, '${account.username}', 'username')"> Username</button>
                <button class="copy-button" onclick="copyToClipboard(this, '${account.password}', 'password')"> Password</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
})
.catch(error => {
    console.error('Error fetching the JSON data:', error);
});

// Function to copy text to clipboard
function copyToClipboard(button, text, type) {
navigator.clipboard.writeText(text).then(() => {
    showToast(`${type.charAt(0).toUpperCase() + type.slice(1)} copied to clipboard!`);

    // Xác định ô td tương ứng và đổi màu
    const td = button.closest('td').previousElementSibling;
    td.classList.add('copied');
}).catch(err => {
    console.error('Could not copy text: ', err);
});
}

// Function to display a toast notification
function showToast(message) {
const toast = document.getElementById('toast');
toast.textContent = message;
toast.className = 'toast show';

setTimeout(() => {
    toast.className = toast.className.replace('show', '');
}, 3000); // Hide toast after 3 seconds
}