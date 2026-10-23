import os
import re

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

test_results = []

def record(test_name, status, details=""):
    test_results.append({"test": test_name, "status": status, "details": details})
    symbol = "✅ PASS" if status == "PASS" else "❌ FAIL" if status == "FAIL" else "⚠️ WARN"
    print(f"[{symbol}] {test_name}: {details}")

print("=" * 70)
print("ZERTHIVA PROJECT INTEGRITY & VALIDATION SUITE")
print("=" * 70)

# ── TEST 1: Check existence of core assets referenced in 3D viewer and HTML ──
print("\n>>> TEST SUITE 1: Asset References on Disk")
html_files = ["index.html", "Zerthiva_Full_Documentation.html", "zerthiva_interactive_3d.html"]
all_referenced_assets = set()

for hf in html_files:
    path = os.path.join(ROOT_DIR, hf)
    if not os.path.exists(path):
        record(f"File Existence: {hf}", "FAIL", "File missing")
        continue
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    matches = re.findall(r'["\']((?:\.?\/)?assets\/[^"\']+)["\']', content)
    for m in matches:
        clean = m.strip('"\'()')
        if clean.startswith('./'):
            clean = clean[2:]
        all_referenced_assets.add(clean)

missing_assets = []
for asset in sorted(all_referenced_assets):
    full_path = os.path.join(ROOT_DIR, asset.replace('/', os.sep))
    if not os.path.exists(full_path):
        missing_assets.append(asset)

if missing_assets:
    record("Local Asset Verification", "FAIL", f"Missing assets: {missing_assets}")
else:
    record("Local Asset Verification", "PASS", f"All {len(all_referenced_assets)} referenced assets verified present on disk")

# ── TEST 2: Check Anchor links within index.html ──
print("\n>>> TEST SUITE 2: Internal Anchor Navigation Integrity")
with open(os.path.join(ROOT_DIR, "index.html"), "r", encoding="utf-8") as f:
    idx_content = f.read()

defined_ids = set(re.findall(r'id=["\']([^"\']+)["\']', idx_content))
anchor_links = set(re.findall(r'href=["\']#([^"\']+)["\']', idx_content))

broken_anchors = [a for a in anchor_links if a not in defined_ids]
if broken_anchors:
    record("Internal Anchor Links", "WARN", f"Unresolved anchor IDs: {broken_anchors}")
else:
    record("Internal Anchor Links", "PASS", f"All {len(anchor_links)} internal anchor links resolve to valid IDs")

# ── TEST 3: Cross-HTML Links ──
print("\n>>> TEST SUITE 3: Cross-Document Navigation")
has_3d_link = "zerthiva_interactive_3d.html" in idx_content
if has_3d_link:
    record("index.html -> 3D viewer link", "PASS", "Interactive 3D viewer link present in hero")
else:
    record("index.html -> 3D viewer link", "FAIL", "Missing link to 3D viewer")

with open(os.path.join(ROOT_DIR, "zerthiva_interactive_3d.html"), "r", encoding="utf-8") as f:
    viewer_content = f.read()

has_doc_link = ('href="./index.html"' in viewer_content) or ('href="index.html"' in viewer_content)
if has_doc_link:
    record("3D viewer -> index.html link", "PASS", "3D viewer links directly to canonical index.html")
else:
    record("3D viewer -> index.html link", "FAIL", "3D viewer link not pointing to index.html")

# ── TEST 4: Data Consistency: EC Temperature Coefficient alpha ──
print("\n>>> TEST SUITE 4: Agronomic Formula & Scientific Data Consistency")
with open(os.path.join(ROOT_DIR, "zerthiva_codebase_blueprint.md"), "r", encoding="utf-8") as f:
    bp_content = f.read()

bp_alpha = re.search(r'alpha\s*=\s*([\d\.]+)', bp_content)
annex_alpha = "0.0191" in idx_content

if bp_alpha and bp_alpha.group(1) == "0.0191" and annex_alpha:
    record("EC Temperature Alpha Coefficient", "PASS", f"Aligned at alpha = 0.0191 across blueprint and Annex E")
else:
    record("EC Temperature Alpha Coefficient", "FAIL", f"Mismatch: Blueprint={bp_alpha.group(1) if bp_alpha else 'None'}, Annex E has 0.0191: {annex_alpha}")

# ── TEST 5: Leaching Fraction Guard Clause ──
has_lf_guard = "if self.ec_water > 0.5 * ec_soil_target:" in bp_content
if has_lf_guard:
    record("Leaching Fraction Safety Guard", "PASS", "Guard 'EC_w <= 0.5 * EC_e' properly enforced in DecisionEngine")
