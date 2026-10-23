# 🌱 Zerthiva — Soil Intelligence System (SIS)
> *"Know Your Soil. Feed Your Field."*

[![Launch Live 3D Simulation](https://img.shields.io/badge/🌾_3D_Simulation-Launch_Live_WebGL-0284c7?style=for-the-badge&logo=three.js)](https://collomut.github.io/soilManagement/zerthiva_interactive_3d.html)
[![Open Master Dossier](https://img.shields.io/badge/📘_Master_Dossier-Open_58_Sections-059669?style=for-the-badge&logo=googledocs)](https://collomut.github.io/soilManagement/)
[![Software Stack Branch](https://img.shields.io/badge/💻_Software_Stack-View_Codebase-6366f1?style=for-the-badge&logo=github)](https://github.com/Collomut/soilManagement/tree/software-stack)
[![Hardware Cost](https://img.shields.io/badge/Node_BOM-$34.80-d97706?style=for-the-badge)](https://github.com/Collomut/soilManagement/tree/research-dossier#section14)
[![Operation](https://img.shields.io/badge/Operation-100%25_Offline-10b981?style=for-the-badge)](https://github.com/Collomut/soilManagement/tree/research-dossier#section11)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](./LICENSE)

**Zerthiva** is an affordable ($34.80 BOM), field-deployed soil intelligence system that monitors root-zone salinity (apparent electrical conductivity, $\text{EC}_a$) and volumetric water content ($\text{VWC}\%$) in real time. Operating 100% offline, it executes on-device FAO-56 water balance equations and Maas-Hoffman salinity models to provide precision irrigation guidance, issue crop-specific salinity lockouts, and calculate automated leaching fractions to prevent irreversible soil degradation.

---

## 🚀 Live Web Sites & Quick Launch Directory

All components of the Zerthiva platform are hosted, deployed, and instantly accessible:

| Platform / Experience | Description | 🌐 Direct Live Link | 📁 Source Branch / Repo |
|---|---|---|---|
| 🌾 **3D Soil Intelligence Digital Twin** | Real-time WebGL 3D cutaway simulation: pedological horizons (O/A/B/C), root-zone Darcy hydrology, interactive hardware explosion, and sensor inspection | [**👉 Launch Live 3D Simulation**](https://collomut.github.io/soilManagement/zerthiva_interactive_3d.html) | [`interactive-3d` Branch](https://github.com/Collomut/soilManagement/tree/interactive-3d) |
| 📘 **Master Technical Dossier Platform** | Complete 58-section post-audit research dossier: real-time position scrollspy, dark/light theme, KaTeX formulas, Rhoades transfer equations, and 15-point risk register | [**👉 Open Live Dossier Platform**](https://collomut.github.io/soilManagement/) | [`research-dossier` Branch](https://github.com/Collomut/soilManagement/tree/research-dossier) |
| 💻 **Software Implementation Stack** | Complete runnable software: ESP32 MicroPython firmware, FastAPI cloud API, React extension console, and synthetic field simulator | [**👉 Explore Software Codebase**](https://github.com/Collomut/soilManagement/tree/software-stack) | [`software-stack` Branch](https://github.com/Collomut/soilManagement/tree/software-stack) |
| 🏢 **Zerthiva Companion Implementation Repo** | Dedicated codebase repository with Docker Compose local dev stack, database migrations, and synthetic telemetry stream generator | [**👉 Open Zerthiva Repository**](https://github.com/Collomut/Zerthiva) | [`Collomut/Zerthiva:main`](https://github.com/Collomut/Zerthiva) |
| 🏛️ **Main Repository Hub** | Central entry portal, branch directory, executive summary, problem statement, and developer quick start | [**👉 You Are Here (`main`)**](https://github.com/Collomut/soilManagement) | [`main` Branch](https://github.com/Collomut/soilManagement/tree/main) |

---

## 🗂️ Branch Architecture & Codebase Map

To ensure clean separation of concerns, the Zerthiva project is organized into specialized, self-contained branches:

```text
Collomut/soilManagement (Repository)
│
├── 🌟 main (Current Branch)
│   └── Central Portal · Executive Overview · Direct Branch Directory & Live Links
│
├── 🌾 interactive-3d
│   └── Real-time WebGL 3D soil cutaway simulation (Three.js r128, PBR soil strata, Darcy hydrology)
│
├── 📘 research-dossier
│   └── 58-Section Post-Audit Master Technical Dossier & Web Platform (Annexes A–I, LaTeX math, Scrollspy)
│
└── 💻 software-stack
    └── Production implementation: ESP32 MicroPython firmware, FastAPI cloud API, React dashboard, simulator
```

| Branch | Description | Direct Access |
|---|---|---|
| **`main`** | Central portal, executive summary, ecosystem directory, and quick actions | [Browse `main`](https://github.com/Collomut/soilManagement/tree/main) |
| **`interactive-3d`** | Photorealistic WebGL 3D digital twin: pedological soil horizons (O/A/B/C), root-zone Darcy hydrology, Raycast inspection, and GSAP hardware explosion | [Explore `interactive-3d`](https://github.com/Collomut/soilManagement/tree/interactive-3d) |
| **`research-dossier`** | The comprehensive 58-section master submission dossier, matched-pair experimental pilot protocols, Rhoades transfer equations, and failure scenarios | [Explore `research-dossier`](https://github.com/Collomut/soilManagement/tree/research-dossier) |
| **`software-stack`** | Full runnable code: ESP32 firmware drivers (12/12 unit tests), FastAPI ingestion endpoints (11/11 pytest tests), and React extension console | [Explore `software-stack`](https://github.com/Collomut/soilManagement/tree/software-stack) |

---

## ⚡ The Agronomic Problem: Secondary Salinization

In irrigated drylands across developing regions, smallholder farmers unknowingly suffer from **osmotic drought**:

```text
 Fixed-Schedule Irrigation (Saline Water)
                 │
                 ▼
 Evaporation Leaves Dissolved Mineral Salts
                 │
                 ▼
 Root-Zone Electrical Conductivity (EC) Crosses Crop Threshold
                 │
                 ▼
 Reverse Osmotic Gradient (Roots cannot pull water even in wet soil)
                 │
                 ▼
 Farmer Misdiagnoses Wilting as "Drought" or "Nutrient Deficiency"
                 │
                 ▼
 Farmer Adds MORE Water + MORE Fertilizer (Chemical Salts)
                 │
                 ▼
 Catastrophic Yield Collapse (50–80% Loss) & Land Abandonment
```

Globally, soil salinization destroys **1.5 million hectares of arable land annually** and inflicts **$27 billion in economic damage**.

---

## 🛠️ The Solution: Industrial Edge Architecture

Zerthiva resolves this with a **$34.80 BOM field node** deployed directly at the crop root zone:

```text
               +------------------------------------------------+
               |            Crop Root Zone (-20cm)              |
               |  [Analog EC]   [Capacitive Moist]   [DS18B20]  |
               +-----------------------+------------------------+
                                       |
                                       v
               +------------------------------------------------+
               |          ESP32 Edge Node (Solar / IP65)        |
               |  - MicroPython Runtime (15-min deep sleep)     |
               |  - Temperature Normalization (25°C baseline)   |
               |  - FAO-56 Decision Engine (100% Offline)       |
               |  - MicroSD 7-Day Rolling CSV Blackbox          |
               +-----------+----------------------+-------------+
                           |                      |
            [Local Sentry Pulse]         [SIM800L Cellular Modem]
           (Tri-Color RGB Beacon)                 |
                           |             +--------+--------+
                     Farmer in Field     |                 |
                   (Zero Literacy UI)    v                 v
                                  Actionable SMS     JSON Telemetry
                                   (Nokia 105)        (GPRS Uplink)
                                                           |
                                                           v
                                            +-----------------------------+
                                            |   Cloud Gateway (FastAPI)   |
                                            |   TimescaleDB Time-Series   |
                                            |   React Agronomic Dashboard |
                                            +-----------------------------+
```

---

## 🔬 Core Agronomic Physics & Formulas

### 1. Temperature Compensation (Rhoades Standard)
Soil electrical conductivity rises with temperature (~1.91%/°C). All raw sensor readings are standardized to a 25°C baseline:
$$\text{EC}_{25} = \frac{\text{EC}_{\text{raw}}}{1.0 + 0.0191 \cdot (T_{\text{soil}} - 25.0)}$$

### 2. Leaching Requirement (Ayers & Westcot / FAO-56)
When root-zone salinity exceeds the crop's threshold ($\text{EC}_e$), the node calculates the exact extra water fraction needed to leach accumulated salts past the root zone:
$$\text{LF} = \frac{\text{EC}_w}{5 \cdot \text{EC}_e - \text{EC}_w} \quad \text{for } \text{EC}_w \le 0.5 \cdot \text{EC}_e$$

### 3. Maas-Hoffman Relative Yield Loss
$$\text{Yield Loss } (\%) = (\text{EC}_{25} - a) \cdot b$$
*For Maize: threshold $a = 1.7\text{ dS/m}$, slope $b = 12.0\%/\text{dS/m}$*  
*For Tomato: threshold $a = 2.5\text{ dS/m}$, slope $b = 9.9\%/\text{dS/m}$*

---

## 📊 Quantified Impact Targets

| Metric | Traditional Practice | Zerthiva Target | Verification Protocol |
|---|---|---|---|
| **Irrigation Water Use** | ~8,000 m³/ha/season | 5,000–6,000 m³/ha (**30–50% saved**) | Flow meter & pump runtime logs |
| **Fertilizer Consumption** | ~200 kg/ha/season | 130–160 kg/ha (**25–40% saved**) | Field purchase logs & receipts |
| **Maize Harvest Yield** | ~1.8–2.0 t/ha | 2.3–2.6 t/ha (**15–30% gain**) | Calibrated hanging scale quadrats |
| **Root-Zone Salinity** | Unmonitored (escalating) | Maintained below crop threshold | Saturated paste extract ($\text{EC}_e$) |
| **Input Cost Savings** | Baseline | **+$60–$80/ha/season** saved | Farmer financial ledger |
| **Node Payback Period** | N/A | **< 1 full crop cycle** | Amortized economic model |

---

## ⚡ Quick Actions for Developers

### Clone a Specific Branch

```bash
# 1. Clone the 3D WebGL Simulation Branch
git clone -b interactive-3d https://github.com/Collomut/soilManagement.git

# 2. Clone the 58-Section Research Dossier Platform
git clone -b research-dossier https://github.com/Collomut/soilManagement.git

# 3. Clone the Full Software Implementation Stack
git clone -b software-stack https://github.com/Collomut/soilManagement.git
```

### Run Tests Locally

```bash
# In the software-stack branch:
# Run firmware unit tests (12/12 passing)
python -m unittest discover -s firmware/tests

# Run backend API pytest suite (11/11 passing)
python -m pytest backend/tests
```

---

## ⚖️ Open Source Commitment & Governance

* **Firmware & Software:** Released under the [MIT License](./LICENSE).
* **Hardware Schematics & PCB:** Released under [CERN Open Hardware Licence v2 - Strongly Reciprocal](https://ohwr.org/cernohl).
* **Data Sovereignty:** All field sensor vectors remain the sovereign property of the individual farmer.
* **Community Contributions:** See [CONTRIBUTING.md](./CONTRIBUTING.md) and [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md).

---
*Zerthiva: Soil Intelligence System · Precision Agritech for Smallholder Climate Resilience · October 2026*
