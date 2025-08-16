import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Alert, AlertDescription } from "../components/ui/alert";
import { Badge } from "../components/ui/badge";
import { 
  Users, 
  Shield, 
  Car, 
  MapPin, 
  User,
  Eye,
  EyeOff
} from 'lucide-react';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const demoUsers = [
    {
      role: 'admin',
      email: 'admin@bhutantours.com',
      password: 'admin123',
      icon: Shield,
      description: 'Full system access, user management, analytics'
    },
    {
      role: 'tour_manager',
      email: 'manager@bhutantours.com',
      password: 'manager123',
      icon: Users,
      description: 'Tour & hotel management, booking oversight'
    },
    {
      role: 'guide',
      email: 'guide@bhutantours.com',
      password: 'guide123',
      icon: MapPin,
      description: 'Tour assignments, schedule, performance tracking'
    },
    {
      role: 'driver',
      email: 'driver@bhutantours.com',
      password: 'driver123',
      icon: Car,
      description: 'Trip assignments, vehicle management'
    },
    {
      role: 'tourist',
      email: 'tourist@example.com',
      password: 'tourist123',
      icon: User,
      description: 'Booking management, travel history'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const success = await login(email, password);

    if (success) {
      navigate('/dashboard');
    } else {
      setError('Invalid email or password');
    }

    setIsLoading(false);
  };

  const handleDemoLogin = async (demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setIsLoading(true);
    setError('');

    const success = await login(demoEmail, demoPassword);

    if (success) {
      navigate('/dashboard');
    } else {
      setError('Login failed');
    }

    setIsLoading(false);
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'tour_manager': return 'bg-blue-100 text-blue-800';
      case 'guide': return 'bg-green-100 text-green-800';
      case 'driver': return 'bg-yellow-100 text-yellow-800';
      case 'tourist': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Login Form */}
        <div className="flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-teal-900">Welcome Back</CardTitle>
              <CardDescription>
                Sign in to your Bhutan Mind Break dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
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

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button 
                  type="submit" 
                  className="w-full bg-teal-600 hover:bg-teal-700"
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Demo Users */}
        <div className="flex items-center justify-center">
          <Card className="w-full max-w-lg">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-teal-900">Demo Accounts</CardTitle>
              <CardDescription>
                Try different user roles with pre-configured demo accounts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {demoUsers.map((user) => {
                  const IconComponent = user.icon;
                  return (
                    <div
                      key={user.role}
                      className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => handleDemoLogin(user.email, user.password)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0">
                          <IconComponent className="h-6 w-6 text-teal-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium text-gray-900 capitalize">
                              {user.role.replace('_', ' ')}
                            </h3>
                            <Badge className={getRoleColor(user.role)}>
                              {user.role}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{user.description}</p>
                          <div className="text-xs text-gray-500">
                            <p>📧 {user.email}</p>
                            <p>🔑 {user.password}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Quick Access Features:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Role-based dashboard navigation</li>
                  <li>• Real-time booking management</li>
                  <li>• Advanced tour & hotel CRUD operations</li>
                  <li>• Multi-image upload system</li>
                  <li>• Dynamic pricing & analytics</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;