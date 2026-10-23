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