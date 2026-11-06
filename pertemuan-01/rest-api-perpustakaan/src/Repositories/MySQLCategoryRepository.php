<?php
   namespace App\Repositories;

   use App\Contracts\CategoryRepositoryInterface;
   use App\Models\Category;
   use PDO;

   class MySQLCategoryRepository implements CategoryRepositoryInterface {
       public function __construct(private PDO $pdo) {}

       public function findAll(): array {
           $stmt = $this->pdo->query("SELECT * FROM categories ORDER BY id DESC");
           return array_map(fn($r) => new Category((int)$r['id'], $r['nama'], $r['deskripsi']), $stmt->fetchAll());
       }

       public function findById(int $id): ?Category {
           $stmt = $this->pdo->prepare("SELECT * FROM categories WHERE id = :id");
           $stmt->execute(['id' => $id]);
           $r = $stmt->fetch();
           return $r ? new Category((int)$r['id'], $r['nama'], $r['deskripsi']) : null;
       }

       public function create(array $data): Category {
           $stmt = $this->pdo->prepare("INSERT INTO categories (nama, deskripsi) VALUES (:nama, :deskripsi)");
           $stmt->execute(['nama' => $data['nama'], 'deskripsi' => $data['deskripsi'] ?? '']);
           return new Category((int)$this->pdo->lastInsertId(), $data['nama'], $data['deskripsi'] ?? '');
       }

       public function update(int $id, array $data): ?Category {
           $stmt = $this->pdo->prepare("UPDATE categories SET nama = :nama, deskripsi = :deskripsi WHERE id = :id");
           $stmt->execute(['id' => $id, 'nama' => $data['nama'], 'deskripsi' => $data['deskripsi'] ?? '']);
           return $this->findById($id);
       }

       public function delete(int $id): bool {
           $stmt = $this->pdo->prepare("DELETE FROM categories WHERE id = :id");
           return $stmt->execute(['id' => $id]);
       }
   }