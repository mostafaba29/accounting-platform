import Link from "next/link";

export default function Footer(){
    return (
      <footer className="bg-slate-900 text-white px-4 py-8  bottom-0">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h2 className="font-semibold mb-4">About Us</h2>
              <ul>
                <li><Link href="#" className="block mb-2 hover:text-sky-300">Our Story</Link></li>
                <li><Link href="#" className="block mb-2 hover:text-sky-300">Team</Link></li>
                <li><Link href="#" className="block mb-2 hover:text-sky-300">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h2 className="font-semibold mb-4">Support</h2>
              <ul>
                <li><Link href="#" className="block mb-2 hover:text-sky-300">Help Center</Link></li>
                <li><Link href="#" className="block mb-2 hover:text-sky-300">Contact Us</Link></li>
                <li><Link href="#" className="block mb-2 hover:text-sky-300">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h2 className="font-semibold mb-4">Follow Us</h2>
              <ul>
                <li><Link href="#" className="block mb-2 hover:text-sky-300">Facebook</Link></li>
                <li><Link href="#" className="block mb-2 hover:text-sky-300">Twitter</Link></li>
                <li><Link href="#" className="block mb-2 hover:text-sky-300">Instagram</Link></li>
              </ul>
            </div>
            <div>
              <h2 className="font-semibold mb-4">Contact Us</h2>
              <ul>
                <li><Link href="#" className="block mb-2 hover:text-sky-300">Whatsapp</Link></li>
                <li><Link href="#" className="block mb-2 hover:text-sky-300">Mobile</Link></li>
                <li><Link href="#" className="block mb-2 hover:text-sky-300">Mail</Link></li>
              </ul>
            </div>
          </div>
          <hr className="my-8 border-sky-700" />
          <div className="text-center">
            <p>&copy; 2024 United for F&A consultants. All rights reserved.</p>
          </div>
        </div>
     </footer>
    );
}