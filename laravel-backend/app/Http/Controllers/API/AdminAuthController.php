<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AdminAuthController extends Controller
{
    //register metoda za registarciju korisnika
    //imace token koji je potreban za registraciju korisnika
    //request prima parametre za registraciju (name, email, password)
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|max:255|email|unique:admins',
            'password' => 'required|string|min:8'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $admin = Admin::create([
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);

        $token = $admin->createToken('auth_token')->plainTextToken;
        return response()->json(['data' => $admin, 'access_token' => $token, 'token_type' => 'Bearer']);
    }

    //login proverava postojanje korisnika u bazi
    //i proveravace token iz table personalAccessToken]
    //Auth za pristup autentifikovanom korisniku

    public function login(Request $request)
    {
        if (!Auth::guard('admin')->attempt($request->only('email', 'password'))) {
            return response()->json(['success' => false]);
        }

        $admin = Admin::where('email', $request['email'])->firstOrFail();

        $token = $admin->createToken('auth_token')->plainTextToken;

        return response()->json(['success' => true, 'access_token' => $token, 'token_type' => 'Beraer', "id" => $admin->id]);
    }

    public function logout()
    {
        auth()->user()->tokens()->delete();
        return [
            'message' => 'Logged out'
        ];
    }
}