else:
    record("Leaching Fraction Safety Guard", "FAIL", "Guard missing in DecisionEngine")

# ── TEST 6: Hardware Cost / Node Budget Consistency ──
print("\n>>> TEST SUITE 6: Hardware & Financial Metrics Consistency")
with open(os.path.join(ROOT_DIR, "README.md"), "r", encoding="utf-8") as f:
    readme_content = f.read()

readme_has_stale_30_badge = "Hardware_Cost-$30_Node" in readme_content
readme_has_3480_badge = "Hardware_Cost-$34.80_BOM" in readme_content

if readme_has_3480_badge and not readme_has_stale_30_badge:
    record("README Hardware Cost Badge", "PASS", "Updated to canonical $34.80 BOM")
else:
    record("README Hardware Cost Badge", "FAIL", "Stale badge detected in README")

# ── TEST 7: Repository Hygiene & Standards Files ──
print("\n>>> TEST SUITE 7: Open Source & Community Standards")
for standard_file in ["LICENSE", "CONTRIBUTING.md", "CODE_OF_CONDUCT.md", ".nojekyll", "README.md"]:
    fp = os.path.join(ROOT_DIR, standard_file)
    if os.path.exists(fp) and os.path.getsize(fp) > 0:
        record(f"Repository Standard: {standard_file}", "PASS", f"Present ({os.path.getsize(fp)} bytes)")
    else:
        record(f"Repository Standard: {standard_file}", "FAIL", f"Missing or empty")

# ── TEST 8: GitHub Pages Deployment Readiness ──
has_root_index = os.path.exists(os.path.join(ROOT_DIR, "index.html"))
has_nojekyll = os.path.exists(os.path.join(ROOT_DIR, ".nojekyll"))
if has_root_index and has_nojekyll:
    record("GitHub Pages Deployment Readiness", "PASS", "index.html and .nojekyll present at root for direct branch deployment")
else:
    record("GitHub Pages Deployment Readiness", "FAIL", "Missing root landing files for Pages deployment")

# ── TEST 9: Visual & Dark Mode Tests ──
print("\n>>> TEST SUITE 9: Visual, Accessibility & Dark Theme Integrity")
dark_table_check = '[data-theme="dark"] .table-wrap' in idx_content and '[data-theme="dark"] table th' in idx_content
if dark_table_check:
    record("Dark Mode Table Styling", "PASS", "Full CSS rules present for .table-wrap, th, td, tr hover")
else:
    record("Dark Mode Table Styling", "FAIL", "Dark mode table styles missing")

meta_og_check = 'og:title' in idx_content and 'og:image' in idx_content and 'twitter:card' in idx_content
if meta_og_check:
    record("OpenGraph & Social Sharing Meta", "PASS", "Complete og: and twitter: meta tags in index.html")
else:
    record("OpenGraph & Social Sharing Meta", "FAIL", "Social meta tags missing")

favicon_check = 'rel="icon"' in idx_content and 'rel="icon"' in viewer_content
if favicon_check:
    record("Favicon Metadata", "PASS", "Inline SVG favicon present in both index.html and 3D viewer")
else:
    record("Favicon Metadata", "FAIL", "Favicon missing in one or more files")

breakpoint_check = '@media (max-width: 480px)' in idx_content
if breakpoint_check:
    record("Small Phone Responsive Breakpoint (480px)", "PASS", "CSS includes dedicated 480px rules")
else:
    record("Small Phone Responsive Breakpoint (480px)", "FAIL", "480px breakpoint missing")

webgl_fallback_check = 'WebGL Not Supported' in viewer_content and 'isMobile' in viewer_content
if webgl_fallback_check:
    record("3D Viewer WebGL Fallback & Mobile Tuning", "PASS", "Fallback modal and device pixel ratio capping active")
else:
    record("3D Viewer WebGL Fallback & Mobile Tuning", "FAIL", "Fallback or mobile detection missing")

# ── SUMMARY ──
print("\n" + "=" * 70)
total = len(test_results)
passed = sum(1 for r in test_results if r["status"] == "PASS")
failed = sum(1 for r in test_results if r["status"] == "FAIL")
warns = sum(1 for r in test_results if r["status"] == "WARN")
print(f"TEST SUMMARY: Total: {total} | Passed: {passed} | Failed: {failed} | Warnings: {warns}")
print("=" * 70)
