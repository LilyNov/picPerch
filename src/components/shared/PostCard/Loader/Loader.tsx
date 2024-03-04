import { LoaderProps } from "./Loader.types";

export const Loader: React.FC<LoaderProps> = ({ invertWhite = false }) => {
  const iconColor = invertWhite ? "invert - white" : "";

  return (
    <div className="flex-center w-full">
      <img
        src="/assets/icons/loader.svg"
        alt="loader"
        width={20}
        height={20}
        className={`${iconColor}`}
      />
    </div>
  );
};
