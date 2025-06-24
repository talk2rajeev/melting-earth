// app/antd.registry.tsx
'use client'; // <-- THIS IS CRUCIAL! It makes this component a Client Component.

import React from 'react';
import { StyleProvider, createCache, extractStyle } from '@ant-design/cssinjs';
import { ConfigProvider } from 'antd';
import enUS from 'antd/locale/en_US'; // Import your desired locale, e.g., English

// It's important to create the cache within the client component scope
// to ensure it's handled correctly on the client side during hydration.
const cache = createCache();

export function AntdRegistry({ children }: { children: React.ReactNode }) {
  return (
    // Wrap both StyleProvider and ConfigProvider within this client component
    <StyleProvider cache={cache}>
      <ConfigProvider
        locale={enUS} // Apply locale
        theme={{
          // Apply your custom theme here
          token: {
            colorPrimary: '#00b96b', // Example primary color
          },
          // components: {
          //   Button: {
          //     colorPrimary: '#00b96b',
          //   },
          // },
        }}
      >
        {children}
      </ConfigProvider>
    </StyleProvider>
  );
}