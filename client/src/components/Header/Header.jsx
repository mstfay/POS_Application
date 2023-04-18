import {
  SearchOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  CopyOutlined,
  UserOutlined,
  BarChartOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Input } from "antd";

const Header = () => {
  return (
    <div className="border-b mb-6">
      <header className="py-4 px-6 flex justify-between items-center gap-10">
        <div className="logo">
          <a href="/">
            <h2 className="text-2xl md:text-4xl">LudenDream</h2>
          </a>
        </div>
        <div className="header-search flex-1">
          <Input
            size="large"
            placeholder="Enter text"
            prefix={<SearchOutlined />}
            className="rounded-full max-w-[800px]"
          />
        </div>
        <div className="menu-links flex flex-justify-between items-center gap-8">
          <a href="/" className="menu-link flex flex-col">
            <HomeOutlined className="md:text-2xl text-xl" />
            <span className="md:text-cs text-[10px]">Ana Sayfa</span>
          </a>
          <a href="/" className="menu-link flex flex-col">
            <ShoppingCartOutlined className="md:text-2xl text-xl" />
            <span className="md:text-cs text-[10px]">Sepet</span>
          </a>
          <a href="/" className="menu-link flex flex-col">
            <CopyOutlined className="md:text-2xl text-xl" />
            <span className="md:text-cs text-[10px]">Faturalar</span>
          </a>
          <a href="/" className="menu-link flex flex-col">
            <UserOutlined className="md:text-2xl text-xl" />
            <span className="md:text-cs text-[10px]">Profil</span>
          </a>
          <a href="/" className="menu-link flex flex-col">
            <BarChartOutlined className="md:text-2xl text-xl" />
            <span className="md:text-cs text-[10px]">İstatislikler</span>
          </a>
          <a href="/" className="menu-link flex flex-col">
            <LogoutOutlined className="md:text-2xl text-xl" />
            <span className="md:text-cs text-[10px]">Çıkış</span>
          </a>
        </div>
      </header>
    </div>
  );
};

export default Header;
