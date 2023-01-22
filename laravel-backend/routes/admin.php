<?php
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\RegistrationController;
use App\Http\Controllers\TournamentController;
use Illuminate\Support\Facades\Route;

Route::prefix('admin')->group( function(){

    Route::middleware(['auth:sanctum', 'isAPIAdmin'])->group(function(){

        Route::get('checkingAuthenticated', function(){
            return response()->json(['message'=>"You are in", "status"=>200],200);
        });

        Route::resource('tournaments', TournamentController::class)->only(['index','store','edit','update','destroy']);

        Route::resource('registrations', RegistrationController::class)->only(['index','destroy']);

        Route::resource('products', ProductController::class)->only(['index','store','edit','update','destroy']);
        
        Route::resource('cart', CartController::class)->only(['index']);
        
        Route::post('/logout', [AuthController::class, 'logout']);
      
    });
});


?>