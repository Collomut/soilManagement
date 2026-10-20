# 🌱 ZERTHIVA: BENEATH THE LIVING EARTH
### Immersive 3D Soil Intelligence Experience · Inspired by Lusion.co

> *"Every signal begins beneath the surface."*

A world-class real-time 3D interactive scientific visualization of **Zerthiva**, the Soil Intelligence System (SIS). 

**Live Experience:** [https://collomut.github.io/trial3d/](https://collomut.github.io/trial3d/)

---

## 🌟 Photorealistic 3D Architecture & Major Upgrades

### 1. Botanical Zea Mays L. Monocot Organism (Upgrade 1)
- **Culm (Stalk) Architecture:** Curving bamboo-like culm with 9 realistic node collars and solid internodes.
- **Clasping Cylindrical Sheaths:** 11 split tubular leaf sheaths wrapping tightly around the culm internodes below leaf insertion points.
- **7-Point Leaf Profile with Undulating Margins:** 11 arching linear-lanceolate blades modeled with a 7-point transverse cross-section forming a deep central V-groove midrib trough and biologically fluted, ruffled margins.
- **Stratified Foliage Materials:** Natural age-stratified PBR materials reflecting cuticle thickness (upper juvenile lime, mid-canopy deep field green, and lower mature foliage).
- **Reproductive Structures:**
  - Apical male inflorescence (tassel) featuring a central rachis and 10 radiating spikelet branches shedding windborne pollen grains.
  - 2 developing female cobs (ears) at nodes 4 and 7, wrapped in 6-tier overlapping spathe husk bracts with 18 cascading golden silk styles/stigmata.
- **5-Class Fibrous Monocot Root Architecture (Non-Arboreal):**
  - **Whorled Aerial Brace Roots:** 18 prop roots across Whorls 1 and 2 plunging from above-ground nodes at 50° to prevent lodging and capture topsoil moisture.
  - **Subterranean Crown Roots:** 16 nodal axes radiating horizontally through Horizon A topsoil (responsible for >80% of vegetative nutrient mass flow).
  - **Deep Seminal Axis:** Central seminal taproot with 4 secondary seminal axes penetrating deep into Horizons B & C (1.5–1.8m scale).
  - **Rhizosphere Feeder Web:** 48 first- and second-order lateral feeder roots branching profusely through the active root zone.
  - **Active Calyptra (Root Caps):** 48 active meristematic root caps with hydration sheen, directly receiving Darcy matrix hydrology streamlines.
- **100% Modular Anatomy Hierarchy:** All 9 anatomical groups (\stem\, \sheaths\, \leaves\, \ears\, \raceRoots\, \crownRoots\, \seminalRoots\, \lateralRoots\, \ootTips\) are independently raycast-inspectable and support Chapter 03 explosive dissection and root isolation.

### 2. Sculpted Geological Soil Cutaway & Stratified Pedological Horizons (Upgrade 2)
- **Natural Diagonal Profile Cutaway (31° Angle):** Replaced the flat symmetrical brown box with an authentic geological profile monolith. The cutaway plane passes smoothly through both the Zerthiva sensor node (\x = -0.55, z = -0.35\) and the maize root crown (\x = 0.35, z = 0.20\), eliminating artificial front-wall occlusion while providing natural back-wall depth and occlusion.
- **4 Distinct, Independently Controllable Pedological Horizons:**
  - **Horizon O (Organic Mulch & Surface Litter, 0–4cm):** Deep humus dark umber (\#1f241a\, organic carbon >15%), agricultural furrow undulations, plant collar mound, and 36 scattered organic leaf litter/mulch fragments.
  - **Horizon A (Melanic Topsoil Humus, 4–25cm):** Munsell 10YR 2/2 dark fertile loam (\#2e1d13\), 46% pore space, high normal scale (1.45) granular crumb aggregate peds, 45 embedded river pebbles, and 24 fine capillary rootlets branching from the cut face.
  - **Horizon B (Compacted Illuvial Clay Subsoil, 25–60cm):** Munsell 7.5YR 4/4 terracotta/ochre clay tone (\#62391a\), bulk density 1.45 g/cm³, subangular blocky to prismatic ped fractures, 35 ferruginous clay nodules/concretions, and 12 vertical seminal root fissures.
  - **Horizon C (Parent Substratum & Saprolite, 60cm+):** Munsell 10YR 5/2 cool slate mineral gray (\#363836\), saprolite rock fractures, quartzite mineral speckles, 45 angular slate gravel clods, and deep macro-drainage matrix.
- **Anti-Tiling Multi-Scale Vertex Color Modulation:** Built-in procedural vertex color modulation eliminates visible texture tiling across the 3.5m cutaway monolith.
- **Layer Separation & Explosion Controls:** In Chapter 02, the Layer Separation slider smoothly expands all 4 horizon blocks vertically with GSAP physics, revealing the internal horizontal contact surfaces and embedded stones.

### 3. Poly Haven CC0 PBR Textures & Autumn Field HDRI
- **Dirt 1K PBR Set:** Diffuse, normal, and roughness maps on Horizons O and A.
- **Brown Mud 02 1K PBR Set:** Diffuse, normal, and roughness maps on Horizons B and C.
- **Autumn Field 1K Equirectangular HDRI:** Image-Based Lighting (IBL) providing realistic reflections on brushed stainless steel EC electrodes, monocrystal silicon PV discs, and waxy foliage cuticles.

### 4. Genuine Xiao ESP32-S3 3D CAD Assembly
- Real 3D GLB model of the Seeed Studio / Xiao ESP32-S3 module (dual-core Xtensa 240MHz, 0.15mA sleep) loaded dynamically via \GLTFLoader\.
- Exploded view isolating solar collector wafer, 360° Fresnel RGB sentry ring, ASA enclosure, ESP32 board, 18650 Li-ion cell, and soil probe stem.

### 5. 10 Interactive Guided Chapters
- **01 // The Living Surface:** Above-ground canopy inspection and daylight ambiance.
- **02 // Descent Into Soil:** Subterranean descent revealing soil horizons O/A/B/C with layer separation slider.
- **03 // Plant Dissection:** Exploded plant anatomy with independent layer explosion and root isolation.
- **04 // Hidden Water World:** Infiltration, pore redistribution, and root xylem water uptake.
- **05 // Nutrient Chemistry:** Ion pathways (NO3-, H2PO4-, K+) with scientific distinction on bulk EC vs fertility.
- **06 // The Sensor Reveal:** Subsurface probe inspection (dual EC electrode rings on GPIO34, FR4 capacitive blade on GPIO35, DS18B20 tip on GPIO4).
- **07 // Hardware Assembly Explosion:** Exploded view of the $30 node.
- **08 // Monitoring Sequence:** 9-stage engineering pipeline from deep sleep to GSM/beacon dispatch.
- **09 // The Decision Engine:** Zero-cloud local edge execution of Maas-Hoffman and FAO-56 algorithms.
- **10 // The Experimental Test Lab:** Scenario testing with fault injection and deterministic pass/fail results.

### 6. Interactive 3D Raycaster & Tooltips
- Raycasting hover and click inspection on every biological organ (sheath, leaf blade, node collar, culm, tassel rachis, ear husks, corn silk, brace roots, crown roots, seminal taproot, lateral feeder roots, calyptra root caps) and soil element (Horizons O, A, B, C, mulch debris, pebbles, clay nodules, saprolite rock clods, and rootlets).

### 7. Synthesized Web Audio Engine
- Real-time Web Audio API synthesizer (earthen drone, telemetry pings, water infiltration soundscapes, acoustic warnings).

---

## 📜 3D Asset Licenses & Scientific Citations

- **Dirt 1k PBR Textures:** [Poly Haven](https://polyhaven.com/a/dirt) (CC0 Public Domain).
- **Brown Mud 02 1k PBR Textures:** [Poly Haven](https://polyhaven.com/a/brown_mud_02) (CC0 Public Domain).
- **Autumn Field 1k HDRI:** [Poly Haven](https://polyhaven.com/a/autumn_field) (CC0 Public Domain).
- **Xiao ESP32-S3 3D CAD Model:** [Circuitiny / mfranzon](https://github.com/mfranzon/circuitiny) (MIT License).
- **Maas, E.V. & Hoffman, G.J. (1977):** *Crop Salt Tolerance—Evaluation of Existing Data*. ASCE J. Irrig. Drain. Div. Threshold 1.70 dS/m, slope 12.0%/dS/m.
- **FAO Irrigation and Drainage Papers 29 & 56:** Water Quality for Agriculture & Evapotranspiration Guidelines.
- **US Salinity Laboratory Handbook 60:** Diagnosis and Improvement of Saline and Alkali Soils.

---

## 🚀 Deployment

The site is served automatically via GitHub Pages:
- **URL:** [https://collomut.github.io/trial3d/](https://collomut.github.io/trial3d/)