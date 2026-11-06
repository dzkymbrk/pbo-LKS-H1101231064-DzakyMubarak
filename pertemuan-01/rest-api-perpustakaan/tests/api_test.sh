BASE_URL="http://localhost:8000/api"

   echo "== Test 1: GET semua buku =="
   curl -s $BASE_URL/books

   echo -e "\n\n== Test 2: POST buku baru =="
   curl -s -X POST $BASE_URL/books -H "Content-Type: application/json" -d '{"judul":"Bumi","penulis":"Tere Liye","tahun":2014,"stok":2}'

   echo -e "\n\n== Test 3: GET buku ID 1 =="
   curl -s $BASE_URL/books/1

   echo -e "\n\n== Test 4: PUT ubah buku =="
   curl -s -X PUT $BASE_URL/books/1 -H "Content-Type: application/json" -d '{"judul":"Bumi Revised","penulis":"Tere Liye","tahun":2015,"stok":10}'

   echo -e "\n\n== Test 5: DELETE buku =="
   curl -s -X DELETE $BASE_URL/books/4

   echo -e "\n\n== Test 6: Validasi error =="
   curl -s -X POST $BASE_URL/books -H "Content-Type: application/json" -d '{"judul":""}'
   echo ""