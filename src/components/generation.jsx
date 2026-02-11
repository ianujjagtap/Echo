import React, { useEffect, useRef } from "react";
import { marked } from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
import echo_logo from "@/images/echo-logo.png";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { Skeleton } from "@/components/ui/skeleton";
import { Bot, User, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";

const Generation = () => {
  const scrollRef = useRef(null);
  const generatedText = useSelector((state) => state.chat.generatedText);
  const showLogo = useSelector((state) => state.chat.showLogo);
  const prompt = useSelector((state) => state.chat.lockedPrompt);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    marked.setOptions({
      highlight: function (code) {
        return hljs.highlightAuto(code).value;
      },
    });
  }, []);

  useEffect(() => {
    if (generatedText) {
      sendConversationToBackend(prompt, generatedText);
    }
  }, [generatedText]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [generatedText]);

  const sendConversationToBackend = async (prompt, generatedText) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_SERVER_URL}/conversation`,
        { prompt, response: generatedText },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
    } catch (error) {
      console.error("Error saving conversation:", error);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formattedGeneratedText = generatedText ? marked(generatedText) : "";

  return (
    <div
      ref={scrollRef}
      className="flex-1 overflow-y-auto hide-scrollbar pt-14 pb-40"
    >
      {showLogo && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex h-full flex-col items-center justify-center gap-6"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <img className="w-24 opacity-60" src={echo_logo} alt="Echo Logo" />
          </motion.div>
          <div className="text-center">
            <h2 className="gradient-text text-2xl font-bold">How can I help you today?</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Ask me anything — I&apos;m powered by Gemini AI
            </p>
          </div>
        </motion.div>
      )}

      {!showLogo && (
        <div className="mx-auto max-w-3xl space-y-6 p-4 md:p-6">
          {/* user prompt */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-3"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary">
              <User className="h-4 w-4 text-foreground" />
            </div>
            <div className="rounded-2xl rounded-tl-sm bg-secondary/50 px-4 py-3 text-sm leading-relaxed">
              {prompt}
            </div>
          </motion.div>

          {/* AI response */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="flex gap-3"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <Bot className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              {generatedText ? (
                <div className="group relative">
                  <div
                    className="markdown-body rounded-2xl rounded-tl-sm border border-border/30 bg-card/50 px-5 py-4 text-sm leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: formattedGeneratedText }}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
                    onClick={handleCopy}
                  >
                    {copied ? (
                      <Check className="h-3.5 w-3.5 text-green-400" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </Button>
                </div>
              ) : (
                <div className="space-y-3 rounded-2xl rounded-tl-sm border border-border/30 bg-card/50 p-5">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Generation;
