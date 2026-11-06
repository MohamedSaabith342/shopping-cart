import { Sparkles, LogOut, Menu, ShoppingBag, UserCog, Search, X } from "lucide-react";
import { Link, useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logoutUser } from "@/store/auth-slice";
import UserCartWrapper from "./cart-wrapper";
import { useState, useEffect } from "react";
import { fetchCartItems } from "@/store/shop/cart-slice";

function MenuItems({ closeMobileMenu }) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  function handleNavigate(getCurrentMenuItem) {
    if (closeMobileMenu) closeMobileMenu();
    sessionStorage.removeItem("filters");
    const currentFilter =
      getCurrentMenuItem.id !== "home" &&
      getCurrentMenuItem.id !== "products" &&
      getCurrentMenuItem.id !== "search"
        ? {
            category: [getCurrentMenuItem.id],
          }
        : null;

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));

    location.pathname.includes("listing") && currentFilter !== null
      ? setSearchParams(
          new URLSearchParams(`?category=${getCurrentMenuItem.id}`)
        )
      : navigate(getCurrentMenuItem.path);
  }

  return (
    <nav className="flex flex-col lg:flex-row lg:items-center gap-1 lg:gap-2">
      {shoppingViewHeaderMenuItems.map((menuItem) => {
        const isActive =
          location.pathname === menuItem.path &&
          (menuItem.id === "products" || menuItem.id === "home" || menuItem.id === "search");

        return (
          <button
            key={menuItem.id}
            onClick={() => handleNavigate(menuItem)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-left lg:text-center ${
              isActive
                ? "bg-emerald-950/10 text-emerald-700 dark:text-emerald-400 font-semibold"
                : "text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-800/60"
            }`}
          >
            {menuItem.label}
          </button>
        );
      })}
    </nav>
  );
}

function HeaderRightContent() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.shopCart);
  const dispatch = useDispatch();
  const [openCartSheet, setOpenCartSheet] = useState(false);

  function handleLogout() {
    dispatch(logoutUser());
    sessionStorage.removeItem("filters");
  }

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchCartItems(user?.id));
    }
  }, [dispatch, user?.id]);

  const itemCount = cartItems?.items?.length || 0;

  return (
    <div className="flex items-center gap-3">
      {/* Quick Search Shortcut */}
      <button
        onClick={() => navigate("/shop/search")}
        className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:border-zinc-300 transition-all"
        title="Search products"
      >
        <Search className="w-3.5 h-3.5 text-zinc-400" />
        <span>Search...</span>
      </button>

      {/* Cart Sheet Drawer Trigger */}
      <Sheet open={openCartSheet} onOpenChange={setOpenCartSheet}>
        <Button
          onClick={() => setOpenCartSheet(true)}
          variant="ghost"
          size="icon"
          className="relative rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        >
          <ShoppingBag className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-bold text-white shadow-sm ring-2 ring-white dark:ring-zinc-950 animate-pulse">
              {itemCount}
            </span>
          )}
          <span className="sr-only">Shopping Cart</span>
        </Button>
        <UserCartWrapper
          setOpenCartSheet={setOpenCartSheet}
          cartItems={
            cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items
              : []
          }
        />
      </Sheet>

      {/* User Profile Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 outline-none group">
            <Avatar className="h-9 w-9 border-2 border-emerald-600/30 group-hover:border-emerald-600 transition-colors">
              <AvatarFallback className="bg-zinc-900 text-white font-bold text-xs">
                {user?.userName ? user.userName[0].toUpperCase() : "U"}
              </AvatarFallback>
            </Avatar>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 p-2 rounded-xl shadow-xl border-zinc-200 dark:border-zinc-800">
          <DropdownMenuLabel className="font-normal px-2 py-1.5">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 leading-none">
                {user?.userName}
              </p>
              <p className="text-xs text-zinc-500 leading-none truncate">
                {user?.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="my-1.5" />
          <DropdownMenuItem
            onClick={() => navigate("/shop/account")}
            className="cursor-pointer rounded-lg px-2 py-2 text-xs font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <UserCog className="mr-2 h-4 w-4 text-emerald-600" />
            <span>My Account & Orders</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="my-1.5" />
          <DropdownMenuItem
            onClick={handleLogout}
            className="cursor-pointer rounded-lg px-2 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30"
          >
            <LogOut className="mr-2 h-4 w-4 text-rose-600" />
            <span>Sign Out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function ShoppingHeader() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200/80 dark:border-zinc-800/80 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link to="/shop/home" className="flex items-center gap-2.5 group">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-900/20 group-hover:scale-105 transition-transform duration-200">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100 font-heading">
            SHOPVERSE<span className="text-emerald-600">.</span>
          </span>
        </Link>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 lg:hidden">
          {isAuthenticated && <HeaderRightContent />}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-lg">
                <Menu className="h-6 w-6 text-zinc-700" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 p-6">
              <SheetHeader className="mb-6 border-b pb-4 text-left">
                <SheetTitle className="flex items-center gap-2 text-xl font-bold font-heading">
                  <Sparkles className="w-5 h-5 text-emerald-600" />
                  SHOPVERSE Navigation
                </SheetTitle>
              </SheetHeader>
              <MenuItems closeMobileMenu={() => setMobileMenuOpen(false)} />
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:block">
          <MenuItems />
        </div>

        {/* Desktop User Right Header Content */}
        {isAuthenticated ? (
          <div className="hidden lg:block">
            <HeaderRightContent />
          </div>
        ) : null}
      </div>
    </header>
  );
}

export default ShoppingHeader;
