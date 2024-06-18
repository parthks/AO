import { useEffect, useState } from "react";
import { IssueType, MarkerData } from "../lib/types";
import { dryrun } from "@permaweb/aoconnect";
import { PROCESS_ID } from "../lib/utils";
import { Center, Loader } from "@mantine/core";
import moment from "moment";

export default function IssueDetail({ marker }: { marker: MarkerData }) {
  const [loading, setLoading] = useState(false);
  const [issue, setIssue] = useState<(MarkerData & { Image: string }) | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching data for marker", marker);
      setLoading(true);
      const result = await dryrun({
        process: PROCESS_ID,
        data: "",
        tags: [
          { name: "Action", value: "Get-Post" },
          { name: "PostID", value: marker.ID },
        ],
        anchor: "1234",
      });
      console.log("Dry run result", result);
      const filteredResult = result.Messages.map((message) => {
        const parsedData = JSON.parse(message.Data);
        return parsedData;
      });
      console.log("Filtered result", filteredResult[0][0]);
      setIssue(filteredResult[0][0]);
      setLoading(false);
    };
    console.log("Marker", marker);
    if (marker?.ID) fetchData();
  }, [marker]);

  const date = moment(marker.Date).format("LL"); // 'LL' is a localized date format, adjust as needed
  const tillNow = moment(marker.Date).fromNow();
  const issueTypeKey = Object.keys(IssueType).find((key) => IssueType[key as keyof typeof IssueType] === marker.Type) || "Issue";

  return (
    <div>
      <Center>
        {loading && <Loader />}
        {issue && (
          <div>
            <h1 className="text-lg">{issueTypeKey}</h1>
            <p>
              Opened {tillNow} on {date}
            </p>
            <br />

            <img src={issue.Image} alt="Issue" />

            <iframe
              className="w-full h-80"
              title="Image location"
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${issue.Longitude - 0.001},${issue.Latitude - 0.001},${issue.Longitude + 0.001},${
                issue.Latitude + 0.001
              }&layer=mapnik&marker=${issue.Latitude},${issue.Longitude}&zoom=18`}
            ></iframe>
          </div>
        )}
      </Center>
    </div>
  );
}
