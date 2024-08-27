import {usePathname} from "next/navigation";
import NavigationBar from "../en/NavigationBar";
import NavigationBarAR  from "../ar/NavigationBarAR";

export default function NavigtionWrapper() {
    const pahtname = usePathname();
    const isRTL = pahtname.startsWith('/ar');
    return isRTL ? <NavigationBarAR /> : <NavigationBar />
}