'use client';
import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CreateRoomModal from './components/CreateRoomModal';
import JoinRoomModal from './components/JoinRoomModal';
import DropTextAnimation from "../components/DropWordAnimation";

const Home = () => {
  const [isCreateClicked, setIsCreateClicked] = useState(false);
  const [isJoinClicked, setIsJoinClicked] = useState(false);

  return (
    <div className="flex flex-col gap-y-16 max-h-[100vh] overflow-y-auto scrollbar-thin scrollbar-track-gray-800/40 scrollbar-thumb-pink-500/40 hover:scrollbar-thumb-pink-500/60 ">
      <Header/>
      <main className="container flex-grow mx-auto px-4 py-12">
        {/*<h2 className="text-3xl font-thin text-center text-white">Welcome aboard, Name Trekkers!</h2>*/}
        <DropTextAnimation text="Welcome aboard, Name Trekkers!" className="text-xl font-semibold text-pink-400 mb-4 text-center overflow-hidden"/>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-12">
          <section onClick={() => setIsCreateClicked(true)} className="flex flex-col justify-center bg-blue-600 rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow cursor-pointer">
            <h3 className="text-xl font-semibold mb-4">Create Room</h3>
            <p className="text-black">Start a new room and invite others to join.</p>
            <CreateRoomModal open={isCreateClicked} setOpen={setIsCreateClicked} />
          </section>

          <section onClick={() => setIsJoinClicked(true)} className="flex flex-col justify-center bg-green-600 rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow cursor-pointer">
            <h3 className="text-xl font-semibold mb-4">Join Room</h3>
            <p className="text-black">Enter a room code to join an existing session.</p>
            <JoinRoomModal open={isJoinClicked} setOpen={setIsJoinClicked} />
          </section>
        </div>
      </main>

      <Footer/>
    </div>
  );
}

export default Home;
