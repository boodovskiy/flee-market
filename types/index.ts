export interface SliderItem {
  id: string;
  image: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface PostItem {
  id: string; // The document ID (always include this for lists)
  title: string;
  description: string;
  category: string;
  address: string;
  price: string;
  image: string; // The primary image URL

  // User/Timestamp data (from initialValues)
  userName: string;
  userEmail: string;
  userImage: string;
  createdAt: number; // Stored as a timestamp (number)
}
