---
name: Jocsan Perez Coto · Field Guide
description: A one-page portfolio bound as a Costa Rican field guide; numbered project specimens face their legends across a fixed spine.
colors:
  cloth: "#1e4d36"
  cloth-ink: "#e6efe8"
  spine: "#14231a"
  page: "#f2f5f1"
  page-2: "#e3ebe4"
  ink: "#14231a"
  ink-2: "#3d5446"
  accent: "#1d5fd1"
  tab: "#f08a24"
  on-tab: "#14231a"
  ok: "#1f7a46"
  error: "#b42318"
  cloth-night: "#0c1a12"
  cloth-ink-night: "#cfdcd2"
  spine-night: "#040a06"
  page-night: "#16301f"
  page-2-night: "#1d3b28"
  ink-night: "#e8efe9"
  ink-2-night: "#a9bdb0"
  accent-night: "#9dbcff"
  ok-night: "#7dd3a0"
  error-night: "#ff9b8f"
typography:
  display:
    fontFamily: "Bricolage Grotesque, Atkinson Hyperlegible, sans-serif"
    fontSize: "clamp(3.25rem, 6.6vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.9
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Bricolage Grotesque, Atkinson Hyperlegible, sans-serif"
    fontSize: "clamp(2.5rem, 4.4vw, 4rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.03em"
  headline-sm:
    fontFamily: "Bricolage Grotesque, Atkinson Hyperlegible, sans-serif"
    fontSize: "clamp(2.25rem, 3.8vw, 3.5rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Bricolage Grotesque, Atkinson Hyperlegible, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  lead:
    fontFamily: "Atkinson Hyperlegible, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
  body:
    fontFamily: "Atkinson Hyperlegible, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Atkinson Hyperlegible, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: "0.08em"
  numeral:
    fontFamily: "Bricolage Grotesque, Atkinson Hyperlegible, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 700
    fontFeature: "tnum"
rounded:
  none: "0px"
spacing:
  gutter-mobile: "12px"
  page-x-mobile: "24px"
  page-x-tablet: "40px"
  page-x-wide: "56px"
  spread-gap-mobile: "24px"
  spread-gap-desktop: "40px"
  margin-desktop: "120px"
  spine: "14px"
  spread-max: "1280px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.page}"
    rounded: "{rounded.none}"
    padding: "0 24px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.page}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0 24px"
    height: "48px"
  button-secondary-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.page}"
  specimen-chip:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.page}"
    typography: "{typography.numeral}"
    rounded: "{rounded.none}"
    padding: "0 8px"
    height: "40px"
  index-tab:
    backgroundColor: "{colors.tab}"
    textColor: "{colors.on-tab}"
    rounded: "{rounded.none}"
    height: "44px"
    width: "106px"
  index-tab-active:
    backgroundColor: "{colors.tab}"
    textColor: "{colors.on-tab}"
    width: "118px"
  control-tab:
    backgroundColor: "{colors.page}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    size: "44px"
  plate-page:
    backgroundColor: "{colors.page}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "48px 56px"
  field-input:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "12px 0"
---

# Design System: Jocsan Perez Coto · Field Guide

## Overview

**Creative North Star: "The Field Guide Plate"**

The portfolio is a printed Costa Rican field guide to one developer. Every section is an open spread: two cool white plate pages bound on a near-black spine and laid on deep green bookcloth. The left page carries the legend (heading, prose, classification table); the right page carries the plate (specimen figures, the 3D model, a list), headed by a roman plate number. Projects are specimens: framed screenshots with a black number chip stamped into the corner and a "Fig. n." caption below.

The world is flat and printed. Colour is laid down as solid fields, never gradients; corners are square; depth exists only as the physical turn of a page on its spine. Type pairs a heavy, tightly tracked Bricolage Grotesque for names and headings with Atkinson Hyperlegible for everything that must be read. Density is calm: one heading, one paragraph, one hairline table per page.

The dark theme is the same book read at night: the page darkens to bookcloth green, ink becomes light, and the orange index tabs stay exactly as they are.

**Key Characteristics:**
- Two-page spreads on a fixed 14px spine; pages stack with a 12px spine bar on narrow screens.
- Flat solid fields only; square corners everywhere; 2px ink frames around every figure.
- Black tabular number chips mark specimens; roman numerals mark plates.
- Hairline classification tables (2px ink top rule, 1px ink/20 row rules) carry facts.
- Toucan orange lives on the fore-edge index tabs, the focus ring and text selection.
- Motion is physical: lines rise, pages turn on the spine, chips stamp in.

## Colors

A green-bound book with cool paper pages, one blue for interaction and one orange for the index.

### Primary
- **Morpho Blue** (accent): the single interactive hue. Inline links (always underlined), the hover fill of the primary button, and hover colour on list links. The night value is a pale periwinkle (accent-night) so it reads on the green page.

### Secondary
- **Toucan Orange** (tab): the fore-edge index tabs (desktop right edge, mobile bottom bar), the focus-visible outline (3px, 3px offset), text selection and the skip link. Text on it is always on-tab ink. Identical in both themes.

