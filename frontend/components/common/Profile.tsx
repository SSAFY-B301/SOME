interface ProfileType {
  img: string;
}

function Profile({ img }: ProfileType) {
  return (
    <div
      className="w-6 h-6 rounded-full bg-center bg-cover"
      style={{ backgroundImage: "url(" + img + ")" }}
    ></div>
  );
}

export default Profile;
