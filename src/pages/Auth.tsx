import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, EyeOff, Palette } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";

const Auth = () => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [redirect, setRedirect] = useState(false); // control redirect
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    userType: 'visitor',
  });

  // Redirect if already authenticated OR after login/signup
  if (user || redirect) {
    return <Navigate to="/" replace />;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 const handleSignIn = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {
    console.log("baseurl", import.meta.env.VITE_API_URL);
    const { data } = await axios.post(import.meta.env.VITE_API_URL+"user/login", {
      email: formData.email,
      password: formData.password,
    });

    if (data.status !== 200) {
      toast({
        title: "Error",
        description: data.message,
        variant: "destructive",
      });
      return;
    }

    // Remove password before storing
    const { password, ...userWithoutPassword } = data.user;

    // Save each property separately in localStorage
    localStorage.setItem("name", userWithoutPassword.name);
    localStorage.setItem("email", userWithoutPassword.email);
    localStorage.setItem("id", String(userWithoutPassword.id)); // convert to string
    localStorage.setItem("token", data.token);

    // Update React state
    setUser(userWithoutPassword);
    setSession({ user: userWithoutPassword, token: data.token });

    console.log("Login success:", { user: userWithoutPassword, token: data.token });

    navigate("/"); // redirect to home
  } catch (error: any) {
    console.error("Login failed:", error.response?.data || error.message);
  } finally {
    setLoading(false);
  }
};


  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match!",
        variant: "destructive",
      });
      return;
    }

    if (formData.password.length < 7) {
      toast({
        title: "Error",
        description: "Password must be at least 7 characters long!",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      console.log("baseurl", import.meta.env.VITE_API_URL);
      const { data } = await axios.post(import.meta.env.VITE_API_URL+"user/signup", {
        email: formData.email,
        password: formData.password,
        userData: {
          full_name: formData.fullName,
          user_type: formData.userType,
        },
      });

      if (data.status !== 200) {
        toast({
          title: "Error",
          description: data.message,
          variant: "destructive",
        });
        return;
      }

      const sessionData = { token: data.token };

      setSession(sessionData);
      localStorage.setItem("session", JSON.stringify(sessionData));

      toast({
        title: "Success!",
        description: "Login success.",
      });

      console.log("Signup success:", sessionData);

      setRedirect(true); // trigger redirect
    } catch (error: any) {
      toast({
        title: "Signup failed",
        description: error.response?.data?.message || error.message,
        variant: "destructive",
      });
      console.error("Signup failed:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-primary/5 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <Palette className="h-8 w-8 text-[#570DF8]" />
            <h1 className="text-2xl font-bold text-[#570DF8]">
              ExhibitPro
            </h1>
          </div>
          <p className="text-[#570DF8]">Welcome to the Artworks Management System</p>
        </div>

        <Card className="shadow-elegant border-0 bg-gradient-card">
          {/* <CardHeader className="text-center">
            <CardTitle>Authentication</CardTitle>
            <CardDescription>
              Sign in to your account or create a new one
            </CardDescription>
          </CardHeader> */}
          <CardContent>
            <Tabs defaultValue="signin" className="w-full">
              {/* <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger
                  value="signin"
                  className="text-[#570DF8] hover:text-[#570DF8] font-medium"
                >
                  Sign In
                </TabsTrigger>

                <TabsTrigger
                  value="signup"
                  className="text-[#570DF8] hover:text-[#570DF8] font-medium"
                >
                  Sign Up
                </TabsTrigger>
              </TabsList> */}

              <TabsContent value="signin">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">Email</Label>
                    <Input
                      id="signin-email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signin-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="signin-password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Enter your password"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 py-2"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#570DF8] hover:bg-[#4b09d6] text-white"
                    disabled={loading}
                  >
                    {loading ? 'Signing in...' : 'Sign In'}
                  </Button>

                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Full Name</Label>
                    <Input
                      id="signup-name"
                      name="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="signup-password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Enter your password"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 py-2"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input
                      id="confirm-password"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm your password"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#570DF8] hover:bg-[#4b09d6] text-white"
                    disabled={loading || formData.password !== formData.confirmPassword}
                  >
                    {loading ? 'Creating account...' : 'Create Account'}
                  </Button>

                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;