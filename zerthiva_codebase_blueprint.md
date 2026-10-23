# 🛠️ Zerthiva — Technical Architecture & Codebase Blueprint

This blueprint provides the complete engineering specifications, folder hierarchy, requirements, and architectural diagrams (DFDs and UMLs) needed to build and launch the **Zerthiva Soil Intelligence System (SIS)** in a private GitHub repository.

---

## 1. Repository Directory Structure

```text
zerthiva-core/
├── .github/
│   ├── workflows/
│   │   ├── firmware-ci.yml         # Linting, syntax validation & mock tests for MicroPython
│   │   ├── backend-ci.yml          # Pytest, flake8, and container build for FastAPI
│   │   └── frontend-ci.yml         # ESLint, build test for React dashboard
│   └── PULL_REQUEST_TEMPLATE.md
│
├── firmware/                       # ESP32 Edge Firmware (MicroPython / PlatformIO)
│   ├── src/
│   │   ├── __init__.py
│   │   ├── main.py                 # Main orchestration loop, deep-sleep scheduler
│   │   ├── config.py               # Hardware pinouts, calibration constants, crop profile
│   │   ├── sensors/
│   │   │   ├── __init__.py
│   │   │   ├── ec_sensor.py        # Analog EC reading & 25°C temperature compensation
│   │   │   ├── moisture_sensor.py  # Capacitive VWC% conversion & calibration curve
│   │   │   └── temp_ds18b20.py     # OneWire digital temperature sensor driver
│   │   ├── engine/
│   │   │   ├── __init__.py
│   │   │   ├── fao_tables.py       # FAO crop salinity thresholds (Maize, Tomato, etc.)
│   │   │   ├── decision_engine.py  # Leaching fraction (LR) & fertilizer adjustment rules
│   │   │   └── led_controller.py   # Tri-color visual sentry pulse controller
│   │   ├── storage/
│   │   │   ├── __init__.py
│   │   │   └── sd_logger.py        # MicroSD SPI driver & 7-day rolling CSV writer
│   │   └── comms/
│   │       ├── __init__.py
│   │       ├── gsm_sim800.py       # SIM800L UART driver, SMS dispatcher & HTTP POST
│   │       └── wifi_client.py      # Optional WiFi uplink for bench testing
│   ├── tests/
│   │   ├── test_decision_engine.py # Mock agronomic logic tests
│   │   └── test_temperature_comp.py
│   ├── flash_firmware.sh           # Script to flash MicroPython onto ESP32 via esptool
│   └── requirements-dev.txt
│
├── backend/                        # Cloud Telemetry & Advisory API (FastAPI)
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py                 # FastAPI application initialization & middleware
│   │   ├── core/
│   │   │   ├── config.py           # Pydantic environment settings
│   │   │   ├── database.py         # SQLAlchemy async engine & TimescaleDB connection
│   │   │   └── security.py         # JWT tokens & device PSK authentication
│   │   ├── models/                 # Database ORM entities
│   │   │   ├── farm.py             # Farm profile, crop types, GPS coordinates
│   │   │   ├── node.py             # Device hardware ID, firmware version, battery
│   │   │   └── telemetry.py        # Hypertable for EC, moisture, temp time-series
│   │   ├── schemas/                # Pydantic request/response models
│   │   │   ├── telemetry.py
│   │   │   └── advisory.py
│   │   ├── api/
│   │   │   └── v1/
│   │   │       ├── api.py          # Route registry
│   │   │       ├── endpoints/
│   │   │       │   ├── ingest.py   # IoT node telemetry ingestion endpoint
│   │   │       │   ├── farms.py    # Farm & node management
│   │   │       │   └── advisory.py # Agronomic query & alert logs
│   │   └── services/
│   │       ├── sms_gateway.py      # Africa's Talking / Twilio SMS integration
│   │       └── anomaly_detector.py # Sensor drift & outlier detection
│   ├── alembic/                    # Database schema migration scripts
│   │   └── versions/
│   ├── tests/
│   │   ├── test_ingest.py
│   │   └── test_telemetry.py
│   ├── Dockerfile
│   └── requirements.txt
│
├── frontend/                       # Extension Officer & Regional Dashboard (React + Vite)
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── StatCard.jsx        # Quick metric counters
│   │   │   ├── SalinityChart.jsx   # Time-series Recharts EC curve
│   │   │   ├── MoistureGauge.jsx   # Field capacity gauge
│   │   │   └── FarmMap.jsx         # Leaflet/OpenLayers farm status map
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx       # Overview of all 10 pilot farms
│   │   │   ├── FarmDetail.jsx      # Individual field telemetry & historical logs
│   │   │   └── Alerts.jsx          # Active critical salinity warnings
│   │   ├── services/
│   │   │   └── api.js              # Axios HTTP client with JWT interceptor
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── simulator/                      # Synthetic Sensor & Field Emulator
│   ├── __init__.py
│   ├── mock_field_node.py          # Emulates diurnal cycles, rainfall & salt spikes
│   └── run_simulation.sh
│
├── docs/                           # Technical Specifications & Schematics
│   ├── architecture/
│   │   ├── data_flow_diagrams.md
│   │   ├── uml_diagrams.md
│   │   └── circuit_schematic.png   # ESP32 pinout & wiring diagram
│   └── api/
│       └── openapi.json
│
├── docker-compose.yml              # Local dev stack: Postgres + TimescaleDB + Backend + Frontend
├── .env.example                    # Template for secrets and credentials
├── .gitignore
├── LICENSE                         # MIT License
└── README.md
```

