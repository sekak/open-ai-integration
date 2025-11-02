import { FolderUp, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

interface UploadImageProps {
  uploadImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function UploadImage({ uploadImage }: UploadImageProps) {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon" className="bg-white rounded-full w-16 h-16">
          <FolderUp className="size-8"/>
        </EmptyMedia>
        <EmptyTitle className="text-xl">No Image Yet</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t uploaded any images yet. Get started by uploading
          your first image.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent >
          <Button >
            <label htmlFor="upload-img" className="cursor-pointer">
              <span className="md:block hidden">Upload Image</span>
              <Plus className="stroke-3 md:hidden block size-4"/>
            </label>
          </Button>
          <input type="file" accept="image/*" onChange={uploadImage} className="hidden" id="upload-img" />
      </EmptyContent>
    </Empty>
  )
}
