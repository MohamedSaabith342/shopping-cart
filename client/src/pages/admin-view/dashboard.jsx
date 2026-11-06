import ProductImageUpload from "@/components/admin-view/image-upload";
import { Button } from "@/components/ui/button";
import { addFeatureImage, getFeatureImages } from "@/store/common-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LayoutDashboard, ImagePlus, Upload, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function AdminDashboard() {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const dispatch = useDispatch();
  const { featureImageList } = useSelector((state) => state.commonFeature);

  function handleUploadFeatureImage() {
    if (!uploadedImageUrl) return;
    dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
        setImageFile(null);
        setUploadedImageUrl("");
      }
    });
  }

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div className="space-y-8">
      {/* Page Title Header */}
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
          Store Management Overview
        </span>
        <h1 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-zinc-100 font-heading mt-1">
          Admin Dashboard
        </h1>
      </div>

      {/* Feature Images Section */}
      <Card className="rounded-3xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm p-6 md:p-8 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-zinc-200/60 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <ImagePlus className="w-5 h-5 text-emerald-600" />
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 font-heading">
              Hero Feature Banners ({featureImageList?.length || 0})
            </h2>
          </div>
        </div>

        {/* Upload Container */}
        <div className="max-w-xl space-y-4">
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            isCustomStyling={true}
          />
          <Button
            disabled={!uploadedImageUrl || imageLoadingState}
            onClick={handleUploadFeatureImage}
            className="w-full py-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-md shadow-emerald-950/20 flex items-center justify-center gap-2"
          >
            <Upload className="w-4 h-4" />
            <span>Upload Hero Banner</span>
          </Button>
        </div>

        {/* Grid Preview of Active Banner Images */}
        <div className="pt-4 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
            Active Storefront Slides
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featureImageList && featureImageList.length > 0
              ? featureImageList.map((featureImgItem, index) => (
                  <div
                    key={index}
                    className="relative rounded-2xl overflow-hidden border border-zinc-200/80 dark:border-zinc-800 shadow-sm group"
                  >
                    <img
                      src={featureImgItem.image}
                      alt={`Feature Slide ${index + 1}`}
                      className="w-full h-[200px] object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute bottom-2 left-2 bg-zinc-950/80 text-white text-[11px] font-bold px-2.5 py-1 rounded-full backdrop-blur-sm">
                      Slide #{index + 1}
                    </div>
                  </div>
                ))
              : (
                <p className="text-xs text-zinc-400 italic">No feature banner images uploaded yet.</p>
              )}
          </div>
        </div>
      </Card>
    </div>
  );
}

export default AdminDashboard;
