import { useEffect, useState, ComponentType } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { clearCredentials } from "@/redux/slices/auth.slice";
import SpinnerFullScreen from "../SpinnerFullscreen";

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const Wrapper = (props: P) => {
    const [loading, setLoading] = useState(true);
    const { userInfo } = useSelector((state: RootState) => state.auth);
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
      const checkUser = async () => {

        if (!userInfo?.verified) {
          dispatch(clearCredentials())
          router.replace("/login");
          // return `null` to prevent the current component from being rendered. This ensures that no part
          // of the protected content is visible to the user during the redirection process. This is particularly
          // important to avoid any flickering or partial display of the content meant for authenticated users only.
          return null;
        } else {
          setLoading(false);
        }
      };

      checkUser();
    }, [dispatch, router, userInfo?.verified]);

    if (loading) {
      return <SpinnerFullScreen />;
    }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;