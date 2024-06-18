import { Button, Card, Center, Image, Loader, Select } from "@mantine/core";
import { useState } from "react";
import Header from "../components/Header";

import imageCompression from "browser-image-compression";
import exifr from "exifr";

import { notifications } from "@mantine/notifications";
import { createDataItemSigner, message, result } from "@permaweb/aoconnect";

import { ConnectButton, useConnection } from "@arweave-wallet-kit/react";
import { Link } from "react-router-dom";
import { IssueType } from "../lib/types";
import { PROCESS_ID, convertToBase64 } from "../lib/utils";

export default function Add() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [lat, setLat] = useState<number | null>(null);
  const [long, setLong] = useState<number | null>(null);
  const [type, setType] = useState<IssueType>(IssueType.General);

  const [imageLoading, setImageLoading] = useState(false);

  const { connect, connected } = useConnection();

  async function postIssue() {
    if (!image) return notifications.show({ title: "Error", color: "red", message: "Please upload an image" });
    if (!lat || !long) return notifications.show({ title: "Error", color: "red", message: "Please upload an image with location data" });

    console.log("Posting issue", image, lat, long, type);
    const base64Image = image ? await convertToBase64(image) : "";

    const res = await message({
      process: PROCESS_ID,
      tags: [
        { name: "Action", value: "New-Post" },
        { name: "Date", value: new Date().toISOString() },
        { name: "Latitude", value: lat.toString() },
        { name: "Longitude", value: long.toString() },
        { name: "IssueType", value: type },
      ],
      data: base64Image,
      signer: createDataItemSigner(window.arweaveWallet),
    });

    console.log("Post result", res);

    const postResult = await result({
      process: PROCESS_ID,
      message: res,
    });

    console.log("Post Created successfully", postResult);
    return true;
  }

  const resetFormData = () => {
    setImage(null);
    setLat(null);
    setLong(null);
    setType(IssueType.General);
  };

  if (!connected) {
    return (
      <>
        <Header />
        <section className="w-full py-12 md:py-16 lg:py-20">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-xl space-y-4 text-center">
              <Link to="/map" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900">
                <ArrowLeftIcon className="w-4 h-4" />
                Back
              </Link>
              <h2 className="text-2xl font-bold tracking-tighter md:text-3xl lg:text-4xl">Connect Your Wallet</h2>
              <p className="text-gray-500  md:text-lg">Connect your Arweave wallet to participate in the platform.</p>
              <Center>
                <ConnectButton profileModal={false} showBalance={false} showProfilePicture={false} />
              </Center>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <div>
      <Header />
      <div className="w-full max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <div className="text-center">
            <div className="flex gap-4 flex-wrap">
              <Link to="/map" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900">
                <ArrowLeftIcon className="w-4 h-4" />
                Back
              </Link>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">Report Public Infrastructure Issues</h1>
            </div>
            <p className="mt-4 text-lg text-gray-600 ">Help improve your community by reporting issues with potholes, broken streetlights, and more.</p>
          </div>

          {image ? (
            <div>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Card.Section>
                  <Image src={image} />
                </Card.Section>
                <Button onClick={() => resetFormData()} color="red" fullWidth mt="md" radius="md">
                  Remove
                </Button>
              </Card>
            </div>
          ) : (
            <>
              {/* <AddImage
              onUpload={(files) => {
                if (files.length > 0) {
                  const file = files[0];
                  setImage(URL.createObjectURL(file));
                }
              }}
            /> */}
              {imageLoading ? (
                <Center>
                  <Loader />
                </Center>
              ) : (
                <div className="flex items-center justify-center">
                  <label
                    htmlFor="upload"
                    className="cursor-pointer inline-flex items-center justify-center w-full h-32 bg-gray-100  rounded-lg border-2 border-gray-300 transition-colors hover:bg-gray-200 "
                  >
                    <CameraIcon className="h-8 w-8 text-gray-500" />
                    <span className="ml-3 text-gray-600 ">Take Photo</span>
                    <input
                      onChange={async (e) => {
                        const files = e.target.files;
                        if (!files) return;
                        if (files.length < 1) return;
                        const file = files[0];
                        setImageLoading(true);
                        try {
                          const output = await exifr.parse(file, {});
                          console.log({ output });
                          const lat = output?.latitude ?? null;
                          const lng = output?.longitude ?? null;
                          if (!lat || !lng) {
                            notifications.show({ title: "Error", color: "red", message: "Location not found in image" });
                            return;
                          }
                          setLat(lat);
                          setLong(lng);
                          const compressedFile = await imageCompression(file, { maxSizeMB: 0.2, fileType: "image/jpeg" });
                          console.log(compressedFile);
                          setImage(URL.createObjectURL(compressedFile));
                        } catch (e) {
                          console.error(e);
                          notifications.show({ title: "Error", color: "red", message: "Error while processing image" });
                        } finally {
                          setImageLoading(false);
                        }
                      }}
                      capture="environment"
                      accept="image/*"
                      id="upload"
                      type="file"
                      className="sr-only"
                    />
                  </label>
                </div>
              )}
            </>
          )}

          {/* <NumberInput label="Latitude" value={lat} onChange={(e) => (typeof e != "string" ? setLat(e) : null)} /> */}
          {/* <NumberInput label="Longitude" value={long} onChange={(e) => (typeof e != "string" ? setLong(e) : null)} /> */}
          {lat && long && (
            // show the latitude and longitude on a map
            <iframe
              className="w-full h-80"
              title="Image location"
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${long - 0.001},${lat - 0.001},${long + 0.001},${lat + 0.001}&layer=mapnik&marker=${lat},${long}&zoom=18`}
            ></iframe>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Type of Issue"
              value={type}
              onChange={(e) => setType((e ?? IssueType.General) as IssueType)}
              data={Object.keys(IssueType).map((key) => ({ label: key, value: IssueType[key as keyof typeof IssueType] }))}
            />
          </div>
        </div>

        <Button
          mt={64}
          c="white"
          bg="black"
          loading={loading}
          fullWidth
          onClick={async () => {
            try {
              if (!connected) {
                connect();
                return false;
              }
              setLoading(true);
              await postIssue();
              notifications.show({ title: "Success", color: "green", message: "Issue added successfully" });
            } catch (e: unknown) {
              const error = e as Error;
              console.error("damm", e);
              notifications.show({ title: "Error", color: "red", message: error?.message });
            } finally {
              setLoading(false);
              resetFormData();
            }
          }}
        >
          Submit Issue
        </Button>
      </div>
    </div>
  );
}

function ArrowLeftIcon(props: Record<string, unknown>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
}

function CameraIcon(props: Record<string, unknown>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  );
}
