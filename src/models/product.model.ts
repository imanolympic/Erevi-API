export interface Product {
  title: String;
  price: number;
  description: String;
  image_urls: String[];
}

export interface ProductEntity {
  title: String;
  price: number;
  description: String;
  listed: boolean;
  inventory: number;
  weight_lbs: number | null;
  height_inches: number | null;
  width_inches: number | null;
  depth_inches: number | null;
  image_urls: String[];
}
