import { WalkthroughProject } from "@/types/walkthrough";

type Props = {
  project: WalkthroughProject;
};

const BuyerLost = ({ project }: Props) => {
  const { cost, products, title } = project;

  return (
    <div className="bg-brown opacity-80 flex items-center justify-between gap-x-5 max-w-[300px] rounded-lg py-2 px-1">
      <div>
        <p>{title}</p>
        <p>{cost.toLocaleString()}</p>
      </div>

      <div className="flex gap-x-2">
        {/* Biodiversity */}
        <div className="flex gap-x-1">
          <svg
            width="30"
            height="30"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.7"
              d="M8.81169 7.68831C8.81169 3.71831 12.03 0.5 16 0.5C19.97 0.5 23.1884 3.71832 23.1884 7.68831C23.1884 8.30864 23.6912 8.81169 24.3116 8.81169C28.2817 8.81169 31.5 12.03 31.5 16C31.5 19.97 28.2817 23.1884 24.3116 23.1884C23.6913 23.1884 23.1884 23.6913 23.1884 24.3116C23.1884 28.2817 19.97 31.5 16 31.5C12.03 31.5 8.81169 28.2817 8.81169 24.3116C8.81169 23.6912 8.30864 23.1884 7.68831 23.1884C3.71832 23.1884 0.5 19.97 0.5 16C0.5 12.03 3.71831 8.81169 7.68831 8.81169C8.30873 8.81169 8.81169 8.30873 8.81169 7.68831Z"
              stroke="white"
            />
          </svg>
          <div className="border border-black rounded-full bg-white w-[29px] h-[29px] flex justify-center items-center">
            {products.biodiversity}
          </div>
        </div>

        {/* Nutrients */}
        <div className="flex gap-x-1">
          <svg
            width="22"
            height="32"
            viewBox="0 0 22 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.7"
              d="M3.55382 28.7654L3.5538 28.7654C1.58991 27.0217 0.5 24.6703 0.5 22.2332C0.5 18.4038 2.4831 15.5249 5.04685 11.8362L5.05338 11.8268C6.98602 9.04625 9.20932 5.84757 10.9755 1.52781L10.9998 1.60143L11.0243 1.52726C12.7905 5.8473 15.0139 9.04614 16.9466 11.8268L16.9531 11.8361C19.5168 15.5249 21.5 18.4038 21.5 22.2332C21.5 24.6703 20.4101 27.0217 18.4462 28.7654C16.4949 30.498 13.7822 31.5 11 31.5C8.19741 31.5 5.51957 30.511 3.55382 28.7654Z"
              stroke="white"
            />
          </svg>
          <div className="border border-black rounded-full bg-white w-[29px] h-[29px] flex justify-center items-center">
            {products.nutrients}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerLost;
