# I. Backend Side (Laravel)
Let's talk about backend first.

## 1. Installation
```
php artisan api:install
```

## 2. Use HasApiTokens trait in User.php
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
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('get-auth', [AuthController::class, 'getAuthUser']);
});
```
### Sidenote
- Don't forget to put "get-auth" route within the middleware, if it is not, auth user can't be fetch.

## 4. Add custom API response helper method in Controller.php
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

                $token = $user->createToken('appToken')->plainTextToken;
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

# II. Frontend Side (Vue.js)
Now, let's implement in frontend side.

## 1. Create axios instance
This ensure wetting up axios with headers, authorization and token remove when token does exit on server
```js
// axios.js
import axios from "axios";

// Create an instance of Axios
const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: { "X-Requested-With": "XMLHttpRequest" },
});

// Add an interceptor to set the Authorization header
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("appToken");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  } else {
    console.log("no token - from config");
  }
  return config;
});

// this is just to remove token from local storage when there is no token in the server
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized errors
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("appToken");
      window.location.replace("/");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
```

## 2. Authentication codes at store
```js
// stores/auth.js

import axios from "@/composables/axios";

export const useAuthStore = defineStore('auth', () => {
    /**
     * Get auth user
    */
    const authUser = ref({})
    const getAuthUser = async () => {
      try {
        const res = await axiosInstance.get(`/get-auth`);
        if(res.status === 200){
            authUser.value = res.data.data
        }
      } catch (error) {
        console.error(error);
      }
    }

    /**
     * Register
    */
    const registerForm = reactive({
      'name': '',
      'email': '',
      'password': ''
    })
    const register = async () => {
      try {
        const res = await axios.post("/register", registerForm);
        if(res.status === 201){
          // some logic after success 
        }
      } catch (error) {
       // fails
      }
    }

    /**
     * Login
    */
    const loginForm = reactive({
      'email': '',
      'password': ''
    })
    const login = async () => {
      try {
        const res = await axios.post("/login", loginForm);
        if(res.status === 201){
          localStorage.setItem('taskToken', res.data.data)
          // some logic after success 
        }
      } catch (error) {
        // fails
      }
    }

  /**
   * Logout
  */
  const logout = async () => {
    if(!confirm('Are you sure to logout?')) {
      return
    }
    try {
      const res = await axios.post("/logout");
      if(res.status === 200){
        localStorage.removeItem('taskToken')
        // some logic after success
      }
    } catch (error) {
      console.error(error);
    }
  }
 

  return { 
    getAuthUser, 
    authUser, 

    registerForm, 
    register,

    loginForm, 
    login,

    logout
  }
})
```

## 3. Protecting Routes
```js
// router/index.js

...

// Protecting routes
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("ooredooToken");

  // public routes
  const publicRoutes = ["home", "login"];

  if (!publicRoutes.includes(to.name) && !token) {
    next({ name: "login" });
  } else {
    next();
  }
});
export default router;
```


## 4. Prevent login page after authenticated
```js
<script setup>
...

onMounted(() => {
  const token = localStorage.getItem("appToken");
  if (token) {
    router.push("/");
  }
});
</script>
```
