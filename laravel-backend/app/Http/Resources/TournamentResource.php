<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TournamentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public static $wrap='tournament';
    public function toArray($request)
    {
        //return parent::toArray($request);
        return [
            'id'=> $this->resource->id,
            'event_name'=>$this->resource->event_name,
            'country'=>$this->resource->country,
            'city'=>$this->resource->city,
            'ruleset'=>$this->resource->ruleset,
            'date'=>$this->resource->date,
        ];
    }
}
