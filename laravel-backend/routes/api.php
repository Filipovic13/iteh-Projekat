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

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


//Public routes
Route::post('/register',[AuthController::class,'register']);
//Route::post('/login', [AuthController::class, 'login']);
Route::post('/login', [AdminAuthController::class, 'login']);


//Route::resource('registrations', RegistrationController::class);
//Route::get('/users/{id}/registrations', [UserRegistrationController::class, 'index'])->name('users.registration.index');
Route::get('/  ', [ProductController::class, 'index']);
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);
Route::resource('tournaments', TournamentController::class)->only('index');


//User accessible routes
Route::group(['middleware'=>['auth:sanctum'] ], function(){

    Route::resource('registrations', RegistrationController::class);
    Route::post('/logout', [AuthController::class, 'logout']);
    
 //   Route::resource('users.registrations', UserRegistrationController::class)->only(['index']);
});


require __DIR__ . '/admin.php';