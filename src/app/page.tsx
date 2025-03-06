'use client';
import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CreateRoomModal from './components/CreateRoomModal';
import JoinRoomModal from './components/JoinRoomModal';
import DropTextAnimation from "../components/DropWordAnimation";
import { Audiowide, Orbitron } from 'next/font/google';

const orbitron = Orbitron({
  weight: '400', // Default weight
  subsets: ['latin'], // Only load required subsets
});

const audiowide = Audiowide({
  weight: '400',
  subsets: ['latin'],
});



const Home = () => {
  const [isCreateClicked, setIsCreateClicked] = useState(false);
  const [isJoinClicked, setIsJoinClicked] = useState(false);

  return (
    <div className={`min-h-screen flex flex-col gap-y-16`}>
      <Header/>
      <main className="container flex-grow mx-auto px-4 py-12">
        {/*<h2 className="text-3xl font-thin text-center text-white">Welcome aboard, Name Trekkers!</h2>*/}
        <DropTextAnimation text="Welcome aboard, Name Trekkers!" className="text-xl text-sky-900 mb-4 text-center overflow-hidden"/>


        <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-12 ${orbitron.className}`}>
          <section onClick={() => setIsCreateClicked(true)} className="flex flex-col bg-indigo-600  justify-center rounded-lg shadow-md hover:bg-indigo-700 p-8 hover:shadow-lg transition-shadow cursor-pointer">
            <h3 className={`text-xl font-semibold mb-4 text-white ${audiowide.className}`}>Create Room</h3>
            <p className="text-blue-300">Start a new room and invite others to join.</p>
            <CreateRoomModal open={isCreateClicked} setOpen={setIsCreateClicked} />
          </section>

          <section onClick={() => setIsJoinClicked(true)} className="flex flex-col justify-center bg-[#17A2B8] rounded-lg shadow-md p-8 hover:bg-[#137180] hover:shadow-lg transition-shadow cursor-pointer">
            <h3 className={`text-xl font-semibold mb-4 text-white ${audiowide.className}`}>Join Room</h3>
            <p className="text-teal-300">Enter a room code to join an existing session.</p>
            <JoinRoomModal open={isJoinClicked} setOpen={setIsJoinClicked} />
          </section>
        </div>
      </main>

      <Footer/>
    </div>
  );
}

export default Home;
