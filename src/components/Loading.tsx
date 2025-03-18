import Header from './Header';
import Footer from './Footer';

const Loading = () => {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-white">Loading...</div>
        </div>
        <Footer />
      </div>
    );

}

export default Loading;
