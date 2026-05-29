import React, { useState, useContext, useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { MarketplaceContext } from '@/shared/context/MarketplaceContext';
import { CartContext } from "@/shared/context/CartContext";
import Button from '@/shared/components/Button';
import { useToast } from '@/shared/context/ToastContext';
import StarRating from '@/shared/components/StarRating';
import LoadingSpinner from '@/shared/components/LoadingSpinner';
import ErrorState from '@/shared/components/ErrorState';
import EmptyState from '@/shared/components/EmptyState';
import { motion } from 'framer-motion';

export default function ProductDetail() {
  const { id } = useParams();
  const { products, addReview } = useContext(MarketplaceContext);
  const { addToCart, toggleWishlist, wishlist } = useContext(CartContext);
  const { addToast } = useToast();
  const navigate = useNavigate();

  const product = useMemo(() => {
    if (!products || products.length === 0) return null;
    return products.find(p => p.id === id) || null;
  }, [products, id]);

  const isWished = product ? wishlist.some(item => item.id === product.id) : false;

  const [selectedImage, setSelectedImage] = useState(null);
  const [activeTab, setActiveTab] = useState('description');
  const [addedMessage, setAddedMessage] = useState(false);

  // Review form state
  const [reviewScore, setReviewScore] = useState(0);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewName, setReviewName] = useState('');
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewError, setReviewError] = useState('');

  // Set initial selected image when product loads
  React.useEffect(() => {
    if (product && !selectedImage) {
      setSelectedImage(product.images && product.images.length > 0 ? product.images[0] : product.image);
    }
  }, [product, selectedImage]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, 1);
    setAddedMessage(true);
    setTimeout(() => setAddedMessage(false), 2000);
  };

  const handleBuyNow = () => {
    if (!product) return;
    addToCart(product, 1);
    navigate('/cart');
  };

  const handleToggleWishlist = () => {
    if (!product) return;
    toggleWishlist(product);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    setReviewError('');

    if (!reviewScore) {
      setReviewError('Please select a star rating.');
      return;
    }
    if (!reviewComment.trim()) {
      setReviewError('Please write a review comment.');
      return;
    }
    if (!reviewName.trim()) {
      setReviewError('Please enter your name.');
      return;
    }

    setReviewSubmitting(true);
    addReview(product.id, {
      reviewer: reviewName.trim(),
      score: reviewScore,
      comment: reviewComment.trim(),
    });
    addToast('Review submitted successfully!', 'success');
    setReviewScore(0);
    setReviewComment('');
    setReviewName('');
    setReviewSubmitting(false);
  };

  // Loading state: products array not yet available
  if (!products || products.length === 0) {
    return (
      <main className="max-w-container-max mx-auto px-gutter py-xl">
        <LoadingSpinner text="Loading product details..." size="lg" />
      </main>
    );
  }

  // Error state: product not found
  if (!product) {
    return (
      <main className="max-w-container-max mx-auto px-gutter py-xl">
        <ErrorState message="Product not found" />
      </main>
    );
  }

  const isOutOfStock = product.stock === 0;
  const currentImage = selectedImage || product.image;
  const images = product.images && product.images.length > 0 ? product.images : [product.image];
  const ratingRounded = Math.round(product.rating || 0);

  return (
    <>
      <main className="max-w-container-max mx-auto px-gutter py-xl">
        {addedMessage && (
          <div className="fixed top-20 right-4 z-50 bg-green-600 text-white px-md py-sm rounded-xl shadow-lg flex items-center gap-xs animate-bounce">
            <span className="material-symbols-outlined">check_circle</span>
            <span>Added to Cart!</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-12 gap-xl items-start">
          {/* Left Column: Image Gallery */}
          <section className="md:col-span-7 flex flex-col gap-md">
            <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-outline-variant/30">
              <img
                alt={product.name}
                className="w-full aspect-square object-cover transition-all duration-300"
                id="main-product-image"
                src={currentImage}
              />
            </div>
            {images.length > 1 && (
              <div className="flex gap-sm overflow-x-auto pb-2">
                {images.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    className={`w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden border transition-colors ${
                      currentImage === imgUrl ? 'border-primary ring-2 ring-primary/20' : 'border-outline-variant hover:border-primary'
                    }`}
                    onClick={() => setSelectedImage(imgUrl)}
                  >
                    <img alt={`${product.name} - View ${idx + 1}`} className="w-full h-full object-cover" src={imgUrl} />
                  </button>
                ))}
              </div>
            )}
          </section>

          {/* Right Column: Product Info */}
          <section className="md:col-span-5 flex flex-col gap-lg">
            <div>
              <h1 className="font-headline-lg text-headline-lg text-on-surface mb-xs">{product.name}</h1>
              <div className="flex items-center gap-xs font-body-md">
                <span className="text-on-surface-variant">Vendor:</span>
                <Link className="text-primary font-bold hover:underline" to="/vendor/storefront">
                  {product.vendor}
                </Link>
                <div className="flex items-center text-primary ml-auto">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className="material-symbols-outlined text-body-lg"
                      style={{ fontVariationSettings: star <= ratingRounded ? "'FILL' 1" : "'FILL' 0" }}
                    >
                      {star <= ratingRounded ? 'star' : 'star_outline'}
                    </span>
                  ))}
                  <span className="ml-1 text-on-surface-variant text-label-md">({product.reviewsCount || 0} Reviews)</span>
                </div>
              </div>
            </div>

            <div className="flex items-end gap-md">
              <span className="text-primary font-bold text-headline-lg leading-none">${product.price.toFixed(2)}</span>
            </div>

            {/* Stock status */}
            {isOutOfStock && (
              <div className="p-md bg-error/10 border border-error/30 rounded-xl">
                <p className="text-error font-bold text-headline-md">Out of Stock</p>
              </div>
            )}
            {!isOutOfStock && product.stock <= 5 && (
              <div className="p-md bg-secondary/10 border border-secondary/30 rounded-xl">
                <p className="text-secondary font-bold text-headline-md">Only {product.stock} left in stock</p>
              </div>
            )}

            <div className="flex flex-col gap-md">
              <div className="flex flex-col gap-xs p-md bg-white border border-outline-variant rounded-xl shadow-sm">
                <div className="flex items-center gap-sm">
                  <span className="material-symbols-outlined text-secondary">local_shipping</span>
                  <span className="text-body-md font-medium">Estimated Delivery: <span className="text-on-surface">3-5 Business Days</span></span>
                </div>
                <div className="h-px bg-outline-variant my-1"></div>
                <div className="grid grid-cols-2 gap-md">
                  <div className="flex items-center gap-xs">
                    <span className="material-symbols-outlined text-body-lg text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
                    <span className="text-label-md font-bold text-on-surface-variant">Safe Payment</span>
                  </div>
                  <div className="flex items-center gap-xs">
                    <span className="material-symbols-outlined text-body-lg text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                    <span className="text-label-md font-bold text-on-surface-variant">Fast Delivery</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-sm">
 <Button
 variant="primary-container"
 fullWidth
 size="lg"
 disabled={isOutOfStock}
 onClick={handleAddToCart}
 className="shadow-sm"
 >
 {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
 </Button>
 <Button
 variant="outline"
 fullWidth
 size="lg"
 disabled={isOutOfStock}
 onClick={handleBuyNow}
 >
 Buy Now
 </Button>
 <Button
 variant={isWished ? 'outline' : 'outline'}
 fullWidth
 size="lg"
 icon={<span className="material-symbols-outlined" style={{ fontVariationSettings: isWished ? "'FILL' 1" : "'FILL' 0" }}>favorite</span>}
 onClick={handleToggleWishlist}
 className={isWished ? 'bg-primary/5' : ''}
 >
 {isWished ? 'Saved to Wishlist' : 'Add to Wishlist'}
 </Button>
              </div>
            </div>

            <div className="p-md rounded-xl bg-surface-container-low border border-outline-variant/50">
              <p className="text-body-sm text-on-surface-variant leading-relaxed">
                <span className="font-bold text-on-surface">Vendex Guarantee:</span> This product is verified for multi-vendor quality standards. Includes 1-year manufacturer warranty and 30-day no-hassle returns.
              </p>
            </div>
          </section>
        </div>

        {/* Content Tabs */}
        <section className="mt-xl">
          <div className="border-b border-outline-variant flex gap-xl overflow-x-auto">
            <button
              className={`pb-md text-headline-md whitespace-nowrap transition-all ${
                activeTab === 'description' ? 'border-bottom-2 border-primary text-primary font-bold border-b-2' : 'text-secondary hover:text-primary'
              }`}
              onClick={() => setActiveTab('description')}
            >
              Description
            </button>
            <button
              className={`pb-md text-headline-md whitespace-nowrap transition-all ${
                activeTab === 'specs' ? 'border-bottom-2 border-primary text-primary font-bold border-b-2' : 'text-secondary hover:text-primary'
              }`}
              onClick={() => setActiveTab('specs')}
            >
              Specs
            </button>
            <button
              className={`pb-md text-headline-md whitespace-nowrap transition-all ${
                activeTab === 'reviews' ? 'border-bottom-2 border-primary text-primary font-bold border-b-2' : 'text-secondary hover:text-primary'
              }`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews ({product.reviewsCount || 0})
            </button>
          </div>

          <div className="py-xl">
            {activeTab === 'description' && (
              <div className="tab-content grid grid-cols-1 md:grid-cols-2 gap-xl" id="content-description">
                <div className="flex flex-col gap-md">
                  <h3 className="text-headline-md">About this product</h3>
                  <p className="text-body-lg text-on-surface-variant">
                    {product.description || 'No description available for this product.'}
                  </p>
                  <ul className="flex flex-col gap-sm">
                    <li className="flex items-start gap-sm">
                      <span className="material-symbols-outlined text-primary mt-1">check_circle</span>
                      <span className="text-body-md">Verified multi-vendor quality standards.</span>
                    </li>
                    <li className="flex items-start gap-sm">
                      <span className="material-symbols-outlined text-primary mt-1">check_circle</span>
                      <span className="text-body-md">Precision-engineered for architectural stability.</span>
                    </li>
                    <li className="flex items-start gap-sm">
                      <span className="material-symbols-outlined text-primary mt-1">check_circle</span>
                      <span className="text-body-md">Universal connectivity via Vendex-Bridge architecture.</span>
                    </li>
                  </ul>
                </div>
                <div className="rounded-xl overflow-hidden shadow-md">
                  <img
                    alt={product.name}
                    className="w-full h-full object-cover"
                    src={currentImage}
                  />
                </div>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="tab-content flex flex-col gap-md" id="content-specs">
                <div className="bg-white rounded-xl border border-outline-variant overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <tbody>
                      <tr className="border-b border-outline-variant/30">
                        <td className="p-md font-bold text-on-surface bg-surface-container-low w-1/3">Brand</td>
                        <td className="p-md text-on-surface-variant">{product.brand || 'N/A'}</td>
                      </tr>
                      <tr className="border-b border-outline-variant/30">
                        <td className="p-md font-bold text-on-surface bg-surface-container-low">Category</td>
                        <td className="p-md text-on-surface-variant">{product.category || 'N/A'}</td>
                      </tr>
                      <tr className="border-b border-outline-variant/30">
                        <td className="p-md font-bold text-on-surface bg-surface-container-low">Vendor</td>
                        <td className="p-md text-on-surface-variant">{product.vendor || 'N/A'}</td>
                      </tr>
                      <tr className="border-b border-outline-variant/30">
                        <td className="p-md font-bold text-on-surface bg-surface-container-low">Stock</td>
                        <td className="p-md text-on-surface-variant">{product.stock ?? 'N/A'}</td>
                      </tr>
                      <tr>
                        <td className="p-md font-bold text-on-surface bg-surface-container-low">Warranty</td>
                        <td className="p-md text-on-surface-variant">1 Year Worldwide Limited</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="tab-content flex flex-col gap-lg" id="content-reviews">
                {product.reviews && product.reviews.length > 0 ? (
                  <div className="flex flex-col gap-md">
                    {product.reviews.map((review) => (
                      <div key={review.id} className="p-md border-b border-outline-variant/30">
                        <div className="flex items-center gap-sm mb-xs">
                          <span className="font-bold text-on-surface">{review.reviewer}</span>
                          <div className="flex text-primary">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <span
                                key={star}
                                className="material-symbols-outlined text-body-md"
                                style={{ fontVariationSettings: star <= (review.score || 0) ? "'FILL' 1" : "'FILL' 0" }}
                              >
                                {star <= (review.score || 0) ? 'star' : 'star_outline'}
                              </span>
                            ))}
                          </div>
                        </div>
                        <p className="text-body-md text-on-surface-variant italic">"{review.comment}"</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    icon="reviews"
                    title="No reviews yet"
                    description="Be the first to review this product."
                  />
                )}

                {/* Write a Review */}
                <div className="border-t border-outline-variant pt-lg">
                  <h3 className="font-headline-md text-headline-md text-on-surface mb-md">Write a Review</h3>
                  <form className="flex flex-col gap-md" onSubmit={handleReviewSubmit}>
                    {reviewError && (
                      <div className="p-3 bg-error/10 text-error rounded-lg text-body-sm font-medium">
                        {reviewError}
                      </div>
                    )}

                    <div className="space-y-xs">
                      <label className="font-label-md text-label-md text-on-surface-variant block">Your Rating</label>
                      <StarRating
                        interactive={true}
                        rating={reviewScore}
                        onChange={setReviewScore}
                      />
                    </div>

                    <div className="space-y-xs">
                      <label className="font-label-md text-label-md text-on-surface-variant block" htmlFor="review-comment">Your Review</label>
                      <textarea
                        id="review-comment"
                        className="w-full px-sm py-sm border border-outline-variant rounded-lg bg-white focus:ring-1 focus:ring-primary outline-none resize-none"
                        rows="3"
                        placeholder="Share your experience with this product..."
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                      ></textarea>
                    </div>

                    <div className="space-y-xs">
                      <label className="font-label-md text-label-md text-on-surface-variant block" htmlFor="review-name">Your Name</label>
                      <input
                        id="review-name"
                        className="w-full px-sm py-sm border border-outline-variant rounded-lg bg-white focus:ring-1 focus:ring-primary outline-none"
                        type="text"
                        placeholder="Enter your name"
                        value={reviewName}
                        onChange={(e) => setReviewName(e.target.value)}
                      />
                    </div>

 <Button
 variant="primary-container"
 type="submit"
 loading={reviewSubmitting ? "Submitting..." : false}
 >
 Submit Review
 </Button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
