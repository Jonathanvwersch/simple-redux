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

export const BannerProvider = ({
  children,
  isAuthenticated,
}: BannerProviderProps) => {
  const pathname = usePathname();

  const initialValue: BannerShape = {
    content: (
      <Typography>
        <b>Welcome to Limberr</b>: Your home for playable fitness content. We
        are looking for fitness content creators to start producing content.{" "}
        <Link
          style={{ textDecoration: "underline", color: "white" }}
          href="/creators"
        >
          Learn more
        </Link>
        .
      </Typography>
    ),
    severity: "info" as AlertColor,
    hideIcon: true,
  };

  const [banner, setBanner] = useState<BannerShape | undefined>(
    !isAuthenticated && pathname === "/" ? initialValue : undefined
  );

  useEffect(() => {
    if (pathname !== "/") {
      setBanner(undefined);
    }
  }, [pathname]);

  const showBanner = React.useCallback((args: BannerShape) => {
    setBanner(args);
  }, []);

  const hideBanner = React.useCallback(() => {
    setBanner(undefined);
  }, []);

  const contextValue: BannerContextType = {
    banner,
    showBanner,
    hideBanner,
  };

  return (
    <BannerContext.Provider value={contextValue}>
      {children}
    </BannerContext.Provider>
  );
};
