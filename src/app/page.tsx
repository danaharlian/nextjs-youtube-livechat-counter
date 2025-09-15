import { EllipsisVertical } from "lucide-react";

import { InputForm } from "@/components/input-form";

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-4">
      <h1 className="text-center py-4 font-bold text-xl md:text-3xl lg:text-4xl">
        🎮 Youtube LiveChat Counter
      </h1>
      <div className="p-4 md:p-6">
        <InputForm />
      </div>
      <div className="grid p-4 grid-cols-6 lg:grid-cols-7 gap-6">
        <div className="col-span-6 w-full place-content-center-safe min-h-64 lg:min-h-72 md:col-span-3 lg:col-span-2 rounded-lg shadow">
          <div className="font-bold text-center space-y-10 md:space-y-6 lg:space-y-10">
            <h1 className="text-2xl md:text-3xl uppercase">RRQ</h1>
            <div className="text-6xl md:text-7xl tracking-tighter">50</div>
            <p className="font-medium text-sm md:text-base">50 Percentage</p>
          </div>
        </div>
        <div className="col-span-6 w-full place-content-center-safe min-h-64 lg:min-h-72 md:col-span-3 lg:col-span-2 rounded-lg shadow">
          <div className="font-bold text-center space-y-10 md:space-y-6 lg:space-y-10">
            <h1 className="text-2xl md:text-3xl uppercase">ONIC</h1>
            <div className="text-6xl md:text-7xl tracking-tighter">50</div>
            <p className="font-medium text-sm md:text-base">50 Percentage</p>
          </div>
        </div>
        <div className="col-span-6 w-full min-h-64 lg:min-h-72 lg:col-span-3 rounded-lg shadow">
          <div className="p-4 flex items-center justify-between border-b border-b-gray-100">
            <p>Chat</p>
            <EllipsisVertical className="text-gray-400 size-5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
