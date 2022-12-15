<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CheckoutController extends Controller
{

    public function placeOrder(Request $request){

        if(auth('sanctum')->check()){

            $validator = Validator::make($request->all(), [
                'firstName'=> 'required|string|max:191',
                'lastName'=> 'required|string|max:191',
                'phone'=> 'required|string|max:191',
                'email'=> 'required|string|max:191',
                'address'=> 'required|string|max:191',
                'city'=> 'required|string|max:191',
                'zipCode'=> 'required|string|max:191',
            ]);
    
            if($validator->fails()){
                return response()->json([
                    'status'=>422,
                    'errors'=>$validator->messages()
                ]);
            }


            $order= new Order();

            $user_id = auth('sanctum')->user()->id;

            $order->user_id = $user_id;
            $order->firstName = $request->firstName;
            $order->lastName = $request->lastName;
            $order->phone = $request->phone;
            $order->email = $request->email;
            $order->address = $request->address;
            $order->city = $request->city;
            $order->zipCode = $request->zipCode;

            $order->tracking_no = 'iteh'.rand(1111,9999);

            $order->save();
           
            $cart = Cart::where('user_id',$user_id)->get();

            $orderItems=[];
            foreach ($cart as $item) {
                $orderItems[]=[
                    'product_id'=>$item->product_id,
                    'qty'=>$item->product_qty,
                    'price'=>$item->product->price,
                ];

                $item->product->update([
                    'quantity'=>$item->product->quantity - $item->product_qty
                ]);
            }

            $order->orderItems()->createMany($orderItems);

            Cart::destroy($cart);

            return response()->json([
                'status'=>200,
                'message'=>"Order succefulyy placed"
            ]);


        }else{
            return response()->json([
                'status'=>401,'message'=>"Login to continue"
            ]);
        }
    }
    
}
