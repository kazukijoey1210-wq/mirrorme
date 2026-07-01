export type Role = "customer" | "stylist" | "admin";

export type Profile = {
  id: string;
  user_id: string;
  display_name: string | null;
  role: Role;
  age_group: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
};

export type StylistProfileRow = {
  id: string;
  user_id: string;
  display_name: string;
  bio: string | null;
  school_or_background: string | null;
  specialties: string[] | null;
  supported_bone_types: string[] | null;
  supported_color_types: string[] | null;
  supported_face_types: string[] | null;
  supported_fashion_types: string[] | null;
  area: string | null;
  online_available: boolean | null;
  price_min: number | null;
  price_max: number | null;
  profile_image_url: string | null;
  sns_url: string | null;
  notes: string | null;
  is_published: boolean | null;
  created_at: string;
  updated_at: string;
};

export type DiagnosisSlug = "bone" | "color" | "face" | "fashion";

export type BookingStatus =
  | "pending"
  | "accepted"
  | "declined"
  | "canceled"
  | "completed";

export type DiagnosisAnswerScore = Record<string, number>;

export type DiagnosisQuestion = {
  id: string;
  question: string;
  helper: string;
  options: {
    label: string;
    description: string;
    scores: DiagnosisAnswerScore;
  }[];
};

export type DiagnosisDefinition = {
  slug: DiagnosisSlug;
  title: string;
  shortTitle: string;
  description: string;
  duration: string;
  icon: string;
  resultTypes: string[];
  questions: DiagnosisQuestion[];
};

export type DiagnosisResult = {
  bone_type?: string;
  color_type?: string;
  face_type?: string;
  fashion_type?: string;
};

export type Stylist = {
  id: string;
  displayName: string;
  bio: string;
  schoolOrBackground: string;
  specialties: string[];
  supportedBoneTypes: string[];
  supportedColorTypes: string[];
  supportedFaceTypes: string[];
  supportedFashionTypes: string[];
  area: string;
  onlineAvailable: boolean;
  priceMin: number;
  priceMax: number;
  rating: number;
  reviewCount: number;
  isPublished: boolean;
  available: boolean;
  avatarTone: string;
  portfolio: {
    imageTone: string;
    caption: string;
  }[];
  menus: {
    id: string;
    title: string;
    description: string;
    price: number;
    durationMinutes: number;
    online: boolean;
    offline: boolean;
  }[];
  reviews: {
    user: string;
    rating: number;
    comment: string;
  }[];
  notes: string;
};
