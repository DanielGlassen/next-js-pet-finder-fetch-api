import type { NextPage } from "next";
import React from "react";
import Nav from "../components/nav/nav";

const Home: NextPage = () => {
  
	return (
		<div className="flex items-center justify-center h-full w-full bg-primary-soft rounded-[20px] dark:bg-black-soft overflow-hidden">
			<Nav text="Lets start using The Fetch API" />
		</div>
	);
  };
  
  export default Home;
  
  