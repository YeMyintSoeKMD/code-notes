# Localization for Laravel + Inertia + vue

## Backend setup

### Publishing the Language Files

```bash
php artisan lang:publish
 ```

 That command create ```/lang``` folder at root directory.
 Must be create language file in ```/lang``` folder.

 ```
 project-root/
├── app/                
│   ---
├── lang/  
│   ├── en/     
│   │    ├── en.json/   
│   ├── mm/          
│   │    ├── enmm.json/   
│   ----
 ```

 Or

 ```
 project-root/
├── app/                
│   ---
├── lang/      
│   ├── en.json/         
│   ├── mm.json/   
│   ----
 ```

```lang/mm.json```

```json
{
    "dashboard": "အထွေထွေ",
    "payment_method": "ငွေပေးချေရန် နည်းလမ်းများ",
    "branches": "ဆိုင်ခွဲများ",
}
```

Three translations are accessible. The Myanmar translations, visible in the Vue components, are the values, while the English translations are the key.

```config/app.php```

```php
'locale' => env('APP_LOCALE', 'en'), //Default locale value

'fallback_locale' => env('APP_FALLBACK_LOCALE', 'en'), // if somethings error happen this value will be use as locale

'faker_locale' => env('APP_FAKER_LOCALE', 'en_US'),


'supported_locales' => [ 'en' => 'English', 'mm' => 'Myanmar'], // Just support_locales value can be use as locale 

```

create controller for switch locale

```routes/web.php```

```php
use App\Http\Controllers\LocaleController;

Route::get('/switch-locale/{locale}', [LocaleController::class, 'switchLocale'])->name('switchLocale');
```

```App/Http/Controllers/LocaleController.php```

```php
  //   Option 1 (controller)
  public function switchLocale(Request $request, $locale)
    {
        $locale = $request->route('locale'); //get modify locale value from request
        
        // check passing locale value is contain in supported_locales 
        if (in_array($locale, array_keys(config('app.supported_locales')))) {
            
            // stored  modify locale value in session
            Session::put('locale', $locale);

            // stored modify locale value App instance
            App::setLocale($locale);
        }
        return back()
    }

    // Option 2 (middleware)
    // create middleware


    namespace App\Http\Middleware;

    use Closure;
    use Illuminate\Http\Request;
    use Illuminate\Support\Facades\App;
    use Illuminate\Support\Facades\Route;
    use Illuminate\Support\Facades\Session;
    use Symfony\Component\HttpFoundation\Response;

    class SetLocale
    {
        /**
         * Handle an incoming request.
         *
         * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
         */
        public function handle(Request $request, Closure $next): Response
        {
            $isSwitchLocaleRoute = Route::currentRouteName() === 'switchLocale';
            if ($isSwitchLocaleRoute) {
                $locale = $request->route('lang');
                if (in_array($locale, array_keys(config('app.supported_locales')))) {
                    Session::put('locale', $locale);
                    App::setLocale($locale);
                }
            }
            return $next($request);
        }
    }

    // register that middleware in  bootstrap/app.php

    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            \App\Http\Middleware\SetLocale::class,
            // ----
        ]);
        //
    })
```

Then you can pass locale data to vue from ```HandlerInertiaRequest.php```

```App/Http/Middleware/HandlerInertiaRequest.php```

```php
public function share(Request $request) {

    // get supported locales
    $supported_locales = config('app.supported_locales');

    // get current locale from session but if not have set default locale 
    $locale = Session::get('locale', App::getLocale());

    // get current locale file path
    $file = lang_path($locale . ".json");

    //  check current locale file is exists, if exist set it file as translations file or set empty array
    $translations = File::exists($file) ? File::json($file) : [];

    // pass to front
    return array_merge(parent::share($request), [
        'supported_locales' => $supported_locales,
        'current_locale' => $locale,
        'translations' => $translations,
    ]);
}
```

## Frontend

```pages/index.vue```

```html
<template>
    <div>
        <!-- current locale -->
        <h1>{{ supported_locales[locale] }}</h1>

        <!-- if current locale is myanmar $t('dashboard') return "အထွေထွေ" -->
        <h1>{{ $t('dashboard') }}</h1>

        <!-- if current locale is myanmar $t('dashboard') return "ငွေပေးချေရန် နည်းလမ်းများ" -->
        <p>{{ $t('payment_method') }}</p>

        <!-- if current locale is myanmar $t('dashboard') return "ဆိုင်ခွဲများ" -->
        <p>{{ $t('branches') }}</p>
        <select v-model="selectedLocale" @change="switchLocale(index)">
            <option v-for="(language, index) in supported_locales" :key="index" :value="index">
                {{ language }}
            </option>
        </select>

    </div>
</template>

<script setup>
const props = defineProps({
    supported_locales : Object,
    locale : String,
    translations : Object
})

const switchLocale = (locale) => {
    router.get('/switch-locale/' + locale, {},);
}

  const $t = (key) => {
        return props.translations[key] || key;
    };

</script>
```
