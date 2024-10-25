import { ThemeConfig } from 'antd/es/config-provider/context';

export const lightTheme: ThemeConfig = {
  token: {
    colorPrimary: '#1890ff',
    colorBgContainer: '#ffffff',
    colorText: 'rgba(0, 0, 0, 0.85)',
    colorBorder: '#d9d9d9',
    colorBgElevated: '#ffffff',
    colorTextPlaceholder: 'rgba(0, 0, 0, 0.45)',
  },
};

export const darkTheme: ThemeConfig = {
  token: {
    colorPrimary: '#177ddc',
    colorBgContainer: '#141414',
    colorText: 'rgba(255, 255, 255, 0.85)',
    colorBorder: '#434343',
    colorBgElevated: '#1f1f1f',
    colorTextPlaceholder: 'rgba(255, 255, 255, 0.45)',
  },
};
