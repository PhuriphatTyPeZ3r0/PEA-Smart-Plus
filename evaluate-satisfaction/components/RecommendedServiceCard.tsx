import React from "react";
import Image from "next/image";

interface RecommendedServiceCardProps {
  title: string;
  description: string;
  imageSrc: string;
}

const RecommendedServiceCard: React.FC<RecommendedServiceCardProps> = ({ title, description, imageSrc }) => {
  return (
    <div className="w-44 shrink-0 bg-white rounded-2xl shadow-[0_1px_2px_rgba(16,24,40,0.05)] border border-slate-50 flex flex-col justify-start items-start overflow-hidden">
      <div className="self-stretch h-44 relative">
        <Image src={imageSrc} alt={title} fill className="object-cover" />
      </div>
      <div className="self-stretch px-3 py-4 flex flex-col justify-start items-start gap-1">
        <div className="self-stretch text-[#101828] text-sm font-medium font-['Kanit'] leading-5 line-clamp-1">
          {title}
        </div>
        <div className="self-stretch text-[#667085] text-xs font-normal font-['Kanit'] leading-4 line-clamp-1 opacity-70">
          {description}
        </div>
      </div>
    </div>
  );
};

export default RecommendedServiceCard;
