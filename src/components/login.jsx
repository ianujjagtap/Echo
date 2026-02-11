import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2, LogIn, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }

    setIsLoading(true);
    try {
      const url = `${import.meta.env.VITE_BACKEND_SERVER_URL}/login`;
      const response = await axios.post(url, { username, password });
      localStorage.setItem("token", response.data.token);
      toast.success("Welcome back!", {
        description: "You have been logged in successfully.",
      });
      setIsAuthenticated(true);
      navigate("/echo");
    } catch (error) {
      toast.error("Login failed", {
        description: error.response?.data?.message || "Invalid credentials. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background">
      {/* background gradient orbs */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-chart-2/10 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md px-4"
      >
        <form onSubmit={handleLogin}>
          <Card className="border-border/50 bg-card/80 backdrop-blur-xl">
            <CardHeader className="space-y-1 text-center pt-8 pb-2">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10"
              >
                <Sparkles className="h-8 w-8 text-primary" />
              </motion.div>
              <h1 className="gradient-text text-3xl font-bold tracking-tight">Echo</h1>
              <p className="text-sm text-muted-foreground">Sign in to your AI assistant</p>
            </CardHeader>

            <CardContent className="space-y-4 px-6">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                  className="h-11 bg-background/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  className="h-11 bg-background/50"
                />
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-4 px-6 pb-8">
              <Button
                type="submit"
                className="w-full h-11 text-base font-medium"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <LogIn className="mr-2 h-4 w-4" />
                )}
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
              <p className="text-center text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link
                  to="/signup"
                  className="font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  Create one
                </Link>
              </p>
            </CardFooter>
          </Card>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
