export interface Post {
  fields: {
    contents: any;
    tags?: string[];
    slug: string;
    thumbnail: ContentfulImageObject;
    title: string;
    description: string;
    mediaImage?: ContentfulImageObject;
  },
  metadata: {
    tags: [];
  },
  sys: {
    contentType: ContetfulSystemObject;
    createdAt: string;
    environment: ContetfulSystemObject;
    id: string;
    locale: string;
    revision: number;
    space: ContetfulSystemObject;
    type: string;
    updatedAt: string;
  }
}

export interface ContetfulSystemObject {
  sys: {
    id: string;
    linkType: string;
    type: string
  }
}

export interface ContentfulImageObject {
  fields: {
    file: {
      url: string; 
      details: {
        image: {
          height: number;
          width: number;
        },
        size: number;
      }, 
      fileName: string; 
      contentType: string;
    }
    title: "聖徳太子"
  },
  metadata: {
    tags: []
  }
  sys:{
    createdAt: string;
    environment: ContetfulSystemObject;
    id: string;
    locale: string;
    revision: number;
    space: {
      sys: ContetfulSystemObject;
      type: string;
      updateAt: string; 
    }
    type: string;
    updatedAt: string;
  }
}


export type Tags = string[]

// Tagsの要素: number; という型を作りたい、、
// 以下の型適宜は正しいかどうかわからない
export type Count = {
  [key in string]: number
}