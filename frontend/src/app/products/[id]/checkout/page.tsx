import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";
import Checkout from "@/components/Checkout";
export default function CheckoutPage() {
    return (
        <div>
            <NavigationBar />
            <BackButton text={'Go Back'} link={'/products'}/>
            <div className="container mx-auto py-8">
                <Checkout />
            </div>
            <Footer />
        </div>
    );
}