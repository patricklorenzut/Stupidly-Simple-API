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
    
    public function switch(){
        Mail::send([], [], function ($message) {
            $message->to('patrick.lorenzut@gmail.com')
                ->subject('Chat Thingy is being replaced')
                ->setBody('<p>Hello person.</p>

                <p><a href="https://chatthingy.com/">Chat Thingy</a> is being replaced by <a href="https://underpolished.com/">Underpolished Chat</a>. Underpolished is simpler and 100% private. Unlike Chat Thingy, it’s paid... but for all Chat Thingy users I’ll do my best to make sure that it stays free for life.</p>
                
                <p>If you’d like help migrating please just reply to this email.</p>
                
                <p>You are receiving this email because you created a Chat Thingy account. This is a one-time account-related notification and you have not been added to any email lists.</p>
                
                <p>Cheers,</p>
                <p>Patrick</p>'
                , 'text/html');
          });
    }

    public function createMessage(REQUEST $request){
        $this->validate($request, [
            'email' => 'required|email',
            'token' => 'required',
            'id' => 'required|exists:users',
            'message' => 'required',
            'url' => 'required',
            'name' => 'required|integer'
        ]);

        if($request->name != 822){
            return response()->json(['message' => 'Not today, junior.'], 403);
        }

        //spam protection is going to look like this temporarily:
        //1: check how many requests this token has received in the last 10 seconds.
        //if more than 5, disable
        //of course this won't work if a site gets hundreds of thousands of visitors, but whatever, we aren't serving those people.

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
                    ->setBody('
                        <strong>'.$new_message->from_email.' said:</strong><br/><br/>
                        '.nl2br($new_message->contents).'
                        <br/><br/>
                        ---
                        <br/><br/>
                        This message was sent via <a href="https://underpolished.com">Underpolished Chat</a> installed on '.$new_message->url.'<br/>
                        Simply click "Reply" to continue the conversation.
                    '
                    , 'text/html');
              });
        }else{
            return response()->json(['message' => 'Invalid credentials'], 501);
        }        
    }

}