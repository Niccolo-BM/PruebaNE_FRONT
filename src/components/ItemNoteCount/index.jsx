import React from "react";
import './index.css';

const colorVariants = [
  'bg-blue-500 text-white',
  'bg-orange-400 text-white',
  'bg-orange-500 text-white'
];

const ItemNoteCount = ({title, description, icon, index = 0})=> {
  const colorClass = colorVariants[index] || colorVariants[0];
  return (
   <div className={`flex flex-row items-center justify-between rounded-xl h-[100px] p-6 shadow-sm ${colorClass} mb-4`}>
        <div className="flex flex-col justify-center items-start">
            <div className="text-lg">{title}</div>
            <div className="text-2xl font-bold mb-2">{description}</div>
        </div>
        <div className="flex items-center justify-center w-16 h-16">
            {icon ? icon : <span className="text-4xl">📝</span>}
        </div>
   </div>
  );
};

export default ItemNoteCount;