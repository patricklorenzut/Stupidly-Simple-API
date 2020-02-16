<?php

namespace App\Http\Controllers;

use App\Author;
use Illuminate\Http\Request;
use App\ChatBubbleApp;
use App\ChatBubbleEmail;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

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

    public function createMessage(REQUEST $request){
        $this->validate($request, [
            'email' => 'required|email',
            'token' => 'required',
            'app_id' => 'required|exists:chat_bubble_apps,id',
            'message' => 'required',
            'url' => 'required'
        ]);

        if($cba = ChatBubbleApp::where('id',$request['app_id'])->where('token',$request['token'])->first()){

            $new_message = new ChatBubbleEmail;
            $new_message->chat_bubble_app_id = $request['app_id'];
            $new_message->user_id = $cba->user_id;
            $new_message->contents = $request['message'];
            $new_message->from_email = $request['email'];
            $new_message->url = $request['url'];
            $new_message->save();

            
            Mail::send([], [], function ($message) use($cba,$new_message){
                $message->to($cba->email)
                    ->subject('New message from '.$new_message->from_email)              
                    ->replyTo($new_message->from_email)
                    ->cc($new_message->from_email)
                    ->setBody('
                        <strong>'.$new_message->from_email.' said:</strong><br/><br/>
                        '.nl2br($new_message->contents).'
                        <br/><br/>
                        ---
                        <br/><br/>
                        This message was sent via <a href="https://stupidlysimple.app">Stupidly Simple Chat Widget</a> installed on '.$new_message->url.'<br/>
                        Simply click "Reply" to continue the conversation.
                    '
                    , 'text/html');
              });
        }else{
            return response()->json(['message' => 'Invalid credentials'], 501);
        }        
    }

}