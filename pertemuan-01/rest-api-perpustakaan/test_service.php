<?php
require 'vendor/autoload.php';
use App\Config\Env;
use App\Database\Connection;
use App\Repositories\MySQLBookRepository;
use App\Services\BookService;

Env::load(__DIR__ . '/.env');
$service = new BookService(new MySQLBookRepository(Connection::get()));

echo "Daftar buku: " . count($service->list()) . PHP_EOL;

try {
    $service->create(['judul' => '']);
} catch (Exception $e) {
    echo "✅ Validasi berjalan: " . $e->getMessage() . PHP_EOL;
}

$new = $service->create(['judul' => 'Pulang', 'penulis' => 'Leila S. Chudori', 'tahun' => 2012, 'stok' => 4]);
echo "✅ Buku dibuat: {$new['judul']} (ID: {$new['id']})" . PHP_EOL;