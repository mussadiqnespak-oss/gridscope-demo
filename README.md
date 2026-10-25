# GridScope V6

Live: https://gridscope-population-hazard-demo.vercel.app/

GridScope V6 is a public-safe, synthetic demonstration for GIS electricity-service planning. **No real FESCO/LESCO asset, transformer, feeder, customer or meter data are deployed.**

## Included in the live redesign

- Smooth Leaflet heatmaps: population, meter density, nighttime lights and settlement growth (sample values).
- Interactive choropleths, fictional feeder service territories and transformer groups.
- Popups with population, meter records, billed energy, losses, priority score and plain-English explanations.
- Animated monthly slider January 2025 through June 2026.
- Ranked service-record review zones and downloadable CSV.
- Side-by-side feeder and transformer comparison.
- AMI anomaly aggregate screening, hazard scenario screening and inspection closure tracker.
- Strict CSV uploads and small GeoJSON polygon uploads.
- On-demand Open-Meteo historical weather and OpenStreetMap building polygons (when APIs are reachable).
- Full private V5 HTML local-file loader under the Private Portal tab; the real FESCO portal must be obtained separately from the existing private package.

## How to use

Open the live site and choose Smart map explorer for heatmaps, choropleths and the month slider. Use Feeder & Transformer to compare two fictional groups; Service Verification to rank zones and export a hotspot CSV; Field Inspections to update demonstration statuses (stored only in your browser); and Data Imports to upload aggregated CSV/GeoJSON.

Upload templates can be downloaded in the Data Imports tab:

Monthly data: zone_id,month,population,households,active_meters,billed_kwh,loss_pct

AMI data: zone_id,month,ami_anomaly_pct

Nightlight data: zone_id,month,nightlight_index,growth_pct

Feeder study: feeder_id,month,billed_kwh,loss_pct

The IDs such as S-01-01 and FDR-01 are **fictional demonstration areas**, so actual Faisalabad population rasters cannot be correctly joined to them without building matching geographic zones. Demonstration months run from 2025-01 to 2026-06.

GeoJSON upload accepts WGS84 longitude/latitude polygons. Imported flood polygons are screened against synthetic zone centroids only, not actual network assets. Large raster, GeoPackage and shapefile imports require offline GIS processing.

## Real external sources and their status

