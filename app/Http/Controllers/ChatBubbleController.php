<?php

namespace App\Http\Controllers;

use App\Author;
use Illuminate\Http\Request;
use App\ChatBubbleApp;

class ChatBubbleController extends Controller
{

    public function showUserChatBubbleApps($id)
    {
        return response()->json(ChatBubbleApp::where('user_id',$id));
    }
    

}