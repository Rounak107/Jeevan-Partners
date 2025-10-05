<?php
require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';

try {
    $controller = new App\Http\Controllers\PaymentController();
    echo "✅ PaymentController exists and can be instantiated!\n";
} catch (Exception $e) {
    echo "❌ PaymentController error: " . $e->getMessage() . "\n";
}