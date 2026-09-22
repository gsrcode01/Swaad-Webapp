import React from "react";
import { UserIcon } from "../common/Icons/Icons";

class UserClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {
        name: "Girdhar",
        location: "India",
        bio: "Full Stack Software Engineer",
      },
    };
  }

  async componentDidMount() {
    try {
      const data = await fetch("https://api.github.com/users/gsrcode");
      if (data.ok) {
        const json = await data.json();
        this.setState({
          userInfo: json,
        });
      }
    } catch (err) {
      console.warn("GitHub profile fetch fallback:", err);
    }
  }

  render() {
    const { name, location, avatar_url, bio } = this.state.userInfo;
    return (
      <div className="p-6 bg-white rounded-3xl border border-[#E8E5E1] shadow-xs hover:border-[#FF5A36]/40 hover:shadow-md transition-all">
        {avatar_url ? (
          <img src={avatar_url} alt={name || "Girdhar"} className="w-12 h-12 rounded-2xl mb-4 border border-[#E8E5E1] shadow-xs object-cover" />
        ) : (
          <div className="w-12 h-12 rounded-2xl bg-[#FFF8F1] border border-[#FF5A36]/20 text-[#FF5A36] flex items-center justify-center mb-4 shadow-xs">
            <UserIcon className="w-6 h-6" />
          </div>
        )}
        <h3 className="font-headline text-lg text-[#172B4D] mb-1">{name || this.props.name}</h3>
        <p className="text-xs font-subhead text-[#16A36A] mb-2 font-semibold">Backend Normalizer & State Management</p>
        <div className="space-y-1 text-xs text-[#667085] font-body pt-2 border-t border-[#E8E5E1]">
          <p>Location: {location || "Bengaluru / Jodhpur, India"}</p>
          <p>GitHub: <a href="https://github.com/gsrcode" target="_blank" rel="noreferrer" className="text-[#FF5A36] font-subhead hover:underline">@gsrcode</a></p>
        </div>
      </div>
    );
  }
}

export default UserClass;