---

## 2. Requirements & Tooling Setup

### 2.1 Hardware Lab Requirements
* **Microcontroller:** ESP32-WROOM-32 (NodeMCU / DevKit V1)
* **Salinity Probe:** Analog Soil EC/TDS Sensor (Output: 0–3.3V DC via op-amp divider)
* **Moisture Probe:** Capacitive Soil Moisture Sensor v1.2 (Corrosion-resistant)
* **Temperature Probe:** DS18B20 1-Wire Digital Probe (Requires 4.7kΩ pull-up resistor on GPIO4)
* **Storage:** MicroSD Card Module (SPI interface: CS=GPIO5, MOSI=GPIO23, MISO=GPIO19, SCK=GPIO18)
* **Status Beacon:** Tri-Color RGB Common-Cathode LED (Red=GPIO25, Green=GPIO26, Blue=GPIO27)
* **Uplink Module (Optional):** SIM800L GSM/GPRS module (UART2: TX=GPIO17, RX=GPIO16)
* **Power Supply:** 5W Monocrystalline solar panel + TP4056 charging board + 18650 3.7V 2,200mAh Li-ion cell

### 2.2 Software & Development Toolchain

#### Edge Firmware Tooling
```bash
# Python toolchain for flashing MicroPython to ESP32
pip install esptool adafruit-ampy rshell

# Erase and flash latest MicroPython firmware on ESP32
esptool.py --chip esp32 --port COM3 erase_flash
esptool.py --chip esp32 --port COM3 --baud 460800 write_flash -z 0x1000 esp32-20230426-v1.20.0.bin
```

#### Cloud Backend Tooling
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: .\venv\Scripts\activate
pip install -r requirements.txt
```
*Core `requirements.txt`:*
* `fastapi>=0.104.0`
* `uvicorn[standard]>=0.23.0`
* `sqlalchemy>=2.0.0`
* `asyncpg>=0.28.0`
* `pydantic>=2.4.0`
* `alembic>=1.12.0`
* `africastalking>=1.2.0`
* `pytest>=7.4.0`

#### Dashboard Tooling
```bash
cd frontend
npm install
npm run dev
```

---

## 3. Data Flow Diagrams (DFD)

### 3.1 DFD Level 0: System Context Diagram

```mermaid
flowchart TD
    subgraph Environment
        SOIL[("Field Soil & Crop Root Zone")]
    end

    subgraph EdgeDevice ["Zerthiva Edge Node (Field Installed)"]
        NODE["ESP32 Microcontroller\n+ Multi-Sensor Probes\n+ Local Decision Engine"]
    end

    subgraph Users
        FARMER["👨‍🌾 Smallholder Farmer\n(Zero Literacy / Feature Phone)"]
        OFFICER["🧑‍💼 Extension Officer / Agronomist\n(Smartphone / Web Browser)"]
    end

    subgraph Cloud ["Zerthiva Cloud Infrastructure"]
        BACKEND["FastAPI Gateway\n+ TimescaleDB Database\n+ SMS Engine"]
    end

    SOIL -->|"Physical Properties\n(Conductivity, Moisture, Temp)"| NODE
    NODE -->|"Visual Status Pulse\n(Green / Yellow / Red LED)"| FARMER
    NODE -->|"Lightweight JSON Telemetry\n(via GSM/GPRS)"| BACKEND
    BACKEND -->|"Actionable Advisory SMS\n('Hold Fertilizer, Flush 45m')"| FARMER
    BACKEND -->|"Aggregated Regional Telemetry\n& Historical EC Curves"| OFFICER
    FARMER -->|"Closed-Loop Action\n(Irrigate, Flush Salts, Apply Fertilizer)"| SOIL
