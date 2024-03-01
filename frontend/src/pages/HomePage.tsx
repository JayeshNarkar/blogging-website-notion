import CustomSidebar from "@/components/ui/custom-sidebar";

const HomePage = () => {
  return (
    <div className="grid grid-cols-8">
      <div className="col-span-2 border-r-2 border-primary min-h-[90vh] lg:col-span-1">
        <CustomSidebar />
      </div>
      <div className="col-span-6 lg:col-span-7">
        <p>Insert text field here</p>
      </div>
    </div>
  );
};

export default HomePage;
