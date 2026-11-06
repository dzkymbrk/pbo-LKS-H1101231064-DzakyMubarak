<?php
namespace App\Core;

class Container {
    private array $bindings = [];
    public function bind(string $abstract, callable $factory): void { $this->bindings[$abstract] = $factory; }
    public function make(string $abstract): mixed {
        return isset($this->bindings[$abstract]) ? $this->bindings[$abstract]($this) : new $abstract();
    }
}