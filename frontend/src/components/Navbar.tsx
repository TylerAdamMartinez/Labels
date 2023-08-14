import { useState } from "react";
import { Switch } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { MapPinIcon, PrinterIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import PrinterModal from "./PrinterModal";

export default function Navbar({ catagory }: { catagory: string | undefined }) {
  const isEnabled: boolean = sessionStorage.getItem("isBulkPrint") === "true";
  const [enabled, setEnabled] = useState<boolean>(isEnabled);

  const handleBulkPrintRequestChange = (checked: boolean) => {
    setEnabled(checked);
    sessionStorage.setItem("isBulkPrint", checked.toString());
  };

  let [isPrinterModalOpen, setIsPrinterModalOpen] = useState(false);

  function closePrinterModal() {
    setIsPrinterModalOpen(false);
  }

  function openPrinterModal() {
    setIsPrinterModalOpen(true);
  }

  return (
    <div className="grid grid-cols-1 grid-rows-auto">
      <div className="grid grid-cols-3 grid-rows-1 sticky top-0 w-100 px-2 sm:px-4 md:px-8 bg-slate-700 text-white">
        <div className="flex items-center justify-start gap-x-1 sm:gap-x-2 md:gap-x-4">
          <button className="h-100 hover:bg-slate-600 p-4">
            <Bars3Icon className="h-12 w-12" />
          </button>
          <div className="hidden md:flex gap-x-2 items-center justify-center">
            <label className="text-center">Bulk Print</label>
            <Switch
              checked={enabled}
              onChange={handleBulkPrintRequestChange}
              className={`${enabled ? "bg-emerald-400" : "bg-slate-900"}
          relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <span className="sr-only">Bulk Print Toggle</span>
              <span
                aria-hidden="true"
                className={`${enabled ? "translate-x-9" : "translate-x-0"}
            pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
              />
            </Switch>
          </div>
        </div>
        <div className="flex items-center justify-center">
          {catagory != undefined ? (
            <h1 className="hidden sm:visible sm:text-2xl md:text-3xl font-bold select-none">
              {catagory}
            </h1>
          ) : null}
        </div>
        <div className="flex items-center justify-end gap-x-1 sm:gap-x-2 md:gap-x-4">
          <button
            className="h-100 hover:bg-slate-600 p-4"
            onClick={openPrinterModal}
          >
            <PrinterIcon className="h-12 w-12" />
          </button>
          <button
            className="h-100 hover:bg-slate-600 p-4"
            onClick={openPrinterModal}
          >
            <MapPinIcon className="h-12 w-12" />
          </button>
          <button className="h-100 hover:bg-slate-600 p-4">
            <UserCircleIcon className="h-12 w-12" />
          </button>
        </div>
      </div>
      <PrinterModal
        isOpen={isPrinterModalOpen}
        closeModal={closePrinterModal}
      />
      {catagory != undefined ? (
        <div className="bg-slate-900 md:hidden py-1">
          <h1 className="text-white text-center text-3xl font-bold select-none">
            {catagory}
          </h1>
        </div>
      ) : null}
    </div>
  );
}
