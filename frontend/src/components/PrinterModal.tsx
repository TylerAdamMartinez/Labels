import { Dialog, RadioGroup, Transition } from "@headlessui/react";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";
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

export default function PrinterModal({
  isOpen,
  closeModal,
  connectionStateTranmitter,
}: {
  isOpen: boolean;
  closeModal: () => void;
  connectionStateTranmitter: (connectionState: boolean) => void;
}) {
  const printerIdInSessionStorage: string =
    sessionStorage.getItem("printerId") || plans[0].id;
  const preselectedPrinter: IPlan =
    plans.find((plan) => plan.id === printerIdInSessionStorage) || plans[0];

  const [selectedPrinter, setSelectedPrinter] = useState<IPlan>(
    preselectedPrinter,
  );

  const handlePrinterRequestChange = (printer: IPlan): void => {
    sessionStorage.setItem("printerId", printer.id);
    printer.isConnected = Math.floor(Math.random() * 10) % 2 == 0;
    connectionStateTranmitter(printer.isConnected);
    setSelectedPrinter(printer);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex px-0 sm:px-2 md:px-4 items-center justify-between">
                  <Dialog.Title
                    as="h3"
                    className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-6 text-slate-900"
                  >
                    Printer Selector
                  </Dialog.Title>
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-full border border-transparent p-2 text-sm font-medium text-slate-900 hover:bg-red-50 hover:text-red-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                    onClick={closeModal}
                  >
                    <XMarkIcon className="h-6 sm:h-8 md:h-10 w-6 sm:w-8 md:w-10" />
                  </button>
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
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none hover:bg-emerald-50`}
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
                                        <span aria-hidden="true">&middot;</span>
                                        {" "}
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
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
