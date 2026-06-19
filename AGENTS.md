# Portfolio Design and Image Framing Rules

This document specifies the layout constraints, aspect ratios, and design guidelines for Manoelle Diokno's creative works. All future features, page components, or layout generators must respect these rules exactly.

---

### 1. Pre-calculated Sizing & Aspect Ratio System

Always map components and images to these specific aspect-ratio classes based on their use case:

*   **Logos (Standard & Custom Placement)**
    *   **Primary Standard**: Default to a 1:1 square ratio (`aspect-square`).
    *   **Special Occasions (Landscape Rectangle)**: Use landscape dimension rectangles (e.g. `aspect-[3/2]` or `aspect-[16/9]`), but **must match the same container layout footprint** as the 1:1 square. Frame them in centered flex blocks (such as `w-12 h-12 flex items-center justify-center`) to ensure visually balanced alignments.
    *   **Transparent Assets (PNGs, SVGs)**: Avoid wrapping transparent logos in decorative tinted backgrounds, heavy container fills, or colored frame matrices. Keep framing contexts neutral or transparent to safeguard original brand transparency.

*   **Photos**
    *   **Standard Shots**: Default to 1:1 square ratios (`aspect-square`).
    *   **Interactive / Field Records**: Use 4:3 ratios occasionally (`aspect-[4/3]`) for print representations or field-note simulations.

*   **Carousels**
    *   **Visual Series**: Always render as a continuous, horizontal, swipe-friendly block of 1:1 square modules (`aspect-square`).

*   **Reels, Videos & Short Format Media**
    *   **Vertical Feeds**: Apply a strict 9:16 vertical frame (`aspect-[9/16]`) with high-contrast metadata details.

*   **Presentations & Showcase Headers**
    *   **Horizontal Media**: Apply a standard 16:9 cinematic landscape aspect ratio (`aspect-video` or `aspect-[16/9]`).

---

### 2. Aesthetic Concept & Visual Continuity

Maintain a calm, functional visual concept inspired by Notion, Linear, and refined physical print design:
*   **Surfaces**: Minimal off-whites and soft light elements paired with high-contrast deep charcoal text, or elegant custom tactile paper colors.
*   **Borders**: Delicate, high-precision hairline borders (1px, neutral-300 or current/15) with subtle soft shadows.
*   **Typography**: Clean grotesque sans-serif elements for display headers paired with elegant, precise monospace metadata overlays.
*   **No Clutter**: Avoid unsolicited technical readouts, telemetry counters, or placeholder metrics unless explicitly requested.

---

### 3. Surgical Implementation Precision

When modifying code, follow a strict, conservative surgical editing philosophy:
*   Refrain from modifying existing visual pages unless explicitly instructed to do so.
*   Retain and preserve established layouts, structural patterns, color systems, and navigation hooks exactly.
