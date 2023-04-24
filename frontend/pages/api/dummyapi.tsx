interface CurrentAlbumsType {
  data: CurrentAlbumType[];
}

interface CurrentAlbumType {
  id: number;
  img: string;
  name: string;
  count: number;
}

const currentAlbumsApi: CurrentAlbumsType = {
  data: [
    {
      id: 1,
      img: "https://images.unsplash.com/photo-1679679008383-6f778fe07828?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxzZWFyY2h8MXx8cGVvcGxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60",
      name: "앨범 이름",
      count: 3,
    },
    {
      id: 2,
      img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGVvcGxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60",
      name: "앨범 이름",
      count: 10,
    },
    {
      id: 3,
      img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cGVvcGxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60",
      name: "앨범 이름",
      count: 6,
    },
    {
      id: 4,
      img: "https://images.unsplash.com/photo-1488161628813-04466f872be2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHBlb3BsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60",
      name: "앨범 이름",
      count: 15,
    },
    {
      id: 5,
      img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fHBlb3BsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60",
      name: "앨범 이름",
      count: 20,
    },
  ],
};

interface FavoriteAlbumsType {
  data: FavoriteAlbumType[];
}

interface FavoriteAlbumType {
  id: number;
  img: string;
  name: string;
  createdTime: string;
  isLike: boolean;
}
const favoriteAlbumsApi: FavoriteAlbumsType = {
  data: [
    {
      id: 1,
      img: "https://images.unsplash.com/photo-1679679008383-6f778fe07828?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxzZWFyY2h8MXx8cGVvcGxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60",
      name: "가평 여행",
      createdTime: "2023.04.17",
      isLike: true,
    },
    {
      id: 2,
      img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGVvcGxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60",
      name: "앨범 이름",
      createdTime: "2023.04.17",
      isLike: true,
    },
    {
      id: 3,
      img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cGVvcGxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60",
      name: "앨범 이름",
      createdTime: "2023.04.17",
      isLike: true,
    },
    {
      id: 4,
      img: "https://images.unsplash.com/photo-1488161628813-04466f872be2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHBlb3BsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60",
      name: "앨범 이름",
      createdTime: "2023.04.17",
      isLike: true,
    },
    {
      id: 5,
      img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fHBlb3BsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60",
      name: "앨범 이름",
      createdTime: "2023.04.17",
      isLike: true,
    },
  ],
};

interface TotalAlbumsType {
  data: TotalAlbumType[];
}

interface TotalAlbumType {
  id: number;
  img: string;
  name: string;
  createdTime: string;
  isLike: boolean;
}

const totalAlbumsApi: TotalAlbumsType = {
  data: [
    {
      id: 1,
      img: "https://images.unsplash.com/photo-1679679008383-6f778fe07828?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxzZWFyY2h8MXx8cGVvcGxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60",
      name: "가평 여행",
      createdTime: "2023.04.17",
      isLike: true,
    },
    {
      id: 2,
      img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGVvcGxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60",
      name: "앨범 이름",
      createdTime: "2023.04.17",
      isLike: true,
    },
    {
      id: 3,
      img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cGVvcGxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60",
      name: "앨범 이름",
      createdTime: "2023.04.17",
      isLike: false,
    },
    {
      id: 4,
      img: "https://images.unsplash.com/photo-1488161628813-04466f872be2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHBlb3BsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60",
      name: "앨범 이름",
      createdTime: "2023.04.17",
      isLike: true,
    },
    {
      id: 5,
      img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fHBlb3BsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60",
      name: "앨범 이름",
      createdTime: "2023.04.17",
      isLike: false,
    },
    {
      id: 6,
      img: "https://images.unsplash.com/photo-1589156288859-f0cb0d82b065?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjF8fHBlb3BsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
      name: "앨범 이름",
      createdTime: "2023.04.17",
      isLike: false,
    },
    {
      id: 7,
      img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fHBlb3BsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60",
      name: "앨범 이름",
      createdTime: "2023.04.17",
      isLike: false,
    },
    {
      id: 8,
      img: "https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cGhvdG98ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
      name: "앨범 이름",
      createdTime: "2023.04.17",
      isLike: false,
    },
    {
      id: 9,
      img: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8Z3JvdXB8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
      name: "앨범 이름",
      createdTime: "2023.04.17",
      isLike: false,
    },
    {
      id: 10,
      img: "https://images.unsplash.com/photo-1531844251246-9a1bfaae09fc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGdyb3VwfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      name: "앨범 이름",
      createdTime: "2023.04.17",
      isLike: false,
    },
  ],
};

export { currentAlbumsApi, favoriteAlbumsApi, totalAlbumsApi };
