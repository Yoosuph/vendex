import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MarketplaceContext } from '@/shared/context/MarketplaceContext';
import { AuthContext } from '@/shared/context/AuthContext';
import Button from '@/shared/components/Button';
import { cn } from '@/utils/cn';
import useForm from '@/shared/hooks/useForm';
import LoadingSpinner from '@/shared/components/LoadingSpinner';

export default function VendorAddProduct() {
  const { addProduct } = useContext(MarketplaceContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const { values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting } = useForm({
    initialValues: {
      name: '',
      category: '',
      brand: '',
      price: '',
      stock: '',
      description: '',
      image: '',
    },
    validate: (vals) => {
      const newErrors = {};
      if (!vals.name.trim()) newErrors.name = 'Product name is required';
      if (!vals.category) newErrors.category = 'Category is required';
      if (!vals.price || parseFloat(vals.price) <= 0) newErrors.price = 'Valid price is required';
      if (!vals.stock || parseInt(vals.stock) < 0) newErrors.stock = 'Valid stock quantity is required';
      if (!vals.image.trim()) newErrors.image = 'Image URL is required';
      return newErrors;
    },
    onSubmit: async (vals) => {
      const productData = {
        ...vals,
        price: parseFloat(vals.price),
        stock: parseInt(vals.stock),
        vendorId: user?.vendorId,
        vendor: user?.name,
      };
      addProduct(productData, user?.name);
      navigate('/vendor/products');
    },
  });

  if (isSubmitting) return <LoadingSpinner text="Publishing product..." />;

  return (
    <div className="max-w-container-max mx-auto px-gutter py-lg">
      <div className="mb-lg">
        <div className="flex items-center gap-base text-secondary mb-base">
          <span className="font-label-sm text-label-sm">Inventory</span>
          <span className="material-symbols-outlined text-body-md">chevron_right</span>
          <span className="font-label-sm text-label-sm text-primary">New Product</span>
        </div>
        <h1 className="font-headline-lg text-headline-lg">Add New Product</h1>
      </div>

      <div className="bg-surface-container-lowest rounded-xl shadow-card overflow-hidden border border-outline-variant">
        <form className="p-lg" onSubmit={handleSubmit}>
          <div className="mb-lg">
            <label className="font-label-md text-label-md block mb-xs">Product Imagery</label>
            <div className="border-2 border-dashed border-primary-container bg-primary-fixed/10 rounded-xl p-xl flex flex-col items-center justify-center cursor-pointer hover:bg-primary-fixed/20 transition-all group">
              <span className="material-symbols-outlined text-5xl text-primary mb-sm group-hover:scale-110 transition-transform icon-filled">cloud_upload</span>
              <div className="text-center">
                <p className="font-body-md text-body-md text-on-surface font-bold">Provide Image URL below</p>
                <p className="font-label-sm text-label-sm text-secondary">Paste a product image URL. Supports JPG, PNG, WEBP.</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-xl">
            <div className="space-y-gutter">
              <div className="space-y-xs">
                <label className="font-label-md text-label-md block" htmlFor="name">Product Name</label>
                <input
                  className={cn('w-full px-sm py-xs bg-surface-container-lowest border rounded-lg font-body-md text-body-md text-on-surface transition-all', touched.name && errors.name ? 'border-error' : 'border-surface-variant')}
                  id="name"
                  name="name"
                  placeholder="e.g. Minimalist Ceramic Vase"
                  type="text"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.name && errors.name && <p className="text-error font-meta text-meta">{errors.name}</p>}
              </div>
              <div className="space-y-xs">
                <label className="font-label-md text-label-md block" htmlFor="category">Category</label>
                <select
                  className={cn('w-full px-sm py-xs bg-surface-container-lowest border rounded-lg font-body-md text-body-md text-on-surface appearance-none', touched.category && errors.category ? 'border-error' : 'border-surface-variant')}
                  id="category"
                  name="category"
                  value={values.category}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="">Select Category</option>
                  <option value="home-decor">Home Decor</option>
                  <option value="electronics">Electronics</option>
                  <option value="apparel">Apparel</option>
                  <option value="furniture">Furniture</option>
                </select>
                {touched.category && errors.category && <p className="text-error font-meta text-meta">{errors.category}</p>}
              </div>
              <div className="space-y-xs">
                <label className="font-label-md text-label-md block" htmlFor="brand">Brand</label>
                <input
                  className="w-full px-sm py-xs bg-surface-container-lowest border border-surface-variant rounded-lg font-body-md text-body-md text-on-surface transition-all"
                  id="brand"
                  name="brand"
                  placeholder="e.g. Vendex"
                  type="text"
                  value={values.brand}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-xs">
                <label className="font-label-md text-label-md block" htmlFor="description">Description</label>
                <textarea
                  className="w-full px-sm py-xs bg-surface-container-lowest border border-surface-variant rounded-lg font-body-md text-body-md text-on-surface transition-all resize-none"
                  id="description"
                  name="description"
                  placeholder="Describe the product details, materials, and unique features..."
                  rows="6"
                  value={values.description}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="space-y-xs">
                <label className="font-label-md text-label-md block" htmlFor="image">Image URL</label>
                <input
                  className={cn('w-full px-sm py-xs bg-surface-container-lowest border rounded-lg font-body-md text-body-md text-on-surface transition-all', touched.image && errors.image ? 'border-error' : 'border-surface-variant')}
                  id="image"
                  name="image"
                  placeholder="https://example.com/image.jpg"
                  type="text"
                  value={values.image}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.image && errors.image && <p className="text-error font-meta text-meta">{errors.image}</p>}
              </div>
            </div>

            <div className="space-y-gutter">
              <div className="bg-surface-container-low p-sm rounded-lg border border-surface-variant">
                <h3 className="font-label-md text-label-md text-primary mb-sm uppercase tracking-wider">Pricing & Value</h3>
                <div className="grid grid-cols-2 gap-sm">
                  <div className="space-y-xs">
                    <label className="font-label-sm text-label-sm block" htmlFor="price">Base Price ($)</label>
                    <input
                      className={cn('w-full px-sm py-xs bg-surface-container-lowest border rounded-lg font-body-md text-body-md text-on-surface transition-all', touched.price && errors.price ? 'border-error' : 'border-surface-variant')}
                      id="price"
                      name="price"
                      placeholder="0.00"
                      type="number"
                      step="0.01"
                      value={values.price}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.price && errors.price && <p className="text-error font-meta text-meta">{errors.price}</p>}
                  </div>
                </div>
              </div>
              <div className="bg-surface-container-low p-sm rounded-lg border border-surface-variant">
                <h3 className="font-label-md text-label-md text-primary mb-sm uppercase tracking-wider">Inventory Management</h3>
                <div className="space-y-gutter">
                  <div className="space-y-xs">
                    <label className="font-label-sm text-label-sm block" htmlFor="stock">Stock Quantity</label>
                    <input
                      className={cn('w-full px-sm py-xs bg-surface-container-lowest border rounded-lg font-body-md text-body-md text-on-surface transition-all', touched.stock && errors.stock ? 'border-error' : 'border-surface-variant')}
                      id="stock"
                      name="stock"
                      placeholder="0"
                      type="number"
                      value={values.stock}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.stock && errors.stock && <p className="text-error font-meta text-meta">{errors.stock}</p>}
                  </div>
                </div>
              </div>
              <div className="p-sm bg-primary-fixed/5 border border-outline-variant/30 rounded-lg">
                <div className="flex gap-sm">
                  <span className="material-symbols-outlined text-primary">info</span>
                  <div>
                    <p className="font-label-md text-label-md text-primary-container">Visibility Note</p>
                    <p className="font-body-sm text-body-sm text-secondary">Once published, this product will be visible to all Vendex shoppers and listed in the marketplace search results.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-xl flex flex-col md:flex-row items-center justify-end gap-sm pt-lg border-t border-surface-variant">
 <Button
 variant="outline"
 type="button"
 onClick={() => navigate('/vendor/products')}
 className="w-full md:w-auto"
 >
 Cancel
 </Button>
 <Button
 variant="primary-container"
 type="submit"
 className="w-full md:w-auto"
 >
 Publish Product
 </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
