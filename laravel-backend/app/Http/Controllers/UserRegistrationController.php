<?php

namespace App\Http\Controllers;

use App\Models\Registration;
use Illuminate\Http\Request;

class UserRegistrationController extends Controller
{
    public function index($user_id)
    {
        $registrations = Registration::get()->where('user_id', $user_id);
        if(is_null($registrations)){
            return response()->json('Data not found',404);
        }
        return response()->json($registrations);
    }
}
