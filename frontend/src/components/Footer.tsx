

export default function Footer(){
    return (
        <footer className="bg-gray-800 text-white px-4 py-8  bottom-0">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="font-semibold mb-4">About Us</h2>
            <ul>
              <li><a href="#" className="block mb-2 hover:text-gray-300">Our Story</a></li>
              <li><a href="#" className="block mb-2 hover:text-gray-300">Team</a></li>
              <li><a href="#" className="block mb-2 hover:text-gray-300">Careers</a></li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold mb-4">Support</h2>
            <ul>
              <li><a href="#" className="block mb-2 hover:text-gray-300">Help Center</a></li>
              <li><a href="#" className="block mb-2 hover:text-gray-300">Contact Us</a></li>
              <li><a href="#" className="block mb-2 hover:text-gray-300">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold mb-4">Follow Us</h2>
            <ul>
              <li><a href="#" className="block mb-2 hover:text-gray-300">Facebook</a></li>
              <li><a href="#" className="block mb-2 hover:text-gray-300">Twitter</a></li>
              <li><a href="#" className="block mb-2 hover:text-gray-300">Instagram</a></li>
            </ul>
          </div>
        </div>
        <hr className="my-8 border-gray-700" />
        <div className="text-center">
          <p>&copy; 2024 Your Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
    );
}