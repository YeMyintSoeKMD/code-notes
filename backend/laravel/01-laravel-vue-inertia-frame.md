# laravel + Vue.js with Inertia Project Setup

This docs is intended to be used for "Laravel Vue with Inertia" projects. The project type can be known as VILT stacks.

VILT => Vue.js, InertiaJs, Laravel, TailwindCSS

# I. Project Installation
## Option 1
For the installattion process, All of these (Vue.js, InertiaJs, Laravel, TailwindCSS) can be install one by one manually. This is because of the Laravel based project, the installation process might be as below -
1. Install Laravel
   https://laravel.com/docs/11.x/installation
  
2. Install InertiaJs
   https://inertiajs.com/server-side-setup
   https://inertiajs.com/client-side-setup

3. Install Vue.js
   https://laravel.com/docs/11.x/vite#vue

4. Install TailwindCSS
   https://tailwindcss.com/docs/guides/laravel

## Option 2
There is another option that we can install the whole VILT with one go. It is exactly "Laravel Starter Kit". The installation process will be as below
1. Install Laravel
   https://laravel.com/docs/11.x/installation

3. Install Laravel Starter Kit
   https://laravel.com/docs/11.x/starter-kits#laravel-breeze-installation

### Side Note
After Starter Kit installed, not only "the whole VILT stacks" and also "breeze authentication" will be included.

<br />

# III. Resuable Components

In resources directory

```plaintext
resource
├── css
│   └── app.css
├── js
│   ├── Composables
|   |   ├── httpMethods.js
|   |   └── module.js
|   ├── Pages
│   │   ├── Admin
│   │   │   └── AdminComponents
│   │   │       
│   │   ├── Front
└── view
```

In ```resource/js/Composables/httpmethod.js``` have http methods

``` js

/**
* That is post method
* you can call ```post(form,'route('example.store')')``` when you need post method
*/
const post = (form, url, preserveScroll = true, tasksOnSuccess = () => {}) => {
    form.submit("post", url, {
        preserveScroll: preserveScroll,
        onSuccess: () => {
            tasksOnSuccess();
            toast.success("Congrats, it's successful!", {
                autoClose: 300,
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        },
    });
};

/**
* That is get method
* you can call ```get(form,route('example.index'))``` when you need get method
*/
const get = (form, url,preserveScroll = true, tasksOnSuccess = () => {}) => {
    form.submit("get", url, {
        preserveScroll: preserveScroll,
        preserveState: true,
        onSuccess: () => {
            tasksOnSuccess();
            toast.success("Congrats, it's successful!", { autoClose: 300 });
        },
    });
};

/**
* That is update method (note => this update method is just for text not for file)
* you can call ```update(form,route('example.update'))``` when you need update method
*/
const update = (form, url, tasksOnSuccess = () => {}) => {
    let options = {
        preserveScroll: true,
        onSuccess: () => {
            tasksOnSuccess();
            toast.success("Congrats, it's successful!", { autoClose: 300 });
        },
    };
    form.submit("put", url, options);
};

/**
* This update method is you can use when file update
* you can call ```updateWithFile(form,route('example.update'))``` when you want  update file such as image or video ....
*/
const updateWithFile = (method, form, url, tasksOnSuccess = () => {}) => {
    form.processing = true;
    form._method = method;
    router.post(url, form, {
        preserveScroll: true,
        onSuccess: () => {
            toast.success(
                "Congrats, your successfully created your portfolio!",
                {
                    autoClose: 300,
                }
            );
            form.processing = false;
        },
        onError: () => {
            form.processing = false;
            toast.error("Something went wrong!", {
                autoClose: 300,
            });
        },
    });
};
```

In  ```resource/js/Pages/Admin/AdminComponents``` directory have Layout.vue , Sidebar.vue , NavBar.vue file.

At Layout.vue

```javascript

<template>
  <div>
    <!-- sidebar  -->
    <Sidebar :isSidebarOpen="isSidebarOpen" @closeSidebar="isSidebarOpen = false" />

    <div class="lg:pl-72">
      <!-- navbar  -->
      <Navbar @openSidebar="isSidebarOpen = true" />

      <main class="py-10">
        <div class="px-4 sm:px-6 lg:px-8">
          <!-- Your content -->
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import Sidebar from '@/Pages/Admin/AdminComponents/Sidebar.vue'
import Navbar from '@/Pages/Admin/AdminComponents/Navbar.vue'
import { ref } from '@/Composables/modules.js';

const isSidebarOpen = ref(false)
</script>
```

and Sidebar.vue

