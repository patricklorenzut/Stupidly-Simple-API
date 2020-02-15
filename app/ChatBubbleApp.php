<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ChatBubbleApp extends Model
{    
    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = ['created_at'];
}