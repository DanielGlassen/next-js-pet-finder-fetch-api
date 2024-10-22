import React, { FC, ReactNode, useEffect } from "react";
import dynamic from "next/dynamic";
import useMediaQuery from "../../hooks/useMediaQuery";
import { useRouter } from "next/router";
import Header from "../header/header";
import { generateId } from "../../store/reducers/idSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { logout } from "../../store/reducers/userAuthSlice";
import { logoutUser } from "../../service/account.service";
import Logo from "../logo";
import DarkModeSwitcher from "../darkModeSwitcher/darkModeSwitcher";

interface LayoutProps {
  children: ReactNode;
}

const DynamicAside = dynamic(() => import("../aside/aside"));

const Layout: FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const xl = useMediaQuery("(min-width: 1200px)");
  const user = useAppSelector((state) => state.userAuth.user);

  useEffect(() => {
    dispatch(generateId());
  }, [dispatch]);

  const handleLogout = async () => {
    try {
      await logoutUser();
      dispatch(logout());
      router.push('/');
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <div className="h-full flex w-full">
      {xl && !user && <DynamicAside />}
      <div className={`h-full ${user ? 'w-full' : 'w-2/4'} ml-auto flex flex-col xl:w-full`}>
       
        {user && (
          <div className="w-full flex justify-between items-center">
            <div className="flex items-center">
            <Logo />&nbsp;
            </div>
            <DarkModeSwitcher />
			<div className="flex items-center">
              <span className="text-sm mr-2">{user.email}</span>
              <button onClick={handleLogout} className="bg-primary-soft text-sm text-white p-2 rounded">
                Logout
              </button>
            </div>
          </div>
        )}
		 {router.pathname !== "/" && <Header />}
        {children}
      </div>
    </div>
  );
};

export default Layout;
