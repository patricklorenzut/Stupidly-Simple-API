<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use  App\User;

class UserController extends Controller
{
     /**
     * Instantiate a new UserController instance.
     *
     * @return void
     */
    public function __construct()
    {
        
    }

    /**
     * Get the authenticated User.
     *
     * @return Response
     */
    public function profile()
    {
        return response()->json(Auth::user(), 200);
    }    

    public function logout()
    {
        Auth::logout();
        return response()->json(['message' => 'Successfully logged out.'], 200);
    }

}