# Zulu's Home Bakes — Boutique Website Demo

A bespoke, responsive demo website created for **Zulu's Home Bakes** (`@zulus_bakes`), a premier home-bakery business based in **Kasaragod, Kerala**, specializing in **customized celebration cakes, luxury gift hampers, and artisanal sweet treats**.

---

## 🌟 Brand Profile Extracted from Instagram (`@zulus_bakes`)

- **Business Name:** ZULU’S HOME BAKES
- **Instagram Handle:** [@zulus_bakes](https://www.instagram.com/zulus_bakes/)
- **Tagline:** *"A Home Grown Indulgence 💗"*
- **Location:** Kasaragod & Kumbla, Kerala, India (Pin: 671321)
- **Community:** 10.1K+ Followers • 1,940+ Creations
- **Core Specialties:**
  1. **Customized Celebration Cakes** (Vintage Italian Lambeth, 2-Tier Weddings & Engagements, Teddy/Baby Showers, Sports/Themed, Anniversaries)
  2. **Luxury Curated Hampers** (Festive Eid boxes, wedding return gifts, birthday gift hampers with silk ribbons)
  3. **Artisanal Sweet Treats** (55% Belgian dark fudgy brownies, gourmet cupcakes, macarons, cute Korean bento cakes)

---

## 🚀 How to View the Demo

### Option 1: Direct File Preview
Simply double-click [`index.html`](file:///d:/codes/zulus%20bakes/index.html) or right-click and choose **Open with Google Chrome** / **Microsoft Edge**.

### Option 2: Local HTTP Server (Recommended)
In this directory (`d:\codes\zulus bakes`), run in PowerShell:
```powershell
python -m http.server 3000
```
Then visit: `http://localhost:3000`

---

## 🎨 Key Features & Sections Included

1. **Luxury Boutique Header & Announcement Bar**:
   - Zulu's circular brand logo with gold border ring.
   - Smooth navigation menu (Menu, Hampers, Estimator, Flavors, Instagram, Reviews, Contact).
   - "Order via WhatsApp" CTA button.

2. **Hero Section ("Baked with Passion, Crafted for Your Moments")**:
   - Brand metrics: 10K+ Followers, 1,940+ Creations, 100% Fresh & Eggless available.
   - Floating interactive badges for *Vintage Lambeth Ruffles* and *Curated Hampers*.
   - Quick action triggers to jump to catalog or calculate price.

3. **4-Pillar Brand Trust Bar**:
   - 100% Bespoke Designs, Belgian Couverture Chocolate & Pure Vanilla, Satin Ribbon Luxury Hampers, Careful Doorstep Delivery.

4. **Interactive Category Filter Tabs & 18 Product Cards**:
   - **All Creations**
   - **Custom Celebration Cakes**
   - **Vintage & Italian Lambeth**
   - **Luxury Gift Hampers**
   - **Sweet Treats & Brownies**
   - **Bento & Cupcake Sets**
   - Each card features high-resolution authentic imagery, flavor profiles, starting price, and one-click WhatsApp inquiry.

5. **Quick View & Details Modal**:
   - Displays high-res photography, available sponge flavors, size options (0.5 kg bento to 2 kg 2-tier), custom notes, and auto-generates a WhatsApp message.

6. **Interactive Bespoke Cake Price Estimator**:
   - Lets clients choose Occasion, Size/Weight, Signature Flavor, Design Style, and Eggless preference.
   - Computes an estimated price range in real-time and sends the exact configuration to WhatsApp with one click!

7. **The Taste Gallery (Flavors & Fillings)**:
   - Belgian Chocolate Truffle, Red Velvet Cream Cheese, Lotus Biscoff Crunch, Rose Pistachio & Cardamom, Nutella Hazelnut Praline, Madagascar Vanilla & Berry.

8. **4-Step "How to Order" Visual Guide**:
   - Inspiration Reference ➔ Flavor & Size ➔ WhatsApp Confirmation ➔ Fresh Delivery.

9. **Live Instagram Feed Showcase**:
   - 12 authentic post images directly from `@zulus_bakes` with hover overlays displaying captions and direct links to the Instagram page.

10. **Client Reviews & Testimonials**:
    - Real-feel customer testimonials from Kasaragod, Kumbla, and Vidyanagar.

11. **Interactive FAQ Accordion**:
    - Advance notice, eggless preparation, Pinterest references, delivery areas, and custom hampers.

12. **Instant WhatsApp Inquiry Form & Floating Widget**:
    - Bottom right pulsating WhatsApp button with tooltip.
    - Quick inquiry form that pre-populates the WhatsApp chat.

---

## 🛠️ Project Structure

```
d:\codes\zulus bakes\
├── index.html                  # Main responsive boutique homepage
├── README.md                   # Project documentation & instructions
└── assets/
    ├── css/
    │   └── styles.css          # Luxury styles, glassmorphism, animations
    ├── js/
    │   ├── products-data.js    # Catalog data, flavors & testimonials
    │   └── main.js             # Filter logic, estimator, modal & WhatsApp generator
    └── images/                 # Downloaded authentic posts, logo & imagery
        ├── logo.jpg            # Authentic Zulu's Bakes profile avatar
        ├── post_1.jpg to 12    # Authentic Instagram creations from @zulus_bakes
        ├── hamper_1 to 3.jpg   # Luxury curated gift hamper visuals
        ├── treats_1 to 3.jpg   # Brownies, cupcakes & macaron photography
        └── bento_1.jpg         # Cute Korean mini bento cake
```

---

## 📞 Updating the WhatsApp Phone Number

To link the WhatsApp buttons to the owner's exact phone number:
1. Open [`assets/js/main.js`](file:///d:/codes/zulus%20bakes/assets/js/main.js#L5)
2. Update line 5:
   ```javascript
   const WHATSAPP_PHONE = "919000000000"; // Replace with actual 10-digit number + country code
   ```
3. Update the fallback links in [`index.html`](file:///d:/codes/zulus%20bakes/index.html) if desired.
