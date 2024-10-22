import React, { ComponentPropsWithoutRef, FC, useState } from "react";
import classes from "./nav.module.scss";
import Link from "next/link";
import Image from "next/image";
import Button from "../ui/button/button";
import getActive from "../../utils/getActive";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { closeDrawer } from "../../store/reducers/drawerSlice";
import Snackbar from "../ui/snackbar/snackbar";

interface NavProps extends ComponentPropsWithoutRef<"nav"> {
	text?: string;
}

const Nav: FC<NavProps> = ({ text, ...props }) => {
	const dispatch = useAppDispatch();
	const user = useAppSelector((state) => state.userAuth.user);
	const [snackbarOpen, setSnackbarOpen] = useState(false);

	const navClasses = classNames({
		[classes.nav]: true,
		[props.className as string]: true,
	});
	delete props.className;

	const handleClick = (e: React.MouseEvent, path: string) => {
		if (!user) {
			e.preventDefault();
			setSnackbarOpen(true);
			setTimeout(() => setSnackbarOpen(false), 3000);
		} else {
			dispatch(closeDrawer());
		}
	};

	return (
		<nav className={navClasses} {...props}>
			<h3 className={classes.nav__text}>{text}</h3>

			<div className={classes.nav__container}>
				<Link href="/match" className={`${classes.nav__item} ${getActive(classes.nav__item__active, "/match")}`} onClick={(e) => handleClick(e, "/match")}>
					<div className={`${classes.nav__item__image} bg-purple`}>
						<Image
							src="/images/vote-table.svg"
							alt="match"
							width={100}
							height={125}
						/>
					</div>
					<Button fullWidth component="div" className={classes.nav__item__button} variant="default">
						match
					</Button>
				</Link>
				<Link href="/breeds" className={`${classes.nav__item} ${getActive(classes.nav__item__active, "/breeds")}`} onClick={(e) => handleClick(e, "/breeds")}>
					<div className={`${classes.nav__item__image} bg-success`}>
						<Image
							src="/images/pet-breeds.webp"
							alt="breeds"
							width={117}
							height={163}
						/>
					</div>
					<Button fullWidth component="div" className={classes.nav__item__button} variant="default">
						breeds
					</Button>
				</Link>
				<Link href="/location" className={`${classes.nav__item} ${getActive(classes.nav__item__active, "/location")}`} onClick={(e) => handleClick(e, "/location")}>
					<div className={`${classes.nav__item__image} bg-warning`}>
						<Image
							src="/images/images-search.svg"
							alt="location"
							width={112}
							height={190}
						/>
					</div>
					<Button fullWidth component="div" className={classes.nav__item__button} variant="default">
						location
					</Button>
				</Link>
			</div>

			<Snackbar 
				message="Please login first" 
				isOpen={snackbarOpen} 
				onClose={() => setSnackbarOpen(false)} 
			/>
		</nav>
	);
};

export default Nav;
