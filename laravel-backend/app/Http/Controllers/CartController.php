<?php

namespace App\Http\Controllers;

use App\Http\Resources\CartResource;
use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $cart = Cart::all();

        return $cart;
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
       
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Cart  $cart
     * @return \Illuminate\Http\Response
     */
    public function show(Cart $cart)
    {
        if(auth('sanctum')->check()){

            $user_id = auth('sanctum')->user()->id;
            $cartItems = Cart::where('user_id',$user_id)->get();
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Cart  $cart
     * @return \Illuminate\Http\Response
     */
    public function edit(Cart $cart)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Cart  $cart
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Cart $cart)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Cart  $cart
     * @return \Illuminate\Http\Response
     */
    public function destroy(Cart $cart)
    {
        //
    }

    public function addToCart(Request $request){
         // Da li je korisnik ulogovan
         if(auth('sanctum')->check()){

            $user_id = auth('sanctum')->user()->id;
            $product_id = $request->product_id;
            $product_qty = $request->product_qty;
 
            // da li proizvod postoji
            $productCheck = Product::where('id', $product_id)->first();
            if($productCheck){
                 //da li proizvod vec postoji u korpi
                 if(Cart::where('product_id',$product_id)->where('user_id',$user_id)->exists()){
                     return response()->json([
                         'status'=> 409,
                         'message'=> $productCheck->name.' Already Added to Cart',
                     ]);
                 }else{
 
                     $cartItem = new Cart;
                     $cartItem->user_id=$user_id;
                     $cartItem->product_id=$product_id;
                     $cartItem->product_qty=$product_qty;
 
                     $cartItem->save();
 
                     return response()->json([
                         'status'=>201,
                         'message'=>'Added to cart']);
 
                 }
 
            }else{
 
             return response()->json([
                 'status'=>404,
                 'message'=>'Product not found']);
            }
 
 
 
         }else{
             return response()->json([
                 'status'=>401,
                 'message'=>'Login to shop']);
         }
     
        
    }

    public function getCart(){

        if(auth('sanctum')->check()){

            $user_id = auth('sanctum')->user()->id;
            $cartItems = Cart::where('user_id',$user_id)->get();

            return response()->json([
                'status'=>200,
                'cart'=>$cartItems,
            ]);
        }else{
            return response()->json([
                'status'=>401,
                'message'=>'Login to view the cart',
            ]);
        }

    }

    public function updateQuantity($cart_id, $scope)
    {
        if(auth('sanctum')->check())
        {
            $user_id = auth('sanctum')->user()->id;
            $cartitem = Cart::where('id',$cart_id)->where('user_id',$user_id)->first();
            if($scope == "inc" && $cartitem->product_qty < 10){
                $cartitem->product_qty += 1;
            }else if($scope == "dec" && $cartitem->product_qty > 0){
                $cartitem->product_qty -= 1;
            }
            $cartitem->update();
            return response()->json([
                'status'=> 200,
                'message'=> 'Quantity Updated',
            ]);
        }
        else
        {
            return response()->json([
                'status'=> 401,
                'message'=> 'Login to continue',
            ]);
        }
    }

    public function deleteCartItem($cart_id)
    {
        if(auth('sanctum')->check())
        {
            $user_id = auth('sanctum')->user()->id;
            $cartitem = Cart::where('id',$cart_id)->where('user_id',$user_id)->first();
            if($cartitem)
            {
                $cartitem->delete();
                return response()->json([
                    'status'=> 200,
                    'message'=> 'Cart Item Removed Successfully.',
                ]);
            }
            else
            {
                return response()->json([
                    'status'=> 404,
                    'message'=> 'Cart Item not Found',
                ]);
            }
        }
        else
        {
            return response()->json([
                'status'=> 401,
                'message'=> 'Login to continue',
            ]);
        }
    }
   
    
}
