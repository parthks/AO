import { Group, Text, rem } from "@mantine/core";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";

type AddImageProps = {
  onUpload: (files: FileWithPath[]) => void;
};
export function AddImage({ onUpload }: AddImageProps) {
  return (
    <Dropzone
      onDrop={(files) => {
        console.log("dropped files", files);
        onUpload(files);
      }}
      maxFiles={1}
      multiple={false}
      onReject={(files) => console.log("rejected files", files)}
      maxSize={5 * 1024 ** 2}
      accept={IMAGE_MIME_TYPE}
    >
      <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: "none" }}>
        <Dropzone.Accept>
          <IconUpload style={{ width: rem(52), height: rem(52), color: "var(--mantine-color-blue-6)" }} stroke={1.5} />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <IconX style={{ width: rem(52), height: rem(52), color: "var(--mantine-color-red-6)" }} stroke={1.5} />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <IconPhoto style={{ width: rem(52), height: rem(52), color: "var(--mantine-color-dimmed)" }} stroke={1.5} />
        </Dropzone.Idle>

        <div>
          <Text size="xl" inline>
            Select an image
          </Text>
          <Text size="sm" c="dimmed" inline mt={7}>
            Upload an image of an public infrastructure issue you want to report
          </Text>
        </div>
      </Group>
    </Dropzone>
  );
}
