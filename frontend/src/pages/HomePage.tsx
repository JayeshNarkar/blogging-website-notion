import CustomSidebar from "@/components/ui/custom-sidebar";
import HomepageInputSection from "@/components/ui/homepage-input-section";

const HomePage = () => {
  return (
    <div className="grid grid-cols-8">
      <div className="col-span-3 lg:col-span-2 border-r-2 border-primary lg:min-h-[90vh] min-h-screen">
        <CustomSidebar />
      </div>
      <div className="col-span-5 lg:col-span-6">
        <HomepageInputSection />
      </div>
    </div>
  );
};

export default HomePage;
