import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { CheckCircle } from 'lucide-react';
import Button from './Button';
import { useRouter } from 'next/navigation';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  phoneNumber: string;
  loanAmount: number;
}

export default function SuccessModal({ isOpen, onClose, phoneNumber, loanAmount }: SuccessModalProps) {
  const router = useRouter();

  const handleClose = () => {
    onClose();
    router.push('/');
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
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
                <div className="flex flex-col items-center">
                  <CheckCircle className="h-16 w-16 text-kenya-green mb-4" />
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    Application Received!
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 text-center">
                      You will receive <span className="font-bold">KSH {loanAmount.toLocaleString()}</span> in your M-PESA number{' '}
                      <span className="font-semibold">{phoneNumber}</span> shortly.
                    </p>
                  </div>

                  <div className="mt-6">
                    <Button onClick={handleClose}>Apply Again</Button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
