import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type BannerShape = {
  content: React.ReactNode;
  severity: AlertColor;
  hideIcon?: boolean;
};

type BannerContextType = {
  banner: BannerShape | undefined;
  showBanner: (args: BannerShape) => void;
  hideBanner: () => void;
};

const BannerContext = createContext<BannerContextType | undefined>(undefined);

type BannerProviderProps = {
  children: ReactNode;
  isAuthenticated?: boolean;
};
