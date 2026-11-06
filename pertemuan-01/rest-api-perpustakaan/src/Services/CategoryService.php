<?php
   namespace App\Services;

   use App\Contracts\CategoryRepositoryInterface;
   use Exception;

   class CategoryService {
       public function __construct(private CategoryRepositoryInterface $repo) {}

       public function list(): array { return array_map(fn($c) => $c->toArray(), $this->repo->findAll()); }
       public function get(int $id): array {
           $c = $this->repo->findById($id);
           if (!$c) throw new Exception("Kategori tidak ditemukan", 404);
           return $c->toArray();
       }
       public function create(array $d): array {
           if (empty($d['nama'])) throw new Exception("Nama kategori wajib diisi", 422);
           return $this->repo->create($d)->toArray();
       }
       public function update(int $id, array $d): array {
           $this->get($id);
           if (empty($d['nama'])) throw new Exception("Nama kategori wajib diisi", 422);
           return $this->repo->update($id, $d)->toArray();
       }
       public function delete(int $id): bool { $this->get($id); return $this->repo->delete($id); }
   }