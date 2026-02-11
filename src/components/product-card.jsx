import React from "react";
import Project1 from "@/images/copy-document.png";
import TWG from "@/images/TWG.png";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, X } from "lucide-react";
import { motion } from "framer-motion";

const projects = [
  {
    name: "Text-Klean",
    description: "A text file cleaning app",
    url: "https://text-klean.vercel.app/",
    icon: Project1,
  },
  {
    name: "Two-Goods-Web",
    description: "UI using GSAP & Locomotive",
    url: "https://two-goods-webs.vercel.app/",
    icon: TWG,
  },
];

const ProductCard = ({ onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="absolute right-4 top-16 z-50 md:right-6"
    >
      <Card className="w-80 border-border/50 bg-card/95 backdrop-blur-xl shadow-2xl">
        <CardContent className="p-5">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 h-7 w-7"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>

          <h3 className="mb-4 text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Other Projects
          </h3>

          <div className="space-y-3">
            {projects.map((project) => (
              <a
                key={project.name}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-xl border border-border/30 bg-secondary/30 p-3 transition-all hover:border-primary/30 hover:bg-secondary/60"
              >
                <img
                  src={project.icon}
                  alt={project.name}
                  className="h-10 w-10 rounded-lg object-contain"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-medium">{project.name}</span>
                    <ExternalLink className="h-3 w-3 text-primary opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                  <p className="text-xs text-muted-foreground">{project.description}</p>
                </div>
              </a>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
