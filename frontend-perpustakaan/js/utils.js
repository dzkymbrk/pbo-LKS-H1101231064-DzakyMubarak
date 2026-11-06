function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    const bgColor = type === 'success' ? 'bg-green-600' : (type === 'danger' ? 'bg-red-600' : 'bg-orange-500');
    
    toast.className = `${bgColor} text-white px-5 py-3 rounded-lg shadow-xl flex items-center justify-between min-w-[280px] max-w-md transform transition-all duration-300 translate-x-full opacity-0`;
    
    toast.innerHTML = `
        <span class="font-medium text-sm">${escapeHtml(message)}</span>
        <button onclick="this.parentElement.remove()" class="ml-4 text-white hover:text-gray-200 font-bold text-lg">×</button>
    `;

    container.appendChild(toast);

    // Animasi Masuk
    setTimeout(() => {
        toast.classList.remove('translate-x-full', 'opacity-0');
    }, 10);

    // Hilang Otomatis setelah 3 detik
    setTimeout(() => {
        toast.classList.add('opacity-0', 'translate-x-full');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function escapeHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&')
        .replace(/</g, '<')
        .replace(/>/g, '>')
        .replace(/"/g, '"');
}