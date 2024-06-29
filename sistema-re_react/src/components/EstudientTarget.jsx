import React from 'react';

const EstudientTarget = () => {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden shadow-md bg-black py-4 w-[285px] m-5">
        <div className="px-4 pb-0 pt-2 flex flex-col items-start">
            <div className='w-full flex items-center mb-2'>
                <img
                    alt="Card background"
                    className="object-cover rounded-xl border-solid border-[white]"
                    src="https://nextui.org/images/hero-card-complete.jpeg"
                    width={70}
                    height={100}
                />
                <h2 className="font-semibold text-lg text-white ml-2">Esteban León</h2>
            </div>
            <small className="text-xs text-gray-300">primera matricula</small>
            <p className="text-xs uppercase font-semibold text-gray-300">primedio general: 7.89</p>
        </div>
        <div className="overflow-visible py-2 m-3 mt-[1px] mb-[1px] grid grid-cols-2 gap-3">
    <div className="relative flex items-center">
        <div className="bg-gray-800 h-6 text-center rounded-[4px] text-white flex-1">BDD: 6.79</div>
        <div className="bg-yellow-400 w-3 h-3 rounded-full ml-2"></div> 
    </div>
    <div className="relative flex items-center">
        <div className="bg-gray-800 h-6 text-center rounded-[4px] text-white flex-1">EDD: 7.30</div>
        <div className="bg-green-500 w-3 h-3 rounded-full ml-2"></div> 
    </div>
    <div className="relative flex items-center">
        <div className="bg-gray-800 h-6 text-center rounded-[4px] text-white flex-1">RDS: 4.83</div>
        <div className="bg-red-500 w-3 h-3 rounded-full ml-2"></div>
    </div>
    <div className="relative flex items-center">
        <div className="bg-gray-800 h-6 text-center rounded-[4px] text-white flex-1">EAA: 9.77</div>
        <div className="bg-green-500 w-3 h-3 rounded-full ml-2"></div> 
    </div>
</div>
    </div>
  );
};

export default EstudientTarget;
