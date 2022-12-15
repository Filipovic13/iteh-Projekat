<?php

namespace App\Http\Controllers;

use App\Http\Resources\RegistrationCollection;
use App\Http\Resources\RegistrationResource;
use App\Models\Registration;
use Illuminate\Contracts\Routing\Registrar;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RegistrationController extends Controller
{
    public function index()
    {
        $registrations = Registration::all();
        //return $registrations;
        //return RegistrationResource::collection($registrations);
        return new RegistrationCollection($registrations);
    }

    // public function show($reg_id)
    // {
    //     $reg =Registration::find($reg_id);
    //     if(is_null($reg)){
    //         return response()->json('Data not found',404);
    //     }
    //     return response()->json($reg);
    // }

    public function show(Registration $registration)
    {
        return new RegistrationResource($registration);
    }

    public function store(Request $request)
    {
        //post request - cuvamo objekat u bazi
        $validator = Validator::make($request->all(), [
            'name'=> 'required|string',
            'surname'=> 'required|string',
            'category'=> 'required|string',
            'belt'=> 'required|string',
            'event_name'=> 'required|string',
            'tournament_id'=> 'required|string',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors());
        }

        $registration = Registration::create([
            'name'=> $request->name,
            'surname'=> $request->surname,
            'category'=> $request->category,
            'belt'=> $request->belt,
            'event_name'=> $request->event_name,
            'tournament_id'=> $request->tournament_id
        ]);

        return response()->json(['status'=>200, 'message'=>'Successfully registered', 'registration'=>new RegistrationResource($registration)]);
    }

    public function update(Request $request, Registration $registration)
    {
        $validator = Validator::make($request->all(), [
            'name'=> 'required|string',
            'surname'=> 'required|string',
            'category'=> 'required|string',
            'belt'=> 'required|string',
            'event_name'=> 'required|string',
            'tournament_id'=> 'required|string',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors());
        }

        $registration->name = $request->name;
        $registration->surname = $request->surname;
        $registration->category = $request->category;
        $registration->belt = $request->belt;
        $registration->event_name = $request->event_name;
        $registration->tournament_id = $request->tournament_id;

        $registration->save();

        return response()->json(['Registration is updated successfully',new RegistrationResource($registration)]);
    }

    public function destroy(Registration $registration)
    {
        $registration->delete();

        return response()->json('Registration is successfully deleted.');
    }
}