```

---

### 3.2 DFD Level 1: Subsystem Data Flow Decomposition

```mermaid
flowchart TD
    %% Sensors to Edge Engine
    S_EC["Analog EC Sensor"] -->|"Analog Voltage (ADC)"| P1["1.0 Sensor Acquisition\n& ADC Calibration"]
    S_MOIST["Capacitive Moisture"] -->|"Dielectric Voltage (ADC)"| P1
    S_TEMP["DS18B20 Temp Probe"] -->|"1-Wire Digital Signal"| P1

    P1 -->|"Raw Values (V_ec, V_moist, T_celsius)"| P2["2.0 Temperature Normalization\n& Metric Conditioning"]
    
    P2 -->|"Normalized EC_25 (dS/m)\nVolumetric Moisture (%)\nTemp (°C)"| D1[("Local 7-Day Rolling Log\n(MicroSD Card SPI)")]
    P2 -->|"Current Field Vector"| P3["3.0 Agronomic Decision Engine\n(FAO-56 Threshold Evaluator)"]

    %% Decision Engine Logic
    D2[("FAO Crop Threshold Table\n(EC_max, Field Capacity)")] -->|"Crop Tolerances"| P3
    
    P3 -->|"Action Level (SAFE / CAUTION / CRITICAL)\nLeaching Requirement (LR)"| P4["4.0 Local Alert Dispatcher"]
    
    P4 -->|"RGB Pin PWM Modulation"| LED["Tri-Color Status Beacon"]
    P4 -->|"Formatted SMS String"| GSM["SIM800L GSM Module"]
    
    GSM -->|"Cellular SMS Payload"| FARMER_PHONE["Farmer Nokia / Feature Phone"]
    GSM -->|"HTTP POST /telemetry"| CLOUD_API["FastAPI Cloud Gateway"]
    
    CLOUD_API -->|"Validate & Store"| TIMESCALE[("TimescaleDB\nTelemetry Hypertable")]
    TIMESCALE -->|"REST Endpoints"| DASHBOARD["React Agronomic Web Dashboard"]
```

---

## 4. UML Diagrams

### 4.1 UML Class Diagram (Domain & Edge Architecture)

```mermaid
classDiagram
    class SoilSensorNode {
        +String device_id
        +String firmware_version
        +CropProfile current_crop
        +Boolean is_low_power_mode
        +initialize() void
        +read_sensors() SensorReading
        +execute_cycle() void
        +sleep(duration_sec: int) void
    }

    class SensorReading {
        +float raw_ec
        +float normalized_ec_25
        +float moisture_vwc
        +float soil_temp_c
        +int timestamp
        +to_csv() String
        +to_json() String
    }

    class ECSensor {
        +int adc_pin
        +float calibration_k
        +read_raw_voltage() float
        +calculate_ec(voltage: float, temp_c: float) float
    }

    class MoistureSensor {
        +int adc_pin
        +int air_val
        +int water_val
        +read_percentage() float
    }

    class TemperatureSensor {
        +int onewire_pin
        +read_celsius() float
    }

    class CropProfile {
        +String crop_name
        +float ec_threshold_max
        +float field_capacity_min
        +float field_capacity_max
        +int growth_stage_days
    }

    class AgronomicDecisionEngine {
        +evaluate(reading: SensorReading, crop: CropProfile) DecisionResult
        +compute_leaching_fraction(ec_water: float, ec_target: float) float
    }

    class DecisionResult {
        +String alert_level
        +String recommendation_text
        +float leaching_volume_liters
        +Boolean allow_fertilizer
    }

    SoilSensorNode "1" *-- "1" ECSensor
    SoilSensorNode "1" *-- "1" MoistureSensor
    SoilSensorNode "1" *-- "1" TemperatureSensor
    SoilSensorNode "1" *-- "1" AgronomicDecisionEngine
    SoilSensorNode "1" --> "1" CropProfile
    SoilSensorNode ..> SensorReading : generates
    AgronomicDecisionEngine ..> DecisionResult : produces
