<?php
namespace App\Services;

use App\Contracts\BookRepositoryInterface;
use Exception;

class BookService {
    public function __construct(private BookRepositoryInterface $repo) {}

    public function list(): array {
        return array_map(fn($b) => $b->toArray(), $this->repo->findAll());
    }

    public function get(int $id): array {
        $book = $this->repo->findById($id);
        if (!$book) throw new Exception("Buku dengan ID {$id} tidak ditemukan", 404);
        return $book->toArray();
    }

    public function create(array $data): array {
        if (empty($data['judul'])) throw new Exception("Judul wajib diisi", 422);
        return $this->repo->create($data)->toArray();
    }

    public function update(int $id, array $data): array {
        $this->get($id);
        if (empty($data['judul'])) throw new Exception("Judul wajib diisi", 422);
        return $this->repo->update($id, $data)->toArray();
    }

    public function delete(int $id): bool {
        $this->get($id);
        return $this->repo->delete($id);
    }
}