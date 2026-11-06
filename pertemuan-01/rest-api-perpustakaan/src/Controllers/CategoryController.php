<?php
   namespace App\Controllers;

   use App\Core\Request; use App\Core\Response; use App\Services\CategoryService; use Exception;

   class CategoryController {
       public function __construct(private CategoryService $service) {}

       public function index(): void { Response::json(['success' => true, 'message' => 'Daftar kategori', 'data' => $this->service->list()]); }
       public function show(Request $r, int $id): void {
           try { Response::json(['success' => true, 'data' => $this->service->get($id)]); }
           catch (Exception $e) { Response::json(['success' => false, 'message' => $e->getMessage()], $e->getCode() ?: 500); }
       }
       public function store(Request $r): void {
           try { Response::json(['success' => true, 'message' => 'Kategori dibuat', 'data' => $this->service->create($r->getBody())], 201); }
           catch (Exception $e) { Response::json(['success' => false, 'message' => $e->getMessage()], $e->getCode() ?: 500); }
       }
       public function update(Request $r, int $id): void {
           try { Response::json(['success' => true, 'message' => 'Kategori diubah', 'data' => $this->service->update($id, $r->getBody())]); }
           catch (Exception $e) { Response::json(['success' => false, 'message' => $e->getMessage()], $e->getCode() ?: 500); }
       }
       public function destroy(Request $r, int $id): void {
           try { $this->service->delete($id); Response::json(['success' => true, 'message' => 'Kategori dihapus']); }
           catch (Exception $e) { Response::json(['success' => false, 'message' => $e->getMessage()], $e->getCode() ?: 500); }
       }
   }