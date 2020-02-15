<?php

namespace App\Http\Controllers;

use App\Author;
use Illuminate\Http\Request;
use App\ChatBubbleApp;
use Illuminate\Support\Facades\Auth;

class ChatBubbleController extends Controller
{

    public function showUserChatBubbleApps($id)
    {
        return response()->json(ChatBubbleApp::where('user_id',$id));
    }
    
    public function createChatBubbleApp(REQUEST $request){

        //validate incoming request 
        $this->validate($request, [
            'email' => 'required|email',
        ]);

        $new_app = new ChatBubbleApp;
        $new_app->user_id = Auth::user()->id;
        $new_app->token = str_random(16);
        $new_app->email = $request['email'];
        $new_app->save();

        return $new_app;
    }

}