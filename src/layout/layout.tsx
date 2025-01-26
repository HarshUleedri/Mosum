import { PropsWithChildren } from "react";
import Header from "@/components/Header";

const layout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <Header />
      <main className="container min-h-screen px-4 py-8 mx-auto max-w-7xl">
        {children}
      </main>
      <footer className="border-t supports=[backdrop-filter] :bg-background/60 backdrop-blur py-12">
        <div className="container px-4 mx-auto text-center text-gray-400">
          <p>It is made while Learning</p>
        </div>
      </footer>
    </div>
  );
};

export default layout;
