import Link from "next/link";
import React, { SVGProps } from "react";

interface Props {
  Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  text: string;
  onClick?: () => {};
}

export default function SidebarRow({ Icon, text, onClick }: Props) {
  return (
  //   <Link href={text === 'Home' ? '/' : `${text.toLowerCase()}` 
  // }>
    <div onClick={() => onClick?.()} className="flex cursor-pointer items-center space-x-2 rounded-full max-w-fit px-4 py-3 transition-all duration-200 hover:bg-gray-100 group">
      <Icon className="h-6 w-6" />
      <p className="hidden group-hover:text-twitter md:inline-flex text-base font-light lg:text-xl">{text}</p>
    </div>
    // </Link>
  );
}
