import User from "../../components/User/User";
import UserClass from "../../components/UserClass/UserClass";

const About = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">About Us</h1>
      <p className="text-gray-600 mb-6">
        Welcome to Swaad - your destination for fresh and delicious meals delivered directly to your doorstep.
      </p>
      <div className="flex gap-4">
        <User name="Akshay Saini (Function)" />
        <UserClass name="Akshay Saini (Class)" />
      </div>
    </div>
  );
};

export default About;
