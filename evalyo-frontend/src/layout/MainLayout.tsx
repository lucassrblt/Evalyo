import { Sidebar } from "../components/partial/Sidebar";

const MainLayout = ({ children }) => {
  return (
    // <div className="flex w-full h-screen items-end">
    //   <Sidebar />
    //   <div className="flex border border-gray-300 rounded-tl-2xl h-[calc(100%-10px)] w-[calc(100%-224px)] bg-[#1E1E1E] ml-[224px] overflow-x-hidden">
    //     {children}
    //   </div>
    // </div>
    <div className="flex w-full h-screen items-end bg-[#fafafa]">
      {children}
    </div>
  );
};

export default MainLayout;
