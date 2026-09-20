import React from "react";

class UserClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {
        name: "Dummy",
        location: "Default",
      },
    };
  }

  async componentDidMount() {
    const data = await fetch("https://api.github.com/users/gsrcode");
    const json = await data.json();
    this.setState({
      userInfo: json,
    });
  }

  render() {
    const { name, location, avatar_url } = this.state.userInfo;
    return (
      <div className="user-card p-4 m-4 bg-gray-50 rounded-lg border border-gray-200">
        {avatar_url && (
          <img src={avatar_url} alt={name} className="w-24 rounded-full mb-2" />
        )}
        <h2 className="font-bold text-lg">Name: {name}</h2>
        <h3>Location: {location || "India"}</h3>
        <h4>Contact: @gsrcode</h4>
      </div>
    );
  }
}

export default UserClass;
