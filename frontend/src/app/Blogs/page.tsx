import {useState,useEffect} from 'react';
import {Blog} from '@/components/BlogTableColumns';
import NavigationBar from '@/components/NavigationBar';
import Footer from '@/components/Footer';
const Blogs = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        // Fetch blogs when component mounts
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        // Fetch blogs from an API endpoint
        try {
            const response = await fetch('/api/blogs'); // Example API endpoint
            if (response.ok) {
                const data = await response.json();
                setBlogs(data);
            } else {
                throw new Error('Failed to fetch blogs');
            }
        } catch (error) {
            console.error('Error fetching blogs:', error);
        }
    };
    return (
        <>
        <NavigationBar />
        <div className="container mx-auto py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map((blog) => (
                    <div key={blog.name} className="p-4 border rounded cursor-pointer transition duration-300 ease-in-out transform hover:scale-105">
                        {/* Render blog card */}
                        <h2 className="text-xl font-bold">{blog.author}</h2>
                        <p className="text-gray-600">{blog.description}</p>
                        {/* Add more blog details as needed */}
                    </div>
                ))}
            </div>
        </div>
        <Footer />
        </>
    );
}