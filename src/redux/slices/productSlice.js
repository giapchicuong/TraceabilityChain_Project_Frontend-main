import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { SMART_CONTRACT } from "../../utils/constants";
import { ethers } from "ethers";
import { useContract, useContractWrite } from "@thirdweb-dev/react";

export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async (_, thunkAPI) => {
    const { contract } = useContract(SMART_CONTRACT);
    const products = await contract.call("getAllProducts");
    const parsedProducts = products.map((product, i) => ({
      name: product.name,
      title: product.title,
      description: product.description,
      typeProduct: product.typeProduct,
      price: ethers.utils.formatEther(product.price.toString()),
      image: product.image,
      userId: product.userId,
      pId: i,
    }));
    return parsedProducts;
  }
);
export const publishProduct = createAsyncThunk(
  "products/publishProduct",
  async (formData, thunkAPI) => {
    const { contract } = useContractWrite(SMART_CONTRACT, "createProduct");
    try {
      const data = await contract({
        args: [
          formData.name, // title
          formData.description, // description
          formData.typeProduct, // type product
          formData.price,
          formData.image,
        ],
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const getUserProducts = createAsyncThunk(
  "products/getUserProducts",
  async (_, thunkAPI) => {
    const allProducts = await thunkAPI.dispatch(getAllProducts());
    const address = thunkAPI.getState().user.address;
    const filteredProducts = allProducts.filter(
      (product) => product.userId === address
    );
    return filteredProducts;
  }
);

export const searchProduct = createAsyncThunk(
  "products/searchProduct",
  async (searchData, thunkAPI) => {
    const { contract } = useContractWrite(SMART_CONTRACT, "searchProduct");
    try {
      const data = await contract({
        args: [searchData.id],
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(publishProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(publishProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(publishProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(searchProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(searchProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getUserProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(getUserProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default productsSlice.reducer;
