<?php
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\TournamentController;
use Illuminate\Support\Facades\Route;

Route::prefix('admin')->group( function(){

    Route::middleware(['auth:sanctum', 'isAPIAdmin'])->group(function(){

        Route::get('checkingAuthenticated', function(){
            return response()->json(['message'=>"You are in", "status"=>200],200);
        });

        Route::resource('tournaments', TournamentController::class)->only(['index','store','update','destroy']);
        Route::resource('registrations', TournamentController::class)->only(['index','destroy']);
        Route::resource('cart', CartController::class)->only(['index']);
        //products -> store, destroy
        Route::post('/logout', [AuthController::class, 'logout']);
      
    });
});


?>