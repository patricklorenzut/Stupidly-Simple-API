<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class MailgunController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    //
    public function emailTest(Request $request) {
        

        Mail::send([], [], function ($message) {
            $message->to('patrick.lorenzut@gmail.com')
                ->subject('New message from test@stupidlysimple.app')              
                ->replyTo('test@stupidlysimple.app')
                ->setBody('
                    <strong>test@stupidlysimple.app said:</strong><br/><br/>
                    Test body. this can be html if you want.
                    <br/><br/>
                    ---
                    <br/><br/>
                    This message was sent via <a href="https://stupidlysimple.app">Stupidly Simple Chat Widget</a> installed on https://lorenzut.com<br/>
                    Simply click "Reply" to continue the conversation.
                '
                , 'text/html');
          });

    }
}