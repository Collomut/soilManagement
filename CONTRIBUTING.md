# Contributing to Zerthiva: Soil Intelligence System

Thank you for your interest in contributing to Zerthiva. This project is developed by a small team working towards an open, affordable soil intelligence system for smallholder farmers.

---

## 🧭 Ways to Contribute

- **Bug Reports:** Open a GitHub Issue describing the problem, expected vs. actual behaviour, and browser/device info.
- **Feature Proposals:** Open a GitHub Discussion before submitting a PR for major changes.
- **Documentation Fixes:** Typos, data corrections, and clarifications are always welcome via PR.
- **Code Contributions:** See the engineering blueprint in `zerthiva_codebase_blueprint.md` for the target architecture.

---

## 🛠️ Development Setup

### Web Documentation (`index.html`)
No build step required. Open `index.html` directly in Chrome or Firefox.

### Firmware (`firmware/`)
```bash
pip install esptool adafruit-ampy rshell micropython-stubber
```
Flash MicroPython firmware to ESP32 using `firmware/flash_firmware.sh`.

### Backend API (`backend/`)
```bash
cd backend
python -m venv venv
venv\Scripts\activate      # Windows
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend Dashboard (`frontend/`)
```bash
cd frontend
npm install
npm run dev
```

---

## 📐 Code Standards

- **Firmware (MicroPython):** Follow PEP 8. All sensor functions must return typed values. EC must be normalized to 25°C before any decision logic.
- **Backend (FastAPI):** All endpoints must have Pydantic schema validation. No raw SQL — use SQLAlchemy ORM.
- **Frontend (React):** Components must be functional (hooks-based). No class components.
- **HTML Documentation:** Preserve the editorial design system defined in the CSS `:root` token block.

---

## ✅ Pull Request Checklist

Before submitting a PR:
- [ ] Code passes all existing tests (`pytest` for backend, firmware mock tests)
- [ ] No new linting errors (flake8, ESLint)
- [ ] Documentation updated if behaviour changes
- [ ] Agronomic constants cite their source (FAO-56, Maas-Hoffman 1977, etc.)

---

## ⚖️ License

By contributing, you agree that your contributions will be licensed under the [MIT License](./LICENSE).

---

*Zerthiva is built for farmers. Every contribution matters.*
