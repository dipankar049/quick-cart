import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="">
      <p>Hey there</p>
      <Button asChild={true} variant={'secondary'}>
        <Link href=''>CLick me</Link>
        
      </Button>
    </div>
  );
}
