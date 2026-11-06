import { Button } from "@/components/ui/button";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ShirtIcon,
  CloudLightning,
  BabyIcon,
  WatchIcon,
  UmbrellaIcon,
  Shirt,
  WashingMachine,
  ShoppingBasket,
  Airplay,
  Images,
  Heater,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllFilteredProducts } from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
import { fetchProductDetails } from "@/store/shop/products-slice";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { toast } from "sonner";
import { getFeatureImages } from "@/store/common-slice";
import ProductDetailsDialog from "@/components/shopping-view/product-details";

import menCatImg from "../../assets/men-cat.png";
import womenCatImg from "../../assets/women-cat.png";
import kidsCatImg from "../../assets/kids-cat.png";
import accessoriesCatImg from "../../assets/accessories-cat.png";
import footwearCatImg from "../../assets/footwear-cat.png";

import nikeBrandImg from "../../assets/nike-brand.png";
import adidasBrandImg from "../../assets/adidas-brand.png";
import pumaBrandImg from "../../assets/puma-brand.png";
import leviBrandImg from "../../assets/levi-brand.png";
import zaraBrandImg from "../../assets/zara-brand.png";
import hmBrandImg from "../../assets/hm-brand.png";

const categoriesWithIcon = [
  { id: "men", label: "Men", subtitle: "Essential Apparel", image: menCatImg, tag: "ESSENTIAL MENSWEAR" },
  { id: "women", label: "Women", subtitle: "Modern Silhouettes", image: womenCatImg, tag: "LUXE EDITION" },
  { id: "kids", label: "Kids", subtitle: "Playful Everyday", image: kidsCatImg, tag: "EVERYDAY PLAY" },
  { id: "accessories", label: "Accessories", subtitle: "Timeless Accents", image: accessoriesCatImg, tag: "WATCHES & LEATHER" },
  { id: "footwear", label: "Footwear", subtitle: "Comfort & Style", image: footwearCatImg, tag: "SNKRS & CRAFT" },
];

const brandsWithIcon = [
  { id: "nike", label: "Nike", tag: "Sportswear & Innovation", est: "1964", image: nikeBrandImg },
  { id: "adidas", label: "Adidas", tag: "Street Culture & Originals", est: "1949", image: adidasBrandImg },
  { id: "puma", label: "Puma", tag: "Athletic Performance", est: "1948", image: pumaBrandImg },
  { id: "levi", label: "Levi's", tag: "Casual Denim Legacy", est: "1853", image: leviBrandImg },
  { id: "zara", label: "Zara", tag: "Minimal High Fashion", est: "1975", image: zaraBrandImg },
  { id: "h&m", label: "H&M", tag: "Modern Everyday Style", est: "1947", image: hmBrandImg },
];

