import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'oTATo / skills — 创作档案',
  description: '去皮土豆 oTATo 的创作技能收藏夹。当前使用原型演示数据，正式内容待接入。',
  icons: { icon: '/favicon.svg' },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#e5e0ed',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
