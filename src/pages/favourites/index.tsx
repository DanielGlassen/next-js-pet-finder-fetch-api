import React from "react";
import { NextPage } from "next";
import Container from "../../components/container/container";
import ContainerHeader from "../../components/containerHeader/containerHeader";
import { useAppSelector } from "../../hooks/redux";
import UserLogItem from "../../components/userLog/userLogItem";

const Favourites: NextPage = () => {
  const { favourites } = useAppSelector((state) => state.votes);

  return (
    <Container>
      <ContainerHeader title="Favourites" />
      {favourites.length ? (
        <div className="overflow-x-auto">
          <table className="min-w-full rounded-lg shadow-md bg-white dark:bg-black-soft">
            <thead>
              <tr className="bg-gray-100 dark:bg-black-light text-gray-600 dark:text-gray-300 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Image</th>
                <th className="py-3 px-6 text-left">ID</th>
                <th className="py-3 px-6 text-left">Age</th>
                <th className="py-3 px-6 text-left">Breed</th>
                <th className="py-3 px-6 text-left">Zip</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 dark:text-white text-sm font-light">
              {favourites.map((item) => (
                <tr key={item.id} className="border-b border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-black-light">
                  <td className="py-3 px-6 text-left">
                    <img src={item.img} alt={item.name} className="w-16 h-16 object-cover rounded-full" />
                  </td>
                  <td className="py-3 px-6 text-left">{item.id}</td>
                  <td className="py-3 px-6 text-left">{item.age}</td>
                  <td className="py-3 px-6 text-left">{item.breed}</td>
                  <td className="py-3 px-6 text-left">{item.zip_code}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <UserLogItem text="No item found" />
      )}
    </Container>
  );
};

export default Favourites;