function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const cartItems = useSelector((state) => state.shopCart.cartItems);
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );

  const { user } = useSelector((state) => state.auth);
  const { featureImageList } = useSelector((state) => state.commonFeature);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddtoCart(getCurrentProductId, getTotalStock) {
    let getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast.warning(`Only ${getQuantity} quantity can be added for this item`);
          return;
        }
      }
    }
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast.success("Product added to cart!");
      }
    });
  }

  useEffect(() => {
    if (!featureImageList || featureImageList.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
    }, 8000);

    return () => clearInterval(timer);
  }, [featureImageList]);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  useEffect(() => {
    if (productDetails !== null) {
      setOpenDetailsDialog(true);
    }
  }, [productDetails]);

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Editorial Hero Banner */}
      <section className="relative w-full h-[520px] md:h-[620px] overflow-hidden bg-zinc-950">
        {featureImageList && featureImageList.length > 0 ? (
          featureImageList.map((slide, index) => (
            <div
              key={index}
              className={`${
                index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"
              } absolute inset-0 transition-all duration-1000 ease-out`}
            >
              <img
                src={slide?.image}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
            </div>
          ))
        ) : (
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-950 to-emerald-950/60" />
        )}

        {/* Hero Overlay Text */}
        <div className="relative max-w-7xl mx-auto h-full px-6 lg:px-8 flex flex-col justify-end pb-16 md:pb-24 text-white z-10">
          <div className="max-w-2xl space-y-4 animate-in fade-in slide-in-from-bottom-6 duration-700">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-medium tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SHOPVERSE 2026 Collection</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight font-heading">
              Redefining Modern <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">
                Everyday Luxury.
              </span>
            </h1>
            <p className="text-zinc-300 text-sm md:text-base leading-relaxed max-w-lg">
              Explore curated apparel, footwear, and accessories designed with minimal elegance and superior quality.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button
                onClick={() => navigate("/shop/listing")}
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-6 rounded-xl font-semibold shadow-lg shadow-emerald-950/40 flex items-center gap-2 transition-all hover:gap-3"
              >
                <span>Shop Full Collection</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                onClick={() => navigate("/shop/search")}
                variant="outline"
                className="border-zinc-700 bg-zinc-900/60 text-zinc-100 hover:bg-zinc-800 hover:text-white px-6 py-6 rounded-xl font-medium backdrop-blur-md"
              >
                Explore Catalog
              </Button>
            </div>
          </div>
        </div>

        {/* Slide Arrows */}
        {featureImageList && featureImageList.length > 1 && (
          <div className="absolute bottom-8 right-8 z-20 flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                setCurrentSlide(
                  (prevSlide) =>
                    (prevSlide - 1 + featureImageList.length) %
                    featureImageList.length
                )
              }
              className="rounded-full bg-zinc-900/80 border-zinc-700 text-zinc-300 hover:bg-white hover:text-zinc-900 transition-colors h-10 w-10"
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                setCurrentSlide(
                  (prevSlide) => (prevSlide + 1) % featureImageList.length
                )
              }
              className="rounded-full bg-zinc-900/80 border-zinc-700 text-zinc-300 hover:bg-white hover:text-zinc-900 transition-colors h-10 w-10"
            >
              <ChevronRightIcon className="w-5 h-5" />
            </Button>
          </div>
        )}
      </section>

      {/* Trust Highlights Section */}
      <section className="border-b border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-3.5">
              <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">Free Express Shipping</h4>
                <p className="text-xs text-zinc-500">Orders over $75</p>
              </div>
            </div>
            <div className="flex items-center gap-3.5">
              <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">100% Authentic</h4>
                <p className="text-xs text-zinc-500">Direct from brands</p>
              </div>
            </div>
            <div className="flex items-center gap-3.5">
              <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
                <RotateCcw className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">Easy 30-Day Return</h4>
                <p className="text-xs text-zinc-500">Hassle-free process</p>
              </div>
            </div>
            <div className="flex items-center gap-3.5">
              <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
                <Headphones className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">Concierge Support</h4>
                <p className="text-xs text-zinc-500">24/7 dedicated help</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Category Section — Uniform Visual Image Collection Cards */}
      <section className="py-20 md:py-24 bg-[#FBFBFA] dark:bg-zinc-950/80 border-b border-zinc-200/70 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-zinc-200/80 dark:border-zinc-800 pb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
                CURATED FASHION COLLECTIONS
              </span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight text-zinc-900 dark:text-zinc-100 font-heading mt-1">
                Shop By Category
              </h2>
            </div>
            <p className="text-xs md:text-sm text-zinc-500 max-w-sm mt-3 md:mt-0 leading-relaxed font-medium">
              Explore high-definition wardrobe collections curated for modern elegance.
            </p>
          </div>

          {/* Uniform Equal-Sized Image Collection Cards Grid (5 Equal Cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {categoriesWithIcon.map((categoryItem, index) => (
              <div
                key={categoryItem.id}
                onClick={() => handleNavigateToListingPage(categoryItem, "category")}
                className="relative h-[360px] md:h-[400px] rounded-3xl overflow-hidden cursor-pointer group shadow-xl flex flex-col justify-between p-6 border border-zinc-800"
              >
                {/* Full High-Res Background Image */}
                <img
                  src={categoryItem.image}
                  alt={categoryItem.label}
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

                {/* Top Badge */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-white bg-black/40 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full shadow-md">
                    {categoryItem.tag}
                  </span>
                  <span className="text-xs font-mono text-zinc-300 font-semibold bg-black/40 backdrop-blur-md px-2.5 py-0.5 rounded-full">
                    0{index + 1}
                  </span>
                </div>

                {/* Bottom Content Box */}
                <div className="relative z-10 space-y-2">
                  <h3 className="text-2xl md:text-3xl font-black font-heading text-white drop-shadow-md">
                    {categoryItem.label}
                  </h3>
                  <p className="text-xs text-zinc-300 line-clamp-1 font-medium drop-shadow">
                    {categoryItem.subtitle}
                  </p>
                  <div className="pt-2">
                    <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-emerald-400 group-hover:text-emerald-300 group-hover:translate-x-1 transition-all">
                      <span>Explore Collection</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop by Brand Section — Uniform Visual Image Collection Cards */}
      <section className="py-20 md:py-24 bg-[#FBFBFA] dark:bg-zinc-950/90 text-zinc-900 dark:text-white border-b border-zinc-200/80 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-zinc-200/80 dark:border-zinc-800 pb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
                ICONIC GLOBAL HOUSES
              </span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight text-zinc-900 dark:text-zinc-100 font-heading mt-1">
                Top Featured Brands
              </h2>
            </div>
            <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400 max-w-sm mt-3 md:mt-0 leading-relaxed font-medium">
              Shop official collections from world-renowned sportswear, denim, and high-fashion labels.
            </p>
          </div>

          {/* Uniform Equal-Sized Visual Brand Image Cards Grid (6 Equal Cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {brandsWithIcon.map((brandItem, index) => (
              <div
                key={brandItem.id}
                onClick={() => handleNavigateToListingPage(brandItem, "brand")}
                className="relative h-[360px] md:h-[400px] rounded-3xl overflow-hidden cursor-pointer group shadow-xl flex flex-col justify-between p-6 border border-zinc-200/60 dark:border-zinc-800 hover:border-emerald-500/50 transition-all duration-300"
              >
                {/* Full High-Res Background Image */}
                <img
                  src={brandItem.image}
                  alt={brandItem.label}
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

                {/* Top Badge */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400 bg-black/50 backdrop-blur-md border border-emerald-500/30 px-3 py-1 rounded-full shadow-md">
                    EST. {brandItem.est}
                  </span>
                  <span className="text-xs font-mono text-zinc-300 font-semibold bg-black/40 backdrop-blur-md px-2.5 py-0.5 rounded-full">
                    0{index + 1}
                  </span>
                </div>

                {/* Bottom Content Box */}
                <div className="relative z-10 space-y-2">
                  <h3 className="text-3xl md:text-4xl font-black font-heading text-white drop-shadow-md group-hover:text-emerald-300 transition-colors">
                    {brandItem.label}
                  </h3>
                  <p className="text-xs text-zinc-300 line-clamp-1 font-medium drop-shadow">
                    {brandItem.tag}
                  </p>
                  <div className="pt-2">
                    <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-emerald-400 group-hover:text-emerald-300 group-hover:translate-x-1 transition-all">
                      <span>Explore House Collection</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Grid Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
                Popular Arrivals
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100 font-heading mt-1">
                Featured Products
              </h2>
            </div>
            <Button
              onClick={() => navigate("/shop/listing")}
              variant="ghost"
              className="mt-4 sm:mt-0 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 font-semibold self-start sm:self-auto"
            >
              View All Products <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList && productList.length > 0
              ? productList.map((productItem) => (
                  <ShoppingProductTile
                    key={productItem._id}
                    product={productItem}
                    handleGetProductDetails={handleGetProductDetails}
                    handleAddtoCart={handleAddtoCart}
                  />
                ))
              : (
                <div className="col-span-full py-12 text-center text-zinc-400">
                  No products available currently.
                </div>
              )}
          </div>
        </div>
      </section>

      {/* Product Details Dialog Modal */}
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default ShoppingHome;
