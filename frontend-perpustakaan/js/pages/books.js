async function renderBooks() {
       const res = await Api.get('/books');
       const list = res.data || [];
       let html = `<h2 class="text-2xl font-bold mb-4">Daftar Buku</h2><table class="w-full bg-white shadow rounded"><thead><tr class="bg-gray-200"><th class="p-2">Judul</th><th class="p-2">Penulis</th><th class="p-2">Stok</th></tr></thead><tbody>`;
       list.forEach(b => { html += `<tr><td class="p-2">${b.judul}</td><td class="p-2">${b.penulis}</td><td class="p-2">${b.stok}</td></tr>`; });
       return html + `</tbody></table>`;
   }