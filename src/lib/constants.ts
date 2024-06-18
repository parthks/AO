import L from "leaflet";

import alertImage from "../assets/alert.svg";
import roadImage from "../assets/road.svg";
import sidewalk from "../assets/sidewalk.svg";
import street_lightImage from "../assets/street_light.svg";
import trashImage from "../assets/trash.svg";

export const TrashIcon = L.icon({
  iconUrl: trashImage,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

export const RoadIcon = L.icon({
  iconUrl: roadImage,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

export const StreetLightIcon = L.icon({
  iconUrl: street_lightImage,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

export const SidewalkIcon = L.icon({
  iconUrl: sidewalk,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

export const GeneralIssueIcon = L.icon({
  iconUrl: alertImage,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});
