import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setShowLogo, setGeneratedText, setLockedPrompt } from "@/features/chatSlice";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SquarePen, MessageSquare, Mail, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const Sidebar = () => {
  const [conversations, setConversations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const isSidebarVisible = useSelector((state) => state.chat.isSidebarVisible);

  useEffect(() => {
    if (isSidebarVisible) {
      fetchConversations();
    }
  }, [isSidebarVisible]);

  const fetchConversations = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_SERVER_URL}/conversations`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setConversations(response.data);
    } catch (error) {
      console.error("Error fetching conversations:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChat = () => {
    dispatch(setShowLogo(true));
    dispatch(setGeneratedText(""));
    dispatch(setLockedPrompt(""));
  };

  return (
    <AnimatePresence>
      {isSidebarVisible && (
        <motion.aside
          initial={{ x: "-100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "-100%", opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed top-14 left-0 z-20 flex h-[calc(100vh-3.5rem)] w-72 flex-col border-r border-border/50 bg-sidebar/95 backdrop-blur-xl md:w-80"
        >
          {/* new chat button */}
          <div className="p-3">
            <Button
              variant="outline"
              className="w-full justify-start gap-2 border-border/50 bg-sidebar-accent/50 hover:bg-sidebar-accent"
              onClick={handleNewChat}
            >
              <SquarePen className="h-4 w-4" />
              New Chat
            </Button>
          </div>

          <Separator className="bg-border/30" />

          {/* conversation list */}
          <div className="flex-1 overflow-y-auto hide-scrollbar p-3">
            <p className="mb-3 px-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Recent Conversations
            </p>

            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              </div>
            ) : conversations.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-2 py-8 text-muted-foreground">
                <MessageSquare className="h-8 w-8 opacity-50" />
                <p className="text-sm">No conversations yet</p>
              </div>
            ) : (
              <div className="space-y-1">
                {conversations.map((convo, index) => (
                  <motion.div
                    key={convo._id || index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                  >
                    <button className="w-full rounded-lg px-3 py-2.5 text-left text-sm text-foreground/80 transition-colors hover:bg-sidebar-accent hover:text-foreground">
                      <p className="truncate">{convo.prompt}</p>
                    </button>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          <Separator className="bg-border/30" />

          {/* footer */}
          <div className="p-3">
            <a
              href="mailto:anujjagtap2004@gmail.com"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-primary"
            >
              <Mail className="h-4 w-4" />
              Send Feedback
            </a>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
