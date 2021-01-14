import { Settings as LayoutSettings } from '@ant-design/pro-layout';
import logo from '@/assets/logo.svg';
export default {
  navTheme: 'light',
  // 拂晓蓝
  primaryColor: '#1890ff',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  menu: {
    locale: true,
  },
  title: 'Octopus Admin',
  pwa: false,
  logo: logo,
  iconfontUrl: '',
} as LayoutSettings & {
  pwa: boolean;
};
