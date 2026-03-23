import React from "react";
import Image from "next/image";

interface PrivilegeCardProps {
  title: string;
  description: string;
  discount: string;
  imageSrc: string;
}

const PrivilegeCard: React.FC<PrivilegeCardProps> = ({ title, description, discount, imageSrc }) => {
  return (
    <div className="flex w-[86vw] max-w-[340px] shrink-0 snap-start flex-col justify-start items-start sm:w-[320px]">
      <div className="self-stretch h-36 relative rounded-2xl overflow-hidden shadow-sm">
        <Image src={imageSrc} alt={title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <div className="absolute bottom-3 right-3 text-white text-2xl font-bold font-['Kanit'] drop-shadow-md">
          {discount}
        </div>
      </div>
      <div className="self-stretch py-2.5 flex flex-col justify-start items-start gap-1">
        <div className="self-stretch text-[#101828] text-sm font-medium font-['Kanit'] leading-5 line-clamp-1">
          {title}
        </div>
        <div className="self-stretch text-[#667085] text-xs font-normal font-['Kanit'] leading-4 line-clamp-2">
          {description}
        </div>
      </div>
    </div>
  );
};

export default PrivilegeCard;
