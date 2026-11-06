async function router() {
    const app = document.getElementById('app');
    if (!app) return;

    const hash = location.hash || '#dashboard';
    app.innerHTML = '<div class="p-4 bg-white rounded shadow text-gray-500">Memuat data...</div>';

    try {
        if (hash === '#books') {
            app.innerHTML = (typeof renderBooks === 'function') 
                ? await renderBooks() 
                : '<div class="p-4 bg-yellow-100 text-yellow-800 rounded">Modul Books belum dimuat.</div>';
        } else if (hash === '#categories') {
            app.innerHTML = (typeof renderCategories === 'function') 
                ? await renderCategories() 
                : '<div class="p-4 bg-yellow-100 text-yellow-800 rounded">Modul Categories belum dimuat.</div>';
        } else {
            app.innerHTML = (typeof renderDashboard === 'function') 
                ? await renderDashboard() 
                : '<div class="p-4 bg-yellow-100 text-yellow-800 rounded">Modul Dashboard belum dimuat.</div>';
        }
    } catch (err) {
        console.error("Router Error:", err);
        app.innerHTML = `<div class="p-4 bg-red-100 text-red-700 rounded">Terjadi kesalahan: ${err.message}</div>`;
    }
}

window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', router);

// Eksekusi langsung jika dokumen sudah siap
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    router();
}