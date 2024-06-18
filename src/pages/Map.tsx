import { Box, Center, Loader, Modal } from "@mantine/core";
import { dryrun } from "@permaweb/aoconnect";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import MyMap from "../components/Map";
import { MarkerData } from "../lib/types";
import { PROCESS_ID } from "../lib/utils";
import { Link } from "react-router-dom";
import IssueDetail from "../components/IssueDetail";
import { useRef } from "react";
import { Map } from "leaflet";

const NAV_HEIGHT = 100;

// const NavBar = () => {
//   return (
//     <Group justify="space-between" align="center" mt={0} m={16} h={NAV_HEIGHT}>
//       <Link to={`/`}>
//         <Image src={logo} alt="logo" h={42} />
//       </Link>

//       <Group>
//         <Link to={`/add`} style={{ textDecoration: "none", color: "#000", margin: "10px" }}>
//           Add
//         </Link>
//         <Link to={`/map`} style={{ textDecoration: "none", color: "#000", margin: "10px" }}>
//           Map
//         </Link>
//       </Group>

//       <ConnectButton profileModal={true} showBalance={false} showProfilePicture={true} />
//     </Group>
//   );
// };

export default function IssuesMap() {
  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const [loading, setLoading] = useState(true);
  const mapRef = useRef<Map>(null);

  const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await dryrun({
        process: PROCESS_ID,
        data: "",
        tags: [{ name: "Action", value: "Get-Posts" }],
        anchor: "1234",
      });
      console.log("Dry run result", result);
      const filteredResult = result.Messages.map((message) => {
        const parsedData = JSON.parse(message.Data);
        return parsedData;
      });
      console.log("Filtered result", filteredResult[0]);
      setMarkers(filteredResult[0].filter((x: MarkerData) => x.Latitude && x.Longitude));
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <>
      <Header />

      <Modal
        zIndex={1000}
        opened={!!selectedMarker}
        onClose={() => {
          setSelectedMarker(null);
          mapRef.current?.closePopup();
        }}
        title="Issue Detail"
      >
        {selectedMarker && <IssueDetail marker={selectedMarker} />}
      </Modal>

      <div style={{ display: "flex", flexDirection: "column", height: `calc(100vh - ${NAV_HEIGHT}px)` }}>
        <AddIssueCTA />
        <Box m={16} p={0} w={"calc(100% - 32px)"} style={{ flexGrow: 1 }}>
          {loading ? (
            <Center>
              <Loader />
            </Center>
          ) : (
            <MyMap mapRef={mapRef} onMarkerClick={(d) => setSelectedMarker(d)} markers={markers} />
          )}
        </Box>
      </div>
    </>
  );
}

const AddIssueCTA = () => {
  return (
    <div className="w-full bg-gray-100 py-8 mb-4">
      <div className="container px-4 md:px-6 mx-auto max-w-4xl flex flex-col md:flex-row items-center justify-between md:gap-8 gap-4">
        <p className="text-gray-500">Improve your community by adding any issues you notice with public infrastructure, such as potholes, broken sidewalks, or trash.</p>
        <Link
          to="/add"
          className="whitespace-nowrap inline-flex flex-2 w-48 h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
        >
          Report an Issue
        </Link>
      </div>
    </div>
  );
};
