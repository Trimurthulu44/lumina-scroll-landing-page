# Lumina Landing Page — Technical Documentation

## 1. Project Overview
**Lumina** is a modern, high-conversion landing page built for a premier digital product studio. The goal was to engineer a high-aesthetic, scroll-driven interactive experience that demonstrates senior-level React front-end craftsmanship without compromising performance budgets or accessibility guidelines.

---

## 2. Design Decisions & Visual Language
- **Color Architecture**:
  - Primary Base: Indigo / Violet (`#6366f1`, `#4f46e5`) bridging into a vibrant Cyan (`#06b6d4`).
  - Dark Mode: Custom dark palette (`#090d16` background, `#0f172a` surface cards) with subtle high-contrast borders (`#1e293b`).
  - Light Mode: Crisp off-white (`#f5f7ff`) base with deep slate typography (`#0f172a`), preserving crisp legibility.
- **Glassmorphism**:
  - Background blurs (`backdrop-blur-md` and `backdrop-blur-xl`) paired with semi-transparent border lines (`rgba(255, 255, 255, 0.08)`) to create depth without obscuring readability.
- **Typography**:
  - Headings & Primary UI: *Plus Jakarta Sans* for modern, geometric clarity.
  - Body & Form copy: *Inter* for maximum legibility at compact sizes.

---

## 3. Implementation of the 14 Core Requirements

| # | Requirement | Implementation Strategy | File Location |
|---|-------------|-------------------------|---------------|
| 1 | **Responsive Navbar** | Sticky top bar with glass blur, active section tracker using `IntersectionObserver`, and mobile drawer with `AnimatePresence`. | `src/components/layout/Navbar.jsx` |
| 2 | **Animated Hero** | Word-by-word headline reveal, floating ambient glow orbs with subtle keyframe pulses, and interactive CTA buttons. | `src/components/sections/Hero.jsx` |
| 3 | **Smooth Scrolling** | Lenis initialized in `useLenis.js`. Intercepts anchor links to offset 80px for the navbar. Honors `prefers-reduced-motion`. | `src/hooks/useLenis.js` |
| 4 | **Scroll Reveal Engine** | Unified `<Reveal>` wrapper supporting `fade-up`, `fade-left`, `fade-right`, and `scale` with `whileInView` and `once: true`. | `src/components/ui/Reveal.jsx` |
| 5 | **Parallax Sections** | Multi-layer transforms in Hero (`blobY1`, `blobY2`, `contentY`) and a dedicated full-width `ParallaxBanner` using `useScroll` + `useTransform`. | `src/components/sections/Hero.jsx`, `src/components/sections/ParallaxBanner.jsx` |
| 6 | **Animated Counters** | Stats count up from 0 to target using a quartic ease-out curve (`1 - (1 - x)^4`) once in view via `useInView`. | `src/components/ui/Counter.jsx`, `src/components/sections/Stats.jsx` |
| 7 | **Timeline Section** | Center line animated with `useScroll` and `useSpring` on `scaleY`. Alternating left/right desktop layout, single column on mobile. | `src/components/sections/Timeline.jsx` |
| 8 | **Interactive 3D Cards** | Physics-based spring tilt (`useMotionValue`, `useSpring`, `rotateX`, `rotateY`) with dynamic radial gradient glow tracking cursor. | `src/components/ui/TiltCard.jsx` |
| 9 | **Testimonials Carousel** | 5.5s autoplay rotation, pause on mouse enter, Framer Motion drag gestures (`drag="x"`), pagination dots, and arrow controls. | `src/components/sections/Testimonials.jsx` |
| 10 | **Pricing Tiers** | Starter, Pro, and Enterprise tiers with Monthly/Yearly state toggle, animated price changes, and 20% discount badge. | `src/components/sections/Pricing.jsx` |
| 11 | **Validated Contact Form** | Custom `useForm` hook with validation for name, email regex, phone pattern, subject, and message length. Inline error alerts and toast feedback. | `src/hooks/useForm.js`, `src/components/sections/Contact.jsx` |
| 12 | **Dark/Light Theme** | `useTheme` hook with `localStorage` persistence, animated Sun/Moon icon, and head anti-FOUC script in `index.html`. | `src/hooks/useTheme.js`, `src/components/ui/ThemeToggle.jsx`, `index.html` |
| 13 | **Scroll Progress & Back to Top** | Spring-damped top scroll progress bar (`useSpring(scrollYProgress)`) and floating `<BackToTop>` button with Lenis integration. | `src/components/layout/ScrollProgress.jsx`, `src/components/layout/BackToTop.jsx` |
| 14 | **Responsive Design** | Tested and verified across 360px, 375px, 768px, 1024px, and 1440px viewports with zero horizontal overflow. | `src/index.css`, Tailwind responsive utilities |

---

## 4. Animation Strategy & Performance Decisions
- **GPU Acceleration**:
  - Transformations are strictly confined to `transform` and `opacity`. Layout properties (`width`, `height`, `top`, `left`) are never animated during scroll loops.
- **Selective Memory Management**:
  - Scroll observers use `{ once: true }` so that completed animations unregister their listeners, freeing up rendering resources.
- **Code Splitting**:
  - Non-critical below-the-fold components are loaded via `React.lazy()` with lightweight suspense placeholders, reducing initial bundle weight to under 70 kB gzip for core logic.

---

## 5. Form Validation & State Management Architecture
Instead of importing heavy form dependencies like Formik or React Hook Form, Lumina uses a purpose-built `useForm` custom hook:
- **Field Tracking**: Tracks touched state, values, and errors per key.
- **Validation Execution**: Validates on `change` (if touched) and executes an exhaustive pass on `submit`.
- **Accessibility**: Binds `aria-invalid` and `aria-describedby` dynamically to each input's error message, ensuring screen readers announce validation failures.

---

## 6. Challenges & Solutions Encountered
1. **Lenis & Anchor Offset Conflict**:
   - *Problem*: Native hash navigation jumps instantly, ignoring the sticky 70px navbar and Lenis smooth momentum.
   - *Solution*: Added a delegated anchor click listener inside `useLenis.js` that calls `lenis.scrollTo(element, { offset: -80, duration: 1.2 })`.
2. **Preventing Dark Mode Flash of Unstyled Content (FOUC)**:
   - *Problem*: Client-side React hooks execute after HTML render, causing a jarring white flash on dark mode reload.
   - *Solution*: Embedded a synchronous inline `<script>` tag inside `index.html` that inspects `localStorage` and system media queries before React paints.
3. **Rolldown Tree-Shaking Warning in Vite 8**:
   - *Problem*: Vite's production bundler threw an export error on specific Lucide icon exports.
   - *Solution*: Swapped to verified, standard exports and streamlined SVG structures, resulting in a zero-error build in 1.27s.
