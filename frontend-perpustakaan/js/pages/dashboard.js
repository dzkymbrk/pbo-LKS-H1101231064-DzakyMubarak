async function renderDashboard() {
    const booksRes = await Api.get('/books');
    const catsRes = await Api.get('/categories');

    const books = (booksRes && booksRes.data) ? booksRes.data : [];
    const categories = (catsRes && catsRes.data) ? catsRes.data : [];

    const latestBooks = books.slice(0, 5);
    let rows = '';

    latestBooks.forEach(b => {
        rows += `
            <tr class="border-b hover:bg-gray-50">
                <td class="p-3">${b.id}</td>
                <td class="p-3 font-semibold">${escapeHtml(b.judul)}</td>
                <td class="p-3">${escapeHtml(b.penulis)}</td>
                <td class="p-3">${b.tahun}</td>
                <td class="p-3">${b.stok}</td>
            </tr>`;
    });

    return `
        <h2 class="text-2xl font-bold mb-6 text-gray-800">Dashboard Utama</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div class="bg-blue-600 text-white p-6 rounded-lg shadow-md">
                <h3 class="text-lg font-semibold">Total Buku</h3>
                <p class="text-4xl font-bold mt-2">${books.length}</p>
            </div>
            <div class="bg-orange-500 text-white p-6 rounded-lg shadow-md">
                <h3 class="text-lg font-semibold">Total Kategori</h3>
                <p class="text-4xl font-bold mt-2">${categories.length}</p>
            </div>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-bold mb-4 text-gray-700">5 Buku Terbaru</h3>
            <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="bg-gray-100 border-b">
                            <th class="p-3">ID</th>
                            <th class="p-3">Judul</th>
                            <th class="p-3">Penulis</th>
                            <th class="p-3">Tahun</th>
                            <th class="p-3">Stok</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rows || '<tr><td colspan="5" class="p-4 text-center text-gray-500">Belum ada data buku</td></tr>'}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}