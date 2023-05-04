import { userQuery } from "@/pages/api/userApi";

function Profile() {
  const {getUserInfo} = userQuery();

  if (getUserInfo === undefined) {
    return (
      <div
        className="w-6 h-6 rounded-full bg-gray-400"
      ></div>
    )   
  }
  else{
    return (
      <div
        className="w-6 h-6 rounded-full bg-center bg-cover"
        style={{ backgroundImage: "url(" + getUserInfo.user_img + ")" }}
      ></div>
    );
    
  }
}

export default Profile;
