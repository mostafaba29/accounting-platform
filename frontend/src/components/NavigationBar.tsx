import Link from "next/link";
import {Button} from "./ui/button";
export default function NavigationBar(){
    return(
    <>
      <div className="h-16 bg-slate-500 sticky top-0 flex justify-between align-center ">
        <div>
          <h3 className="text-2xl font-bold text-white ml-4 mt-3">
            <Link href="/">logo</Link>
          </h3>
          </div>
        <div className="mr-4 mt-3">
          <Link href="/"><Button            className="text-white text-[1.125rem] bg-transparent p-4 hover:bg-slate-600 hover:text-emerald-200">Home</Button></Link>
          <Link href="/products"><Button    className="text-white text-[1.125rem] bg-transparent p-4 hover:bg-slate-600 hover:text-emerald-200">Products</Button></Link>
          <Link href="/blog"><Button        className="text-white text-[1.125rem] bg-transparent p-4 hover:bg-slate-600 hover:text-emerald-200">Blog</Button></Link>
          <Link href="/about us"><Button    className="text-white text-[1.125rem] bg-transparent p-4 hover:bg-slate-600 hover:text-emerald-200">About Us</Button></Link>
          <Link href="/contact-us"><Button  className="text-white text-[1.125rem] bg-transparent p-4 hover:bg-slate-600 hover:text-emerald-200">Contact Us</Button></Link>
          <Link href="/auth/login"><Button  className="text-white text-[1.125rem] bg-transparent p-4 hover:bg-slate-600 hover:text-emerald-200">Log In</Button></Link>
        </div>
      </div>
    </>
  );
}
