const User = ({ name }) => {
  return (
    <div className="user-card p-4 m-4 bg-gray-50 rounded-lg border border-gray-200">
      <h2 className="font-bold text-lg">Name: {name}</h2>
      <h3>Location: Jodhpur</h3>
      <h4>Contact: @gsrcode</h4>
    </div>
  );
};

export default User;
