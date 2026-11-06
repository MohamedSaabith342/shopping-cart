import { Link } from "react-router-dom";
import { ShieldCheck, Truck, RotateCcw, Headphones, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function ShoppingFooter() {
  return (
    <footer className="bg-[#FBFBFA] dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400 border-t border-zinc-200/80 dark:border-zinc-800 pt-16 pb-8">
      {/* Features Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 border-b border-zinc-200/80 dark:border-zinc-800 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-zinc-900/50 border border-zinc-200/70 dark:border-zinc-800/80 shadow-sm">
            <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/40">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">Express Shipping</h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">On all orders over $75</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-zinc-900/50 border border-zinc-200/70 dark:border-zinc-800/80 shadow-sm">
            <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/40">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">Secure Payment</h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">256-Bit SSL Encryption</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-zinc-900/50 border border-zinc-200/70 dark:border-zinc-800/80 shadow-sm">
            <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/40">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">30-Day Returns</h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Hassle-free guarantee</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-zinc-900/50 border border-zinc-200/70 dark:border-zinc-800/80 shadow-sm">
            <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/40">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">24/7 Support</h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Dedicated assistance</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
        {/* Brand info */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-600/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white font-heading">
              SHOPVERSE<span className="text-emerald-600 dark:text-emerald-400 font-light">.</span>
            </span>
          </div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-sm">
            Curating modern essentials for everyday luxury. Designed for effortless comfort, longevity, and timeless aesthetic.
          </p>
          <div className="pt-2">
            <h5 className="text-xs uppercase tracking-widest text-zinc-500 dark:text-zinc-400 font-semibold mb-3">
              Subscribe to Newsletter
            </h5>
            <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2 max-w-sm">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus-visible:ring-emerald-500 h-10"
              />
              <Button type="submit" size="icon" className="bg-emerald-600 hover:bg-emerald-500 text-white shrink-0 h-10 w-10">
                <ArrowRight className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider mb-4">Shop Categories</h4>
          <ul className="space-y-2.5 text-sm text-zinc-500 dark:text-zinc-400">
            <li><Link to="/shop/listing" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Men's Collection</Link></li>
            <li><Link to="/shop/listing" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Women's Collection</Link></li>
            <li><Link to="/shop/listing" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Kids Wear</Link></li>
            <li><Link to="/shop/listing" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Footwear</Link></li>
            <li><Link to="/shop/listing" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Accessories</Link></li>
          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider mb-4">Account & Support</h4>
          <ul className="space-y-2.5 text-sm text-zinc-500 dark:text-zinc-400">
            <li><Link to="/shop/account" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">My Account</Link></li>
            <li><Link to="/shop/account" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Order History</Link></li>
            <li><Link to="/shop/checkout" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Checkout</Link></li>
            <li><Link to="/shop/search" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Search Products</Link></li>
          </ul>
        </div>

        {/* Contact info */}
        <div>
          <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider mb-4">Company</h4>
          <ul className="space-y-2.5 text-sm text-zinc-500 dark:text-zinc-400">
            <li><span className="hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors cursor-pointer">About SHOPVERSE</span></li>
            <li><span className="hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors cursor-pointer">Sustainability</span></li>
            <li><span className="hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors cursor-pointer">Privacy Policy</span></li>
            <li><span className="hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors cursor-pointer">Terms of Service</span></li>
          </ul>
        </div>
      </div>

      {/* Bottom Legal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-zinc-200/80 dark:border-zinc-900 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400 dark:text-zinc-500 gap-4">
        <p>© {new Date().getFullYear()} SHOPVERSE Luxe Commerce. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <span className="hover:text-zinc-600 dark:hover:text-zinc-400 cursor-pointer">Privacy</span>
          <span className="hover:text-zinc-600 dark:hover:text-zinc-400 cursor-pointer">Terms</span>
          <span className="hover:text-zinc-600 dark:hover:text-zinc-400 cursor-pointer">Cookies</span>
        </div>
      </div>
    </footer>
  );
}

export default ShoppingFooter;
