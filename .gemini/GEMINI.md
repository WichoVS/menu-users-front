# Frontend Development Rules - React.js, React Router Dom ^7.13, Tailwind 4

**CRITICAL: These rules are MANDATORY and must be followed in every component and file.**

## NEVER DO THESE (Automatic Code Rejection)

- Never use `<div>` for clickable elements - use `<button>` or `<Link>`
- Never use `<div>` when semantic alternatives exist:
- Navigation menus → `<nav>`
- Page/section headers → `<header>`
- Main content area → `<main>`
- Content sections → `<section>`
- Clickable elements → `<button>` or `<Link>`
- Never use `<a>` for internal links - ALWAYS use `<Link>` or `<NavLink>` from `react-router`
- Never hardcode colors, spacing, or fonts (no `bg-[#123]`, `p-[24px]`)
- Never use string concatenation for classes - ALWAYS use `cn()` utility
- Never create new components without checking existing ones first
- Never use inline styles or style props
- Never skip alt text on images
- Never use non-semantic HTML when semantic options exist

## MANDATORY IMPORTS & PATTERNS

### Required Imports (Use These First)
```typescript
// ALWAYS import these when needed
import { Link } from 'react-router' // For ALL internal links
import { NavLink } from 'react-router' // For internal links when you need conditional rendering
import { cn } from '@/lib/utils' // For ALL className logic
```

### Component Header Template (Start Every Component With This)
```typescript
import { cn } from '@/lib/utils'
import {Link} from 'react-router'
// Import existing components from @/components first
// Only create new ones if absolutely necessary

interface ComponentNameProps {
className?: string
// ... other props with proper types
}

export default function ComponentName({
className,
...props
}: ComponentNameProps) {
return (
<semantic-element className={cn(
'base-tailwind-classes',
className
)}>
{/* Content */}
</semantic-element>
)
}
```

## SEMANTIC HTML ENFORCEMENT

### Use This Hierarchy (In Order of Preference)
1. **Semantic elements first**: `<button>`, `<nav>`, `<header>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`
2. **Interactive elements**: `<Link>`, `<form>`, `<input>`, `<select>`
3. **Content elements**: `<h1-h6>`, `<p>`, `<ul>`, `<ol>`, `<li>`
4. **Generic containers last**: `<div>`, `<span>` (only when no semantic alternative exists)

### Examples of Correct Semantic Usage
```typescript
// Navigation
<nav className={cn('flex items-center gap-4', className)}>
<Link href="/about" className="hover:text-primary">About</Link>
</nav>

// Clickable card
<Link href={`/posts/${slug}`} className={cn('block p-6 rounded-lg border', className)}>
<article>
<h3 className="text-xl font-semibold">{title}</h3>
<p className="text-gray-600">{excerpt}</p>
</article>
</Link>

// Button with action
<button
onClick={handleSubmit}
className={cn('px-4 py-2 bg-primary text-white rounded', className)}
>
Submit
</button>

// Main content area
<main className="container mx-auto px-4">
<header className="mb-8">
<h1 className="text-3xl font-bold">{title}</h1>
</header>
<section className="prose">
{content}
</section>
</main>
```

## TAILWIND & STYLING RULES

### Class Management with `cn` (MANDATORY)
```typescript
// ALWAYS use cn() - never string concatenation
className={cn(
'base-classes',
{
'conditional-class': condition,
'another-class': anotherCondition
},
props.className
)}

// NEVER do this
className={`base-classes ${condition ? 'conditional' : ''} ${props.className}`}
```

### Allowed Tailwind Classes Only
```css
/* Use ONLY these theme values from globals.css */
/* Colors: primary, secondary, accent, gray-50 through gray-900 */
/* Spacing: p-1 through p-12, m-1 through m-12, gap-1 through gap-12 */
/* Typography: text-xs, text-sm, text-base, text-lg, text-xl, text-2xl, etc. */
/* NO arbitrary values: bg-[#123], p-[24px], text-[1.5rem] */
```

## IMAGE & LINK HANDLING

### Links (MANDATORY react-router usage)
```typescript
// Internal links
<Link to="/about" className="hover:text-primary">
About Us
</Link>

// External links
<a
href="https://external.com"
target="_blank"
rel="noopener noreferrer"
className="text-blue-600 underline"
>
External Link
</a>
```

## COMPONENT REUSE PROTOCOL

### Before Creating New Components (MANDATORY CHECK)
1. **Search existing components** in `/src/components/`
2. **Check if extension is possible** rather than creating new
3. **Import and reuse** existing components
4. **Only create new** if absolutely necessary

### Component Discovery Pattern
```typescript
// ALWAYS check these imports first
import { Button } from '@/components/Button'
import { Card } from '@/components/Card'
import { Modal } from '@/components/Modal'
// etc.

// Then extend if needed
const CustomButton = ({ variant = 'primary', ...props }) => (
<Button variant={variant} {...props} />
)
```

## CODE REVIEW CHECKLIST

Before submitting any component, verify:

- [ ] Uses semantic HTML elements appropriately
- [ ] Uses `react-router` for all internal navigation
- [ ] Uses `cn()` utility for all className logic
- [ ] No hardcoded values (colors, spacing, fonts)
- [ ] Checks existing components before creating new ones
- [ ] Proper TypeScript interfaces
- [ ] Accessible markup with ARIA attributes where needed
- [ ] Responsive design with mobile-first approach

## ENFORCEMENT RULES

**If any of these rules are violated, the code should be immediately refactored:**

1. **Semantic Violations**: Replace `<div>` with proper semantic elements
2. **Import Violations**: Add required imports (`Link`, `cn`)
3. **Styling Violations**: Replace hardcoded values with Tailwind utilities
4. **Component Violations**: Check for existing components and reuse
5. **Accessibility Violations**: Add proper ARIA attributes and alt text

---

**Remember: These rules exist to create maintainable, accessible, and performant React applications. Every violation makes the codebase harder to maintain and less accessible to users.**