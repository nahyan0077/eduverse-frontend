import heroImage from '../../assets/home/hero_image.png'

const HeroSection: React.FC = () => {
	return (
        <div className="bg-white text-purple-800 py-7  px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between">
                <div className="flex flex-col items-center lg:w-1/2 lg:pr-10">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-4">
                        <span className="text-yellow-600">Studying</span> Online is{" "}
                    </h1>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-4">
                        now much easier
                    </h1>
                    <p className="text-lg sm:text-xl md:text-2xl ">
                    EDU-VERSE is an interesting platform that 
                    </p >
                    <p className='text-lg sm:text-xl md:text-2xl mb-8' >will teach you in more an interactive way.</p>
                    <div className="flex items-center justify-center flex-wrap">
                        <button className="bg-purple-700 hover:bg-purple-500 text-white font-bold py-3 px-6 rounded-full mr-4 mb-4 shadow-[5px_5px_0px_0px_rgba(109,40,217)]">
                            Get Started
                        </button>
                        <button className="bg-transparent text-purple-700 border border-purple-700 hover:bg-purple-300 hover:text-white font-bold py-3 px-6 rounded-full mb-4 shadow-[5px_5px_0px_0px_rgba(109,40,217)]">
                            Learn More
                        </button>
                    </div>
                </div>
                <div className="lg:w-1/2">
                    <img src={heroImage} className="w-full" alt="" />
                </div>
            </div>
        </div>
	);
};

export default HeroSection;
