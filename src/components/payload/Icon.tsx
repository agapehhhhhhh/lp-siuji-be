import React from "react";
import logo from "@/assets/logo.svg";
import Image from "next/image";

export default function icon() {
  return (
    <div className="flex items-center">
      <Image className="w-40" src={logo} alt="SIUJI Icon" />
    </div>
  );
}