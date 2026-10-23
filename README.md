# 🌱 Zerthiva: Soil Intelligence System (SIS)
> *"Know Your Soil. Feed Your Field."*

[![Competition](https://img.shields.io/badge/Innovation_Competition-Master_Submission-059669?style=for-the-badge)](./index.html)
[![Stage](https://img.shields.io/badge/Project_Stage-Prototype-d97706?style=for-the-badge)](./index.html)
[![Hardware](https://img.shields.io/badge/Hardware_Cost-$34.80_BOM-0284c7?style=for-the-badge)](./index.html)
[![Offline](https://img.shields.io/badge/Operation-100%25_Offline-10b981?style=for-the-badge)](./index.html)
[![Live Site](https://img.shields.io/badge/Live_Site-GitHub_Pages-059669?style=for-the-badge&logo=github)](https://collomut.github.io/soilManagement/)

**Zerthiva** is an affordable, field-deployed soil intelligence system that monitors soil salinity (apparent bulk Electrical Conductivity) and volumetric moisture in real time, provides precision irrigation timing guidance based on soil water depletion, and issues crop-specific salinity lockout and leaching alerts to prevent osmotic drought and irreversible soil degradation.

---

## 📑 Core Documentation Access

This repository contains the complete 58-section master project plan and technical dossier:

* 🌐 **[Interactive 3D Soil Intelligence Viewer](./zerthiva_interactive_3d.html)**  
  *Cinematic WebGL real-time 3D soil cutaway visualization with autonomous agronomic simulation, live sensor telemetry, and PBR-rendered soil layers.*
* 🌐 **[Interactive Web Documentation](./index.html)**  
  *The full self-contained master document featuring live real-time position scrollspy, categorized 5-tier sidebar navigation, dynamic reading progress bar, bold topic hierarchy, and responsive data tables.*
* 🖨️ **Print & PDF Export:**  
  *Open `index.html` in Chrome or Edge and press `Ctrl+P` (Save as PDF). Built-in `@media print` rules automatically format the document into a clean, 74-page master submission with section page breaks, edge-to-edge margins, and hidden navigation.*

---

## ⚡ The Problem: The Destructive Feedback Triangle

Smallholder farmers in irrigated developing regions unknowingly suffer from **osmotic drought**:
1. **Uninformed Irrigation:** Fixed-schedule watering draws deep soil salts to the surface.
2. **Salt Accumulation:** Water evaporates, leaving dissolved minerals that raise soil Electrical Conductivity (EC).
3. **Osmotic Lockout:** High salt concentrations reverse osmotic pressure; plant roots cannot absorb water even in waterlogged soil.
4. **Misdiagnosed Crop Wilting:** Farmers assume crops are thirsty or nutrient-deficient, adding *more* water and *more* fertilizer (which are chemical salts).
5. **Crop Collapse & Land Abandonment:** EC crosses the crop tolerance threshold (e.g. 1.7 dS/m for maize, 2.5 dS/m for tomato), causing 50–80% yield collapse.

Globally, soil salinization destroys **1.5 million hectares of arable land annually** and inflicts **$27 billion in economic damage**.

---

## 🛠️ The Solution & System Architecture

Zerthiva resolves this with a **\$34.80 BOM field node**:

```
 [ Field Soil ] 
       │
       ▼
 [ EC Sensor (~$8) ] + [ Capacitive Moisture (~$3) ] + [ DS18B20 Temp (~$2) ]
       │
       ▼
 [ ESP32 Microcontroller (~$5) ] ── (Solar Panel + LiPo Battery (~$8))
       │
       ├─► [ Local Edge Decision Engine ] (FAO-56 Water Balance + Maas-Hoffman Salinity Engine)
       │         │
       │         ├─► [ 3-State LED Beacon ] (Green = Safe, Yellow = Warning, Red = Action)
       │         ├─► [ Local Micro-OLED ] (Plain-language 10-word guidance)
       │         └─► [ MicroSD Blackbox ] (Local 7-day rolling data logging)
       │
       └─► [ Optional SIM800L GSM Module (~$5) ]
                 │
                 ├─► [ SMS Gateway ] (Plain local-language SMS alerts to farmer feature phones)
                 └─► [ Regional Cloud Sync ] (PostgreSQL / TimescaleDB for Extension Officers)
```

---

## 📊 Summary of Impact Targets

| Parameter | Traditional Baseline | Zerthiva Managed Target | Verification Method |
|---|---|---|---|
| **Irrigation Water Use** | ~8,000 m³/ha/season | 5,000–6,000 m³/ha/season (**30–50% saved**) | Flow meter & pump runtime logs |
| **Fertilizer Consumption** | ~200 kg/ha/season | 130–160 kg/ha/season (**25–40% saved**) | Purchase receipts & field logs |
| **Maize Harvest Yield** | ~1.8–2.0 t/ha | 2.3–2.6 t/ha (**15–30% gain**) | Calibrated scale harvest weigh-in |
| **Root Zone Soil EC** | Unmonitored (escalating) | Maintained below crop threshold | 3-point reference EC soil sampling |
| **Input Cost Savings** | ~$180–$200/ha/season | ~$120–$140/ha/season (+$60/ha saved) | Financial logbook |
| **Node Payback Period** | N/A | **< 1 full growing season** | Economic analysis |

> *Note: Projections are derived from literature models (FAO-56, Maas-Hoffman 1977, Ayers & Westcot 1985) and are subject to empirical bench calibration and the 10-farm Machakos County pilot trial verification.*

---

## 🏛️ Master Plan Architecture (58 Sections)

The full documentation in `index.html` is structured into five levels:

1. **Level 1: Foundations & Context (Sections 1–10):** Project Identity, Executive Summary, Agricultural Context, Problem Statement, 5-Whys Root Cause Analysis, Evidence Base, Case Studies (iCow, Proximity Designs, failed World Bank IoT), Competitor Matrix, and The Unaddressed Gap.
2. **Level 2: Solution Architecture & Science (Sections 11–19):** Top-to-Bottom Hardware/Firmware Design, 3-Persona User Journeys, Technology Justification, System Flow Architecture, Data Governance, Phase 2 AI/ML Strategy, Agronomic Science (FAO-56, Osmosis, Leaching Fractions), and 10-Stage Crop Process Models.
3. **Level 3: Operations & Financials (Sections 20–30):** Expected Outputs, Cross-Sector Impacts, Formal M&E KPIs, Target User Personas (Amara, James, Sara), Market Sizing (TAM: $3B, SAM: $675M), B2B/B2G Business Model, Unit Cost Structure, 3-Year Financials (Break-even at 450 units), Lean $3,500 Funding Request, and 10-Farm Pilot Plan.
4. **Level 4: Governance & Risk Management (Sections 31–43):** Team Roles, Strategic Partnerships, Regulatory/Legal (GDPR, E-waste, RoHS), Security (JWT, TLS 1.3, AES-256), Reliability (72h solar buffer), Universal Accessibility (Zero-literacy LED + SMS), Quantified Environmental/Social Impacts, 15-Point Risk Register, Failure Scenarios, Scalability, Sustainability, and Open-Source Licensing.
5. **Level 5: Scientific Validation & Defense (Sections 44–58):** Testing Protocols, Matched-Pair Control Group Experimental Design (Wilcoxon Signed-Rank), Results Projections, Commercialization Roadmap, Sustainable Moat, Food Security, Climate Resilience, M&E Framework, Theory of Change Flow, SDG Alignment (SDGs 2, 6, 12, 13, 15), Product Requirements (15 FRs / 10 NFRs), Final Pitch, and **The Kill Test (30 Hard Questions Answered Honestly)**.

---

## 🚀 Quick Start / Local Viewing

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Collomut/soilManagement.git
   cd soilManagement
   ```
2. **Open the interactive documentation:**
   Simply double-click `index.html` or open it with any web browser:
   ```bash
   # Windows PowerShell
   Start-Process .\index.html
   ```

---

## ⚖️ License & Open Source Commitment

* **Firmware & Software:** Released under the [MIT License](https://opensource.org/licenses/MIT).
* **Hardware Schematics & PCB:** Released under the [CERN Open Hardware Licence v2 - Strongly Reciprocal](https://ohwr.org/cernohl).
* **Data Ownership:** Farmer field data remains the sovereign property of the individual farmer.
* **Contributing:** See [CONTRIBUTING.md](./CONTRIBUTING.md) for development guidelines.

---
*Created for the Agricultural Technology & Innovation Competition · October 2026 (Comprehensive Audit Reconciled Dossier)*