```

---

### 4.2 UML Sequence Diagram: 15-Minute Sensor & Decision Cycle

```mermaid
sequenceDiagram
    autonumber
    participant Timer as ESP32 RTC Wakeup
    participant Main as main.py (Orchestrator)
    participant Sensors as Multi-Sensor Subsystem
    participant Engine as Agronomic Decision Engine
    participant LED as LED Controller
    participant Storage as MicroSD SPI Logger
    participant GSM as SIM800L Module
    participant Cloud as Cloud API

    Timer->>Main: RTC Alarm triggers wake from Deep Sleep
    Main->>Sensors: Power up sensor bus (GPIO switch)
    Main->>Sensors: read_temperature()
    Sensors-->>Main: Return 24.5 °C
    Main->>Sensors: read_ec(temp=24.5)
    Sensors-->>Main: Return normalized 2.8 dS/m (High!)
    Main->>Sensors: read_moisture()
    Sensors-->>Main: Return 32% VWC
    Main->>Sensors: Power down sensor bus (Power Saving)

    Main->>Engine: evaluate(EC=2.8, Moist=32%, Crop="Tomato")
    Note over Engine: Threshold for Tomato = 2.5 dS/m.<br/>EC 2.8 exceeds safe threshold.<br/>Calculate Leaching Fraction (LR).
    Engine-->>Main: Return DecisionResult(Alert=RED, Flush=True, Fertilizer=BLOCKED)

    Main->>LED: set_state(RED_PULSE)
    Note over LED: Red pulse alerts farmer<br/>in the field immediately.

    Main->>Storage: append_csv(timestamp, 2.8, 32, 24.5, "RED")
    Storage-->>Main: Log written OK

    alt Salinity Critical or Daily Sync Due
        Main->>GSM: power_on_uart()
        Main->>GSM: send_sms(phone, "Zerthiva Alert: High salt in tomato field. Hold fertilizer. Water for 45 min extra to flush.")
        GSM-->>Main: SMS Sent OK
        Main->>GSM: http_post(endpoint="/v1/telemetry", payload=JSON)
        Cloud-->>GSM: 201 Created
        GSM->>Main: HTTP 201 OK
        Main->>GSM: power_down()
    end

    Main->>Main: Configure RTC for next 15-min interval
    Main->>Timer: Enter Deep Sleep (0.015 mA draw)
```

---

### 4.3 UML State Machine Diagram: ESP32 Edge Lifecycle

```mermaid
stateDiagram-v2
    [*] --> DEEP_SLEEP

    DEEP_SLEEP --> WAKE_BOOT: RTC Timer Expires (15 min)
    WAKE_BOOT --> HARDWARE_INIT: Initialize GPIO, ADC & SPI

    HARDWARE_INIT --> SENSOR_POLLING: Turn On Sensor Power Rail
    state SENSOR_POLLING {
        [*] --> ReadTemperature
        ReadTemperature --> ReadMoisture
        ReadMoisture --> ReadSalinityEC
        ReadSalinityEC --> TempNormalizeEC
        TempNormalizeEC --> [*]
    }

    SENSOR_POLLING --> AGRONOMIC_EVALUATION: Power Off Sensor Rail
    
    state AGRONOMIC_EVALUATION {
        [*] --> CompareCropThresholds
        CompareCropThresholds --> SafeState: EC <= Threshold
        CompareCropThresholds --> CautionState: EC near Threshold
        CompareCropThresholds --> CriticalState: EC > Threshold
        CriticalState --> CalculateLeachingFraction: Compute Flush Volume
    }

    AGRONOMIC_EVALUATION --> LOCAL_LOGGING: Append to MicroSD CSV
    LOCAL_LOGGING --> VISUAL_ALERT: Update Tri-Color LED (Green / Yellow / Red)

    VISUAL_ALERT --> COMMS_DISPATCH: Alert == CRITICAL or Time == SyncHour
    VISUAL_ALERT --> PREPARE_SLEEP: Alert == SAFE and No Sync Required

    state COMMS_DISPATCH {
        [*] --> PowerOnModem
        PowerOnModem --> DispatchSMS: If Critical Alert
        DispatchSMS --> TransmitCloudJSON: Send Telemetry
        TransmitCloudJSON --> PowerOffModem
        PowerOffModem --> [*]
    }

    COMMS_DISPATCH --> PREPARE_SLEEP
    PREPARE_SLEEP --> DEEP_SLEEP: Enter Low-Power Standby
