<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/test-storage', function () {
    // Test writing to storage
    Storage::disk('public')->put('test.txt', 'Hello World');
    
    // Test reading from storage
    $content = Storage::disk('public')->get('test.txt');
    
    // Test URL generation
    $url = Storage::disk('public')->url('test.txt');
    
    // Test file existence
    $exists = Storage::disk('public')->exists('test.txt');
    
    return response()->json([
        'content' => $content,
        'url' => $url,
        'exists' => $exists,
        'storage_path' => storage_path('app/public'),
        'public_path' => public_path('storage'),
    ]);
});