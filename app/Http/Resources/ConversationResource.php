<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ConversationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $lastRead = $this->users()->where('user_id', '=', auth()->user()->id)->first()->pivot->lastRead;
        $newMessageCount = $this->messages()->where('id', '>', $lastRead)->where('user_id', '!=', auth()->user()->id)->count();
        return [
            'id' => $this->id,
            'user' => new UserResource($this->getWithUser()),
            'messages' => new MessageCollection($this->messages),
            'newMessageCount' => $newMessageCount,
            'lastRead' => $lastRead
        ];
    }
}
