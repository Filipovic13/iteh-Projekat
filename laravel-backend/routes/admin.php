<?php

use App\Http\Controllers\API\AdminAuthController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\RegistrationController;
use App\Http\Controllers\TournamentController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserRegistrationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('admin')->group( function(){
    Route::post('register', [AdminAuthController::class, 'register']);
    Route::post('login', [AdminAuthController::class, 'login']);

    Route::middleware('auth:admin,api-admin')->group(function(){
        Route::resource('tournaments', TournamentController::class)->only(['store','update','destroy']);
        Route::resource('registrations', TournamentController::class)->only(['index','destroy']);
        Route::post('logout', [AdminAuthController::class, 'logout']);
      
    });
});


?>