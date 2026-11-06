<?php
namespace App\Repositories;

use App\Contracts\BookRepositoryInterface;
use App\Models\Book;
use PDO;

class MySQLBookRepository implements BookRepositoryInterface {
    public function __construct(private PDO $pdo) {}

    public function findAll(): array {
        $stmt = $this->pdo->query("SELECT * FROM books ORDER BY id DESC");
        return array_map(fn($r) => new Book((int)$r['id'], $r['judul'], $r['penulis'], (int)$r['tahun'], (int)$r['stok']), $stmt->fetchAll());
    }

    public function findById(int $id): ?Book {
        $stmt = $this->pdo->prepare("SELECT * FROM books WHERE id = :id");
        $stmt->execute(['id' => $id]);
        $r = $stmt->fetch();
        return $r ? new Book((int)$r['id'], $r['judul'], $r['penulis'], (int)$r['tahun'], (int)$r['stok']) : null;
    }

    public function create(array $data): Book {
        $stmt = $this->pdo->prepare("INSERT INTO books (judul, penulis, tahun, stok) VALUES (:judul, :penulis, :tahun, :stok)");
        $stmt->execute(['judul' => $data['judul'], 'penulis' => $data['penulis'], 'tahun' => $data['tahun'], 'stok' => $data['stok']]);
        return new Book((int)$this->pdo->lastInsertId(), $data['judul'], $data['penulis'], (int)$data['tahun'], (int)$data['stok']);
    }

    public function update(int $id, array $data): ?Book {
        $stmt = $this->pdo->prepare("UPDATE books SET judul = :judul, penulis = :penulis, tahun = :tahun, stok = :stok WHERE id = :id");
        $stmt->execute(['id' => $id, 'judul' => $data['judul'], 'penulis' => $data['penulis'], 'tahun' => $data['tahun'], 'stok' => $data['stok']]);
        return $this->findById($id);
    }

    public function delete(int $id): bool {
        $stmt = $this->pdo->prepare("DELETE FROM books WHERE id = :id");
        return $stmt->execute(['id' => $id]);
    }
}