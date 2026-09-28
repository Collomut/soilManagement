# 🌱 SoilGuard — Soil Intelligence System (SIS)
> *"Know Your Soil. Feed Your Field."*

[![Competition](https://img.shields.io/badge/Innovation_Competition-Master_Submission-059669?style=for-the-badge)](./SoilGuard_Full_Documentation.html)
[![Stage](https://img.shields.io/badge/Project_Stage-Prototype-d97706?style=for-the-badge)](./SoilGuard_Full_Documentation.html)
[![Hardware](https://img.shields.io/badge/Hardware_Cost-$30_Node-0284c7?style=for-the-badge)](./SoilGuard_Full_Documentation.html)
[![Offline](https://img.shields.io/badge/Operation-100%25_Offline-10b981?style=for-the-badge)](./SoilGuard_Full_Documentation.html)

**SoilGuard** is an affordable, field-deployed soil intelligence system that monitors soil salinity (Electrical Conductivity) in real time, provides precision irrigation timing, and calculates crop-specific fertilizer dosages — stopping irreversible soil degradation and crop loss before it occurs.

---

## 📑 Core Documentation Access

This repository contains the complete 58-section master project plan and technical dossier:

* 🌐 **[Interactive Web Documentation (SoilGuard_Full_Documentation.html)](./SoilGuard_Full_Documentation.html)**  
  *The full self-contained master document featuring live real-time position scrollspy, categorized 5-tier sidebar navigation, dynamic reading progress bar, bold topic hierarchy, and responsive data tables.*
* 🖨️ **Print & PDF Export:**  
  *Open `SoilGuard_Full_Documentation.html` in Chrome or Edge and press `Ctrl+P` (Save as PDF). Built-in `@media print` rules automatically format the document into a clean, 74-page master submission with section page breaks, edge-to-edge margins, and hidden navigation.*

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

SoilGuard resolves this with a **$30.00 modular field node**:

```
 [ Field Soil ] 
       │
       ▼
 [ EC Sensor (~$8) ] + [ Capacitive Moisture (~$3) ] + [ DS18B20 Temp (~$2) ]
       │
       ▼
 [ ESP32 Microcontroller (~$5) ] ── (Solar Panel + LiPo Battery (~$8))
       │
       ├─► [ Local Edge Decision Engine ] (FAO-56 Lookup + Leaching Fraction Formula)
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

| Parameter | Traditional Baseline | SoilGuard Managed Target | Verification Method |
|---|---|---|---|
| **Irrigation Water Use** | ~8,000 m³/ha/season | 5,000–6,000 m³/ha/season (**30–50% saved**) | Flow meter & pump runtime logs |
| **Fertilizer Consumption** | ~200 kg/ha/season | 130–160 kg/ha/season (**25–40% saved**) | Purchase receipts & field logs |
| **Maize Harvest Yield** | ~1.8–2.0 t/ha | 2.3–2.6 t/ha (**15–30% gain**) | Calibrated scale harvest weigh-in |
| **Root Zone Soil EC** | Unmonitored (escalating) | Maintained below crop threshold | 3-point reference EC soil sampling |
| **Input Cost Savings** | ~$180–$200/ha/season | ~$120–$140/ha/season (+$60/ha saved) | Financial logbook |
| **Node Payback Period** | N/A | **< 1 full growing season** | Economic analysis |

---

## 🏛️ Master Plan Architecture (58 Sections)

The full documentation in `SoilGuard_Full_Documentation.html` is structured into five levels:

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
   Simply double-click `SoilGuard_Full_Documentation.html` or open it with any web browser:
   ```bash
   # Windows PowerShell
   Start-Process .\SoilGuard_Full_Documentation.html
   ```

---

## ⚖️ License & Open Source Commitment

* **Firmware & Software:** Released under the [MIT License](https://opensource.org/licenses/MIT).
* **Hardware Schematics & PCB:** Released under the [CERN Open Hardware Licence v2 - Strongly Reciprocal](https://ohwr.org/cernohl).
* **Data Ownership:** Farmer field data remains the sovereign property of the individual farmer.

---
*Created for the Agricultural Technology & Innovation Competition · September 2026*
