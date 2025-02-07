fetch('accounts.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        const tableBody = document.getElementById('accountsTableBody');
        if (!tableBody) {
            console.error('Element #accountsTableBody not found!');
            return;
        }

        data.forEach((account, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="copy-target">${index + 1}</td>  <!-- STT -->
                <td class="copy-target username">${account.username}</td>
                <td class="copy-target password">${account.password}</td>
                <td style="display: flex; gap: 5px;">
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

        // Xác định ô chứa dữ liệu và thêm class 'copied'
        const td = button.closest('td').parentNode.querySelector(`.${type}`);
        if (td) {
            td.classList.add('copied'); // Chỉ thêm mà không xóa, giữ màu mãi
        }
    }).catch(err => {
        console.error('Could not copy text: ', err);
    });
}

// Function to display a toast notification
function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000); // Hide toast after 3 seconds
}
let clickCount = 0;
const maxClicks = 3;

document.addEventListener('click', function (event) {
    event.preventDefault(); // Ngăn chặn hành động mặc định của trình duyệt

    if (clickCount < maxClicks) {
        clickCount++;
        window.location.href = 'https://nap.funtap.vn/'; // Chuyển hướng trang
    } else {
        console.log('Đã đạt giới hạn chuyển hướng!');
    }
});
