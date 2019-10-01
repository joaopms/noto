<?php

namespace App\Http\Controllers\Api;

use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\Api\Auth\LoginRequest;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    protected function login(LoginRequest $credentials)
    {
        // Check if the email and password match
        if (!Auth::attempt(['email' => $credentials->email, 'password' => $credentials->password])) {
            throw ValidationException::withMessages([
                'email' => 'These credentials do not match our records.',
            ]);
        }

        // Get the user and return the API token
        $user = User::findByEmail($credentials->email);
        return response()->json([
            'email' => $user->email,
            'api_token' => $user->api_token
        ]);
    }
}
