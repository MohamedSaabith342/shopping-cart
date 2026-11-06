import { Outlet, Link } from "react-router-dom";
import { Sparkles, ShieldCheck, Sparkle, Truck } from "lucide-react";

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Left Editorial Obsidian Showcase */}
      <div className="hidden lg:flex flex-col justify-between bg-zinc-950 w-1/2 p-12 relative overflow-hidden text-white border-r border-zinc-800">
        {/* Background Decorative Gradient */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-emerald-600/20 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-teal-600/20 blur-3xl" />

        {/* Top Brand Marker */}
        <div className="relative z-10">
          <Link to="/shop/home" className="flex items-center gap-2.5">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-lg shadow-emerald-900/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-2xl font-black tracking-tight font-heading">
              SHOPVERSE<span className="text-emerald-400">.</span>
            </span>
          </Link>
        </div>

        {/* Hero Tagline */}
        <div className="relative z-10 max-w-md space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <Sparkle className="w-3.5 h-3.5" />
            <span>Join 50,000+ Happy Shoppers</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight font-heading leading-tight">
            Elevate Your Style With Everyday Luxury.
          </h1>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Discover handpicked apparel, sustainable activewear, footwear, and accessories crafted for timeless elegance.
          </p>

          <div className="pt-4 flex items-center gap-6 text-xs text-zinc-400">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Secure Authentication</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-emerald-400" />
              <span>Express Delivery</span>
            </div>
          </div>
        </div>

        {/* Footer Credit */}
        <div className="relative z-10 text-xs text-zinc-500">
          © {new Date().getFullYear()} SHOPVERSE Luxe Commerce. All rights reserved.
        </div>
      </div>

      {/* Right Form Container */}
      <div className="flex flex-1 items-center justify-center px-6 py-12 lg:px-12 bg-white dark:bg-zinc-950">
        <div className="w-full max-w-md space-y-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
