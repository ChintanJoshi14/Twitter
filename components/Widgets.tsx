import { SearchIcon } from "@heroicons/react/outline";
import React from "react";
import { TwitterTimelineEmbed } from "react-twitter-embed";
import { useSession } from "next-auth/react";

export default function Widgets() {
  const { data:session } = useSession();
  const loggedInUsername: string = session?.user?.name?.replaceAll(/\s+/g, "").toLowerCase()!;
  // console.log("user: ",loggedInUsername)
  return (
    <div className="px-2 mt-2 col-span-2 hidden lg:inline">
        {/* CHANGE in col-span-2 */}

      <div className="flex items-center space-x-2 bg-gray-100 rounded-full p-3">
        <SearchIcon className="h-5 w-5 text-gray-400 shrink-0" />
        <form>
        <input
          type="text"
          className="outline-none bg-transparent flex-1"
          placeholder="Search Twitter"
        />
        <button hidden type="submit" />
        </form>
      </div>

      {<TwitterTimelineEmbed
        sourceType="profile"
        // screenName={loggedInUsername!}
        screenName='twitterlive'
        options={{ height: 1000 }}
      />}
    </div>
  );
}
