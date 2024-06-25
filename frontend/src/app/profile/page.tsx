import NavigationBar from "@/components/NavigationBar";

export default function Profile() {
    return (
        <div>
            <NavigationBar />
            <div className="container mx-auto py-10">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center space-x-4">
                    <div>
                    <h2 className="text-2xl font-bold">John Doe</h2>
                    <p className="text-gray-600">Financial and HR Consultant</p>
                    </div>
                </div>
                <div className="mt-6">
                    <h3 className="text-xl font-semibold">About Me</h3>
                    <p className="text-gray-700 mt-2">
                    Experienced consultant with a demonstrated history of working in the financial services industry. Skilled in HR Consulting, Financial Analysis, and Business Development.
                    </p>
                </div>
                <div className="mt-6">
                    <h3 className="text-xl font-semibold">My Services</h3>
                    <ul className="list-disc list-inside mt-2 text-gray-700">
                    <li>Financial Consulting</li>
                    <li>HR Consulting</li>
                    <li>Business Strategy</li>
                    <li>Market Analysis</li>
                    </ul>
                </div>
                </div>
            </div>
        </div>
    );
}