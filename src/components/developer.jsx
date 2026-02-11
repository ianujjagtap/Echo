import React from "react";
import Photo from "@/images/myphoto.jpg";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, Github, Linkedin, Twitter } from "lucide-react";
import { motion } from "framer-motion";

const DeveloperCard = ({ onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="absolute right-4 top-16 z-50 md:right-6"
    >
      <Card className="w-80 border-border/50 bg-card/95 backdrop-blur-xl shadow-2xl">
        <CardContent className="p-6">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 h-7 w-7"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>

          <div className="flex flex-col items-center text-center">
            <Avatar className="h-20 w-20 border-2 border-primary/30">
              <AvatarImage src={Photo} alt="Jagtap Anuj" />
              <AvatarFallback>AJ</AvatarFallback>
            </Avatar>

            <h3 className="mt-3 text-lg font-semibold">Jagtap Anuj</h3>

            <Badge variant="secondary" className="mt-1">
              MERN Stack Developer
            </Badge>

            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Aspiring developer who loves crafting web apps ❤️
            </p>

            <div className="mt-4 flex gap-2">
              <Button variant="ghost" size="icon" className="h-9 w-9" asChild>
                <a
                  href="https://twitter.com/JagtapAnuj15836"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9" asChild>
                <a
                  href="https://linkedin.com/in/anuj-jagtap-66a23429a"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9" asChild>
                <a
                  href="https://github.com/Anuj2004-Jagtap"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default DeveloperCard;
