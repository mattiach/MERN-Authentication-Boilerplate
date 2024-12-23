import { useEffect, useState, ComponentType } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import SpinnerFullScreen from "../SpinnerFullscreen";

const withNoAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const Wrapper = (props: P) => {
    const router = useRouter();
    const { userInfo } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const checkUser = async () => {
        // if user is logged in, redirect to home page
        if (userInfo && userInfo.verified) {
          router.push("/");
        } else {
          setLoading(false);
        }
      };

      checkUser();
    }, [dispatch, router, userInfo]);

    if (loading) {
      return <SpinnerFullScreen />;
    }

    return <WrappedComponent {...props} />;
  };

  if (typeof window === 'undefined') {
    return () => null;
  }

  return Wrapper;
};

export default withNoAuth;
