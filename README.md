![Publish image to ACR](https://github.com/vegardalvsaker/distankb-map/workflows/Publish%20image%20to%20ACR/badge.svg?branch=master)
## distankb-map
Distankb is an acronym for ['Der ingen skulle tru at nokon kunne bu'](https://tv.nrk.no/serie/der-ingen-skulle-tru-at-nokon-kunne-bu). distankb-map is a web app which lets you see the location and the metadata of every episode in the distankb documentary series.

## App is hosted [here!](https://deringenskulletru-kart.azurewebsites.net)

## Technologies

### Frontend
TypeScript React using [react-leaflet](https://react-leaflet.js.org/) for the map.

### Backend
ASP.NET Core 3.1 Web Api using Cosmos DB Azure Table storage.

<hr>

### Running locally

#### Prerequisites
* Visual Studio 2019
* Node.js
* Microsoft Azure Storage Emulator
* Microsoft Azure Storage Explorer

#### Running backend and storage emulator
1. Run Azure Storage Emulator
2. Run Azure Storage Explorer
3. Create a table name `DerIngenSkulleTru` and import `geodata.csv`
4. Open `Distankb.Api.sln` and run
5. Open up a browser and go to `https://localhost:44397/api/deringenskulletru` to see all geodata

#### running frontend
1. `npm install` and `npm run`
2. go to `localhost:3000` in a browser
