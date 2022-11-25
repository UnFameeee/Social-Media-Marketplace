import {
  Modal,
  Avatar,
  Button,
  IconButton,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputAdornment,
  InputLabel,
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

function ManagerProductModal({
  showModal,
  setShowModal,
  handleSubmitCreateProduct,
  ...props
}) {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: 0,
    quantity_in_stock: 0,
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
  const closeModal = () => {
    setShowModal(false);
  };
  const handleChangeVariation = (event) => {
    setVariation({ ...variation, [event.target.name]: event.target.value });
  };
  const handleOnChangeProductInfo = (event) => {
    setProduct({ ...product, [event.target.name]: event.target.value });
  };
  const handleOnChangeShopAddress = (event) => {
    setShopAddress({ ...shopAddress, [event.target.name]: event.target.value });
  };
  const handleSubmit = () => {
    let submitObj = {
      ...product,
      Variation: variation,
      ShopAddress: shopAddress,
    };
    console.log("product", submitObj);
    var uploadImages = [];
    for (let i = 0; i < images.length; i++) {
      uploadImages.push({ files: images[i].file });
    }
    handleSubmitCreateProduct(submitObj,uploadImages);
    resetInputField()
  };
  const resetInputField = () =>{
    setProduct({
        name: "",
        description: "",
        price: 0,
        quantity_in_stock: 0,
      })
    setProduct({
        city: "",
        district: "",
        ward: "",
        detail_address: "",
      })
    setVariation({
        brand: "",
        color: "",
        condition: "",
        type: "",
        warranty: "",
        specification: "",
      })
      setImages([])
      setShowModal(false);
  }
  const onChange = (imageList) => {
    setImages(imageList);
  };
  const handleErrorUploadImage = () => {
    notifyService.showError("The limit number of upload images is 8");
  };
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
  return (
    <Modal open={showModal} onClose={closeModal}>
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
                  {!imageList.length > 0 && (
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
                  {imageList && imageList.length > 0 && (
                    <div className="relative rounded-xl mb-[2rem] flex gap-[2rem] flex-col ">
                      <ul className="flex flex-wrap gap-[1rem] justify-center shadow-2xl rounded-lg py-[2rem]  ">
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
                label="Name"
                name="name"
                multiline
                variant="outlined"
                onChange={handleOnChangeProductInfo}
              />
            </FormControl>
            <FormControl className="Description">
              <TextField
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
                name="color"
                labelId="select-label-color"
                value={variation.color}
                label="Color"
                onChange={handleChangeVariation}
              >
                {xColor &&
                  xColor.map((color) => (
                    <MenuItem value={color}>
                      <span className="capitalize">{color}</span>
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <FormControl className="Brand">
              <InputLabel id="select-label-brand">Brand</InputLabel>
              <Select
                name="brand"
                labelId="select-label-brand"
                value={variation.brand}
                label="Brand"
                onChange={handleChangeVariation}
              >
                {xBrands &&
                  xBrands.map((brand) => (
                    <MenuItem value={brand}>
                      <span className="capitalize">{brand}</span>
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <FormControl className="Condition">
              <InputLabel id="select-label-condition">Condition</InputLabel>
              <Select
                name="condition"
                labelId="select-label-condition"
                value={variation.condition}
                label="Condition"
                onChange={handleChangeVariation}
              >
                {conditions &&
                  conditions.map((condition) => (
                    <MenuItem value={condition}>
                      <span className="capitalize">{condition}</span>
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <FormControl className="Warranty">
              <InputLabel id="select-label-warranty">Warranty</InputLabel>
              <Select
                name="warranty"
                labelId="select-label-warranty"
                value={variation.warranty}
                label="Warranty"
                onChange={handleChangeVariation}
              >
                {warranties &&
                  warranties.map((warranty) => (
                    <MenuItem value={warranty}>
                      <span className="capitalize">{warranty}</span>
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <FormControl className="Quantity">
              <TextField
                type="number"
                label="Quantity"
                variant="outlined"
                name="quantity_in_stock"
                InputProps={{ inputProps: { min: 0, max: 100 } }}
                onChange={handleOnChangeProductInfo}
              />
            </FormControl>
            <FormControl className="Type">
              <TextField
                label="Type"
                name="type"
                variant="outlined"
                onChange={handleChangeVariation}
              />
            </FormControl>
            <FormControl className="Specification">
              <TextField
                multiline
                rows={4.3}
                label="Specification"
                variant="outlined"
                name="specification"
                onChange={handleChangeVariation}
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
                name="city"
                labelId="select-label-city"
                value={shopAddress.city}
                label="City"
                onChange={handleOnChangeShopAddress}
              >
                {cities &&
                  cities.map((city) => (
                    <MenuItem value={city}>
                      <span className="capitalize">{city}</span>
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <FormControl className="District">
              <InputLabel id="select-label-district">District</InputLabel>
              <Select
                name="district"
                labelId="select-label-district"
                value={shopAddress.district}
                label="District"
                onChange={handleOnChangeShopAddress}
              >
                {cities &&
                  cities.map((city) => (
                    <MenuItem value={city}>
                      <span className="capitalize">{city}</span>
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <FormControl className="Ward">
              <InputLabel id="select-label-ward">Ward</InputLabel>
              <Select
                name="ward"
                labelId="select-label-ward"
                value={shopAddress.ward}
                label="Ward"
                onChange={handleOnChangeShopAddress}
              >
                {cities &&
                  cities.map((city) => (
                    <MenuItem value={city}>
                      <span className="capitalize">{city}</span>
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <FormControl className="Detail Address">
              <TextField
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
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
    </Modal>
  );
}

export default ManagerProductModal;
