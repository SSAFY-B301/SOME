interface AlbumInfoType {
  data: {
    id: number;
    name: string;
    members: MemberType[];
    categories: number[];
    totalId: number[];
    total: number;
    isLike: boolean;
    createdTime: string;
  };
}

interface MemberType {
  id: number;
  name: string;
  img: string;
}

const albumInfo: AlbumInfoType = {
  data: {
    id: 1,
    name: "OO앨범",
    members: [
      {
        id: 1,
        name: "김싸피",
        img: "https://plus.unsplash.com/premium_photo-1671581559476-10b8a92ffb77?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fHByb2ZpbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
      },
      {
        id: 2,
        name: "이싸피",
        img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjJ8fHByb2ZpbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
      },
      {
        id: 3,
        name: "박싸피",
        img: "https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDV8fHByb2ZpbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
      },
      {
        id: 4,
        name: " 최싸피",
        img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTZ8fHByb2ZpbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
      },
    ],
    categories: [1, 2, 3, 4, 5],
    totalId: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    total: 10,
    isLike: true,
    createdTime: "2023.04.17",
  },
};

interface PhotosType {
  data: PhotoType[];
}

interface PhotoType {
  id: number;
  img: string;
  user: number;
  category: number;
  createdTime: string;
}

const photos: PhotosType = {
  data: [
    {
      id: 1,
      img: "https://images.unsplash.com/photo-1593104547489-5cfb3839a3b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjZ8fCVFQyU4MiVBQyVFQiU5RSU4Q3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
      user: 1,
      category: 3,
      createdTime: "2023.04.17",
    },
    {
      id: 2,
      img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDJ8fCVFQyU4MiVBQyVFQiU5RSU4Q3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
      user: 1,
      category: 3,
      createdTime: "2023.04.17",
    },
    {
      id: 3,
      img: "https://images.unsplash.com/photo-1521119989659-a83eee488004?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDd8fCVFQyU4MiVBQyVFQiU5RSU4Q3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
      user: 1,
      category: 3,
      createdTime: "2023.04.17",
    },
    {
      id: 4,
      img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fCVFQyU5RSU5MCVFQyU5NyVCMHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
      user: 1,
      category: 1,
      createdTime: "2023.04.17",
    },
    {
      id: 5,
      img: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8JUVDJTlFJTkwJUVDJTk3JUIwfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      user: 1,
      category: 1,
      createdTime: "2023.04.17",
    },
    {
      id: 6,
      img: "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZG9nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      user: 2,
      category: 2,
      createdTime: "2023.04.17",
    },
    {
      id: 7,
      img: "https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZG9nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      user: 2,
      category: 2,
      createdTime: "2023.04.17",
    },
    {
      id: 8,
      img: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2F0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      user: 1,
      category: 2,
      createdTime: "2023.04.17",
    },
    {
      id: 9,
      img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8JUVDJTlEJThDJUVDJThCJTlEfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      user: 3,
      category: 5,
      createdTime: "2023.04.17",
    },
    {
      id: 10,
      img: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fCVFQiU4QiVBOCVFQyVCMiVCNHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
      user: 1,
      category: 4,
      createdTime: "2023.04.17",
    },
  ],
};

export { albumInfo, photos };
