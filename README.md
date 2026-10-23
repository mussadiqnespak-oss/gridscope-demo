# GridScope — Public GIS Intelligence Demonstration

Public-safe, fictional interactive demonstration of geospatial electricity service-coverage and infrastructure hazard-screening concepts.

**Live original Vercel demonstration:** https://gridscope-population-hazard-demo.vercel.app/

## Features
- Interactive synthetic 12 × 12 planning-cell map for population and electricity-meter counts
- Coverage-aware aggregate CSV imports; unmatched, absent and blank values are not silently converted to zero
- Hypothetical flood exposure viewer
- Open-Meteo historical weather retrieval and CSV export when the external API permits
- Clear data provenance and limitations

## Privacy and evidence
This repository **does not contain actual FESCO / LESCO infrastructure, consumer, meter, transformer, or feeder data**. All displayed sample counts and grid geometry are fictional. User-uploaded files are processed in the browser only and not submitted to this repository, though external data API requests use the stated provider.

The synthetic planning cells have no geodetic coordinates and cannot be matched to WorldPop or any census raster without a verified geographic crosswalk. A resident-to-meter ratio alone must never be used to allege energy theft.

For real planning, use verified population rasters, aggregate meter counts, correct supply-area boundaries, asset topology, survey date, meter status and phase/network information in a separately secured environment.

## Develop
This is a dependency-free static website. Serve `index.html` with any static server. It can be hosted on Vercel or GitHub Pages. Before production use, independently test CSV parsing, data-coverage handling, responsive rendering and third-party provider access.

## Source availability
Open-source references: WorldPop (https://hub.worldpop.org), Pakistan Bureau of Statistics (https://census23.pbos.gov.pk), Copernicus DEM, JRC Global Surface Water and Open-Meteo. Links provide external public-data pathways; **no hazard raster or population model is claimed to be downloaded or analysed here**.
