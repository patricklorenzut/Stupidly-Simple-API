<?php

namespace App\Http\Controllers;

use App\Author;
use Illuminate\Http\Request;
use App\ChatWidgetEmail;
use App\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

class ChatWidgetController extends Controller
{
    
    public function createMessage(REQUEST $request){
        $this->validate($request, [
            'email' => 'required|email',
            'token' => 'required',
            'id' => 'required|exists:users',
            'message' => 'required',
            'url' => 'required'
        ]);

        if($user = User::where('id',$request['id'])->where('token',$request['token'])->first()){

            $new_message = new ChatWidgetEmail;            
            $new_message->user_id = $user->id;
            $new_message->contents = $request['message'];
            $new_message->from_email = $request['email'];
            $new_message->url = $request['url'];
            $new_message->save();

            
            Mail::send([], [], function ($message) use($user,$new_message){
                $message->to($user->email)
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