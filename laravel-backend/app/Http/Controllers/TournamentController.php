<?php

namespace App\Http\Controllers;

use App\Http\Resources\TournamentCollection;
use App\Http\Resources\TournamentResource;
use App\Models\Tournament;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TournamentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $tournamnets = Tournament::all();
        return new TournamentCollection($tournamnets);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'event_name'=> 'required|string',
            'country'=> 'required|string',
            'city'=> 'required|string',
            'ruleset'=> 'required|string',
            'date'=> 'required|string',
            'image_url'=> 'required|string',
        ]);

        if($validator->fails()){
            return response()->json(['message'=>$validator->errors(), 'status'=>422]);
        }

        $tournament = Tournament::create([
            'event_name'=> $request->event_name,
            'country'=>  $request->country,
            'city'=>  $request->city,
            'ruleset'=> $request->ruleset,
            'date'=>  $request->date,
            'image_url'=>  $request->image_url,
        ]);

        return response()->json(['message'=>'Tournament successfully stored.', 'data'=>new TournamentResource($tournament), 'status'=>200]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Tournament  $tournament
     * @return \Illuminate\Http\Response
     */
    public function show(Tournament $tournament)
    {
        return new TournamentResource($tournament);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Tournament  $tournament
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $tournament = Tournament::find($id);
        if($tournament){
            return response()->json([
                'status'=>200,
                'tournament'=>$tournament
            ]);
        }else{
            return response()->json([
                'status'=>404,
                'message'=>'No Tournament Id found'
            ]);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Tournament  $tournament
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request,  $id)
    {
        $validator = Validator::make($request->all(), [
            'event_name'=> 'required|string',
            'country'=> 'required|string',
            'city'=> 'required|string',
            'ruleset'=> 'required|string',
            'date'=> 'required|string',
            'image_url'=> 'required|string',
        ]);

        if($validator->fails()){
            return response()->json(["status"=>422,"errors"=>$validator->errors()]);
        }

        $tournament = Tournament::find($id);
        if($tournament){
            $tournament->event_name = $request->event_name;
            $tournament->country = $request->country;
            $tournament->city = $request->city;
            $tournament->ruleset = $request->ruleset;
            $tournament->date = $request->date;
            $tournament->image_url = $request->image_url;

            $tournament->save();

            return response()->json(["status"=>200,"message"=>'Tournament is updated successfully',"tournament"=>new TournamentResource($tournament)]);
       

        }else{
            return response()->json([
                'status'=>404,
                'message'=>"Tournament with id doesn't exist"
            ]);
        }
       
    

        }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Tournament  $tournament
     * @return \Illuminate\Http\Response
     */
    public function destroy( $id)
    {
        $tournament = Tournament::find($id);
        if($tournament){

            $tournament->delete();

            return response()->json(["status"=>200,"message"=>'Tournamrnt is successfully deleted.']);
        }else{

            return response()->json(["status"=>404,"message"=>'Tournamrnt ID not found.']);
        }
       
    }
}
