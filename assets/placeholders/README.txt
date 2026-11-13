========================================================================
UNISEX SALON - IMAGE PLACEHOLDER GUIDE FOR GOOGLE FLOW INTEGRATION
========================================================================

This website is architected with a strict limit of exactly 10 UNIQUE
approved image placeholders. All image cards, heroes, gallery items,
and promo banners across the 8 pages reuse these 10 concepts.

The placeholders are rendered using pure CSS gradients, SVG geometric
motifs, and editorial typography. No external image files or external URLs
are used.

------------------------------------------------------------------------
THE 10 APPROVED IMAGE CONCEPTS & CSS SELECTORS:
------------------------------------------------------------------------

1. Concept: Salon Hero
   CSS Class: .placeholder-salon-hero
   Prompt / Subject: "Premium modern unisex salon interior with elegant
   styling stations, warm champagne lighting, marble accents, and mirrors."
   Usage: Homepage hero, About Us editorial feature.

2. Concept: Women's Hairstyling
   CSS Class: .placeholder-womens-hair
   Prompt / Subject: "Professional women's haircut and sleek layered styling,
   blowout finish, luxury salon environment."
   Usage: Women's services hero, hair styling cards, gallery.

3. Concept: Men's Grooming
   CSS Class: .placeholder-mens-grooming
   Prompt / Subject: "Modern men's haircut, precision beard grooming and
   fade styling with barber hot towel setup."
   Usage: Men's services hero, beard styling cards, gallery.

4. Concept: Hair Colouring
   CSS Class: .placeholder-hair-colour
   Prompt / Subject: "Professional hair colouring and balayage highlights,
   rich tones, gloss finish, expert stylist hands at work."
   Usage: Services hair colour section, gallery.

5. Concept: Facial and Skincare
   CSS Class: .placeholder-facial-skincare
   Prompt / Subject: "Premium facial and skincare treatment, hydrating mask,
   aesthetician applying serum, serene warm ambiance."
   Usage: Skincare service cards, packages, gallery.

6. Concept: Bridal Makeup
   CSS Class: .placeholder-bridal-makeup
   Prompt / Subject: "Elegant bridal makeup and beauty styling, radiant skin,
   refined glam aesthetic with subtle jewelry styling."
   Usage: Makeup cards, bridal packages, gallery.

7. Concept: Manicure and Pedicure
   CSS Class: .placeholder-manicure-pedicure
   Prompt / Subject: "Professional nail care, luxury spa manicure and pedicure,
   polished nails, soothing botanical bath."
   Usage: Nail services cards, gallery.

8. Concept: Spa and Relaxation
   CSS Class: .placeholder-spa-relaxation
   Prompt / Subject: "Relaxing head spa, aromatic steam hair treatment,
   acupressure massage, aromatherapy tranquility."
   Usage: Spa service cards, packages, gallery.

9. Concept: Professional Stylists
   CSS Class: .placeholder-stylists
   Prompt / Subject: "Salon professionals at work, unisex styling team in
   minimalist chic black attire consulting with clients."
   Usage: Stylist introduction section, team showcase.

10. Concept: Salon Interior
   CSS Class: .placeholder-salon-interior
   Prompt / Subject: "Luxury salon reception lounge, customer waiting area
   with plush seating, champagne gold trims, and beverage bar."
   Usage: Contact page ambiance, gallery showcase.

------------------------------------------------------------------------
HOW TO REPLACE PLACEHOLDERS WITH GOOGLE FLOW GENERATED IMAGES:
------------------------------------------------------------------------

Option A (CSS Background method):
1. Save generated JPG/WebP files into this directory `assets/placeholders/`:
   - salon-hero.jpg
   - womens-hair.jpg
   - mens-grooming.jpg
   - hair-colour.jpg
   - facial-skincare.jpg
   - bridal-makeup.jpg
   - manicure-pedicure.jpg
   - spa-relaxation.jpg
   - stylists.jpg
   - salon-interior.jpg

2. In `css/style.css`, update the `.placeholder-*` classes to include:
   background-image: url('../assets/placeholders/<filename>.jpg');
   background-size: cover;
   background-position: center;

Option B (Direct HTML replacement):
Search for the HTML comments `<!-- IMAGE PLACEHOLDER 1: SALON HERO -->` (1 through 10)
and replace the `<div class="img-placeholder placeholder-...">` tag with:
<img src="assets/placeholders/<filename>.jpg" alt="<Descriptive Alt Text>" class="img-fluid">

========================================================================
