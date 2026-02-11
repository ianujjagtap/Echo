import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "@/features/chatSlice";
import { Button } from "@/components/ui/button";
import { PanelLeftOpen, PanelLeftClose, User, Package } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import DeveloperCard from "./developer";
import ProductCard from "./product-card";

const Navbar = () => {
  const dispatch = useDispatch();
  const [activeCard, setActiveCard] = useState(null);
  const isSidebarVisible = useSelector((state) => state.chat.isSidebarVisible);

  useEffect(() => {
    if (activeCard) {
      const timer = setTimeout(() => setActiveCard(null), 6000);
      return () => clearTimeout(timer);
    }
  }, [activeCard]);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 left-0 right-0 z-30 border-b border-border/50 bg-background/80 backdrop-blur-xl"
    >
      <div className="flex h-14 items-center justify-between px-4 md:px-6">
        {/* left section */}
        <div className="flex items-center gap-3">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9"
                onClick={() => dispatch(toggleSidebar())}
              >
                {isSidebarVisible ? (
                  <PanelLeftClose className="h-5 w-5" />
                ) : (
                  <PanelLeftOpen className="h-5 w-5" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              {isSidebarVisible ? "Close sidebar" : "Open sidebar"}
            </TooltipContent>
          </Tooltip>

          <span className="gradient-text text-xl font-bold tracking-tight select-none">
            Echo
          </span>
        </div>

        {/* right section */}
        <div className="flex items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="hidden md:inline-flex gap-2 text-muted-foreground hover:text-foreground"
                onClick={() => setActiveCard(activeCard === "ProductCard" ? null : "ProductCard")}
              >
                <Package className="h-4 w-4" />
                Products
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">Other projects</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-muted-foreground hover:text-foreground"
                onClick={() => setActiveCard(activeCard === "DeveloperCard" ? null : "DeveloperCard")}
              >
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Developer</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">About the developer</TooltipContent>
          </Tooltip>
        </div>
      </div>

      {/* dropdown cards */}
      {activeCard === "DeveloperCard" && <DeveloperCard onClose={() => setActiveCard(null)} />}
      {activeCard === "ProductCard" && <ProductCard onClose={() => setActiveCard(null)} />}
    </motion.nav>
  );
};

export default Navbar;
