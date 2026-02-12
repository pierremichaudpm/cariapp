import React from "react";
import {
  Home,
  BookOpen,
  Briefcase,
  Users,
  User,
  UserRound,
  Calculator,
  HandHeart,
  MessageCircle,
  Bot,
  Globe,
  Quote,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Info,
  Phone,
  Clock,
  MapPin,
  X,
  CheckCircle,
  Map,
  Tag,
  Calendar,
  CalendarX,
  CalendarPlus,
  Train,
  Mail,
  XCircle,
  Video,
  Mic,
  FileText,
  PlusCircle,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Send,
  ClipboardList,
  Languages,
  Stethoscope,
  Heart,
  Star,
} from "lucide-react";

// Mapping Font Awesome icon names to Lucide components
const iconMap = {
  home: Home,
  "book-open": BookOpen,
  briefcase: Briefcase,
  users: Users,
  female: User, // Using User for female icon
  male: UserRound, // Using UserRound for male icon
  calculator: Calculator,
  "hands-helping": HandHeart,
  comments: MessageCircle,
  robot: Bot,
  "globe-americas": Globe,
  globe: Globe,
  "quote-left": Quote,
  "chevron-down": ChevronDown,
  "chevron-left": ChevronLeft,
  "chevron-right": ChevronRight,
  "arrow-right": ArrowRight,
  "info-circle": Info,
  phone: Phone,
  clock: Clock,
  "map-marker-alt": MapPin,
  times: X,
  "check-circle": CheckCircle,
  map: Map,
  tag: Tag,
  calendar: Calendar,
  "calendar-times": CalendarX,
  "calendar-plus": CalendarPlus,
  subway: Train,
  envelope: Mail,
  "times-circle": XCircle,
  video: Video,
  mic: Mic,
  "file-text": FileText,
  "plus-circle": PlusCircle,
  "share-2": Share2,
  facebook: Facebook,
  twitter: Twitter,
  linkedin: Linkedin,
  "message-circle": MessageCircle,
  send: Send,
  "clipboard-list": ClipboardList,
  languages: Languages,
  stethoscope: Stethoscope,
  heart: Heart,
  star: Star,
  x: X,
};

const Icon = ({ name, size = 24, className = "", ...props }) => {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    if (process.env.NODE_ENV === "development") {
      console.warn(`Icon "${name}" not found in icon map`);
    }
    return null;
  }

  return <IconComponent size={size} className={className} {...props} />;
};

export default Icon;
