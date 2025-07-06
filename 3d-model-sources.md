# 3D Model Download Instructions

## Required Models
Download these 3D models and place them in the `assets/models/` folder:

### 1. Laptop Model (laptop.glb)
**Recommended Sources:**
- **Free3D**: https://free3d.com/3d-models/laptop
- **TurboSquid**: https://www.turbosquid.com/Search/3D-Models/free/laptop
- **Sketchfab**: https://sketchfab.com/3d-models/laptop

**Download Instructions:**
1. Search for "laptop" or "notebook computer"
2. Filter by .glb or .gltf format
3. Look for models with 1k-5k polygons for web performance
4. Download and rename to `laptop.glb`
5. Place in `assets/models/laptop.glb`

### 2. Mobile Phone Model (mobile.glb)
**Recommended Sources:**
- **CGTrader**: https://www.cgtrader.com/free-3d-models/phone
- **Free3D**: https://free3d.com/3d-models/smartphone
- **3DTrixs**: https://3dtrixs.com/3d-models/phone/

**Download Instructions:**
1. Search for "smartphone" or "mobile phone"
2. Look for modern designs (iPhone, Samsung Galaxy style)
3. Ensure model is in .glb or .gltf format
4. Download and rename to `mobile.glb`
5. Place in `assets/models/mobile.glb`

### 3. Money/Coins Model (money.glb)
**Recommended Sources:**
- **TurboSquid**: https://www.turbosquid.com/Search/3D-Models/free/coin
- **Free3D**: https://free3d.com/3d-models/coin
- **Sketchfab**: https://sketchfab.com/3d-models/money

**Download Instructions:**
1. Search for "coin", "money", or "currency"
2. Look for stack of coins or dollar bills
3. Ensure model is in .glb or .gltf format
4. Download and rename to `money.glb`
5. Place in `assets/models/money.glb`

## Alternative: Create Your Own Models

### Using Blender (Free)
1. Download Blender from https://www.blender.org/
2. Create simple geometric models
3. Export as .gltf/.glb format
4. File → Export → glTF 2.0 (.gltf/.glb)

### Using SketchUp (Free)
1. Use SketchUp Free (web version)
2. Create or find models in 3D Warehouse
3. Export as .obj then convert to .glb using online converters

## Model Optimization Tips
- Keep polygon count under 5,000 for web performance
- Ensure models are properly scaled (1 unit = 1 meter)
- Use compressed textures
- Remove unnecessary materials/animations

## File Structure
```
assets/
└── models/
    ├── laptop.glb
    ├── mobile.glb
    └── money.glb
```

## Current Status
The HTML file currently uses placeholder geometric models. Replace these with your downloaded models to see the full effect.