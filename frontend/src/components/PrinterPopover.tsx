import { Popover, RadioGroup, Transition } from "@headlessui/react";
import { PrinterIcon } from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/24/solid";
import { Fragment, useState } from "react";

/* This is not the interface for a printer */
interface IPlan {
  name: string;
  id: string;
  ram: string;
  cpus: string;
  disk: string;
  isConnected: boolean;
}

/* Will be from db in future */
const plans: Array<IPlan> = [
  {
    name: "Startup",
    id: "2a5f2030-a512-41d5-b6b3-e89886413de7",
    ram: "12GB",
    cpus: "6 CPUs",
    disk: "160 GB SSD disk",
    isConnected: false,
  },
  {
    name: "Business",
    id: "85549159-8675-4284-b09d-06132ce505b8",
    ram: "16GB",
    cpus: "8 CPUs",
    disk: "512 GB SSD disk",
    isConnected: false,
  },
  {
    name: "Enterprise",
    id: "840b8ccb-01dc-4ee4-bd6a-7df7ea490b15",
    ram: "32GB",
    cpus: "12 CPUs",
    disk: "1024 GB SSD disk",
    isConnected: false,
  },
];

export default function PrinterPopover() {
  const printerIdInSessionStorage: string =
    sessionStorage.getItem("printerId") || plans[0].id;
  const preselectedPrinter: IPlan =
    plans.find((plan) => plan.id === printerIdInSessionStorage) || plans[0];

  const [selectedPrinter, setSelectedPrinter] =
    useState<IPlan>(preselectedPrinter);

  const handlePrinterRequestChange = (printer: IPlan): void => {
    sessionStorage.setItem("printerId", printer.id);
    printer.isConnected = Math.floor(Math.random() * 10) % 2 == 0;
    setSelectedPrinter(printer);
    setPrinterConnection(printer.isConnected);
  };

  const [isPrinterConnected, setPrinterConnection] = useState<boolean>(false);

  return (
    <div>
      <Popover as="div">
        <Popover.Button className="flex flex-col items-center justify-center h-100 hover:bg-slate-600 p-2">
          <div className="relative h-12 w-12">
            <PrinterIcon className="h-full w-full" />
            {isPrinterConnected ? (
              <span className="absolute top-2 right-2 block w-4 h-4 transform translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500 border-2 border-slate-50"></span>
            ) : (
              <span className="absolute top-2 right-2 block w-4 h-4 transform translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500 border-2 border-slate-50"></span>
            )}
          </div>
          {isPrinterConnected ? (
            <span className="text-xs uppercase text-center">Connected</span>
          ) : (
            <span className="text-xs uppercase text-center">Disconnected</span>
          )}
        </Popover.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
            <div className="flex px-0 sm:px-2 md:px-4 items-center justify-between">
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-6 text-slate-900">
                Printer Selector
              </h3>
            </div>
            <div className="w-full px-0 sm:px-2 md:px-4 py-4 sm:py-8 md:py-10">
              <div className="mx-auto w-full max-w-lg">
                <RadioGroup
                  value={selectedPrinter}
                  onChange={handlePrinterRequestChange}
                >
                  <RadioGroup.Label className="sr-only">
                    Printers
                  </RadioGroup.Label>
                  <div className="space-y-2">
                    {plans.map((plan) => (
                      <RadioGroup.Option
                        key={plan.name}
                        value={plan}
                        className={({ active, checked }) =>
                          `${
                            active
                              ? "ring-4 ring-white ring-opacity-60 ring-offset-2 ring-offset-emerald-400"
                              : ""
                          }
                  ${
                    checked
                      ? "outline outline-2 outline-emerald-400 bg-emerald-50 text-slate-600"
                      : "bg-white"
                  }
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none hover:bg-emerald-50`
                        }
                      >
                        {({ checked }) => (
                          <>
                            <div className="flex w-full items-center justify-between">
                              <div className="flex items-center">
                                <div className="text-sm">
                                  <RadioGroup.Label
                                    as="p"
                                    className={`${
                                      checked
                                        ? "font-bold text-slate-900"
                                        : "font-medium text-slate-800"
                                    }`}
                                  >
                                    {plan.name}
                                  </RadioGroup.Label>
                                  <RadioGroup.Description
                                    as="span"
                                    className={`inline ${
                                      checked
                                        ? "text-slate-600"
                                        : "text-slate-500"
                                    }`}
                                  >
                                    <span>
                                      {plan.ram}/{plan.cpus}
                                    </span>{" "}
                                    <span aria-hidden="true">&middot;</span>{" "}
                                    <span>{plan.disk}</span>
                                  </RadioGroup.Description>
                                </div>
                              </div>
                              {checked && (
                                <div className="shrink-0">
                                  <CheckIcon className="h-6 sm:h-8 w-6 sm:w-8 text-emerald-400" />
                                </div>
                              )}
                            </div>
                          </>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>
            </div>
            <div className="flex items-center justify-end px-0 sm:px-2 md:px-4">
              <button className="rounded-full bg-slate-700 text-slate-50 py-2 px-4 hover:scale-105 active:scale-95 focus:outline outline-offset-2 outline-4 outline-slate-700">
                Add Printer
              </button>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </div>
  );
}
