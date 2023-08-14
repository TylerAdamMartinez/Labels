import { Bars3Icon } from "@heroicons/react/24/solid";
import { PrinterIcon, UserCircleIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
    return (
    <div className="flex sticky top-0 w-100 py-2 px-6 bg-slate-700 text-white">
        <Bars3Icon className="h-6 w-6"/>

        <div className="flex">
            <PrinterIcon className="h-6 w-6"/>
            <UserCircleIcon className="h-6 w-6"/>
        </div>
    </div>
    );
}