```javascript
<template>
    <div>
        <!-- sidebar for mobile  -->
        <TransitionRoot as="template" :show="isSidebarOpen">
            <Dialog as="div" class="relative z-50 lg:hidden" @close="$emit('closeSidebar')">
                <TransitionChild as="template" enter="transition-opacity ease-linear duration-300"
                    enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300"
                    leave-from="opacity-100" leave-to="opacity-0">
                    <div class="fixed inset-0 bg-gray-900/80" />
                </TransitionChild>

                <div class="fixed inset-0 flex">
                    <TransitionChild as="template" enter="transition ease-in-out duration-300 transform"
                        enter-from="-translate-x-full" enter-to="translate-x-0"
                        leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0"
                        leave-to="-translate-x-full">
                        <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
                            <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0"
                                enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100"
                                leave-to="opacity-0">
                                <div class="absolute left-full top-0 flex w-16 justify-center pt-5">
                                    <button type="button" class="-m-2.5 p-2.5" @click="$emit('closeSidebar')">
                                        <span class="sr-only">Close sidebar</span>
                                        <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
                                    </button>
                                </div>
                            </TransitionChild>
                            <!-- Sidebar component, swap this element with another sidebar if you like -->
                            <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                                <div class="flex h-16 shrink-0 items-center">
                                    <img class="h-8 w-auto" src="/images/logo.jpg" alt="Your Company" />
                                </div>
                                <nav class="flex flex-1 flex-col">
                                    <ul role="list" class="flex flex-1 flex-col gap-y-7">
                                        <li>
                                            <ul role="list" class="-mx-2 space-y-1">
                                                <li v-for="item in navigation" :key="item.name">
                                                    <Link :href="$route(`${item.href}`)"
                                                        :class="[$page.component.startsWith(item.component) ? 'bg-gray-50 text-indigo-600' : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50', 'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold']">
                                                    <component :is="item.icon"
                                                        :class="[$page.component.startsWith(item.component) ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600', 'h-6 w-6 shrink-0']"
                                                        aria-hidden="true" />
                                                    {{ item.name }}
                                                    </Link>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <div class="text-xs font-semibold leading-6 text-gray-400">Set up</div>
                                            <ul role="list" class="-mx-2 space-y-1">
                                                <template v-for="setup in setup" :key="setup.name">
                                                    <li>
                                                        <Link :href="$route(`${setup.href}`)"
                                                            :class="[$page.component.startsWith(setup.component) ? 'bg-gray-50 text-indigo-600' : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50', 'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold']">
                                                        <component :is="setup.icon"
                                                            :class="[$page.component.startsWith(setup.component) ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600', 'h-6 w-6 shrink-0']"
                                                            aria-hidden="true" />
                                                        {{ setup.name }}
                                                        </Link>
                                                    </li>
                                                </template>
                                            </ul>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </Dialog>
        </TransitionRoot>

        <!-- Static sidebar for desktop -->
        <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
            <!-- Sidebar component, swap this element with another sidebar if you like -->
            <div class="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
                <div class="flex h-16 shrink-0 items-center">
                    <img class="h-8 w-auto" src="/images/logo.jpg" alt="Your Company" />
                </div>
                <nav class="flex flex-1 flex-col">
                    <ul role="list" class="flex flex-1 flex-col gap-y-7">
                        <li id="dashboard-menu">
                            <ul role="list" class="-mx-2 mt-2 space-y-1">
                                <li v-for="item in navigation" :key="item.name">
                                    <Link :href="$route(`${item.href}`)"
                                        :class="[$page.component.startsWith(item.component) ? 'bg-gray-50 text-indigo-600' : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50', 'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold']">
                                    <component :is="item.icon"
                                        :class="[$page.component.startsWith(item.component) ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600', 'h-6 w-6 shrink-0']"
                                        aria-hidden="true" />
                                    {{ item.name }}
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li id="setup-menu" v-if="hasAnySetupPermission">
                            <div class="text-xs font-semibold leading-6 text-gray-400">Setup Management
                            </div>
                            <ul role="list" class="-mx-2 space-y-1">
                                <template v-for="setup in setup" :key="setup.name">
                                    <li>
                                        <Link :href="$route(`${setup.href}`)"
                                            :class="[$page.component.startsWith(setup.component) ? 'bg-gray-50 text-indigo-600' : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50', 'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold']">
                                        <component :is="setup.icon"
                                            :class="[$page.component.startsWith(setup.component) ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600', 'h-6 w-6 shrink-0']"
                                            aria-hidden="true" />
                                        {{ setup.name }}
                                        </Link>
                                    </li>
                                </template>
                            </ul>
                        </li>                        
                    </ul>
                </nav>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Link, usePage } from '@/Composables/modules'
import { computed } from 'vue';

import {
    Dialog,
    DialogPanel,
    TransitionChild,
    TransitionRoot,
} from '@headlessui/vue'

import {
    Cog6ToothIcon,
    HomeIcon,
    UsersIcon,
    ListBulletIcon,
    XMarkIcon,
} from '@heroicons/vue/24/outline'

// props
defineProps(['isSidebarOpen'])
const page = usePage()


// menus
const navigation = [
    { name: 'Dashboard', href: 'admin', icon: HomeIcon, component: 'Admin/Index' },
]

const setup = [
    { name: 'Home', href: 'home.index', icon: HomeIcon, component: 'Admin/Home'},
    { name: 'Sub Navbar', href: 'subnavs.index', icon: Bars3CenterLeftIcon, component: 'Admin/Subnav'},
    { name: 'Gallery', href: 'galleries.index', icon: PhotoIcon, component: 'Admin/Gallery'},
    { name: 'Payment Methods', href: 'payment-methods.index', icon: CurrencyDollarIcon, component: 'Admin/PayMethod'},
    { name: 'Roadmap', href: 'road-maps.index', icon: MapIcon, component: 'Admin/Roadmap'},
    { name: 'Testimonials', href: 'testimonials.index', icon: ChatBubbleBottomCenterTextIcon, component: 'Admin/Testimonial'},
    { name: 'FAQs', href: 'faqs.index', icon: QuestionMarkCircleIcon, component: 'Admin/Faq'},
    { name: 'Contact', href: 'contacts.index', icon: ChatBubbleLeftEllipsisIcon, component: 'Admin/Contact'}
]

</script>

<style lang="scss" scoped></style>
```

