<?php

namespace App\Http\Controllers\Api\V1\Users;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    public function edit(User $user)
    {
        return response()->json([
            'data' => $user->only(['id', 'name', 'email'])
        ]);
    }
}
