import React from 'react';
import { Link } from 'react-router-dom';
import VendorSidebar from '../components/VendorSidebar';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function VendorAddProduct() {
  return (
    <>
      <Header />
<main className="max-w-container-max mx-auto px-gutter py-lg">

<div className="mb-lg">
<div className="flex items-center gap-base text-secondary mb-base">
<span className="font-label-sm text-label-sm">Inventory</span>
<span className="material-symbols-outlined text-[16px]">chevron_right</span>
<span className="font-label-sm text-label-sm text-primary">New Product</span>
</div>
<h1 className="font-headline-lg text-headline-lg">Add New Product</h1>
</div>

<div className="bg-surface-container-lowest rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] overflow-hidden border border-surface-container-high">
<form className="p-lg" id="productForm">

<div className="mb-lg">
<label className="font-label-md text-label-md block mb-xs">Product Imagery</label>
<div className="border-2 border-dashed border-primary-container bg-primary-fixed/10 rounded-xl p-xl flex flex-col items-center justify-center cursor-pointer hover:bg-primary-fixed/20 transition-all group">
<span className="material-symbols-outlined text-[48px] text-primary mb-sm group-hover:scale-110 transition-transform" style={{fontVariationSettings: "'FILL' 1"}}>cloud_upload</span>
<div className="text-center">
<p className="font-body-md text-body-md text-on-surface font-bold">Drag and drop product images</p>
<p className="font-label-sm text-label-sm text-secondary">Supports JPG, PNG, WEBP. Recommended 1200x1200px.</p>
</div>
</div>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-xl">

<div className="space-y-gutter">
<div className="space-y-xs">
<label className="font-label-md text-label-md block" htmlFor="productName">Product Name</label>
<input className="w-full px-sm py-xs bg-surface-container-lowest border border-surface-variant rounded-lg font-body-md text-body-md text-on-surface transition-all" id="productName" placeholder="e.g. Minimalist Ceramic Vase" type="text"/>
</div>
<div className="space-y-xs">
<label className="font-label-md text-label-md block" htmlFor="category">Category</label>
<select className="w-full px-sm py-xs bg-surface-container-lowest border border-surface-variant rounded-lg font-body-md text-body-md text-on-surface appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%235f5e5e%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:20px_20px] bg-[right_12px_center] bg-no-repeat" id="category">
<option value="">Select Category</option>
<option value="home-decor">Home Decor</option>
<option value="electronics">Electronics</option>
<option value="apparel">Apparel</option>
<option value="furniture">Furniture</option>
</select>
</div>
<div className="space-y-xs">
<label className="font-label-md text-label-md block" htmlFor="description">Description</label>
<textarea className="w-full px-sm py-xs bg-surface-container-lowest border border-surface-variant rounded-lg font-body-md text-body-md text-on-surface transition-all resize-none" id="description" placeholder="Describe the product details, materials, and unique features..." rows="6"></textarea>
</div>
</div>

<div className="space-y-gutter">
<div className="bg-surface-container-low p-sm rounded-lg border border-surface-variant">
<h3 className="font-label-md text-label-md text-primary mb-sm uppercase tracking-wider">Pricing &amp; Value</h3>
<div className="grid grid-cols-2 gap-sm">
<div className="space-y-xs">
<label className="font-label-sm text-label-sm block" htmlFor="price">Base Price ($)</label>
<input className="w-full px-sm py-xs bg-surface-container-lowest border border-surface-variant rounded-lg font-body-md text-body-md text-on-surface transition-all" id="price" placeholder="0.00" type="number"/>
</div>
<div className="space-y-xs">
<label className="font-label-sm text-label-sm block" htmlFor="salePrice">Sale Price ($)</label>
<input className="w-full px-sm py-xs bg-surface-container-lowest border border-surface-variant rounded-lg font-body-md text-body-md text-on-surface transition-all" id="salePrice" placeholder="Optional" type="number"/>
</div>
</div>
</div>
<div className="bg-surface-container-low p-sm rounded-lg border border-surface-variant">
<h3 className="font-label-md text-label-md text-primary mb-sm uppercase tracking-wider">Inventory Management</h3>
<div className="space-y-gutter">
<div className="grid grid-cols-2 gap-sm">
<div className="space-y-xs">
<label className="font-label-sm text-label-sm block" htmlFor="sku">SKU</label>
<input className="w-full px-sm py-xs bg-surface-container-lowest border border-surface-variant rounded-lg font-body-md text-body-md text-on-surface transition-all" id="sku" placeholder="VNDX-001" type="text"/>
</div>
<div className="space-y-xs">
<label className="font-label-sm text-label-sm block" htmlFor="stock">Stock Quantity</label>
<input className="w-full px-sm py-xs bg-surface-container-lowest border border-surface-variant rounded-lg font-body-md text-body-md text-on-surface transition-all" id="stock" placeholder="0" type="number"/>
</div>
</div>
<div className="flex items-center gap-xs">
<input className="w-5 h-5 rounded border-outline text-primary focus:ring-primary" id="trackInventory" type="checkbox"/>
<label className="font-body-sm text-body-sm text-on-surface" htmlFor="trackInventory">Enable inventory tracking for this item</label>
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
<button className="w-full md:w-auto px-lg py-sm bg-surface-container-lowest border border-primary text-primary rounded-lg font-label-md text-label-md hover:bg-surface-container-low transition-colors active:opacity-80" type="button">
                        Save Draft
                    </button>
<button className="w-full md:w-auto px-xl py-sm bg-primary-container text-on-primary rounded-lg font-label-md text-label-md hover:bg-[#96101F] transition-colors shadow-sm active:opacity-80" type="submit">
                        Publish Product
                    </button>
</div>
</form>
</div>
</main>

<Footer />
    </>
  );
}
