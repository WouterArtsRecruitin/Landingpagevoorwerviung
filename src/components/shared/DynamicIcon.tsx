import {
  Euro, Car, GraduationCap, MapPin, Clock, Heart, Shield, Star,
  Briefcase, Phone, Mail, MessageCircle, Calendar, Users, Building2,
  Wrench, Zap, Award, Target, TrendingUp, Globe, Coffee, Truck,
  Home, CheckCircle, Settings, Monitor, Wifi, Gift, Sparkles,
  type LucideProps,
} from "lucide-react";
import type { FC } from "react";

// Map van string namen naar Lucide icon componenten
const ICON_MAP: Record<string, FC<LucideProps>> = {
  euro: Euro,
  car: Car,
  "graduation-cap": GraduationCap,
  "map-pin": MapPin,
  clock: Clock,
  heart: Heart,
  shield: Shield,
  star: Star,
  briefcase: Briefcase,
  phone: Phone,
  mail: Mail,
  "message-circle": MessageCircle,
  calendar: Calendar,
  users: Users,
  building: Building2,
  wrench: Wrench,
  zap: Zap,
  award: Award,
  target: Target,
  "trending-up": TrendingUp,
  globe: Globe,
  coffee: Coffee,
  truck: Truck,
  home: Home,
  "check-circle": CheckCircle,
  settings: Settings,
  monitor: Monitor,
  wifi: Wifi,
  gift: Gift,
  sparkles: Sparkles,
};

interface DynamicIconProps extends LucideProps {
  name: string;
}

export function DynamicIcon({ name, ...props }: DynamicIconProps) {
  const Icon = ICON_MAP[name.toLowerCase()] || Star;
  return <Icon {...props} />;
}
