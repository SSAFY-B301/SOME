import { userQuery } from "@/pages/api/userApi";

function Profile() {
  const {getUserInfo} = userQuery();

  if (getUserInfo === undefined) {
    return (
      <div
        className="w-6 h-6 bg-gray-400 rounded-full"
      ></div>
    )   
  }
  else{
    return (
      <div
        className="w-6 h-6 bg-center bg-cover rounded-full"
        style={{ backgroundImage: "url(" + getUserInfo.user_img + ")" }}
      ></div>
    );
    
  }
}

export default Profile;
