import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface IconProps {
  color: string;
  size?: number;
}

export const MosqueIcon = ({ color, size = 24 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M12 2L9 8h6L12 2z" />
    <Path d="M5 8v13h14V8" />
    <Path d="M2 21h20" />
  </Svg>
);

export const QuranIcon = ({ color, size = 24 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M3 4v16l7-3 7 3V4l-7 3-7-3z" />
  </Svg>
);

export const CalendarIcon = ({ color, size = 24 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M3 4h18v18H3z" />
    <Path d="M8 2v4M16 2v4M3 10h18" />
  </Svg>
);

export const CommunityIcon = ({ color, size = 24 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4z" />
    <Path d="M6 22v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
  </Svg>
);

export const ChatIcon = ({ color, size = 24 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M21 11.5a8.38 8.38 0 0 1-1.9 5.4A8.5 8.5 0 0 1 12 21H5l-3 3V7.5A8.5 8.5 0 0 1 12 2a8.38 8.38 0 0 1 5.4 1.9" />
    <Path d="M17 8h.01" />
    <Path d="M12 8h.01" />
    <Path d="M7 8h.01" />
  </Svg>
);
