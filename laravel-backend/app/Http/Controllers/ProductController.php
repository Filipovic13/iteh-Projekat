<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductCollection;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $products = Product::all();
        return new ProductCollection($products);
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
            'name'=> 'required|string',
            'price'=> 'required',
            'category'=> 'required|string',
            'quantity'=> 'required',
            'brand'=> 'required|string',
            'image_url'=> 'required|string',
            'description'=> 'required|string',
        ]);

        if($validator->fails()){
            return response()->json(['message'=>$validator->errors(), 'status'=>422]);
        }

        $product = Product::create([
            'name'=> $request->name,
            'price'=>  $request->price,
            'category'=>  $request->category,
            'quantity'=> $request->quantity,
            'brand'=>  $request->brand,
            'image_url'=>  $request->image_url,
            'description'=>  $request->description,
        ]);

        return response()->json(['message'=>'Product successfully stored', 'data'=>new ProductResource($product), 'status'=>200]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $product = Product::find($id);
        if($product){
            return response()->json(['status'=>200, 'product'=>$product]);
        }else{
            return response()->json(['status'=>404, 'message'=>'ID not found']);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $product = Product::find($id);
        if($product){
            return response()->json([
                'status'=>200,
                'product'=>$product
            ]);
        }else{
            return response()->json([
                'status'=>404,
                'message'=>'No Product Id found'
            ]);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name'=> 'required|string',
            'price'=> 'required',
            'ctegory'=> 'required|string',
            'quantity'=> 'required',
            'brand'=> 'required|string',
            'image_url'=> 'required|string',
            'description'=> 'required|string',
        ]);

        if($validator->fails()){
            return response()->json(["status"=>422,"errors"=>$validator->errors()]);
        }

        $product = Product::find($id);
        if($product){
            $product->name = $request->name;
            $product->price = $request->price;
            $product->category = $request->category;
            $product->quantity = $request->quantity;
            $product->brand = $request->brand;
            $product->image_url = $request->image_url;
            $product->description = $request->description;

            $product->save();

            return response()->json(["status"=>200,"message"=>'Product is updated successfully',"product"=>new ProductResource($product)]);
       

        }else{
            return response()->json([
                'status'=>404,
                'message'=>"Product with id doesn't exist"
            ]);
        }
       
    
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy( $id)
    {
        $product = Product::find($id);
        if($product){

            $product->delete();

            return response()->json(["status"=>200,"message"=>'Product is successfully deleted.']);
        }else{

            return response()->json(["status"=>404,"message"=>'Product ID not found.']);
        }
    }
}
