export interface SSOClient {
  id: string;
  name: string;
  horizontal_logo: string;
  redirect_uris: string[];
}

export const clients: SSOClient[] = [
  {
    id: "kH9X3vKwLm7YEQzR",
    name: "Dashboard Admin",
    horizontal_logo: "https://jumpapay.com/assets/images/logo.png",
    redirect_uris: ["https://dashboard.jumpapay.com/sso-callback"]
  },
  {
    id: "okl9vk0o6zkr41fc",
    name: "Gamaloka Dashboard",
    horizontal_logo: "https://gamaloka.com/wp-content/uploads/2023/12/gamaloka-1800x4001-1-200x44.png",
    redirect_uris: ["https://dashboard.gamaloka.com/sso-callback"]
  },
];