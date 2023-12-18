import { useMediaQuery } from "react-responsive";

export const useDesktopXXXLMediaQuery = () => {
  return useMediaQuery({ query: "(min-width: 1280px)" });
};

export const useDesktopXXLMediaQuery = () => {
  return useMediaQuery({ query: "(max-width: 1300px)" });
};

export const useDesktopXLMediaQuery = () => {
  return useMediaQuery({ query: "(max-width: 1200px)" });
};

export const useDesktopMediaQuery = () => {
  return useMediaQuery({ query: "(min-width: 993px)" });
};

export const useTabletMediaQuery = () => {
  return useMediaQuery({ query: "(max-width: 992px)" });
};

export const useMobileMediaQuery = () => {
  return useMediaQuery({ query: "(max-width: 792px)" });
};

export const useMobileSMMediaQuery = () => {
  return useMediaQuery({ query: "(max-width: 480px)" });
};
