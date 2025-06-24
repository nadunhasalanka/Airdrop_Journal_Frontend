
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Coins, Shield, BarChart3, Clock } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Airdrop Journal
        </div>
        <div className="space-x-4">
          <Link to="/login">
            <Button variant="ghost" className="text-white hover:text-purple-400">
              Login
            </Button>
          </Link>
          <Link to="/signup">
            <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
              Sign Up
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Track Every Airdrop
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed">
            Organize, monitor, and maximize your crypto airdrops with our comprehensive tracking platform. Never miss another opportunity.
          </p>
          <div className="space-x-4">
            <Link to="/signup">
              <Button size="lg" className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-lg px-8 py-6">
                Start Tracking
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-gray-900 text-lg px-8 py-6">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Everything you need to stay organized and never miss an airdrop opportunity
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="bg-gray-800 border-gray-700 hover:border-purple-400 transition-colors">
            <CardContent className="p-6 text-center">
              <Coins className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-white">Track Airdrops</h3>
              <p className="text-gray-400">
                Monitor all your airdrop participations in one organized dashboard
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700 hover:border-blue-400 transition-colors">
            <CardContent className="p-6 text-center">
              <Shield className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-white">Secure Storage</h3>
              <p className="text-gray-400">
                Your data is encrypted and stored securely with enterprise-grade protection
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700 hover:border-cyan-400 transition-colors">
            <CardContent className="p-6 text-center">
              <BarChart3 className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-white">Analytics</h3>
              <p className="text-gray-400">
                Get insights into your airdrop performance and success rates
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700 hover:border-green-400 transition-colors">
            <CardContent className="p-6 text-center">
              <Clock className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-white">Reminders</h3>
              <p className="text-gray-400">
                Never miss deadlines with smart notifications and reminders
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-3xl p-12 text-center border border-purple-500/20">
          <h2 className="text-4xl font-bold mb-4 text-white">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of crypto enthusiasts who are already maximizing their airdrop opportunities
          </p>
          <Link to="/signup">
            <Button size="lg" className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-lg px-8 py-6">
              Create Your Journal
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-8 border-t border-gray-800">
        <div className="text-center text-gray-400">
          <p>&copy; 2024 Airdrop Journal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