### Neutral
- **Bookcloth Green** (cloth): the surface the book lies on; the page background behind the spreads, the browser theme colour, the footer ground.
- **Cloth Ink** (cloth-ink): footer text and its 30% hairline, set directly on the cloth.
- **Spine Black** (spine): the spine between pages, the mobile tab-bar ground, the page-turn shade, the scrollbar thumb.
- **Plate White** (page): every page surface, and text on ink fills (chips, primary button).
- **Plate Well** (page-2): the ground behind images and the 3D model, loading skeletons, control-tab hover.
- **Field Ink** (ink): body text, headings, 2px frames, chips, primary button fill.
- **Field Ink Muted** (ink-2): folios, captions, table terms, secondary list text, placeholders.
- **Leaf Green** (ok): the square availability mark and the sent-message confirmation.
- **Heliconia Red** (error): the failed-send message and the GitHub error rule.

### Named Rules
**The Flat Field Rule.** Every colour is a solid field. No gradients, no tints layered for depth, no blur.

**The Index Orange Rule.** Toucan orange belongs to the index and to focus and selection. It never fills a button, a heading or a decoration on the page.

**The Night Book Rule.** The dark theme swaps values, never roles: the page takes the bookcloth green family, ink inverts to light, orange is unchanged.

## Typography

**Display Font:** Bricolage Grotesque (weights 500/700/800, optical size 12–96; falls back to Atkinson Hyperlegible)
**Body Font:** Atkinson Hyperlegible (400, 700, italic 400; falls back to system-ui)

**Character:** A loud, dense grotesque for species names against a typeface built for legibility; the heading announces the name, the text never makes you squint.

### Hierarchy
- **Display** (800, clamp 3.25–6rem, 0.9, -0.035em): the name on the opening spread only, two lines, each line masked for the rise-in.
- **Headline** (800, clamp 2.5–4rem, 0.95, -0.03em): specimen names on project plates and the contact heading.
- **Headline-sm** (800, clamp 2.25–3.5rem, 0.95, -0.03em): section headings on the technologies and GitHub legend pages.
- **Title** (700, 1.875rem, -0.02em): right-page headings ("Observed specimens", "Highlighted repositories", "Send me a message").
- **Lead** (400, 1.125rem; 1.25rem on the hero summary): the one paragraph under a heading, capped at 34–52ch.
- **Body** (400, 1.0625rem, 1.6): table values, list items, everything else.
- **Label** (700, 0.875rem, 0.08em, uppercase, ink-2): classification-table terms and form field labels only; technology group headings use 0.1em.
- **Numeral** (Bricolage 700, tabular): chip numbers, list ordinals, GitHub counts (1.5rem).
- **Folio** (400, 0.875rem, ink-2): the running head "Jocsan Perez Coto · Field guide" on legend pages; "Plate N" in Bricolage 700 ink on plate pages.

### Named Rules
**The Two Voices Rule.** Bricolage is for names, headings and numbers; Atkinson is for anything read as a sentence. Headings use balanced wrapping; paragraphs use pretty wrapping.

**The Tabular Count Rule.** Every number that labels or counts (chips, ordinals, stars, repository counts) is tabular.

## Layout

The governing axis is the spine. Each section is a spread: a three-column grid of page, 14px spine, page, capped at 1280px and centred, from 1024px up. Below 1024px the pages stack in one column and the spine becomes a 12px horizontal bar between them.

The desktop page has 120px side margins so the fore-edge index tabs sit on the cloth to the right of the book. Spreads are separated by 40px of cloth (24px on mobile, where the outer gutter is 12px and the bottom is padded 96px to clear the tab bar).

Pages pad 24px by 32px on mobile, 40px from 640px, and 56px by 48px from 1280px. Each page is a vertical column: folio (1px ink/25 rule below, 32px gap), heading, lead (24px), classification (32px), then actions pushed to the page foot with at least 40px above. The opening spread fills the viewport height minus 3rem on desktop.

The opening plate arranges specimens in a 1.35fr / 1fr grid: specimen 1 spans two rows, specimens 2 and 3 stack, 16px gaps, with a numbered legend list below.

## Elevation & Depth

There are no shadows anywhere. Depth is physical, not optical: pages sit flat on cloth, figures are framed by a 2px ink line, and the only third dimension is the right page rotating on its spine edge (perspective 2400px on the spread, origin at the left edge) with a spine-coloured shade fading from 60% to 0 as it lands.

### Named Rules
**The Paper Has No Shadow Rule.** Surfaces are separated by colour fields, frames and the spine. Never add a box-shadow, glow or backdrop blur to a page, figure or control.

## Shapes

Every corner is square (0px): pages, buttons, chips, tabs, inputs, image wells, the avatar frame, the status mark. Lines carry the form language: 2px ink frames around figures and the 3D well, 2px ink top rules opening tables and lists, 1px ink/20 rules between rows, 2px ink/50 underlines for fields. Chips sit flush in the top-left corner of their frame with no inset.

## Components