```

---

### 4.4 UML Deployment Diagram (Physical Infrastructure)

```mermaid
flowchart TB
    subgraph FarmSite ["Physical Farm Site (Sub-Saharan Africa)"]
        subgraph Enclosure ["IP65 Weatherproof Node Enclosure"]
            MCU["ESP32 Microcontroller (Firmware v1.0)"]
            PWR["TP4056 + 2200mAh LiPo + 5W Solar"]
            MODEM["SIM800L Quad-Band GSM Module"]
            SD["MicroSD SPI Storage Card"]
            LED_DEV["Tri-Color High-Intensity LED"]
        end

        subgraph Probes ["Soil Insertion Zone (-20cm Depth)"]
            P_EC["Dual-Prong Analog EC Sensor"]
            P_MOIST["Capacitive Dielectric Moisture Sensor"]
            P_TEMP["Waterproof DS18B20 Temp Probe"]
        end

        Probes -->|Analog / 1-Wire Cable| Enclosure
    end

    subgraph CellularNetwork ["Telecom Infrastructure"]
        BTS["Cell Tower / 2G-3G GPRS BTS"]
        SMSC["Carrier SMSC Gateway"]
    end

    subgraph FarmerDevice ["Farmer End Device"]
        PHONE["Basic Feature Phone\n(Nokia 105, etc.)"]
    end

    subgraph CloudVPC ["Cloud Hosting Environment (VPS / AWS Lightsail)"]
        NGINX["Nginx Reverse Proxy + SSL / TLS 1.3"]
        FASTAPI["FastAPI Python 3.10 Service (Docker)"]
        POSTGRES[("TimescaleDB PostgreSQL (Docker)")]
        WEB_APP["React Web Dashboard (Nginx Static)"]
    end

    subgraph OfficerDevice ["Extension Officer Device"]
        PC["Laptop / Smartphone Browser"]
    end

    MODEM -->|Radio RF| BTS
    BTS -->|SMPP Protocol| SMSC
    SMSC -->|Cellular SMS| PHONE
    BTS -->|TCP/IP GPRS| NGINX

    NGINX --> FASTAPI
    FASTAPI --> POSTGRES
    FASTAPI --> WEB_APP
    WEB_APP -->|HTTPS| PC
```

---

## 5. Core Mathematical & Algorithmic Starter Code

Here is the exact implementation of the **Agronomic Decision Engine** in Python, ready to be saved into `firmware/src/engine/decision_engine.py`:

```python
"""
Zerthiva Agronomic Decision Engine (FAO-56 Implementation)
Author: Zerthiva Engineering Team
License: MIT
"""

class CropTolerance:
    """FAO Salinity Tolerance Parameters (ECe in dS/m)"""
    PROFILES = {
        "maize": {
            "threshold_ec": 1.7,       # Yield loss begins above 1.7 dS/m
            "slope_percent": 12.0,      # Yield decline % per dS/m increase
            "min_moisture_vwc": 22.0,   # Refill point (% volumetric water)
            "max_moisture_vwc": 38.0    # Field capacity
        },
        "tomato": {
            "threshold_ec": 2.5,
            "slope_percent": 9.9,
            "min_moisture_vwc": 25.0,
            "max_moisture_vwc": 40.0
        },
        "rice": {
            "threshold_ec": 3.0,
            "slope_percent": 12.0,
            "min_moisture_vwc": 35.0,
            "max_moisture_vwc": 55.0
        },
        "wheat": {
            "threshold_ec": 6.0,
            "slope_percent": 7.1,
            "min_moisture_vwc": 20.0,
            "max_moisture_vwc": 35.0
        }
    }

