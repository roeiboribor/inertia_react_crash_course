<?php

namespace App\Http\Controllers\Users;

use App\Http\Controllers\Controller;
use App\Http\Requests\Users\StoreRequest as StoreUserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return inertia('Users/Index', [
            'users' => \App\Models\User::whereNot('id', auth()->user()->id)->get()->toArray(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $validated = $request->validated();

        if ($validated) {
            try {
                \App\Models\User::create([
                    ...$validated,
                    'password' => Hash::make(config('app.default_user_password'))
                ]);

                return to_route('users.index');
            } catch (\Exception $err) {
                $errorCode = 'Error Code:[' . uniqid(now() . ' - ') . ']';
                Log::error($err->getMessage() . ' Creating User' . $errorCode);
                return to_route('users.index')->withErrors(['message' => $errorCode]);
            }
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreUserRequest $request, User $user)
    {
        try {
            $user->update($request->validated());
            return to_route('users.index');
        } catch (\Exception $err) {
            $errorCode = 'Error Code:[' . uniqid(now() . ' - ') . ']';
            Log::error($err->getMessage() . ' Updating User' . $errorCode);
            return to_route('users.index')->withErrors(['message' => $errorCode]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        try {
            $user->delete();
            return to_route('users.index');
        } catch (\Exception $err) {
            $errorCode = 'Error Code:[' . uniqid(now() . ' - ') . ']';
            Log::error($err->getMessage() . ' Deleting User' . $errorCode);
            return to_route('users.index')->withErrors(['message' => $errorCode]);
        }
    }
}
