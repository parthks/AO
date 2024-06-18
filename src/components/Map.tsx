import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import moment from "moment";
import { Map } from "leaflet";

import "leaflet/dist/leaflet.css";
import { IssueType, MarkerData } from "../lib/types";
import { GeneralIssueIcon, RoadIcon, SidewalkIcon, StreetLightIcon, TrashIcon } from "../lib/constants";

export default function MyMap({
  markers,
  onMarkerClick,
  mapRef,
}: {
  mapRef: React.MutableRefObject<Map | null>;
  markers: MarkerData[];
  onMarkerClick: (marker: MarkerData) => void;
}) {
  const ZOOM_LEVEL = 9;

  const AllMarkers = markers.map((marker) => {
    const icon =
      marker.Type === "trash"
        ? TrashIcon
        : marker.Type === "street_light"
        ? StreetLightIcon
        : marker.Type === "pothole"
        ? RoadIcon
        : marker.Type === "sidewalk"
        ? SidewalkIcon
        : GeneralIssueIcon;
    const date = moment(marker.Date).format("LL"); // 'LL' is a localized date format, adjust as needed
    // const openFor = new HumanizeDate().dates(new Date(marker.Date), new Date()).ago();

    const issueTypeKey = Object.keys(IssueType).find((key) => IssueType[key as keyof typeof IssueType] === marker.Type) || "Issue";

    return (
      <Marker icon={icon} key={marker.ID} position={[marker.Latitude, marker.Longitude]}>
        <Popup>
          <div>
            <h1 className="text-lg">{issueTypeKey}</h1>
            <button onClick={() => onMarkerClick(marker)} className="text-blue-500 underline hover:text-blue-700">
              See Image
            </button>
            {/* <p>Open for: {openFor}</p> */}
            {/* <p>Created by: {marker.CreatedBy}</p> */}
            <p>Opened on: {date}</p>
            {/* <p>Created by: {marker.CreatedBy}</p> */}
          </div>
        </Popup>
      </Marker>
    );
  });

  return (
    <MapContainer ref={mapRef} style={{ width: "100%", height: "100%" }} center={{ lat: 12.9716, lng: 77.5946 }} zoom={ZOOM_LEVEL} scrollWheelZoom={true}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {AllMarkers}
    </MapContainer>
  );
}
