import { FileIcon, UploadCloud, X } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";

function ProductImageUpload({
  imageFile,
  setImageFile,
  imageLoadingState,
  setUploadedImageUrl,
  setImageLoadingState,
  isEditMode,
}) {
  const inputRef = useRef(null);

  function handleImageFileChange(event) {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) setImageFile(selectedFile);
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) setImageFile(droppedFile);
  }

  function handleRemoveImage() {
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  async function uploadImageToCloudinary() {
    setImageLoadingState(true);
    const data = new FormData();
    data.append("my_file", imageFile);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/products/upload-image",
        data
      );
      if (response?.data?.success) {
        setUploadedImageUrl(response.data.result.url);
        setImageLoadingState(false);
      }
    } catch (err) {
      console.error(err);
      setImageLoadingState(false);
    }
  }

  useEffect(() => {
    if (imageFile !== null) uploadImageToCloudinary();
  }, [imageFile]);

  return (
    <div className="w-full space-y-2">
      <Label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 block">
        Product Image Upload
      </Label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-2xl p-6 transition-all duration-200 ${
          isEditMode
            ? "opacity-60 bg-zinc-100 border-zinc-300 dark:bg-zinc-900 dark:border-zinc-800"
            : "border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-900/50 hover:border-emerald-600"
        }`}
      >
        <Input
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
          disabled={isEditMode}
        />
        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className={`${
              isEditMode ? "cursor-not-allowed" : "cursor-pointer"
            } flex flex-col items-center justify-center space-y-2 text-center py-4`}
          >
            <div className="p-3 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600">
              <UploadCloud className="w-6 h-6" />
            </div>
            <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
              Click to upload or drag & drop image file
            </p>
            <p className="text-[11px] text-zinc-400">PNG, JPG, WEBP up to 5MB</p>
          </Label>
        ) : imageLoadingState ? (
          <Skeleton className="h-12 w-full rounded-xl bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
        ) : (
          <div className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800">
            <div className="flex items-center gap-3 min-w-0">
              <FileIcon className="w-6 h-6 text-emerald-600 shrink-0" />
              <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                {imageFile.name}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-lg text-zinc-400 hover:text-rose-600 shrink-0"
              onClick={handleRemoveImage}
            >
              <X className="w-4 h-4" />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductImageUpload;
