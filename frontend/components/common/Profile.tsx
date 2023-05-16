import { userQuery } from "@/pages/api/userApi";
import Link from "next/link";

function Profile() {
  const { getUserInfo, userStatus } = userQuery();

  if (userStatus === "success") {
    return (
      <Link href={"/profile"}>
        <div
          className="w-8 h-8 bg-center bg-cover rounded-full"
          style={{ backgroundImage: "url(" + getUserInfo.user_img + ")" }}
        ></div>
      </Link>
    );
  } else {
    return <div className="w-6 h-6 bg-gray-400 rounded-full"></div>;
  }
}

export default Profile;
