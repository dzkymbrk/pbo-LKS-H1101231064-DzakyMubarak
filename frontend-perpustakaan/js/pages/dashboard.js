async function renderDashboard() {
    try {
        const books = await Api.get('/books');
        const cats = await Api.get('/categories');

        const totalBuku = (books && books.data) ? books.data.length : 0;
        const totalKategori = (cats && cats.data) ? cats.data.length : 0;

        const listBuku = (books && books.data) ? books.data.slice(0, 5) : [];
        let rowBuku = '';
        listBuku.forEach(b => {
            rowBuku += `
                <tr class="border-b hover:bg-gray-50">
                    <td class="p-3">${b.id}</td>
                    <td class="p-3 font-semibold">${b.judul}</td>
                    <td class="p-3">${b.penulis}</td>
                    <td class="p-3">${b.tahun}</td>
                    <td class="p-3">${b.stok}</td>
                </tr>`;
        });

        return `
            <h2 class="text-2xl font-bold mb-6 text-gray-800">Dashboard Utama</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div class="bg-blue-600 text-white p-6 rounded-lg shadow-md">
                    <h3 class="text-lg font-semibold">Total Buku</h3>
                    <p class="text-4xl font-bold mt-2">${totalBuku}</p>
                </div>
                <div class="bg-orange-500 text-white p-6 rounded-lg shadow-md">
                    <h3 class="text-lg font-semibold">Total Kategori</h3>
                    <p class="text-4xl font-bold mt-2">${totalKategori}</p>
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
                        <tbody>${rowBuku || '<tr><td colspan="5" class="p-4 text-center text-gray-500">Belum ada data buku</td></tr>'}</tbody>
                    </table>
                </div>
            </div>
        `;
    } catch (err) {
        console.error("Dashboard Error:", err);
        return `
            <div class="bg-red-100 border border-red-400 text-red-700 p-4 rounded-lg shadow">
                <h3 class="font-bold">Gagal Terhubung ke API Backend!</h3>
                <p class="text-sm mt-1">Pastikan server Backend PHP berjalan di <strong>http://localhost:8000</strong>.</p>
            </div>
        `;
    }
}