'use client';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className={"min-h-screen"}>
      <Header />
        <main className="container mx-auto px-4 md:px-8 lg:px-16 py-12 text-sky-100">
          <div className="flex flex-col items-center text-center mb-16">
          <div className="bg-gradient-to-r from-pink-400 to-yellow-300 p-1 rounded-xl mb-8 inline-block">
            <h1 className="text-4xl md:text-5xl font-bold bg-gray-900 px-8 py-4 rounded-lg">
              Privacy Policy
            </h1>
          </div>
          
          <div className="bg-sky-900 bg-opacity-50 p-8 rounded-xl backdrop-blur-sm w-full max-w-4xl text-left space-y-6">
            <section className="space-y-4">
              <p>
                Last updated: January 21, 2025
              </p>
              <p>
                Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you play NameTrek.
              </p>
            </section>

            <section className="space-y-4">
              <h3 className="text-xl font-semibold text-white">
                Information We Collect
              </h3>
              <p>
                We collect minimal information to provide you with the best gaming experience:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Game progress (stored locally on your device)</li>
                <li>Game preferences and settings</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h3 className="text-xl font-semibold text-white">
                How We Use Your Information
              </h3>
              <p>
                We use local storage and cookies solely to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Save your game progress</li>
                <li>Remember your game preferences</li>
                <li>Improve your gaming experience</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h3 className="text-xl font-semibold text-white">
                Data Storage
              </h3>
              <p>
                All game data is stored locally on your device using:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Browser&#39;s localStorage: For saving game progress and preferences</li>
                <li>Cookies: For essential game functionality</li>
              </ul>
              <p>
                We do not transfer or store any of your data on our servers.
              </p>
            </section>

            <section className="space-y-4">
              <h3 className="text-xl font-semibold text-white">
                Your Rights
              </h3>
              <p>
                You have control over your data:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Clear game data through your browser&#39;s settings</li>
                <li>Reset game progress within the game settings</li>
                <li>Manage cookie preferences in your browser</li>
              </ul>
            </section>

            <section className="space-y-4 text-white">
              <h3 className="text-xl font-semibold text-white">
                Contact Us
              </h3>
              <p>
                If you have any questions about our Privacy Policy, please contact us through our Contact page.              </p>
            </section>

            <section className="mt-8 pt-6 border-t border-gray-700">
              <p className="text-gray-300 text-sm">
                By playing NameTrek, you agree to the collection and use of information in accordance with this Privacy Policy.
              </p>
            </section>
          </div>
        </div>
        </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