### Buttons
Solid ink slabs that lift a hair on hover.
- **Shape:** square (0px), minimum height 48px, 24px side padding, 700 weight, 8px icon gap with 18px line icons.
- **Primary:** ink fill, page text; hover fills Morpho Blue. Used for "See projects", "Open the live project", "Send message".
- **Secondary:** 2px ink frame on transparent; hover fills ink with page text. Used for "Download CV".
- **Hover / Focus:** 200ms ease-out on colour plus a 2px upward lift, back to rest on press; focus is the global 3px orange outline.
- **Disabled:** 70% opacity, wait cursor (sending state).

### Chips
- **Style:** the specimen number chip: ink fill, page text, Bricolage 700 tabular 1.125rem, 40px tall, at least 40px wide, square, placed flush at the top-left corner of its figure.
- **Variant:** in the 3D model, labels pair a 28px ink number cell with a 2px-framed page-coloured name cell.

### Cards / Containers
- **Plate page:** page fill, ink text, square, no border; padding per Layout. A turning page carries a hidden spine-coloured shade layer.
- **Figure:** 2px ink frame over the page-2 well, image cropped from the top, at least 420px tall on desktop, caption "Fig. n. …" in 0.875rem ink-2, 12px below.
- **Opening specimen:** a framed button showing a project screenshot; the image scales to 1.04 over 500ms on hover.

### Classification Table
The signature fact table: a definition list with a term column of at least 7.5rem, opened by a 2px ink rule, each row closed by a 1px ink/20 rule with 12px vertical padding. Terms are Labels; values are Body ink (links in Morpho Blue, counts as Numerals). Used for the opening profile, each project's family, stack and habitat, and GitHub counts. The same rule pattern carries the social list, the technology lists and the repository list.

### Inputs / Fields
- **Style:** no box; transparent ground, a 2px ink/50 bottom rule, 12px vertical padding, 1.125rem text, Label above.
- **Focus:** the bottom rule darkens to full ink.
- **Error / Success:** a status line beside the submit button, error in Heliconia Red bold, success in Leaf Green bold with a check icon, announced politely.

### Navigation
- **Desktop fore-edge index:** a fixed column of Toucan Orange tabs cut into the book's right edge, vertically centred, 44px tall, 14px bold on-tab text. Rest width 106px, hover 112px, active 118px with a 10px square on-tab notch before the label; width animates 300ms ease-out. The active tab is marked by position and notch, never by a different colour. Language and theme controls sit beneath it.
- **Mobile tab bar:** a fixed bottom bar on the spine colour, five orange tabs (52px tall) with an 18px line icon over a 12px label; the active tab carries a 4px on-tab bar along its top edge. Respects the safe-area inset.
- **Control tabs:** language (ES/EN) and theme (moon/sun) as square page-coloured tabs with a 2px ink frame, hover page-2. 44px in the index; 40px compact on the mobile opening folio line.

### Running Folio
Every page opens with a folio: the running head on legend pages, "Plate N" (roman) right-aligned on plate pages, a 1px ink/25 rule below. On mobile the opening folio also holds the compact controls.

### Page Turn (motion)
- **Opening:** the name lines rise from 105% below their masks (expo.out, 1.1s, 0.08s stagger); lead, table and buttons fade up 18px (0.9s); the right page swings in from -70° on the spine (1.3s); chips stamp in from 1.6× scale (back.out(2), 0.45s, 0.09s stagger).
- **Scroll:** from 1024px, each later spread's right page turns from -80° to flat, scrubbed (0.6) between the spread entering and reaching 35% from the top, while its shade fades from 0.6 to 0. Chips stamp once at 70%.
- **Anchors:** in-page jumps use a 1s power3.inOut scroll.
- **3D model:** nothing floats or spins on its own; the visitor turns the model by dragging. Its specimens use only cloth, accent and page fills, and label icons are drawn in ink. The model's code loads lazily when its plate comes within 300px of the viewport.
- **Reduced motion:** all of the above is skipped and jumps are instant.

## Do's and Don'ts

### Do:
- **Do** build every section as a spread: legend page, spine, plate page, each opened by a folio.
- **Do** frame every image, model or avatar in a 2px ink line over the page-2 well, and caption figures "Fig. n."
- **Do** number specimens with the ink chip and plates with roman numerals, in reading order.
- **Do** put facts in the classification table (2px ink top rule, 1px ink/20 row rules, uppercase 0.08em ink-2 terms).
- **Do** keep Morpho Blue as the only interactive hue and underline every inline link.
- **Do** show navigation state as a mark (notch, top bar, extra width), keeping the tab colour constant.
- **Do** carry motion as physical paper: rise, turn on the spine, stamp; and skip it under reduced motion.

### Don't:
- **Don't** use gradients, shadows, glows or backdrop blur on any surface.
- **Don't** round a corner.
- **Don't** use Toucan Orange outside the index tabs, focus ring, selection and skip link.
- **Don't** set sentences in Bricolage Grotesque or headings in Atkinson Hyperlegible.
- **Don't** put an uppercase label line above a heading; uppercase tracking belongs to table terms and field labels only.
- **Don't** open a page with a dark hero, a gradient name or a row of translucent cards.
