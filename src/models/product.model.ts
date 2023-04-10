export interface Product {
  _id: string;
  title: string;
  price: number;
  description: string;
  listed: boolean;
  inventory: number;
  weight_lbs: number | null;
  height_inches: number | null;
  width_inches: number | null;
  length_inches: number | null;
  image_url: string;
}
