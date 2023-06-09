import React, { useState, useRef } from "react";
import Header from "../components/Header/Header";
import CreateBill from "../components/Cart/CreateBill";
import { Button, Card, Popconfirm, Table, message, Input, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  PlusCircleOutlined,
  MinusCircleOutlined,
  QuestionCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { increase, decrease, deleteCart } from "../redux/CartSlice";
import Highlighter from "react-highlight-words";
import "../index.css";

function CartPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Ürün Görseli",
      dataIndex: "image",
      key: "image",
      width: "125px",
      render: (text) => {
        return <img src={text} alt="" className="w-full h-20 object-cover" />;
      },
    },
    {
      title: "Ürün Adı",
      dataIndex: "title",
      key: "title",
      ...getColumnSearchProps("title"),
    },
    {
      title: "Kategori",
      dataIndex: "category",
      key: "category",
      ...getColumnSearchProps("category"),
    },
    {
      title: "Ürün Fiyatı",
      dataIndex: "price",
      key: "price",
      render: (item) => {
        return <span>{item.toFixed(2)}₺</span>;
      },
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Ürün Adeti",
      dataIndex: "quantity",
      key: "quantity",
      render: (item, record) => {
        return (
          <div className="flex items-center">
            <Button
              type="primary"
              size="small"
              className="w-full flex items-center justify-center !rounded-full"
              icon={
                <PlusCircleOutlined
                  onClick={() => dispatch(increase(record))}
                />
              }
            />
            <span className="w-6 inline-block text-center">
              {record.quantity}
            </span>
            <Button
              type="primary"
              size="small"
              className="w-full flex items-center justify-center !rounded-full"
              icon={
                <MinusCircleOutlined
                  onClick={() => {
                    if (record.quantity === 1) {
                      if (window.confirm("Ürün sepetinizden silinsin mi?")) {
                        dispatch(decrease(record));
                        message.success("Ürün sepetten kaldırıldı.");
                      }
                    }
                    if (record.quantity > 1) {
                      dispatch(decrease(record));
                    }
                  }}
                />
              }
            />
          </div>
        );
      },
    },
    {
      title: "Toplam Fiyat",
      render: (item, record) => {
        return <span>{(record.price * record.quantity).toFixed(2)}₺</span>;
      },
    },
    {
      title: "Action",
      render: (_, record) => {
        return (
          <Popconfirm
            title={`${record.title} ürününü sepetinizden kaldırmak istediğinize emin misiniz?`}
            okText="Evet"
            cancelText="Hayır"
            icon={<QuestionCircleOutlined style={{ color: "red" }} />}
            onConfirm={() => {
              dispatch(deleteCart(record));
              message.success(record.title + " ürünü sepetinizden kaldırıldı.");
            }}
          >
            <Button type="link" danger>
              Sil
            </Button>
          </Popconfirm>
        );
      },
    },
  ];

  return (
    <React.Fragment>
      <Header />
      <div
        className="scrollable"
        style={{ maxHeight: "calc(100vh - 100px)", overflowY: "scroll" }}
      >
        <Table
          dataSource={cart.cartItems}
          columns={columns}
          bordered
          scroll={{ x: 1200, y: 450 }}
        />
        <div className="cart-total flex justify-end mt-4">
          <Card className="w-72">
            <div className="flex justify-between">
              <span>Ara Toplam</span>
              <span>{cart.total > 0 ? cart.total.toFixed(2) : 0}₺</span>
            </div>
            <div className="flex justify-between text-red-600 my-2">
              <span>KDV %{cart.tax}</span>
              <span>
                {(cart.total * cart.tax) / 100 > 0
                  ? "+" + ((cart.total * cart.tax) / 100).toFixed(2)
                  : 0}
                ₺
              </span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Genel Toplam</span>
              <span>
                {cart.total + (cart.total * cart.tax) / 100 > 0
                  ? (cart.total + (cart.total * cart.tax) / 100).toFixed(2)
                  : 0}
                ₺
              </span>
            </div>
            <Button
              type="primary"
              size="large"
              className="mt-4 w-full bg-blue-500"
              onClick={() => setIsModalOpen(true)}
              disabled={cart.cartItems.length === 0}
            >
              Sipariş Oluştur
            </Button>
          </Card>
        </div>
      </div>
      <CreateBill isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </React.Fragment>
  );
}

export default CartPage;
