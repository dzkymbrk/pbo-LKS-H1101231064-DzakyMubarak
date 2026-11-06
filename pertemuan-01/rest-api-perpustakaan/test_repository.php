<?php
require 'vendor/autoload.php';
use App\Config\Env;
use App\Database\Connection;
use App\Repositories\MySQLBookRepository;

Env::load(__DIR__ . '/.env');
$repo = new MySQLBookRepository(Connection::get());
$books = $repo->findAll();

echo "Total buku: " . count($books) . PHP_EOL;
foreach ($books as $b) {
    echo "- {$b->getJudul()} oleh {$b->getPenulis()}" . PHP_EOL;
}