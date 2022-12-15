<?php
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\CheckoutController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\RegistrationController;
use App\Http\Controllers\TournamentController;
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
Route::post('/login', [AuthController::class, 'login']);




//Route::resource('registrations', RegistrationController::class);
//Route::get('/users/{id}/registrations', [UserRegistrationController::class, 'index'])->name('users.registration.index');
//Route::get('/  ', [ProductController::class, 'index']);

Route::get('/users', [RegistrationController::class, 'index']);
Route::get('/users/{id}', [RegistrationController::class, 'show']);




//User accessible routes
Route::group(['middleware'=>['auth:sanctum'] ], function(){

    Route::post('/logout', [AuthController::class, 'logout']);

    Route::resource('tournaments', TournamentController::class)->only(['index','store']);

    Route::resource('registrations', RegistrationController::class);

    Route::get('/products', [ProductController::class, 'index']);
    Route::get('/products/{id}', [ProductController::class, 'show']);

    Route::post('/cart/add', [CartController::class, 'addToCart']);
    Route::get('/cart/get', [CartController::class, 'getCart']);
    Route::put('/cart/{cart_id}/{scope}', [CartController::class, 'updateQuantity']);
    Route::delete('/cart/{cart_id}', [CartController::class, 'deleteCartItem']);

    Route::post('/placeOrder',[CheckoutController::class,'placeOrder']);
    
    Route::get('/users', [RegistrationController::class, 'index']);
    Route::get('/users/{id}', [RegistrationController::class, 'show']);

 //   Route::resource('users.registrations', UserRegistrationController::class)->only(['index']);
});


require __DIR__ . '/admin.php';

