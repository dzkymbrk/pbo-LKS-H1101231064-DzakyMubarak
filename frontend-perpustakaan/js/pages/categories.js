async function renderCategories() {
    const res = await Api.get('/categories');
    const categories = (res && res.data) ? res.data : [];

    let rows = '';
    categories.forEach(cat => {
        rows += `
            <tr class="border-b hover:bg-gray-50 transition">
                <td class="p-3 text-gray-700">${cat.id}</td>
                <td class="p-3 font-semibold text-gray-900">${escapeHtml(cat.nama)}</td>
                <td class="p-3 text-gray-600">${escapeHtml(cat.deskripsi || '-')}</td>
                <td class="p-3 space-x-2">
                    <button onclick="openCategoryModal(${cat.id}, '${escapeHtml(cat.nama)}', '${escapeHtml(cat.deskripsi || '')}')" class="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm transition">Edit</button>
                    <button onclick="deleteCategory(${cat.id})" class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition">Hapus</button>
                </td>
            </tr>`;
    });

    return `
        <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold text-gray-800">Kelola Kategori</h2>
            <button onclick="openCategoryModal()" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium shadow transition">+ Tambah Kategori</button>
        </div>

        <div class="bg-white rounded-lg shadow-md overflow-hidden">
            <table class="w-full text-left border-collapse">
                <thead>
                    <tr class="bg-gray-100 border-b text-gray-700 uppercase text-xs">
                        <th class="p-3">ID</th>
                        <th class="p-3">Nama Kategori</th>
                        <th class="p-3">Deskripsi</th>
                        <th class="p-3">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    ${rows || '<tr><td colspan="4" class="p-4 text-center text-gray-500">Belum ada data kategori.</td></tr>'}
                </tbody>
            </table>
        </div>

        <!-- Modal Category Form -->
        <div id="categoryModal" class="fixed inset-0 bg-black bg-opacity-50 hidden flex items-center justify-center z-40">
            <div class="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
                <div class="flex justify-between items-center mb-4">
                    <h3 id="categoryModalTitle" class="text-xl font-bold text-gray-800">Tambah Kategori</h3>
                    <button onclick="closeCategoryModal()" class="text-gray-500 hover:text-gray-700 text-xl font-bold">×</button>
                </div>
                <form id="categoryForm" onsubmit="handleCategorySubmit(event)">
                    <input type="hidden" id="catId" value="">
                    <div class="mb-4">
                        <label class="block text-gray-700 font-medium mb-1">Nama Kategori *</label>
                        <input type="text" id="catNama" class="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                    </div>
                    <div class="mb-6">
                        <label class="block text-gray-700 font-medium mb-1">Deskripsi</label>
                        <textarea id="catDeskripsi" class="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" rows="3"></textarea>
                    </div>
                    <div class="flex justify-end space-x-3">
                        <button type="button" onclick="closeCategoryModal()" class="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100">Batal</button>
                        <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">Simpan</button>
                    </div>
                </form>
            </div>
        </div>
    `;
}

function openCategoryModal(id = null, nama = '', deskripsi = '') {
    document.getElementById('catId').value = id || '';
    document.getElementById('catNama').value = nama;
    document.getElementById('catDeskripsi').value = deskripsi;
    document.getElementById('categoryModalTitle').innerText = id ? 'Edit Kategori' : 'Tambah Kategori';
    document.getElementById('categoryModal').classList.remove('hidden');
}

function closeCategoryModal() {
    document.getElementById('categoryModal').classList.add('hidden');
}

async function handleCategorySubmit(e) {
    e.preventDefault();
    const id = document.getElementById('catId').value;
    const data = {
        nama: document.getElementById('catNama').value,
        deskripsi: document.getElementById('catDeskripsi').value
    };

    let res;
    if (id) {
        res = await Api.put(`/categories/${id}`, data);
    } else {
        res = await Api.post('/categories', data);
    }

    if (res && res.success) {
        showToast(res.message || 'Kategori berhasil disimpan', 'success');
        closeCategoryModal();
        router(); // Re-render tampilan halaman kategori
    } else {
        showToast(res.message || 'Gagal menyimpan kategori', 'danger');
    }
}

async function deleteCategory(id) {
    if (!confirm('Apakah Anda yakin ingin menghapus kategori ini?')) return;

    const res = await Api.delete(`/categories/${id}`);
    if (res && res.success) {
        showToast(res.message || 'Kategori berhasil dihapus', 'danger');
        router(); // Re-render tampilan halaman kategori
    } else {
        showToast(res.message || 'Gagal menghapus kategori', 'danger');
    }
}