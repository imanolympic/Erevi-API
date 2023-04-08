export interface Package {
  weight: {
    unit: string;
    value: string;
  };
  dimensions: {
    unit: string;
    length: string;
    width: string;
    height: string;
  };
}
