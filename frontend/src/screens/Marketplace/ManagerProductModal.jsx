import {
  Modal,
  Avatar,
  Button,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  ClickAwayListener,
  ClickAwayListenerProps,
} from "@mui/material";
import { useState, useMemo } from "react";
import {
  cities,
  colors,
  brands,
  conditions,
  warranties,
} from "../../common/constants/listConstants.js";
import { Close, PhotoLibrary } from "@mui/icons-material";
import notFoundImage from "../../assets/noimage_1.png";
import ImageUploading from "react-images-uploading";
import { notifyService } from "../../services/notifyService";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {
  resetUpdateProduct,
  updateProduct,
} from "../../redux/product/productSlice.js";
import { useEffect } from "react";

function ManagerProductModal({
  showManagerModal,
  setShowModal,
  handleSubmitCreateProduct,
  handleSaveUpdateProduct,
  ...props
}) {
  // #region declare variables
  const dispatch = useDispatch();
  const updateProductData = useSelector(
    (state) => state.product?.update?.product
  );
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: 0,
    quantity_in_stock: 1,
  });
  const [variation, setVariation] = useState({
    brand: "",
    color: "",
    condition: "",
    type: "",
    warranty: "",
    specification: "",
  });
  const [shopAddress, setShopAddress] = useState({
    city: "",
    district: "",
    ward: "",
    detail_address: "",
  });
  const [images, setImages] = useState([]);
  const [updateImages, setUpdateImages] = useState([]);
  const [removeImages, setRemoveImages] = useState([]);
  const [productId, setProductId] = useState();

  const { name, description, price, quantity_in_stock } = product;
  const { brand, color, condition, type, warranty, specification } = variation;
  const { city, district, ward, detail_address } = shopAddress;
  let xColor = colors;
  let xBrands = brands;
  xColor = useMemo(() => {
    var result = xColor.sort((a, b) => a.localeCompare(b));
    return result;
  });
  xBrands = useMemo(() => {
    var result = xBrands.sort((a, b) => a.localeCompare(b));
    return result;
  });
  const [isFormValid, setIsFormValid] = useState(true);
  const [createProductValidation, setCreateProductValidation] = useState({
    name: true,
    description: true,
    brand: true,
    color: true,
    condition: true,
    type: true,
    warranty: true,
    specification: true,
    city: true,
    district: true,
    ward: true,
    detail_address: true,
  });
  // #endregion
  // #region declare function
  const handleOnChangeVariation = (event) => {
    setVariation({ ...variation, [event.target.name]: event.target.value });
    setCreateProductValidation({
      ...createProductValidation,
      [event.target.name]: event.target.value !== "" ? true : false,
    });
  };
  const handleOnChangeProductInfo = (event) => {
    setProduct({ ...product, [event.target.name]: event.target.value });
    setCreateProductValidation({
      ...createProductValidation,
      [event.target.name]: event.target.value !== "" ? true : false,
    });
  };
  const handleOnChangeShopAddress = (event) => {
    setShopAddress({ ...shopAddress, [event.target.name]: event.target.value });
    setCreateProductValidation({
      ...createProductValidation,
      [event.target.name]: event.target.value !== "" ? true : false,
    });
  };
  const onChange = (imageList) => {
    setImages(imageList);
  };
  const handleSubmit = () => {
    if (handleCheckFormIsValid()) {
      setIsFormValid(true);
      let submitObj = {
        ...product,
        Variation: variation,
        ShopAddress: shopAddress,
      };
      var uploadImages = [];
      for (let i = 0; i < images.length; i++) {
        uploadImages.push({ files: images[i].file });
      }
      handleSubmitCreateProduct(submitObj, uploadImages);
      handleCloseModal();
    }
  };
  const handleSave = () => {
    if (handleCheckFormIsValid()) {
      setIsFormValid(true);
      let submitObj = {
        ...product,
        Variation: variation,
        ShopAddress: shopAddress,
      };
      var uploadImages = [];
      for (let i = 0; i < images.length; i++) {
        uploadImages.push({ files: images[i].file });
      }
      handleSaveUpdateProduct(submitObj, uploadImages, removeImages, productId);
      handleCloseModal();
    }
  };
  const resetModal = () => {
    setProduct({
      name: "",
      description: "",
      price: 0,
      quantity_in_stock: 1,
    });
    setShopAddress({
      city: "",
      district: "",
      ward: "",
      detail_address: "",
    });
    setVariation({
      brand: "",
      color: "",
      condition: "",
      type: "",
      warranty: "",
      specification: "",
    });
    setImages([]);
    setUpdateImages([]);
  };
  const closeModal = () => {
    setShowModal({ isShow: false, action: 0 });
  };
  const handleCloseModal = () => {
    resetModal();
    closeModal();
    dispatch(resetUpdateProduct());
  };
  const handleErrorUploadImage = () => {
    notifyService.showError("The limit number of upload images is 8");
  };
  const handleRemoveUploadedImage = (imageKey) => {
    let filter_product_image = updateImages.filter((x) => x.link !== imageKey);
    setUpdateImages([...filter_product_image]);
    setRemoveImages([...removeImages, imageKey]);
  };
  const handleCheckFormIsValid = () => {
    if (
      name === "" ||
      description === "" ||
      city === "" ||
      district === "" ||
      ward == "" ||
      detail_address == "" ||
      brand === "" ||
      color === "" ||
      condition === "" ||
      type === "" ||
      warranty === "" ||
      specification === ""
    ) {
      setCreateProductValidation({
        name: name !== "" ? true : false,
        description: description !== "" ? true : false,
        brand: brand !== "" ? true : false,
        color: color !== "" ? true : false,
        condition: condition !== "" ? true : false,
        type: type !== "" ? true : false,
        warranty: warranty !== "" ? true : false,
        specification: specification !== "" ? true : false,
        city: city !== "" ? true : false,
        district: district !== "" ? true : false,
        ward: ward !== "" ? true : false,
        detail_address: detail_address !== "" ? true : false,
      });
      setIsFormValid(false);
      return false;
    }
    setIsFormValid(true);
    return true;
  };
  // #endregion
  // #region declare useEffect
  useEffect(() => {
    if (updateProductData?.ShopAddress) {
      setShopAddress(updateProductData?.ShopAddress);
    }
    if (updateProductData?.Variation) {
      setVariation(updateProductData?.Variation);
    }
    if (updateProductData) {
      setProduct({
        name: updateProductData?.name,
        description: updateProductData?.description,
        price: updateProductData?.price,
        quantity_in_stock: updateProductData?.quantity_in_stock,
      });
    }
    if (updateProductData?.product_image) {
      setUpdateImages(updateProductData.product_image);
    }
    if (updateProductData?.product_id) {
      setProductId(updateProductData?.product_id);
    }
    if (!updateProductData) {
      resetModal();
    }
  }, [updateProductData, showManagerModal]);
  // #endregion
  return (
    <Modal open={showManagerModal.isShow} onClose={closeModal}>
      <div className="managerProductModal border-[1px] w-[80%] border-gray-400 rounded-xl gap-[2rem] fixed p-[2rem] top-[50%] left-[50%]  bg-white translate-x-[-50%] translate-y-[-50%]">
        <div className="detail-product-info flex gap-[2rem] ">
          <div className="first-col-info flex flex-col gap-[2rem] flex-1">
            <TextField
              variant="standard"
              defaultValue="Image"
              InputProps={{
                readOnly: true,
              }}
            />
            <ImageUploading
              onError={handleErrorUploadImage}
              multiple
              value={images}
              onChange={onChange}
              maxNumber={8}
              dataURLKey="data_url"
            >
              {({ imageList, onImageUpload, onImageRemove }) => (
                // write your building UI
                <div className="upload__image-wrapper">
                  {!imageList.length > 0 && !updateImages.length && (
                    <div
                      onClick={onImageUpload}
                      className="h-[21rem] rounded-[1rem] p-[0.8rem] border-[0.1rem] border-gray-300 cursor-pointer mb-[2rem]"
                    >
                      <div className="rounded-[1rem] bg-gray-100 flex justify-center items-center h-full hover:bg-gray-200 relative">
                        <div className="bg-gray-300 p-[1rem] rounded-[50%]">
                          <PhotoLibrary
                            className=" "
                            style={{ fontSize: "3rem" }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  {((imageList && imageList.length > 0) ||
                    (updateImages && updateImages.length > 0)) && (
                    <div className="relative rounded-xl mb-[2rem] flex gap-[2rem] flex-col ">
                      <ul className="flex flex-wrap gap-[1rem] justify-center shadow-2xl rounded-lg py-[2rem]  ">
                        {updateImages &&
                          updateImages.map((image) => (
                            <li key={image} className="relative ">
                              <a href={image.link}>
                                <img
                                  src={image.link}
                                  alt="not found"
                                  onError={({ currentTarget }) => {
                                    currentTarget.onerror = null; // prevents looping
                                    currentTarget.src = notFoundImage;
                                  }}
                                  className="w-[150px] h-[150px] object-cover rounded-xl "
                                  style={{ cursor: "default" }}
                                />
                              </a>
                              <div
                                onClick={() =>
                                  handleRemoveUploadedImage(image.link)
                                }
                                className="Remove-Photo-button absolute cursor-pointer top-0"
                              >
                                <Button
                                  style={{
                                    color: "white",
                                    background: "var(--primary-color)",
                                  }}
                                >
                                  x
                                </Button>
                              </div>
                            </li>
                          ))}

                        {imageList.map((image, index) => (
                          <li key={index} className="relative ">
                            <a href={image["data_url"]}>
                              <img
                                src={image["data_url"]}
                                alt="not found"
                                onError={({ currentTarget }) => {
                                  currentTarget.onerror = null; // prevents looping
                                  currentTarget.src = notFoundImage;
                                }}
                                className="w-[150px] h-[150px] object-cover rounded-xl "
                                style={{ cursor: "default" }}
                              />
                            </a>
                            <div
                              onClick={() => onImageRemove(index)}
                              className="Remove-Photo-button absolute cursor-pointer top-0"
                            >
                              <Button
                                style={{
                                  color: "white",
                                  background: "var(--primary-color)",
                                }}
                              >
                                x
                              </Button>
                            </div>
                          </li>
                        ))}
                      </ul>
                      <div className="Add-Photo-button">
                        <Button
                          style={{
                            color: "white",
                            background: "var(--primary-color)",
                          }}
                          onClick={onImageUpload}
                        >
                          <span className=" capitalize">Add Photos</span>
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </ImageUploading>
          </div>
          <div className="sec-col-info flex flex-col gap-[2rem] flex-1">
            <TextField
              variant="standard"
              defaultValue="Title & Description"
              InputProps={{
                readOnly: true,
              }}
            />
            <FormControl className="Name">
              <TextField
                value={name}
                error={!createProductValidation.name}
                helperText={!isFormValid ? "This field is required" : ""}
                label="Name"
                name="name"
                variant="outlined"
                onChange={handleOnChangeProductInfo}
              />
            </FormControl>
            <FormControl className="Description">
              <TextField
                value={description}
                error={!createProductValidation.description}
                helperText={!isFormValid ? "This field is required" : ""}
                multiline
                rows={4.3}
                label="Description"
                variant="outlined"
                name="description"
                onChange={handleOnChangeProductInfo}
              />
            </FormControl>
            <FormControl className="Price">
              <TextField
                value={price}
                type="number"
                name="price"
                InputProps={{ inputProps: { min: 0 } }}
                label="Price"
                variant="outlined"
                onChange={handleOnChangeProductInfo}
              />
            </FormControl>
          </div>
          <div className="third-col-info flex flex-col gap-[2rem] flex-1">
            <TextField
              variant="standard"
              defaultValue="Information & Details"
              InputProps={{
                readOnly: true,
              }}
            />
            <FormControl className="Color">
              <InputLabel id="select-label-color">Color</InputLabel>
              <Select
                value={color}
                error={!createProductValidation.color}
                name="color"
                labelId="select-label-color"
                label="Color"
                onChange={handleOnChangeVariation}
              >
                {xColor &&
                  xColor.map((color) => (
                    <MenuItem key={color} value={color}>
                      <span className="capitalize">{color}</span>
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <FormControl className="Brand">
              <InputLabel id="select-label-brand">Brand</InputLabel>
              <Select
                value={brand}
                error={!createProductValidation.brand}
                name="brand"
                labelId="select-label-brand"
                label="Brand"
                onChange={handleOnChangeVariation}
              >
                {xBrands &&
                  xBrands.map((brand) => (
                    <MenuItem key={brand} value={brand}>
                      <span className="capitalize">{brand}</span>
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <FormControl className="Condition">
              <InputLabel id="select-label-condition">Condition</InputLabel>
              <Select
                value={condition}
                error={!createProductValidation.condition}
                name="condition"
                labelId="select-label-condition"
                label="Condition"
                onChange={handleOnChangeVariation}
              >
                {conditions &&
                  conditions.map((condition) => (
                    <MenuItem key={condition} value={condition}>
                      <span className="capitalize">{condition}</span>
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <FormControl className="Warranty">
              <InputLabel id="select-label-warranty">Warranty</InputLabel>
              <Select
                value={warranty}
                error={!createProductValidation.warranty}
                name="warranty"
                labelId="select-label-warranty"
                label="Warranty"
                onChange={handleOnChangeVariation}
              >
                {warranties &&
                  warranties.map((warranty) => (
                    <MenuItem key={warranty} value={warranty}>
                      <span className="capitalize">{warranty}</span>
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <FormControl className="Quantity">
              <TextField
                value={quantity_in_stock}
                type="number"
                label="Quantity"
                variant="outlined"
                name="quantity_in_stock"
                InputProps={{ inputProps: { min: 1, max: 100 } }}
                onChange={handleOnChangeProductInfo}
              />
            </FormControl>
            <FormControl className="Type">
              <TextField
                value={type}
                error={!createProductValidation.type}
                helperText={!isFormValid ? "This field is required" : ""}
                label="Type"
                name="type"
                variant="outlined"
                onChange={handleOnChangeVariation}
              />
            </FormControl>
            <FormControl className="Specification">
              <TextField
                value={specification}
                error={!createProductValidation.specification}
                multiline
                rows={4.3}
                label="Specification"
                variant="outlined"
                name="specification"
                onChange={handleOnChangeVariation}
              />
            </FormControl>
          </div>
          <div className="fourth-col-info flex flex-col gap-[2rem] flex-1">
            <TextField
              variant="standard"
              defaultValue="Address"
              InputProps={{
                readOnly: true,
              }}
            />
            <FormControl className="City">
              <InputLabel id="select-label-city">City</InputLabel>
              <Select
                value={city}
                error={!createProductValidation.city}
                name="city"
                labelId="select-label-city"
                label="City"
                onChange={handleOnChangeShopAddress}
              >
                {cities &&
                  cities.map((city) => (
                    <MenuItem key={city} value={city}>
                      <span className="capitalize">{city}</span>
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <FormControl className="District">
              <InputLabel id="select-label-district">District</InputLabel>
              <Select
                value={district}
                error={!createProductValidation.district}
                name="district"
                labelId="select-label-district"
                label="District"
                onChange={handleOnChangeShopAddress}
              >
                {cities &&
                  cities.map((city) => (
                    <MenuItem key={city} value={city}>
                      <span className="capitalize">{city}</span>
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <FormControl className="Ward">
              <InputLabel id="select-label-ward">Ward</InputLabel>
              <Select
                value={ward}
                error={!createProductValidation.ward}
                name="ward"
                labelId="select-label-ward"
                label="Ward"
                onChange={handleOnChangeShopAddress}
              >
                {cities &&
                  cities.map((city) => (
                    <MenuItem key={city} value={city}>
                      <span className="capitalize">{city}</span>
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <FormControl className="Detail Address">
              <TextField
                value={detail_address}
                error={!createProductValidation.detail_address}
                helperText={!isFormValid ? "This field is required" : ""}
                label="Detail Address"
                name="detail_address"
                multiline
                rows={4.3}
                variant="outlined"
                onChange={handleOnChangeShopAddress}
              />
            </FormControl>
          </div>
        </div>
        {showManagerModal.action == 1 && (
          <Button onClick={handleSubmit}>Submit</Button>
        )}
        {showManagerModal.action == 2 && (
          <Button onClick={handleSave}>Save</Button>
        )}
        <Button onClick={handleCloseModal}>Cancel</Button>
      </div>
    </Modal>
  );
}

export default ManagerProductModal;
