import { FooterDownLoadApp } from "./DownloadApp/FooterDownLoadApp";
import { FooterSendEmail } from "./EmailSend/FooterSendEmail";

export const FooterPrime = () => {
  return (
    <div className="bg-[#313133] mt-10 shadow-lg py-6 text-white w-full flex flex-col sm:flex-row justify-between items-start gap-6 sm:gap-10 px-6 sm:px-16">
      <div className="flex-shrink-0">
        <h1 className="text-white text-2xl font-bold cursor-pointer">
          Platform
        </h1>
      </div>
      <FooterSendEmail />
      <FooterDownLoadApp />
    </div>
  );
};
