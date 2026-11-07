import { Loader2 } from "lucide-react";

export const SplashScreen = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2">
        <Loader2 className="animate-spin w-10 h-10 text-primary-500" />
      </div>
    </div>
  );
};
