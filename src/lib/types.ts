export enum IssueType {
  "Trash" = "trash",
  "Street Light Broken" = "street_light",
  "Road Pothole" = "pothole",
  "Sidewalk Broken" = "sidewalk",
  "General" = "general",
}

export type MarkerData = {
  ID: string;
  Latitude: number;
  Longitude: number;
  Type: IssueType;
  CreatedBy: string;
  Date: string;
  Status: "open" | "closed";
};
