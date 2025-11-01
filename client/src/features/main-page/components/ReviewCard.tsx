import React from "react";

interface ReviewCardProps {
  message: string;
  name: string;
  pfp?: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ message, name, pfp }) => {
    return (
        <div className="w-[300px] h-[360px] px-7 py-7 flex flex-col bg-white rounded-2xl shadow-lg">
            <p className="text-[#8D8D8D] mb-6 w-[260px] h-[220px] text-[14px]">
                {message}
            </p>
            <div className="flex items-center gap-4">
                {pfp ? (
                <img
                    src={pfp}
                    alt={`${name}'s profile`}
                    className="w-[75px] h-[75px] rounded-full object-cover"
                />
                ) : (
                <div className="w-[75px] h-[75px] rounded-full bg-gray-300" />
                )}
                <span className="text-[#1591EA] font-medium text-[16px]">{name}</span>
            </div>
        </div>
    );
};

export default ReviewCard;