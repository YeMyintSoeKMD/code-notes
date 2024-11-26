# First, use HasApiTokens in User.php
```php
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;
    ...
}
```

```php
// AuthController

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
