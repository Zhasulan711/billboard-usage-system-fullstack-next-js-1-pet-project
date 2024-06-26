"use client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/use-current-user";
import { FaUser } from "react-icons/fa";

export const YourPersonalManager = () => {
  const user = useCurrentUser();

  return (
    <div className="bg-white dark:bg-[#0F1623] ml-[20px] mt-[20px] w-[322px] h-[160px] rounded-lg pl-[26px] pt-[14px]">
      <h1 className="text-black dark:text-white text-2xl font-medium">Your personal profile</h1>
      <div className="flex flex-row mt-[30px] space-x-[60px] items-center">
        <div className="flex flex-row space-x-[10px]">
          <Avatar>
            <AvatarImage src={user?.image || ""} />
            <AvatarFallback className="bg-sky-500">
              <FaUser className="text-black dark:text-white" />
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col -space-y-[5px]">
            <h2 className="text-black dark:text-white text-xl font-normal">{user?.name}</h2>
            <h3 className="text-[#D9D9D9] dark:text-[#3F454F] text-base font-normal">User</h3>
          </div>
        </div>
      </div>
    </div>
  );
};
