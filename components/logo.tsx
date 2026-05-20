import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <Image width={110} height={110} src="/logo-niscalis-main.png" className="rounded-md" alt="logo" />
      {/* <span className="font-medium">Niscalis</span> */}
    </Link>
  );
}
