import { Trophy, Users, Brain, Clock, ChevronRight, Linkedin, Twitter } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from 'next/image';
import { audiowide } from '../fonts';

const About = () => {

  const links = [
    {
        href: "https://github.com/ideftbuild",
        label: "Follow on GitHub",
        Icon: SiGithub,
        ariaLabel: "Visit ideftbuild on GitHub",
    },
    {
        href: "https://www.linkedin.com/in/akan-swe",
        label: "Follow on LinkedIn",
        Icon: Linkedin,
        ariaLabel: "Visit Akan's LinkedIn profile",
    },
    {
        href: "https://x.com/heis_akan",
        label: "Follow on Twitter",
        Icon: Twitter,
        ariaLabel: "Visit Akan's Twitter profile",
    },
  ];

  return (
    <div className={"min-h-screen"}>
      <Header />
      <main className="container mx-auto px-4 md:px-8 lg:px-16 py-12 text-sky-100">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="bg-gradient-to-r from-pink-400 to-yellow-300 p-1 rounded-xl mb-8 inline-block">
            <h1 className="text-4xl md:text-5xl font-bold bg-gray-900 px-8 py-4 rounded-lg">
              About NameTrek
            </h1>
          </div>
          <p className="text-xl text-black max-w-3xl text-sky-900 mx-auto">
            Where nostalgia meets modern gaming - challenge your mind, test your speed, and connect with others.
          </p>
          <div className="mt-8">
            <Link href="/">
              <button
                className={`bg-gradient-to-r from-pink-500 to-yellow-500 text-white px-8 py-3 rounded-full font-semibold text-lg hover:opacity-90 transition-opacity flex items-center mx-auto ${audiowide.className}`}>
                Start Playing Now <ChevronRight className="ml-2"/>
              </button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {[
            {icon: Clock, title: "Race Against Time", desc: "Test your quick thinking with our fast-paced gameplay"},
            {icon: Users, title: "Multiplayer Fun", desc: "Connect and compete with friends and family online" },
            { icon: Brain, title: "Knowledge Challenge", desc: "Expand your knowledge across various categories" },
            { icon: Trophy, title: "Compete & Win", desc: "Rise through the ranks and become the ultimate champion" }
          ].map((feature, index) => (
            <div key={index} className="bg-sky-900 bg-opacity-50 p-6 rounded-xl backdrop-blur-sm">
              <feature.icon className="w-12 h-12 text-yellow-400 mb-4" />
              <h3 className={`text-xl font-semibold mb-2 text-white ${audiowide.className}`}>{feature.title}</h3>
              <p className="text-sky-100 text-pink-400">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Main Content Sections */}
        <div className="space-y-16 max-w-4xl mx-auto text-sky-100">
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center">
              <span className="text-teal-900">Introduction</span>
            </h2>
            <div className="bg-sky-900 bg-opacity-50 rounded-xl p-6 backdrop-blur-sm">
              <p className="leading-relaxed">
                This interactive game brings a nostalgic childhood favorite to the web. Players race against the clock, naming items in chosen categories—countries, animals, or even everyday objects—before time runs out. Hesitate or give an invalid answer, and you&#39;re out! The game continues until one player remains. It&#39;s not just fun and competitive; it also helps improve typing speed by challenging players to think and type quickly under pressure.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center">
              <span className="text-teal-900">Our Story</span>
            </h2>
            <div className="bg-sky-900 bg-opacity-50 rounded-xl p-6 backdrop-blur-sm">
              <p className="leading-relaxed">
                Growing up, I played a fun and engaging game that brought people together, sparked creativity, and always led to unforgettable moments. Now, I&#39;m bringing that experience to the web, not just for nostalgia or fun (though there&#39;s plenty of that!) but to create a dynamic, interactive platform that connects people in new ways.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center">
              <span className="text-teal-900">Mission & Vision</span>
            </h2>
            <div className="bg-sky-900 bg-opacity-50 rounded-xl p-6 backdrop-blur-sm">
              <p className="leading-relaxed">
                Our mission is to create a platform that fosters connection, creativity, and competition. We want to bring people together in a fun and engaging way, sparking joy and laughter through shared experiences. Our vision is to build a community of players who love to challenge themselves, learn new things, and connect with others in a positive and supportive environment.
              </p>
            </div>
          </section>

          {/* Team Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 flex items-center">
              <span className="text-teal-900">Meet the Creator</span>
            </h2>
            <div className="bg-sky-900 bg-opacity-50 rounded-xl p-6 backdrop-blur-sm flex items-center gap-6">
              <Image
                src={"/profile_image.jpg"}
                alt={"Profile"}
                width={200}
                height={200}
                className={"rounded-full"}
              />
              <div>
                <h3 className="text-xl font-semibold mb-2 text-white">Akan</h3>
                <p className="leading-relaxed">
                  A passionate and resilient individual that loves taking on new challenges. Software Engineer by profession, problem solver by nature. Building digital experiences that bring joy and connection to people&#39;s lives.
                </p>

                <div className="flex gap-x-6 mt-2">
                  {links.map(({ href, label, Icon, ariaLabel }) => (
                    <Link
                      key={href}
                      href={href}
                      className="inline-flex items-center text-yellow-400 hover:text-yellow-300"
                      aria-label={ariaLabel}
                     >
                     <Icon className="w-5 h-5 mr-2" />
                     {label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
