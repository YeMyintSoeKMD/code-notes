# I. Backend Side (Laravel)
Let's talk about backend first.

## 1. Installation
```
php artisan api:install
```

## 2. Use HasApiTokens in User.php
```php
// User.php
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens;
    ...
}
```

## 3. Routes (api.php)
```php
// api.php

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->group(function () {
    // Logout
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('get-auth', [AuthController::class, 'getAuthUser']);
});
```

## 4. Common response in Controller.php
```php
// Controller.php
/**
 * Success response
 * @param Object $data
 * @param HTTP_STATUS_CODE $statusCode
*/
protected function successResponse($data, $statusCode = 200)
{
    return response()->json([
        'status' => 'success',
        'data' => $data,
    ], $statusCode);
}

/**
 * Fails response
 * @param String $message
 * @param String $error
 * @param HTTP_STATUS_CODE $statusCode
*/
protected function failsResponse($message, $error, $statusCode = 500)
{
    return response()->json([
        'status' => 'fails',
        'message' => $message,
        'error' => $error,
    ], $statusCode);
}
```

## 5. AuthController Codes
```php
// AuthController.php

class AuthController extends Controller
{
    /**
     * Register
     * @param Request $request
     */
    public function register(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|min:3',
                'email' => 'required|email|unique:users,email',
                'password' => 'required|min:6'
            ]);
            if ($validator->fails()) {
                return $this->failsResponse("Register fails", $validator->messages());
            }
            $user = User::create($validator->validated());
            return $this->successResponse($user, 201);
        } catch (\Exception $e) {
            return $this->failsResponse("Register fails", $e->getMessage());
        }
    }

    /**
     * Login
     * @param Request $request
     */
    public function login(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'email' => 'required|email',
                'password' => 'required|min:6'
            ]);
            if ($validator->fails()) {
                return $this->failsResponse("Login fails", $validator->messages());
            }
            if (auth()->attempt($validator->validated())) {
                $user = Auth::user();

                $token = $user->createToken('task')->plainTextToken;
                return $this->successResponse($token, 201);
            } else {
                return $this->failsResponse("The provided credentials do not match our records.", 401);
            }
        } catch (\Exception $e) {
            return $this->failsResponse("Login fails", $e->getMessage(), 401);
        }
    }

    /**
     * Logout
     * @param Request $request
     */
    public function logout(Request $request)
    {
        try {
            $request->user()->currentAccessToken()->delete();
            return $this->successResponse(null);
        } catch (\Exception $e) {
            return $this->successResponse("Logout fails", $e->getMessage());
        }
    }

    /**
     * Get auth user
     */
    public function getAuthUser()
    {
        return $this->successResponse(Auth::user());
    }
}
```

# Frontend Side (Vue.js)
Now, let's implement in frontend side.

## 1. 
