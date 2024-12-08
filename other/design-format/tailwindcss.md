# 1. General Principles
1. Consistency: Ensure consistent class naming and ordering.
2. Readability: Use meaningful HTML structure and group related TailwindCSS classes.
3. Reusability: Extract repeated class patterns into reusable components or utilities.
4. Documentation: Comment where necessary for complex layouts or logic.
5. Mobile-First Approach: Start designing for small screens and add breakpoints for larger screens.

# 2. HTML Structure
Use semantic HTML
- main
- header
- footer
- section
- aside
<br/> etc. for better accessibility and SEO.

# 3. TailwindCSS Class Ordering
Adopt a logical order for TailwindCSS classes to improve readability. Follow this suggested order:
1. Layout: container, flex, grid, block, hidden, w-*, h-*, p-*, m-*
2. Positioning: absolute, relative, fixed, top-*, left-*
3. Typography: font-*, text-size/color*, leading-*, tracking-*
4. Background: bg-*
5. Border & Shadow: border-*, rounded-*, shadow-*
6. Effects & Transitions: opacity-*, hover:*, transition-*

Example:
```html
<div class="flex items-center justify-center gap-2 h-screen bg-gray-50">
    <button class="px-4 py-2 font-semibold text-xl text-white bg-blue-500 rounded-lg hover:bg-blue-600">
        Click Me
    </button>
    <!-- ... -->
</div>
```

# 4. Breakpoints
1. Always design mobile-first.
2. Use consistent breakpoints:
- none: Extra small screens (<640px)
- sm: Small screens (640px)
- md: Medium screens (768px)
- lg: Large screens (1024px)
- xl: Extra-large screens (1280px)
- 2xl: 2x Extra-large screens (1536px)

Example:
```html
<div class="p-4 sm:p-6 md:p-8 lg:p-10">
    <p class="text-sm md:text-lg lg:text-xl">Responsive text size example</p>
</div>
```

# 5.Component Structure
For complex UI components:
1. Break them into smaller reusable components.
2. Use @apply in CSS files if the same combination of classes is used repeatedly.
3. Keep component-specific utilities in a components/ folder.

Example:
```html
/* components/button.css */
.btn-primary {
    @apply px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600;
}
```

# 6. Element Structure
```html
<nav id="navigation">
    <div class="container mx-auto">
        ...
    </div>
</nav>
<header id="header">
    <div class="container mx-auto">
        ...
    </div>
</header>
<section id="about">
    <div class="container mx-auto">
        ...
    </div>
<section>
<section id="services">
    <div class="container mx-auto">
        ...
    </div>
<section>
<footer id="footer">
    <div class="container mx-auto">
        ...
    </div>
<footer>
```
