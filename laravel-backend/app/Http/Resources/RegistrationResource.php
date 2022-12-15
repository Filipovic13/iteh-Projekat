<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class RegistrationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public static $wrap='registration';
    public function toArray($request)
    {
        //return parent::toArray($request);
        return [
            'id'=>$this->resource->id,
            'name'=>$this->resource->name,
            'surname'=>$this->resource->surname,
            'category'=>$this->resource->category,
            'belt'=>$this->resource->belt,
            'event_name'=>$this->resource->event_name,
            'tournament'=> new TournamentResource($this->resource->tournament),
            'user'=> new UserResource($this->resource->user)
        ];
    }
}
