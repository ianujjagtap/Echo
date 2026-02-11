import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Send, AlertCircle, Loader2 } from "lucide-react";
import { setGeneratedText, setShowLogo, setPrompt, setLockedPrompt } from "@/features/chatSlice";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import axios from "axios";

const Prompt = () => {
  const dispatch = useDispatch();
  const prompt = useSelector((state) => state.chat.prompt);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError("Please enter a prompt.");
      return;
    }

    dispatch(setShowLogo(false));
    dispatch(setLockedPrompt(prompt));
    dispatch(setGeneratedText(""));
    dispatch(setPrompt(""));
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_GEMINIT_API_URL}/v1beta/models/gemini-1.5-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
        {
          contents: [{ parts: [{ text: prompt }] }],
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const text =
        response.data.candidates[0]?.content.parts[0].text || "No response generated.";
      dispatch(setGeneratedText(text));
    } catch (err) {
      console.error("Error generating content:", err);
      const message = err.response?.data?.error?.message || "Something went wrong. Please try again.";
      setError(message);
      dispatch(setGeneratedText(""));
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!isLoading && prompt.trim()) {
        handleGenerate();
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="fixed bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-background via-background to-transparent pb-4 pt-8"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center px-4">
        <div className="glow-border w-full rounded-2xl border border-border/50 bg-card/80 backdrop-blur-xl transition-all">
          <div className="relative flex items-end gap-2 p-2">
            <Textarea
              value={prompt}
              onChange={(e) => {
                dispatch(setPrompt(e.target.value));
                setError(null);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Ask Echo anything..."
              className="min-h-[48px] max-h-[150px] flex-1 resize-none border-0 bg-transparent px-3 py-3 text-sm focus-visible:ring-0 focus-visible:ring-offset-0 hide-scrollbar"
              rows={1}
            />
            <Button
              size="icon"
              className="h-10 w-10 shrink-0 rounded-xl"
              onClick={handleGenerate}
              disabled={isLoading || !prompt.trim()}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 flex items-center gap-1.5 text-xs text-destructive"
          >
            <AlertCircle className="h-3.5 w-3.5" />
            <span>{error}</span>
          </motion.div>
        )}

        <p className="mt-2 text-center text-[11px] text-muted-foreground">
          Echo may display inaccurate info — always double-check responses.
        </p>
      </div>
    </motion.div>
  );
};

export default Prompt;
