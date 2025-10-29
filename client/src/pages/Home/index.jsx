import React, { useEffect } from "react";
import { GetCurrentUser } from "../../api/users";

const Home = () => {
  useEffect(() => {
    console.log("Home Effect");
    const fetchUser = async () => {
      const response = await GetCurrentUser();
      console.log(response);
    };
    fetchUser();
  });
  return <div>Home</div>;
};

export default Home;
