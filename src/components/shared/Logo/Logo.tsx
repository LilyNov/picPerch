import { LogoProps } from "./logo.types";

export const Logo: React.FC<LogoProps> = ({ imgStyles, textSize }) => {
  return (
    <>
      <img src="/assets/icons/logo.svg" alt="logo" className={imgStyles} />
      <span className={`${textSize}`}>PicPerch</span>
    </>
  );
};