class DecisionEngine:
    def __init__(self, ec_water_source: float = 0.6):
        """
        :param ec_water_source: EC of local irrigation water in dS/m (default 0.6 dS/m)
        """
        self.ec_water = ec_water_source

    def normalize_temperature(self, raw_ec: float, temp_c: float) -> float:
        """Standardize raw electrical conductivity to 25°C standard baseline"""
        # Standard t# Rhoades temperature compensation coefficient for soil solution EC: 1.91% per °C (verified)
        alpha = 0.0191
        normalized_ec = raw_ec / (1.0 + alpha * (temp_c - 25.0))
        return round(normalized_ec, 2)

    def calculate_leaching_requirement(self, ec_soil_target: float) -> float:
        """
        Ayers & Westcot Leaching Fraction formula (FAO-56 / FAO-29):
        LF = ECw / (5 * ECe - ECw)
        Safety constraint: enforced only when EC_w <= 0.5 * EC_e (Annex E §E.1)
        """
        # Safety guard: if irrigation water EC is >50% of soil target EC,
        # leaching would worsen salt concentration — do not advise.
        if self.ec_water > 0.5 * ec_soil_target:
            return 0.0  # No leaching advisory; consult agronomist
        denominator = (5.0 * ec_soil_target) - self.ec_water
        if denominator <= 0:
            return 0.15  # Fallback baseline 15% leaching buffer
        lr = self.ec_water / denominator
        return round(min(max(lr, 0.05), 0.45), 2)  # Clamp between 5% and 45%

    def evaluate_field(self, crop_name: str, raw_ec: float, temp_c: float, moisture_vwc: float) -> dict:
        """
        Evaluates soil metrics and produces actionable plain-language commands.
        """
        crop = CropTolerance.PROFILES.get(crop_name.lower(), CropTolerance.PROFILES["maize"])
        ec_25 = self.normalize_temperature(raw_ec, temp_c)

        is_saline = ec_25 > crop["threshold_ec"]
        is_dry = moisture_vwc < crop["min_moisture_vwc"]
        is_waterlogged = moisture_vwc > crop["max_moisture_vwc"]

        # 1. Critical Salinity Condition
        if is_saline:
            lr = self.calculate_leaching_requirement(crop["threshold_ec"])
            extra_percent = int(lr * 100)
            return {
                "status": "CRITICAL",
                "led_color": "RED",
                "allow_fertilizer": False,
                "action": "FLUSH_SALTS",
                "message": f"Hold fertilizer! Soil salt high ({ec_25} dS/m). Water with {extra_percent}% extra volume to leach salts."
            }

        # 2. Dry Soil Condition (Salinity Normal)
        if is_dry:
            return {
                "status": "IRRIGATE",
                "led_color": "YELLOW",
                "allow_fertilizer": True,
                "action": "WATER_FIELD",
                "message": f"Soil dry ({moisture_vwc}%). Salinity safe ({ec_25} dS/m). Run standard irrigation."
            }

        # 3. Waterlogged Condition
        if is_waterlogged:
            return {
                "status": "CAUTION",
                "led_color": "YELLOW",
                "allow_fertilizer": False,
                "action": "PAUSE_WATER",
                "message": f"Soil saturated ({moisture_vwc}%). Pause irrigation to prevent root hypoxia."
            }

        # 4. Optimal Balanced Condition
        return {
            "status": "OPTIMAL",
            "led_color": "GREEN",
            "allow_fertilizer": True,
            "action": "NONE",
            "message": f"All metrics balanced (EC: {ec_25} dS/m, Moisture: {moisture_vwc}%). All good."
        }
```

---

## 6. Synthetic Field Simulator (`simulator/mock_field_node.py`)

This standalone Python script simulates a deployed field node over a 30-day crop growth window. It enables backend and dashboard development before physical soldering is completed:

```python
"""
Zerthiva Field Telemetry Simulator
Generates diurnal temperature, irrigation drop/spikes, and gradual salt accumulation.
"""
import time
import math
import random
import json

def generate_telemetry_point(day: int, hour: int, base_ec: float = 1.2):
    # Diurnal temperature cycle: peak at 14:00, trough at 04:00
    temp_c = 22.0 + 8.0 * math.sin((hour - 8) * math.pi / 12) + random.uniform(-0.5, 0.5)

    # Moisture slowly drops during the day, spikes on simulated irrigation
    moisture = 34.0 - (hour * 0.4) + random.uniform(-0.3, 0.3)
    if hour == 6: # Simulated 6 AM morning irrigation
        moisture += 10.0

    # Progressive salt buildup over 30 days without leaching
    accumulated_salt = base_ec + (day * 0.045) + random.uniform(-0.05, 0.05)

    return {
        "device_id": "SG-NODE-001",
        "timestamp": int(time.time()),
        "day": day,
        "hour": hour,
        "soil_temp_c": round(temp_c, 2),
        "moisture_vwc": round(moisture, 2),
        "raw_ec": round(accumulated_salt, 2),
        "crop": "tomato"
    }

if __name__ == "__main__":
    print("Simulating Zerthiva Node Telemetry stream...")
    for d in range(1, 4):
        for h in range(0, 24, 3):
            data = generate_telemetry_point(day=d, hour=h)
            print(json.dumps(data))
```
