export interface storyApiType {
  status_code: number;
  message: string;
  data: {
    album_id: number;
    album_name: string;
    thumbnail_photo: string;
    recent_upload_time: string;
    photo_list: {
      noti_id: number;
      photo_id: number;
      photo_url: string;
      user_name: string;
      upload_date: string;
    }[];
  };
}

export interface storyApiDataType {
  album_id: number;
  album_name: string;
  thumbnail_photo: string;
  recent_upload_time: string;
  photo_list: {
    noti_id: number;
    photo_id: number;
    photo_url: string;
    user_image: string;
    user_name: string;
    upload_date: string;
  }[];
}
