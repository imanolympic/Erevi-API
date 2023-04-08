export interface Rate {
  rate_id: string;
  carrier_id: string;
  shipping_amount: {
    currency: string;
    amount: number;
  };
  insurance_amount: {
    currency: string;
    amount: number;
  };
  other_amount: {
    currency: string;
    amount: number;
  };
  zone: string;
  package_type: string;
  delivery_days: number;
  guaranteed_service: boolean;
  estimated_delivery_date: string;
  carrier_delivery_days: string;
  ship_date: string;
  negotiated_rate: boolean;
  service_type: string;
  service_code: string;
  trackable: boolean;
  carrier_code: string;
  carrier_nickname: string;
  carrier_friendly_name: string;
  validation_status: string;
  warning_messages: string[];
  error_messages: string[];
}