- [Census 2023](https://census23.pbos.gov.pk/): official reference, not aggregated to the fictional grid.
- [WorldPop](https://hub.worldpop.org/): available raster source, not retrieved into this public demo.
- [GHSL](https://human-settlement.emergency.copernicus.eu/): available settlement-growth products, not retrieved.
- [OpenStreetMap](https://www.openstreetmap.org/): optional live building retrieval; source marked as real only after API success.
- [Overture Buildings](https://docs.overturemaps.org/guides/buildings/): optional imported footprints, not bundled.
- [VIIRS nighttime lights](https://developers.google.com/earth-engine/datasets/catalog/NOAA_VIIRS_DNB_MONTHLY_V1_VCMSLCFG): synthetic trend until user imports an aggregated time series.
- [JRC surface water](https://global-surface-water.appspot.com/download): dataset accessible externally, not downloaded.
- [Copernicus floods](https://www.globalfloods.eu/): dataset accessible externally, not downloaded.
- [Copernicus DEM](https://registry.opendata.aws/copernicus-dem/): requires geospatial raster processing.
- [Open-Meteo historical API](https://open-meteo.com/en/docs/historical-weather-api): optional live historical weather request and download.

Source availability does NOT mean an environmental layer was successfully downloaded and used. This project clearly labels synthetic values and external data.

## Private FESCO data

The earlier full private GIS V5 portal and engineering Python scripts are contained in the previously provided GridScope_FESCO_ALL_WORK_AND_SCRIPTS_2026.zip package, separate from this public repository. The new public site's Private Portal page accepts its HTML file locally; the private file is not uploaded to this website.

## Privacy / engineering limitations

The public sample data are not an actual DISCO network model, electricity loss study, population census or theft finding. Population-to-meter ratios indicate possible **survey, service-coverage or database verification needs**, not proof of unauthorised consumption. A real deployment requires authenticated hosting, data-sharing approval, a verified meter registry, true transformer supply territories and audit controls.

## Source files

- index.html: layout and modules
- assets/style.css: responsive styles
- assets/app.js: data processing, map and import logic

User CSVs are processed in the browser. Only basemap services and external provider lookups send requests outside the page. Do not import personal or restricted utility information to a public demonstration.
## V6 Engineering Modules (updated 23 October 2026)

The public website now has separate sidebar modules for:

- **HT / LT Network Intelligence:** working *synthetic* node-and-span graph with disconnection and reachable-node scenario calculations.
- **Asset & Transformer Intelligence:** master asset template and field readiness.
- **GIS Engineering QC:** local CSV schema and duplicate-ID checks, with export. Spatial/electrical GIS checks remain in the private V5 portal.
- **Load Flow & Technical Losses:** LF/PF demonstration calculator using loss factor = 0.3×LF + 0.7×LF², example annual loss and peak demand. Not a calibrated feeder model.
- **Smart Meter / AMI:** required feeder→transformer→consumer→meter hierarchy and aggregate CSV import/template.
- **Energy Reconciliation:** input, billed, technical loss and residual demonstration with completeness warnings. Residual is not theft.
- **Network Resilience:** illustrative exposed-population and inspection effort scenario.
- **IEC CIM Interoperability:** GIS-to-CIM field/class crosswalk, required attributes, readiness checks and CSV/conceptual JSON export. Exports are not compliant IEC RDF/XML profiles.

Each engineering page has an **Open original private module** action that opens the private local-file loader. The actual Faisalabad City Grid engineering analyses, real feeder QC results, real HT/LT sections, and original CIM readiness assessment remain exclusively in the separate V5 private HTML package. The site never sends that file to the public backend.

**How to see CIM:** Visit https://gridscope-population-hazard-demo.vercel.app/, find **Engineering modules** in the left sidebar and choose **CIM interoperability**. Choose **Open original CIM readiness** and select the private V5 HTML file to view the earlier real-network module.

This production site was deployed directly to Vercel and is not yet configured for automatic Git-to-Vercel deployment.

## V7 Reference Data Lab — 23 October 2026

The live synthetic portal now includes **Reference data & demo** in the sidebar, with eight distinct sample dataset types:
electrical transformer losses; transformer loading; monthly billing, meter, population and AMI aggregates; conductor R/X; switching; flood/heat/fault exposure; CIM relationships; and field inspections.

Public reference records use **fictional asset IDs only**. Use the reference table dropdown to browse and download CSV files. Imported reference CSVs are validated against that table's required columns and remain browser-session-only. A copper/core-loss illustration is included and must never be presented as actual measured loss.

**Private engineering data:** The separate private V7 package delivered in ChatGPT contains original transformer EquipmentI IDs and recorded kVA plus simulated values linked to all 1,011 records. It contains the private GIS portal, full reference CSVs, scripts and a Word engineering guide. No real transformer coordinates or identifiers are published to GitHub or Vercel.

New reference CSVs are **not** independently certified. Actual measured loading, transformer test sheets, active billing/meter population, observed floods, asset conditions, switching diagrams and a compliant CIM profile must replace the synthetic values before operations or government decisions.

The public website is deployed directly to Vercel. Automatic GitHub-to-Vercel builds remain a separate optional configuration step.

## V8: Rail Bazar loss integration + Shapefile to CIM (24 Oct 2026)

The online CIM page includes a **public-safe browser** import for small Shapefile ZIP / EPSG:4326 GeoJSON and candidate ACLineSegment / PowerTransformer / EnergyConsumer RDF/XML export with field mapping, crosswalk and QA downloads. The external shpjs library must load for browser ZIP inputs. This is a **DRAFT CIM model export**, not a certified 61970-552/CIMTool profile.

The Load Flow & Losses page now explains the newly analysed Rail Bazar FY 2025–26 transformer-loss file, but no actual Rail Bazar asset IDs or loss table were uploaded to public GitHub/Vercel.

The **private V8 ZIP**, delivered in the ChatGPT conversation, contains:
- full private FESCO GIS portal with Transformer Loss Study (V8) and Shapefile to CIM (V8) tabs;
- 85 actual report transformer rows, loss audit and unmatched-GIS crosswalk template;
- command-line converter accepting zipped Shapefiles, GeoPackage or GeoJSON, producing RDF/XML draft, crosswalk CSV, QA CSV and validation JSON;
- tested CIM output for real 2,181 HT spans and fictitious ZIP test fixture;
- full 13-page Word engineering documentation and proposed PostGIS SQL schema;
- prior V7 package, original source GIS and transformer shapefiles in the **private** deliverable.

**Critical join limitation:** None of the 85 Rail Bazar report transformer IDs match the 1,011-record GIS transformer master. An evidence-approved crosswalk is required before creating transformer-linked GIS losses. Do not match by rating or proximity. The source report has ambiguous TAEEquipment_KWh scaling and MaxLoading semantics; both remain source-defined until verified.

**CIM limitations:** Candidate RDF/XML is syntactically testable, but it cannot be presented as exchange-profile conformant without official model/version agreement, electrical connectivity, meter/terminal mapping, switch state, source and stable mRID approval, IEC 61970-552 formatting/headers and CIMTool/target-system conformance checks.

The GitHub repository contains **only the public synthetic demo**. Actual electrical network and transformer study datasets remain in the separate private package.

## V9 — Reusable import workspace (October 2026)

**Default start page:** My Data · Start Here — https://gridscope-population-hazard-demo.vercel.app/

The old sample map and one-time preloaded engineering studies made the earlier portal hard to use. V9 introduces a **fresh browser-session import workflow** rather than pretending to refresh all precomputed older engineering models:

1. Select CSV, Excel, GeoJSON or a ZIP containing one shapefile with a valid projection.
2. Choose Feeder names / Transformers / Losses / Meter totals / GIS map layer.
3. Inspect the first rows, map the source columns with dropdowns (supports aliases such as Feeder Name, FeederCode, EquipmentI, EquipmentS, latitude/longitude, UTM X/Y, AEL_KWh).
4. Click **Show my data** to replace that category in the working data hub and refresh its live summary, feeder-name filter, map, mismatch checks and CSV exports.
5. Import additional categories in the same session, e.g., feeder list, transformers, losses, metering counts. A new transformer upload replaces the previous transformer dataset while other categories remain loaded.

**Special importer**: detects the multi-row header layout used by the provided Rail Bazar transformer-loss CSV; automatically looks for HTSurveyEquipment, extracts IDs from text like 'Transformer 200 KVA (137664)', suggests AEL_KWh, and lets the user set one feeder name for all rows.

**Feeder names** are shown wherever possible. The existing legacy sample map is still entirely synthetic and uses **Map Zone** as a descriptive label. A Map Zone is not a town, union council, administrative area or real feeder boundary.

**Data safety**: uploaded files are parsed in the browser; the public website is not a secure database. This new hub does not automatically re-run all of the earlier V8 HT/LT topology, calibrated loss-flow, or CIM calculations; those require validated GIS preprocessing. For sensitive FESCO shapefiles and meter/consumer records, continue using the separately supplied private V8 package on a trusted PC, not public hosting.

**Limits**: 12 MB/file, 15,000 table rows, 12,000 GeoJSON/Shapefile features; coordinate system must be WGS84 for GeoJSON or correctly defined shapefile .prj; UTM 42N/43N/44N in CSV supported; multi-layer ZIP and large GPKG/DEM/WorldPop raster processing still use Python/QGIS. The imported data are session-scoped (refresh resets them) and require new imports. The matching module does not equate unknown asset IDs by size or proximity.

**Examples and formats:** see the template downloads inside My Data. The app's first screen explains the import in three simple steps. For government deployment, build an authorised PostGIS-backed workspace with role-based access, encrypted transport, audit history, field mappings, QA gates, and automatic engineering model recomputation.

## V10: Editable reference data + City Grid default (25 Oct 2026)

**Open the public website:** https://gridscope-population-hazard-demo.vercel.app/

The **Reference data & demo** tab now allows editing every displayed data cell, adding rows, replacing the selected reference CSV and downloading the revised file. Small edits are saved on the current browser when its local storage works. Back up each updated CSV before clearing cache or moving computers. Public reference values are fictional and NOT measured.

**My Data · Start Here** supports independent imports of feeder names, transformers, HT/LT lines and poles, consumer aggregate records, drops, monthly losses, meter totals, population, hazards, generic GIS and CIM mappings. Source formats: CSV, Excel where the optional external reader loads, WGS84 GeoJSON and single-layer zipped Shapefile where the optional reader loads. The import maps fields, previews values, and can export a feeder-name report and mismatch list. **Save project** exports all current imported browser data; **Open project** restores the saved JSON next session. Importing a new category replaces only that category.

**Default dataset:** the public website preloads a **public-safe City Grid FEEDER NAMES list only**. It does not contain actual network poles, transformer coordinates, consumer identities or meter records. The **private V10 HTML inside the separately provided ZIP** opens with the user's complete original City Grid 18-feeder GIS model already embedded, plus transformer/loss study and 8 editable reference datasets. Private V10 also adds an independent per-operation Data Library and Save/Restore working-project JSON.

**Important engineering limit:** new operation imports are not silently applied to the old precomputed HT/LT graph, calibrated technical-loss calculations or certified CIM network model. Re-run validated Python/QGIS preprocessing and rebuild private engineering outputs for new network topology. The private ZIP includes original inputs, sample reference tables, templates and previous scripts.

For a public demonstration use fictional inputs only. Do not upload private FESCO/LESCO shapefiles or customer information to public GitHub/Vercel. The public website is not an organisation-approved multiuser database or secure hosting service.

## V11 (25 October 2026): Daily Feeder Monitoring — main dashboard

**The HOME page is now Feeder Monitoring.** Other pages are inside two collapsible groups ("More maps & reports" and "Engineering tools"), with My Data, Example Reference Data and Help always visible.

Daily demonstration features:
- 19 feeder names exactly from the user's FY2025–26 loss study, including Halal Road labelled study-only / missing GIS geometry;
- 15 daily simulated readings from 11–25 Oct 2026, not live SCADA;
- daily date picker, feeder search, status filters, daily voltage/current/MW/energy summaries, breaker trip/outage alarms and 15-day trends;
- click feeder to read values and warning reasons; edit today's reading; export day report or all readings;
- import Excel workbook containing Daily Readings, Feeder Master and Alert Settings sheets or a daily CSV;
- automatic recomputation of KPIs, trends, status and thresholds on every new import or edit;
- generate downloadable Excel from the monitoring page with the SAME sheet-header placement used for the importer.

**Editable polished Excel with daily demo and formulas**: Delivered separately in the conversation as GridScope_Daily_Feeder_Monitoring_EDITABLE_DEMO.xlsx. It has START HERE, Daily Readings, Feeder Master, Alert Settings and Daily Summary worksheets; 285 sample feeder-day readings. Blue calculated columns update with Excel formulas; light-yellow input cells are editable. The workbook uses the original study's feeder names and study peak current, but **every daily telemetry value and the assumed limit/thresholds are sample**, not actual readings. The workbook must be downloaded from the conversation or regenerated via the monitoring-page button.

**Important:** Importing a user workbook recalculates the browser dashboard NOW. It does NOT schedule future ingestion, read live SCADA, send commands, or change the old fixed private GIS engineering studies. Do not import confidential utility records to a public site. Actual live monitoring needs an approved read-only historian/API gateway, secure server, audit trail and access controls.

The separate private V10 package remains the correct place for real GIS geometry and consumer/transformer records.