<br />

In Navbar.vue

```js
<template>
  <div
    class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
    <button type="button" class="-m-2.5 p-2.5 text-gray-700 lg:hidden" @click="$emit('openSidebar')">
      <span class="sr-only">Open sidebar</span>
      <Bars3Icon class="h-6 w-6" aria-hidden="true" />
    </button>

    <!-- Separator -->
    <div class="h-6 w-px bg-gray-200 lg:hidden" aria-hidden="true" />

    <div class="flex flex-1 justify-end gap-x-4 self-stretch lg:gap-x-6">
      <div class="flex items-center gap-x-4 lg:gap-x-6">
        <button type="button" class="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500 relative">
          <span class="sr-only">View notifications</span>
          <BellIcon class="h-6 w-6" aria-hidden="true" />
          <span class="absolute top-0 bg-red-500 py-1 px-2 rounded-full text-xs text-white">
            {{ page.props.new_payments.count + page.props.certificateCount }}
          </span>
        </button>

        <!-- Separator -->
        <div class="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" aria-hidden="true" />

        <!-- Profile dropdown -->
        <Menu as="div" class="relative">
          <MenuButton class="-m-1.5 flex items-center p-1.5">
            <span class="sr-only">Open user menu</span>
            <UserCircleIcon class="h-8 w-8 rounded-full bg-gray-50"  />
            <span class="hidden lg:flex lg:items-center">
              <span class="ml-4 text-sm font-semibold leading-6 text-gray-900" aria-hidden="true">
                <span>
                  {{ authUser.name }}
                </span>

              </span>
              <ChevronDownIcon class="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </MenuButton>
          <transition enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95">
            <MenuItems
              class="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
              <MenuItem v-for="item in userNavigation" :key="item.name" v-slot="{ active }">
              <a :href="item.href"
                :class="[active ? 'bg-gray-50' : '', 'block px-3 py-1 text-sm leading-6 text-gray-900']">{{ item.name
                }}</a>
              </MenuItem>
            </MenuItems>
          </transition>
        </Menu>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems
} from '@headlessui/vue'
import {
  Bars3Icon,
  BellIcon,
  UserCircleIcon
} from '@heroicons/vue/24/outline'
import { ChevronDownIcon, MagnifyingGlassIcon, UserIcon } from '@heroicons/vue/20/solid'
import { usePage } from '@/Composables/modules'

const page = usePage()
const authUser = page.props.auth.user;

const userNavigation = [
  { name: 'Profile', href: authUser ? `/profile/${authUser.id}` : '#' },
  { name: 'Sign out', href: '/logout' },
]

</script>

<style lang="scss" scoped></style>
```

<br />

## IV. REFERENCE

- Inertia documentation
<br /> <https://inertiajs.com/>
