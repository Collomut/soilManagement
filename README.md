# 🌱 ZERTHIVA: BENEATH THE LIVING EARTH
### Immersive 3D Soil Intelligence Experience · Inspired by Lusion.co

> *"Every signal begins beneath the surface."*

A world-class real-time 3D interactive scientific visualization of **Zerthiva**, the Soil Intelligence System (SIS). 

**Live Experience:** [https://collomut.github.io/trial3d/](https://collomut.github.io/trial3d/)

---

## 🌟 Photorealistic 3D Architecture & Key Upgrades

1. **High-Fidelity Zea Mays Biological Organism:**
   - Anatomically modeled maize plant featuring:
     - 9 arching leaves with 3D V-grooves, distichous phyllotaxis, and fine monocot parallel venation.
     - Developing maize ears (cobs) wrapped in layered green husks with cascading golden corn silk.
     - Aerial crown/brace stilt roots anchoring into the surface mound.
     - Subterranean seminal taproot, dense lateral feeder root web, and bioluminescent active water absorption root tips.
   - 100% separable anatomy for interactive chapter dissection.

2. **Poly Haven CC0 Physically Based (PBR) Soil Strata:**
   - **Horizon O (Organic Mulch):** Top organic layer textured with Poly Haven *Dirt 1k* diffuse, normal, and roughness maps.
   - **Horizon A (Topsoil Humus):** Fertile root zone with high normal scale and aggregate pebble geometry.
   - **Horizon B (Compacted Clay Subsoil):** Poly Haven *Brown Mud 02 1k* PBR set with dense mineral clay tones.
   - **Horizon C (Gravel Drainage & Bedrock):** Slate mineral layer with deep drainage porosity.
   - Vertical layer separation slider with real-time smooth GSAP physics.

3. **Poly Haven Autumn Field HDRI Environment & Image-Based Lighting (IBL):**
   - 1K equirectangular HDRI loaded via `RGBELoader` + `PMREMGenerator`.
   - Physically based ambient reflections on brushed stainless steel EC electrodes, monocrystal silicon PV discs, and foliage waxy cuticles.

4. **Genuine Xiao ESP32-S3 3D CAD Assembly:**
   - Real 3D GLB model of the Seeed Studio / Xiao ESP32-S3 module (dual-core Xtensa 240MHz, 0.15mA sleep) loaded dynamically via `GLTFLoader`.
   - Exploded view isolating solar collector wafer, 360° Fresnel RGB sentry ring, ASA enclosure, ESP32 board, 18650 Li-ion cell, and soil probe stem.

5. **10 Interactive Guided Chapters:**
   - **01 // The Living Surface:** Above-ground canopy inspection and daylight ambiance.
   - **02 // Descent Into Soil:** Subterranean descent revealing soil horizons O/A/B/C.
   - **03 // Plant Dissection:** Exploded plant anatomy (leaves, ears, stem, crown, roots).
   - **04 // Hidden Water World:** Infiltration, pore redistribution, and root xylem water uptake.
   - **05 // Nutrient Chemistry:** Ion pathways ($NO_3^-$, $H_2PO_4^-$, $K^+$) with scientific distinction on bulk EC vs fertility.
   - **06 // The Sensor Reveal:** Subsurface probe inspection (dual EC electrode rings on GPIO34, FR4 capacitive blade on GPIO35, DS18B20 tip on GPIO4).
   - **07 // Hardware Assembly Explosion:** Exploded view of the $30 node.
   - **08 // Monitoring Sequence:** 9-stage engineering pipeline from deep sleep to GSM/beacon dispatch.
   - **09 // The Decision Engine:** Zero-cloud local edge execution of Maas-Hoffman and FAO-56 algorithms.
   - **10 // The Experimental Test Lab:** Scenario testing with fault injection and deterministic pass/fail results.

6. **Signature Interaction: "Reveal the Hidden System":**
   - 12-stage continuous cinematic sequence orchestrating camera flight, soil opening, layer expansion, particle ionization, and hardware explosion.

7. **Synthesized Web Audio Engine:**
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
