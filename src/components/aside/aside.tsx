import React, { ComponentPropsWithoutRef, FC } from "react";
import Logo from "../logo";
import DarkModeSwitcher from "../darkModeSwitcher/darkModeSwitcher";
import LoginForm from "../../components/myAccount/LoginForm";
import classNames from "classnames";

interface AsideProps extends ComponentPropsWithoutRef<"aside"> {}

const Aside: FC<AsideProps> = ({ ...props }) => {
	const asideClasses = classNames({
		"h-full m-auto sm:w-full": true,
		[props.className as string]: true,
	});

	delete props.className;

	return (
		<aside className={asideClasses} {...props}>
			<div className="w-full flex justify-between">
				<Logo />
				<DarkModeSwitcher />
			</div>

			<div className="mt-[80px] mb-[60px]">
				<h2 className="font-medium text-[44px] leading-[58px]">
					Hello!
				</h2>
				<h2 className="text-gray-dark text-[20px]">
					Explore dogs and have fun
				</h2>
			</div>
			<LoginForm />
		</aside>
	);
};

export default Aside;
