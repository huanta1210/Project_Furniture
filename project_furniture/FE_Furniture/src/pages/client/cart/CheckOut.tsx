import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../../store/contexts/CartContext";
import { LocationContext } from "../../../store/contexts/LocationContext";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "../../../validators/formCheckout";

import PhoneInput from "react-phone-number-input";
import { FormValues } from "../../../interfaces/FormCheckOut";
import { toast } from "react-toastify";
import { AuthContext } from "../../../store/contexts/AuthContext";

const CheckOut = () => {
  const { cartState, totalPrice } = useContext(CartContext);
  const { locationState, dispatch, fetchDistrict, fetchWard } =
    useContext(LocationContext);
  const { userState } = useContext(AuthContext);
  const [active, setActive] = useState<number | null>(null);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (userState.token) {
      setValue("userName", userState.users?.userName || "");
      setValue("phone", userState.users?.phone || "");
      setValue("email", userState.users?.email || "");
    }
  }, []);

  useEffect(() => {
    if (locationState.selectedProvince) {
      fetchDistrict(locationState.selectedProvince);
    }
  }, [locationState.selectedProvince]);

  useEffect(() => {
    if (locationState.selectedDistrict) {
      fetchWard(locationState.selectedDistrict);
    }
  }, [locationState.selectedDistrict]);
  // handle event
  const onSubmit = (data: FormValues) => {
    try {
      const provinceName =
        locationState.provinces.find((prov) => prov.id === data.province)
          ?.full_name || "";
      const districtName =
        locationState.districts.find((prov) => prov.id === data.district)
          ?.full_name || "";
      const wardName =
        locationState.wards.find((prov) => prov.id === data.ward)?.full_name ||
        "";

      const formattedData = {
        ...data,
        province: provinceName,
        district: districtName,
        ward: wardName,
      };
      reset();
      console.log(formattedData);
    } catch (error) {
      console.log(error);
      toast.error("Error failed");
    }
  };
  // acitve
  const handleActive = (id: number) => {
    setActive(id);
  };

  return (
    <>
      <Header />
      <main>
        <div className="mx-44 mb-16">
          <h1 className="text-4xl my-5 font-bold">Billing details</h1>
          <form
            action=""
            className="grid grid-cols-12 md:grid-cols-2 gap-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="space-y-6">
              <div>
                <label className="block text-base font-semibold mb-2">
                  Name: <span className="text-red-500">*</span>
                </label>
                <Controller
                  name="userName"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      className={`w-full border rounded-lg py-2 px-3 focus:outline-none focus:ring-1 focus:ring-lime-300 focus:shadow-lg shadow-lg ${
                        errors.userName
                          ? "border-red-500 focus:ring-red-300 ring-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="Enter your name"
                    />
                  )}
                />
                {errors.userName && (
                  <small className="text-red-500 text-sm">
                    {errors.userName.message?.toString()}
                  </small>
                )}
              </div>

              <div>
                <label className="block text-base font-semibold mb-2">
                  Phone: <span className="text-red-500">*</span>
                </label>
                <Controller
                  name="phone"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <PhoneInput
                      {...field}
                      international
                      defaultCountry="VN"
                      className={`w-full border rounded-lg py-2 px-3 focus:outline-none focus:ring-1 focus:ring-lime-300 focus:shadow-lg shadow-lg ${
                        errors.phone
                          ? "border-red-500 focus:ring-red-300 ring-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="Enter your phone number"
                    />
                  )}
                />
                {errors.phone && (
                  <small className="text-red-500 text-sm">
                    {errors.phone.message?.toString()}
                  </small>
                )}
              </div>

              <div>
                <label className="block text-base font-semibold mb-2">
                  Email: <span className="text-red-500">*</span>
                </label>
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <input
                      {...field}
                      type="email"
                      className={`w-full border rounded-lg py-2 px-3 focus:outline-none focus:ring-1 focus:ring-lime-300 focus:shadow-lg shadow-lg ${
                        errors.email
                          ? "border-red-500 focus:ring-red-300 ring-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="Enter your email address"
                    />
                  )}
                />
                {errors.email && (
                  <small className="text-red-500 text-sm">
                    {errors.email.message?.toString()}
                  </small>
                )}
              </div>

              <div>
                <label className="block text-base font-semibold mb-2">
                  Company Name (Optional):
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-1 focus:ring-lime-300 focus:shadow-lg shadow-lg"
                  placeholder="Enter your company name (if any)"
                />
              </div>

              <div>
                <label className="block text-base font-semibold mb-2">
                  Address: <span className="text-red-500">*</span>
                </label>
                <Controller
                  name="address"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      className={`w-full border rounded-lg py-2 px-3 focus:outline-none focus:ring-1 focus:ring-lime-300 focus:shadow-lg shadow-lg ${
                        errors.address
                          ? "border-red-500 focus:ring-red-300 ring-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="Enter your address"
                    />
                  )}
                />
                {errors.address && (
                  <small className="text-red-500 text-sm">
                    {errors.address.message?.toString()}
                  </small>
                )}
              </div>

              <div>
                <label className="block text-base font-semibold mb-2">
                  Town / City: <span className="text-red-500">*</span>
                </label>
                <Controller
                  name="province"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <select
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        dispatch({
                          type: "SET_SELECTED_PROVINCE",
                          payload: e.target.value,
                        });
                        setValue("district", "");
                        setValue("ward", "");
                      }}
                      className={`w-full border rounded-lg py-2 px-3 focus:outline-none focus:ring-1 focus:ring-lime-300 focus:shadow-lg shadow-lg ${
                        errors.province
                          ? "border-red-500 focus:ring-red-300 ring-red-500"
                          : "border-gray-300"
                      }`}
                    >
                      <option value="" selected disabled>
                        Select Town / City
                      </option>
                      {locationState.provinces.map((province) => (
                        <option key={province.id} value={province.id}>
                          {province.full_name}
                        </option>
                      ))}
                    </select>
                  )}
                />
                {errors.province && (
                  <small className="text-red-500 text-sm">
                    {errors.province.message?.toString()}
                  </small>
                )}
              </div>

              <div>
                <label className="block text-base font-semibold mb-2">
                  District: <span className="text-red-500">*</span>
                </label>
                <Controller
                  name="district"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <select
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        dispatch({
                          type: "SET_SELECTED_DISTRICT",
                          payload: e.target.value,
                        });
                        setValue("ward", "");
                      }}
                      className={`w-full border rounded-lg py-2 px-3 focus:outline-none focus:ring-1 focus:ring-lime-300 focus:shadow-lg shadow-lg ${
                        errors.district
                          ? "border-red-500 focus:ring-red-300 ring-red-500"
                          : "border-gray-300"
                      }`}
                    >
                      <option value="" selected disabled>
                        Select District
                      </option>
                      {(Array.isArray(locationState.districts)
                        ? locationState.districts
                        : []
                      ).map((district) => (
                        <option key={district.id} value={district.id}>
                          {district.full_name}
                        </option>
                      ))}
                    </select>
                  )}
                />
                {errors.district && (
                  <small className="text-red-500 text-sm">
                    {errors.district.message?.toString()}
                  </small>
                )}
              </div>

              <div>
                <label className="block text-base font-semibold mb-2">
                  Ward / Commune: <span className="text-red-500">*</span>
                </label>
                <Controller
                  name="ward"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <select
                      {...field}
                      name="ward"
                      className={`w-full border rounded-lg py-2 px-3 focus:outline-none focus:ring-1 focus:ring-lime-300 focus:shadow-lg shadow-lg ${
                        errors.ward
                          ? "border-red-500 focus:ring-red-300 ring-red-500"
                          : "border-gray-300"
                      }`}
                    >
                      <option value="" selected disabled>
                        Select Ward / Commune
                      </option>
                      {locationState.wards.map((ward) => (
                        <option value={ward.id} key={ward.id}>
                          {ward.full_name}
                        </option>
                      ))}
                    </select>
                  )}
                />
                {errors.ward && (
                  <small className="text-red-500 text-sm">
                    {errors.ward.message?.toString()}
                  </small>
                )}
              </div>
            </div>
            <div className="space-y-6">
              <div className="pb-5 border-b-2 border-gray-300">
                <div className="flex justify-between items-center mb-3">
                  <p className="font-bold text-xl text-black-700">Product</p>
                  <p className="font-bold text-xl text-black-700">Subtotal</p>
                </div>
                {cartState.cartItems.map((item) => (
                  <div key={item.product._id}>
                    {" "}
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center">
                        <img
                          src={item.product.imageProduct}
                          className="size-10 rounded-lg shadow-md mr-3"
                          alt="Ảnh"
                        />
                        <p className="font-medium text-sm text-gray-600">
                          {item.product.productName}
                          <span className="text-gray-400 ml-2">
                            SL: {item.quantity}
                          </span>
                          <span className="text-gray-400 ml-2">
                            Price: {item.product.price}$
                          </span>
                        </p>
                      </div>
                      <p className="font-semibold text-sm text-gray-800">
                        {item.quantity * item.product.price!}$
                      </p>
                    </div>
                  </div>
                ))}
                <div className="flex justify-between items-center mb-3">
                  <p className="font-medium text-sm text-gray-600">Subtotal</p>
                  <p className="font-semibold text-sm text-gray-800">
                    {totalPrice} $
                  </p>
                </div>
                <div className="flex justify-between items-center mb-3">
                  <p className="font-medium text-sm text-gray-600">Total</p>
                  <p className="font-bold text-lg text-red-500">
                    {totalPrice} $
                  </p>
                </div>
              </div>

              <div className="mt-7">
                <div className="flex">
                  <div className="h-4 w-4 border bg-black rounded-full mt-1"></div>
                  <span className="font-semibold text-sm text-black pl-2 pt-0.5 ">
                    Direct Bank Transter
                  </span>
                </div>

                <div className="mt-3">
                  <p className="text-gray-300 leading-6 font-medium text-sm mb-3">
                    Make your payments directly into our bank account. Please
                    use your Order ID as the payment refernce. You order wil not
                    be shipped until the funds have cleared in our account.
                  </p>
                  <div
                    onClick={() => handleActive(1)}
                    className={`flex items-center mb-4 p-2 border border-gray-200 rounded-lg shadow-md cursor-pointer hover:bg-gray-100 ${
                      active === 1 ? "bg-gray-100" : ""
                    }`}
                  >
                    <div className="h-8 w-8 border border-gray-300 rounded-full flex items-center justify-center bg-white mr-3 ">
                      <svg
                        className="w-5 h-5 text-blue-500"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M4 6v12h16V6H4zm14 10H6v-1h12v1zm0-3H6v-1h12v1zm0-3H6V9h12v1zm-7 5h1v-5h-1v5z"></path>
                      </svg>
                    </div>
                    <span className="font-medium text-sm text-gray-700">
                      Direct Bank Transfer
                    </span>
                  </div>

                  <div
                    onClick={() => handleActive(2)}
                    className={`flex items-center mb-4 p-2 border border-gray-200 rounded-lg shadow-md cursor-pointer hover:bg-gray-100 ${
                      active === 2 ? "bg-gray-100" : ""
                    }`}
                  >
                    <div className="h-8 w-8 border border-gray-300 rounded-full flex items-center justify-center bg-white mr-3">
                      <svg
                        className="w-5 h-5 text-green-500"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 10h12v4H6v-4zm12 6H6v-4h12v4zm-6 4h-1v-5h1v5z"></path>
                      </svg>
                    </div>
                    <span className="font-medium text-sm text-gray-700">
                      Cash On Delivery
                    </span>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="text-center mt-5">
                    <button
                      className="text-blue-700 font-semibold border-2 border-blue-300 text-base py-2 px-6 rounded-lg shadow-md transition-colors duration-300 ease-in-out  hover:bg-blue-500 hover:text-white"
                      type="submit"
                    >
                      Place Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CheckOut;
