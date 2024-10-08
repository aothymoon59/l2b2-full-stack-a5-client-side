import { useState } from "react";
import { useGetManagersAndAdminsQuery } from "../../../redux/features/users/usersApi";
import { Pagination, Select, Switch, Table, TableProps } from "antd";
import { userData } from "../../../types/global";
import AntdTableSkeleton from "../../global/loaders/tableskeleton/AntdTableSkeleton";
import { FaTrash } from "react-icons/fa";

const ManageAdmins = () => {
  const [page, setPage] = useState(1);

  const { data: allUsers, isLoading: isAllUsersLoading } =
    useGetManagersAndAdminsQuery([
      {
        name: "page",
        value: page,
      },
      {
        name: "sort",
        value: "-role",
      },
    ]);

  const handleDeleteUser = (id: string) => {
    console.log(id);
  };

  const onStatusChange = (checked: boolean) => {
    console.log(checked);
  };

  const columns: TableProps<userData>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      width: 250,
      render: (text) => {
        return text !== "superAdmin" ? (
          <Select
            defaultValue={text}
            style={{ width: "100%" }}
            // onChange={handleChange}
            options={[
              { value: "user", label: "User" },
              { value: "customer", label: "Customer" },
              { value: "manager", label: "Manager" },
              { value: "superAdmin", label: "Super Admin", disabled: true },
            ]}
          />
        ) : (
          "Super Admin"
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 200,
      render: (text, record) => {
        return record?.role !== "superAdmin" ? (
          <Switch defaultChecked={text == "active"} onChange={onStatusChange} />
        ) : (
          <span className="text-red-500 text-xs font-semibold">
            Cannot be changed
          </span>
        );
      },
    },
    {
      title: "Action",
      fixed: "right",
      width: 150,
      align: "center",
      render: (_text, record) => (
        <div className="flex justify-center items-center gap-3">
          {/* <Link to={`/gadgets/view/${record._id}`}>
              <FaEye size={18} />
            </Link> */}
          {record?.role !== "superAdmin" ? (
            <a onClick={() => handleDeleteUser(record._id)}>
              <FaTrash size={16} className="text-red-500" />
            </a>
          ) : (
            "--"
          )}
        </div>
      ),
    },
  ];
  return (
    <div>
      <h2 className="text-lg font-semibold text-left mb-3">
        Managers and Admins
      </h2>
      <div className="overflow-x-auto sales-history">
        {isAllUsersLoading ? (
          <AntdTableSkeleton />
        ) : (
          <Table
            className="custom-table"
            scroll={{ x: 1024 }}
            columns={columns}
            dataSource={allUsers?.data}
            rowKey="_id"
            pagination={false}
          />
        )}
      </div>
      <div className="antd_custom_pagination flex justify-end mt-3">
        <Pagination
          current={page}
          onChange={(value) => setPage(value)}
          pageSize={allUsers?.meta?.limit}
          total={allUsers?.meta?.total}
        />
      </div>
    </div>
  );
};

export default ManageAdmins;