<?php
namespace App\Core;

class Router {
    private array $routes = [];
    public function get(string $path, callable|array $h): void { $this->routes['GET'][$path] = $h; }
    public function post(string $path, callable|array $h): void { $this->routes['POST'][$path] = $h; }
    public function put(string $path, callable|array $h): void { $this->routes['PUT'][$path] = $h; }
    public function delete(string $path, callable|array $h): void { $this->routes['DELETE'][$path] = $h; }

    public function dispatch(Request $request, Container $container): void {
        $method = $request->getMethod();
        $uri = $request->getUri();
        foreach ($this->routes[$method] ?? [] as $pattern => $handler) {
            $regex = "#^" . preg_replace('#\{[a-zA-Z0-9_]+\}#', '([a-zA-Z0-9_]+)', $pattern) . "$#";
            if (preg_match($regex, $uri, $matches)) {
                array_shift($matches);
                if (is_callable($handler)) { call_user_func_array($handler, $matches); return; }
                if (is_array($handler)) {
                    [$class, $func] = $handler;
                    call_user_func_array([$container->make($class), $func], array_merge([$request], $matches));
                    return;
                }
            }
        }
        Response::json(['success' => false, 'message' => "Endpoint tidak ditemukan: {$uri}"], 404);
    }
}