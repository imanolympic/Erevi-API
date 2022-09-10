export interface Product {
  id?: string;
  title: String;
  price: number;
  description: String;
  listed: boolean;
  inventory: number;
  weight_lbs: number | null;
  height_inches: number | null;
  width_inches: number | null;
  length_inches: number | null;
  image_url: String;
}
