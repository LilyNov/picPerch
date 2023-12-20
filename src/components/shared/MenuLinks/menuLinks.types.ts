import { INavLink } from "@/types/types";

export interface MenuLinksProps {
  links: INavLink[];
  pathname: string;
  itemClassName: string;
  linkClassName: string;
  imgWidth: string;
}
