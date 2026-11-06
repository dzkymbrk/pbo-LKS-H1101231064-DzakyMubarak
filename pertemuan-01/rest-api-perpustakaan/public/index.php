<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS'); header('Access-Control-Allow-Headers: Content-Type, Accept'); header('Access-Control-Max-Age: 86400');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
	http_response_code(204);
	exit;
}

require_once	DIR	. '/../vendor/autoload.php';


header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept');
header('Access-Control-Max-Age: 86400');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

require_once __DIR__ . '/../vendor/autoload.php';

use App\Config\Env;
use App\Database\Connection;
use App\Core\Container;
use App\Core\Router;
use App\Core\Request;

// Import Book Engine
use App\Repositories\MySQLBookRepository;
use App\Services\BookService;
use App\Controllers\BookController;

// Import Category Engine (Langkah 14)
use App\Repositories\MySQLCategoryRepository;
use App\Services\CategoryService;
use App\Controllers\CategoryController;

Env::load(__DIR__ . '/../.env');

$container = new Container();

// 1. Binding Container Book
$container->bind(BookService::class, fn() => new BookService(new MySQLBookRepository(Connection::get())));
$container->bind(BookController::class, fn($c) => new BookController($c->make(BookService::class)));

// 2. Binding Container Category (Langkah 14)
$container->bind(CategoryService::class, fn() => new CategoryService(new MySQLCategoryRepository(Connection::get())));
$container->bind(CategoryController::class, fn($c) => new CategoryController($c->make(CategoryService::class)));

$router = new Router();

// Route Buku
$router->get('/api/books', [BookController::class, 'index']);
$router->get('/api/books/{id}', [BookController::class, 'show']);
$router->post('/api/books', [BookController::class, 'store']);
$router->put('/api/books/{id}', [BookController::class, 'update']);
$router->delete('/api/books/{id}', [BookController::class, 'destroy']);

// Route Kategori (Langkah 14)
$router->get('/api/categories', [CategoryController::class, 'index']);
$router->get('/api/categories/{id}', [CategoryController::class, 'show']);
$router->post('/api/categories', [CategoryController::class, 'store']);
$router->put('/api/categories/{id}', [CategoryController::class, 'update']);
$router->delete('/api/categories/{id}', [CategoryController::class, 'destroy']);

// Dispatch wajib berada di baris PALING AKHIR setelah semua route & binding terdaftar
$router->dispatch(new Request(), $container);