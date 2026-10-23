# 🌱 ZERTHIVA: BENEATH THE LIVING EARTH
### Immersive 3D Soil Intelligence Experience · Inspired by Lusion.co

> *"Every signal begins beneath the surface."*

A world-class real-time 3D interactive scientific visualization of **Zerthiva**, the Soil Intelligence System (SIS). 

**Live Experience:** [https://collomut.github.io/trial3d/](https://collomut.github.io/trial3d/)

---

## 🌟 Photorealistic 3D Architecture & Major Upgrades

### 1. Botanical Zea Mays L. Monocot Organism (Upgrade 1)
- **Culm Architecture:** Curving bamboo-like culm with 9 realistic node collars and solid internodes.
- **Clasping Cylindrical Sheaths:** 11 split tubular leaf sheaths wrapping tightly around the culm internodes below leaf insertion points.
- **7-Point Leaf Profile with Undulating Margins:** 11 arching linear-lanceolate blades modeled with a 7-point transverse cross-section forming a deep central V-groove midrib trough and biologically fluted, ruffled margins.
- **Translucent Foliage Materials:** Differentiated PBR materials with biological chlorophyll backlighting transmission (\emissive: 0x0c2a09\, roughness 0.30) eliminating opaque plastic appearance when backlit by the sun.
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
- **Natural Diagonal Profile Cutaway (31° Angle):** Replaced the flat symmetrical brown box with an authentic geological profile monolith (\z_front = 0.533x - 0.007\). Slices smoothly past both the Zerthiva sensor node (\x = -0.55m, z = -0.30m\) and the maize root crown (\x = 0.35m, z = 0.18m\), eliminating artificial front-wall occlusion while providing natural back-wall depth and occlusion.
- **4 Distinct, Independently Controllable Pedological Horizons:**
  - **Horizon O (Organic Mulch & Surface Litter, 0–4cm):** Deep humus dark umber (\#1f241a\, organic carbon >15%), agricultural furrow undulations, plant collar mound, and 36 scattered organic leaf litter/mulch fragments.
  - **Horizon A (Melanic Topsoil Humus, 4–25cm):** Munsell 10YR 2/2 dark fertile loam (\#2e1d13\), 46% pore space, high normal scale (1.45) granular crumb aggregate peds, 45 embedded river pebbles, and 24 fine capillary rootlets branching from the cut face.
  - **Horizon B (Compacted Illuvial Clay Subsoil, 25–60cm):** Munsell 7.5YR 4/4 terracotta/ochre clay tone (\#62391a\), bulk density 1.45 g/cm³, subangular blocky to prismatic ped fractures, 35 ferruginous clay nodules/concretions, and 12 vertical seminal root fissures.
  - **Horizon C (Parent Substratum & Saprolite, 60cm+):** Munsell 10YR 5/2 cool slate mineral gray (\#363836\), saprolite rock fractures, quartzite mineral speckles, 45 angular slate gravel clods, and deep macro-drainage matrix.
- **Anti-Tiling Multi-Scale Vertex Color Modulation:** Built-in procedural vertex color modulation eliminates visible texture tiling across the 3.5m cutaway monolith.
- **Layer Separation & Explosion Controls:** In Chapter 02, the Layer Separation slider smoothly expands all 4 horizon blocks vertically with GSAP physics, revealing internal horizontal contact surfaces and embedded stones.

### 3. Realistic Zerthiva Sensor Hardware Suite (Upgrade 3)
- **Documented System Hardware & Pinout Verification:**
  - **Microcontroller:** Seeed Xiao ESP32-S3 / ESP32-WROOM-32 with Xtensa LX7 dual-core @ 240MHz, nickel-silver stamped RF shield can, meandered inverted-F 2.4GHz antenna, and dual-row 2.54mm gold header pins.
  - **Salinity / Electrical Conductivity (EC) Sensor:** Dual 316L stainless steel annular electrode rings spaced 10mm apart on probe shaft at 15cm and 25cm depths. Driven with 10 kHz AC bipolar waveform on GPIO34 (ADC1_CH6) to prevent polarization. Normalized to 25°C via Maas-Hoffman equation.
  - **Soil Moisture Probe:** Capacitive Soil Moisture Sensor v1.2 FR4 PCB spade blade with dual wide coplanar copper traces and TLC555 1.5 MHz high-frequency oscillator on GPIO35 (ADC1_CH7). Corrosion-resistant with no exposed copper.
  - **Temperature Sensor:** Maxim DS18B20 1-Wire digital thermal capsule probe in waterproof stainless steel tube with black heat-shrink collar on GPIO4 with 4.7kΩ pull-up.
  - **Cellular Uplink:** SIM800L quad-band GSM/GPRS module (UART2: TX=GPIO17, RX=GPIO16) with coiled helical gold spring antenna.
  - **Telemetry Storage:** MicroSD SPI logger shield (CS=GPIO5, SCK=18, MISO=19, MOSI=23) recording 7-day rolling CSV backups.
  - **Power Subsystem:** 18650 2200mAh 3.7V Li-ion cell in battery sled with TP4056 charge controller + 5W monocrystal solar wafer with silver busbars.
  - **5-Core Color-Coded Silicone Wire Harness:** Red (+3.3V), Black (GND), Yellow (Analog EC GPIO34), Green (Capacitive VWC GPIO35), White (1-Wire Temp GPIO4) with latched JST-XH nylon disconnect header.
  - **PG7 Compression Cable Gland:** Threaded liquid-tight nylon gland sealing the cable entry at the enclosure base.
  - **Exploded View Assembly:** Chapter 07 features interactive full hardware explosion separating all 9 assemblies along independent axes.

### 4. Interactive Water, Root, and Soil Visualization (Upgrade 4)
- **Coherent Darcy-Buckingham Flow Lines:**
  - **24 Rhizosphere Capillary Streamlines (Cyan \#38bdf8\):** Follow unsaturated matric potential gradients from surface infiltration down through Horizon A, converging onto the 48 active calyptra root caps, and ascending through root xylem into stalk and canopy.
  - **8 Deep Gravitational Drainage Streamlines (Cobalt \#2563eb\):** Demonstrate gravitational percolation loss past Horizon B into Horizon C gravel when soil moisture exceeds field capacity.
  - **56 Animated Water Flux Pulse Packets:** Travel along coherent streamlines with velocity dynamically coupled to soil hydraulic conductivity ($).
- **Dynamic Volumetric Wetting Front (Infiltration Bulb):** Translucent rhizosphere hydration bulb dynamically expanding/contracting and shifting opacity (.06 \to 0.45$) based on Volumetric Water Content (VWC).
- **Synchronized Hydraulic Scenarios:** Optimal Field Capacity (-33 kPa), Severe Drought Deficit (-1500 kPa PWP), Waterlogging & Deep Drainage (0 kPa), and Saline Osmotic Lockout (High EC).
- **Interactive Transport Controls:** Pause / Resume toggle, Reset, Dynamic Irrigation Infiltration Pulse, and Flow Velocity Slider.
- **Scientific Disclosures:** Explicit modeling disclosure and electrical conductivity note (bulk EC vs individual NPK).

### 5. Scientific Label Integrity & Component Classification
- **Biological Organisms:** Strictly classified as \[BOTANY // PHYSIOLOGY]\ (not falsely labeled as measured sensors).
- **Physical Sensors:** Classified as \[HARDWARE // MEASURED]\ or \[HARDWARE // CALIBRATED]\.
- **Soil Horizons:** Classified as \[PEDOLOGY // STRATA]\ and \[PEDOLOGY // MINERAL]\.
- **Hydrology & Chemistry:** Classified as \[HYDROLOGY // SIMULATED]\.
- **Decision Engine:** Classified as \[DECISION ENGINE // ALGORITHM]\.
- **Test Lab:** Classified as \[TEST LAB // VERIFIED]\.

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