export interface Bicycle {
  user_id: number;
  name: string;
  brand: string;
  model: string;
  type: string;
  value: number;
  frame_num: string;
  frame_size: string;
  colour: string;
  gender: string;
  description: string | null;
  photos_url: string[];
  owner: boolean;
}

export interface BicycleResp {
  id: number;
  user_id: number;
  name: string;
  brand: string;
  model: string;
  type: string;
  value: number;
  frame_num: string;
  frame_size: string;
  colour: string;
  gender: string;
  description: string | null;
  photos_url: string[];
  owner: boolean;
}