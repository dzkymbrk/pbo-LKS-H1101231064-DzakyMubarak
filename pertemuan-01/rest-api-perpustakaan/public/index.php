<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept');
header('Access-Control-Max-Age: 86400');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }

require_once __DIR__ . '/../vendor/autoload.php';

use App\Config\Env; use App\Database\Connection; use App\Core\Container;
use App\Core\Router; use App\Core\Request; use App\Repositories\MySQLBookRepository;
use App\Services\BookService; use App\Controllers\BookController;

Env::load(__DIR__ . '/../.env');

$container = new Container();
$container->bind(BookService::class, fn() => new BookService(new MySQLBookRepository(Connection::get())));
$container->bind(BookController::class, fn($c) => new BookController($c->make(BookService::class)));

$router = new Router();
$router->get('/api/books', [BookController::class, 'index']);
$router->get('/api/books/{id}', [BookController::class, 'show']);
$router->post('/api/books', [BookController::class, 'store']);
$router->put('/api/books/{id}', [BookController::class, 'update']);
$router->delete('/api/books/{id}', [BookController::class, 'destroy']);

$router->dispatch(new Request(), $container);