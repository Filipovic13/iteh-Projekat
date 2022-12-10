<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        //return parent::toArray($request);
        return [
            'id'=>$this->resource->id,
            'name'=>$this->resource->name,
            'price'=>$this->resource->price,
            'category'=>$this->resource->category,
            'quantity'=>$this->resource->quantity,
            'brand'=>$this->resource->brand,
            'image_url'=>$this->resource->image_url,
        ];
    }
}
