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
        
        Mail::raw('Raw string email', function($msg) { 
            $msg->to(['patrick.lorenzut@gmail.com']);
        });

    }
}