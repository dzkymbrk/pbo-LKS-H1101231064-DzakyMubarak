<?php
namespace App\Controllers;

use App\Core\Request;
use App\Core\Response;
use App\Services\BookService;
use Exception;

class BookController {
    public function __construct(private BookService $service) {}

    public function index(): void {
        Response::json(['success' => true, 'message' => 'Daftar buku', 'data' => $this->service->list()]);
    }

    public function show(Request $req, int $id): void {
        try { Response::json(['success' => true, 'data' => $this->service->get($id)]); }
        catch (Exception $e) { Response::json(['success' => false, 'message' => $e->getMessage()], $e->getCode() ?: 500); }
    }

    public function store(Request $req): void {
        try { Response::json(['success' => true, 'message' => 'Buku berhasil dibuat', 'data' => $this->service->create($req->getBody())], 201); }
        catch (Exception $e) { Response::json(['success' => false, 'message' => $e->getMessage()], $e->getCode() ?: 500); }
    }

    public function update(Request $req, int $id): void {
        try { Response::json(['success' => true, 'message' => 'Buku berhasil diperbarui', 'data' => $this->service->update($id, $req->getBody())]); }
        catch (Exception $e) { Response::json(['success' => false, 'message' => $e->getMessage()], $e->getCode() ?: 500); }
    }

    public function destroy(Request $req, int $id): void {
        try { $this->service->delete($id); Response::json(['success' => true, 'message' => 'Buku berhasil dihapus']); }
        catch (Exception $e) { Response::json(['success' => false, 'message' => $e->getMessage()], $e->getCode() ?: 500); }
    }
}