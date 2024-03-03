import { Button } from "@/components/ui/button";
import { isAuthenticatedAtom } from "@/state/atoms";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

const LandingPage = () => {
  const isAuthenticated = useRecoilValue(isAuthenticatedAtom);
  const navigate = useNavigate();

  const handleGettingStarted = () => {
    if (isAuthenticated) navigate("/home");
    else navigate("/signup");
  };

  return (
    <div className="content-center justify-center m-3 text-center">
      <div className="p-3">
        <h1 className="font-bold text-3xl">Welcome to Medium</h1>
        <p className="text-xl font-semibold m-3">
          Medium is a note-taking app with responsive and easy to use
          User-Interface.
        </p>
        <Button
          variant={"secondary"}
          className="text-xl border-2 border-primary font-bold"
          onClick={handleGettingStarted}
        >
          Get Started!
        </Button>
      </div>
      <div className="grid grid-cols-6 lg:grid-cols-10">
        <div className="p-6 m-3 rounded-lg shadow-md border-primary border-2 col-span-3 md:col-span-2">
          <h2 className="md:text-xl font-semibold mb-2">
            Your thoughts, organized.
          </h2>
          <hr className="border-2 border-primary m-2" />
          <p className="opacity-35">
            Medium is the ultimate note-taking app designed to help you capture
            ideas, organize thoughts, and stay productive at all times.
          </p>
        </div>
        <div className="p-6 m-3 rounded-lg shadow-md border-primary border-2 col-span-3 md:col-span-2">
          <h2 className="md:text-xl font-semibold mb-2">Capture Anything</h2>
          <hr className="border-2 border-primary m-2" />
          <p className="opacity-35">
            Jot down quick notes or create longer, comprehensive notes with
            checklists, and links.
          </p>
        </div>
        <div className="p-6 m-3 rounded-lg shadow-md border-primary border-2 col-span-3 md:col-span-2">
          <h2 className="md:text-xl font-semibold mb-2">Organize Your Way </h2>
          <hr className="border-2 border-primary m-2" />
          <p className="opacity-35">
            Create notebooks and tags to organize your notes your way. Use our
            powerful search to find what you're looking for, no matter when you
            wrote it.
          </p>
        </div>
        <div className="p-6 m-3 rounded-lg shadow-md border-primary border-2 col-span-3 md:col-span-2">
          <h2 className="md:text-xl font-semibold mb-2">
            Always at Your Fingertips
          </h2>
          <hr className="border-2 border-primary m-2" />
          <p className="opacity-35">
            Sync your notes across all your devices so you can access them
            anytime, anywhere. Whether you're at home, at work, or on the go,
            your notes are available to you.
          </p>
        </div>
        <div className="p-6 m-3 rounded-lg shadow-md border-primary border-2 col-span-3 md:col-span-2">
          <h2 className="md:text-xl font-semibold mb-2">Secure and Reliable</h2>
          <hr className="border-2 border-primary m-2" />
          <p className="opacity-35">
            Your notes are private to you and are securely stored in the cloud.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
