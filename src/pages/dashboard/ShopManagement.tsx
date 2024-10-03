/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";
import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useGetAllGadgetsQuery } from "../../redux/features/gadgets/gadgetsApi";
import { Empty, Input, Pagination } from "antd";
import EbButton from "../../components/ui/EbButton";
import { FaHome } from "react-icons/fa";
import PageHeader from "../../components/ui/PageHeader";
import ProductCardSkeleton from "../../components/global/loaders/cardSkeleton/ProductCardSkeleton";

const ShopManagement = () => {
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText, setDebouncedSearchText] = useState("");
  const [page, setPage] = useState(1);

  // Debounce logic
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchText]);

  const { data: allGadgets, isLoading: isAllGadgetsLoading } =
    useGetAllGadgetsQuery(
      [
        { name: "page", value: page },
        { name: "limit", value: 12 },
        { name: "searchTerm", value: debouncedSearchText },
      ],
      {
        refetchOnMountOrArgChange: true, // Refetch data on every visit or argument change
        refetchOnFocus: true, // Optional: Refetch when the user focuses on the page
        refetchOnReconnect: true, // Optional: Refetch when user reconnects
      }
    );

  const handleSearch = (e: any) => {
    setSearchText(e.target.value);
  };

  return (
    <div className="w-full">
      <PageHeader
        title="Shop"
        breadcrumbs={[
          { label: "ElectroBazaar", link: "/", icon: <FaHome /> },
          { label: "Shop", isCurrent: true },
        ]}
        actions={
          <div className="w-full max-w-[460px]">
            <Input
              placeholder="Search"
              prefix={<FiSearch />}
              size="large"
              onChange={(e) => handleSearch(e)}
            />
          </div>
        }
      />
      {isAllGadgetsLoading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {Array.isArray(allGadgets?.data) &&
            allGadgets?.data?.map((gadget: any) => {
              const {
                _id,
                productImage,
                name,
                price,
                releaseDate,
                brand,
                modelNumber,
                category,
                quantity,
              } = gadget;
              return (
                <div
                  key={_id}
                  className="card card-compact bg-primary-lighter shadow-md"
                >
                  <div className="p-3">
                    <div className="bg-white w-full h-[200px] p-3 flex justify-center rounded-md">
                      <img
                        src={productImage}
                        alt={name}
                        className="rounded-xl h-[170px] max-w-full"
                      />
                    </div>
                    <div className="mt-4">
                      <h2 className="card-title">{name}</h2>
                      <p className="flex gap-2">
                        <span className="font-bold">Price:</span>${price}
                      </p>
                      <p className="flex gap-2">
                        <span className="font-bold">Quantity:</span>
                        {quantity}
                      </p>
                      <p className="flex gap-2">
                        <span className="font-bold">Release Date:</span>

                        <span>{moment(releaseDate).format("DD/MM/YYYY")}</span>
                      </p>
                      <p className="flex gap-2">
                        <span className="font-bold">Brand:</span>
                        {brand}
                      </p>
                      <p className="flex gap-2">
                        <span className="font-bold">Model:</span>
                        {modelNumber}
                      </p>
                      <p className="flex gap-2">
                        <span className="font-bold">Category:</span>
                        {category}
                      </p>
                      <div className="card-actions justify-end mt-3">
                        <EbButton className="primary-main-btn w-full">
                          Add to Cart
                        </EbButton>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      )}
      {allGadgets?.data?.length === 0 && (
        <div className="w-full h-[70vh] flex justify-center items-center">
          <Empty />
        </div>
      )}

      <div className="antd_custom_pagination flex justify-center mt-5">
        <Pagination
          current={page}
          onChange={(value) => setPage(value)}
          pageSize={allGadgets?.meta?.limit}
          total={allGadgets?.meta?.total}
        />
      </div>
    </div>
  );
};

export default ShopManagement;