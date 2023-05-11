export interface GirlType{
    count : number,
    imgList : string[],
    lat : number,
    lng : number,
}

export interface PhotoType{
    mapLatitude : number, 
    mapLongitude : number, 
    photoId : number, 
    s3Url : string,
    uploadedDate : string
    userId : string
}

export interface GirlResultType{
    resultList : GirlReusltListType[],
}

export interface GirlReusltListType{
    markGps : GirlListMarkGpsType,
    totalPhotoCnt : number,
    photoList : PhotoType[],
}

export interface GirlListMarkGpsType{
    section : number,
    latitude : number,
    longitude : number,
}
export interface LocationType{
    lat : number,
    lng : number,
  }
export interface OrderType{
    order : string,
}

export interface GirlRequestPartType {
    formData: FormData;
  }

export interface GirlListDetailResultType{
    page : PageType,
    photoList : PhotoType[],
    totalPhotoCnt : number,
    totalUserCnt : number
}
export interface PageType{
    is_first : true
    is_last : boolean,
    now_page : number,
    total_page : number
}

export interface PhotoDetailType {
        photoId : number
        uploadedDate : string,
        s3Url : string,
        mapLatitude : number,
        mapLongitude : number,
        userId : string,
        userName : string,
        userProfileImg : string,
        likeCnt : number,
        viewCnt : number,
        userLikeStatus : boolean,
    }