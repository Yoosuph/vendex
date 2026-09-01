import React, { useState, useContext, useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { MarketplaceContext } from '@/shared/context/MarketplaceContext';
import { CartContext } from "@/shared/context/CartContext";
import { AuthContext } from '@/shared/context/AuthContext';
import Button from '@/shared/components/Button';
import { useToast } from '@/shared/context/ToastContext';
import StarRating from '@/shared/components/StarRating';
import LoadingSpinner from '@/shared/components/LoadingSpinner';
import ErrorState from '@/shared/components/ErrorState';
import EmptyState from '@/shared/components/EmptyState';
import { ProductDetailSkeleton } from '@/shared/components/SkeletonLoader';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

export default function ProductDetail() {
  const { id } = useParams();
  const { products, addReview, loading } = useContext(MarketplaceContext);
  const { addToCart, toggleWishlist, wishlist } = useContext(CartContext);
  const { user } = useContext(AuthContext);
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
  const [reviewName, setReviewName] = useState(user?.name || '');
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewError, setReviewError] = useState('');

  // Set initial selected image when product loads or changes
  React.useEffect(() => {
    if (product) {
      setSelectedImage(product.images && product.images.length > 0 ? product.images[0] : product.image);
    }
  }, [product?.id]);

  React.useEffect(() => {
    if (user?.name && !reviewName) {
      setReviewName(user.name);
    }
  }, [user, reviewName]);

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
    addToast(isWished ? 'Removed from wishlist' : 'Added to wishlist', 'info');
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setReviewError('');

    if (!user) {
      setReviewError('Please sign in to submit a review.');
      addToast('Please sign in to leave a review', 'error');
      navigate('/login');
      return;
    }

    if (reviewScore === 0) {
      setReviewError('Please select a star rating.');
      return;
    }
    if (!reviewComment.trim()) {
      setReviewError('Please enter a review comment.');
      return;
    }

    setReviewSubmitting(true);
    try {
      await addReview(product.id, {
        reviewer: (reviewName || user.name || '').trim(),
        score: reviewScore,
        comment: reviewComment.trim(),
      });
      addToast('Review submitted successfully!', 'success');
      setReviewScore(0);
      setReviewComment('');
      setReviewError('');
    } catch (err) {
      setReviewError(err.message || 'Failed to submit review');
      addToast(err.message || 'Failed to submit review', 'error');
    } finally {
      setReviewSubmitting(false);
    }
  };

  // Loading state: products array not yet available
  if (loading && (!products || products.length === 0)) {
    return <ProductDetailSkeleton />;
  }

  // Error state: product not found
  if (!product) {
    return (
      <main className="max-w-container-max mx-auto px-gutter py-xl">
        <EmptyState
          title="Product not found"
          message="The product you are looking for does not exist or has been removed."
          actionText="Browse Products"
          actionPath="/"
        />
      </main>
    );
  }

  const isOutOfStock = product.stock === 0;
  const currentImage = selectedImage || product.image;
  const images = product.images && product.images.length > 0 ? product.images : [product.image];
  const ratingRounded = Math.round(product.rating || 0);

  return (
    <>
      <main className="max-w-container-max mx-auto px-4 sm:px-gutter py-6 sm:py-xl overflow-x-hidden">
        {addedMessage && (
          <div className="fixed top-20 right-4 z-50 bg-green-600 text-white px-md py-sm rounded-xl shadow-lg flex items-center gap-xs animate-bounce">
            <span className="material-symbols-outlined">check_circle</span>
            <span>Added to Cart!</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-start">
          {/* Left Column: Image Gallery */}
          <section className="md:col-span-7 flex flex-col gap-md">
            <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-subtle border border-outline-variant/40">
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
                    className={cn('w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden border transition-colors', currentImage === imgUrl ? 'border-primary ring-2 ring-primary/20' : 'border-outline-variant hover:border-primary')}
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
                <Link className="text-primary font-bold hover:underline" to={`/store/${product.vendorId}`}>
                  {product.vendor}
                </Link>
                <div className="flex items-center text-primary ml-auto">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={cn('material-symbols-outlined text-body-lg', star <= ratingRounded && 'icon-filled')}
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
              <div className="flex flex-col gap-xs p-md bg-surface-container-lowest border border-outline-variant/40 rounded-2xl shadow-subtle">
                <div className="flex items-center gap-sm">
                  <span className="material-symbols-outlined text-secondary">local_shipping</span>
                  <span className="text-body-md font-medium">Estimated Delivery: <span className="text-on-surface">3-5 Business Days</span></span>
                </div>
                <div className="h-px bg-outline-variant my-1"></div>
                <div className="grid grid-cols-2 gap-md">
                  <div className="flex items-center gap-xs">
                    <span className="material-symbols-outlined text-body-lg text-primary icon-filled">verified_user</span>
                    <span className="text-label-md font-bold text-on-surface-variant">Safe Payment</span>
                  </div>
                  <div className="flex items-center gap-xs">
                    <span className="material-symbols-outlined text-body-lg text-primary icon-filled">bolt</span>
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
 variant={isWished ? 'ghost' : 'outline'}
 fullWidth
 size="lg"
 icon={<span className={cn('material-symbols-outlined', isWished && 'icon-filled')}>favorite</span>}
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
        <section className="mt-8 sm:mt-12 overflow-hidden">
          <div className="border-b border-outline-variant/40 flex gap-4 sm:gap-8 overflow-x-auto hide-scrollbar">
            <button
              className={cn('pb-3 text-sm sm:text-base font-bold whitespace-nowrap transition-all', activeTab === 'description' ? 'border-b-2 border-primary text-primary' : 'text-secondary hover:text-primary')}
              onClick={() => setActiveTab('description')}
            >
              Description
            </button>
            <button
              className={cn('pb-3 text-sm sm:text-base font-bold whitespace-nowrap transition-all', activeTab === 'specs' ? 'border-b-2 border-primary text-primary' : 'text-secondary hover:text-primary')}
              onClick={() => setActiveTab('specs')}
            >
              Specifications
            </button>
            <button
              className={cn('pb-3 text-sm sm:text-base font-bold whitespace-nowrap transition-all', activeTab === 'reviews' ? 'border-b-2 border-primary text-primary' : 'text-secondary hover:text-primary')}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews ({product.reviewsCount || 0})
            </button>
          </div>

          <div className="py-6 sm:py-10">
            {activeTab === 'description' && (
              <div className="tab-content grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-12" id="content-description">
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
                <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 overflow-hidden shadow-subtle">
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
                        <td className="p-md text-on-surface-variant">{product.vendorName || (typeof product.vendor === 'object' ? product.vendor.name : product.vendor) || 'Unknown'}</td>
                      </tr>
                      <tr className="border-b border-outline-variant/30">
                        <td className="p-md font-bold text-on-surface bg-surface-container-low">Stock Level</td>
                        <td className="p-md text-on-surface-variant">{product.stock > 0 ? `${product.stock} units available` : 'Out of Stock'}</td>
                      </tr>
                      <tr>
                        <td className="p-md font-bold text-on-surface bg-surface-container-low">SKU</td>
                        <td className="p-md font-mono text-on-surface-variant">{product.id}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="tab-content flex flex-col gap-lg" id="content-reviews">
                {/* Write Review Form */}
                <form className="p-md bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-subtle space-y-md" onSubmit={handleAddReview}>
                  <h4 className="font-headline-md text-headline-md text-on-surface">Write a Review</h4>
                  <div className="space-y-sm">
                    <div>
                      <label className="font-label-md text-label-md text-on-surface-variant mb-xs block">Rating</label>
                      <StarRating interactive onChange={setReviewRating} value={reviewRating} />
                    </div>

                    <div className="space-y-xs">
                      <label className="font-label-md text-label-md text-on-surface-variant block" htmlFor="review-comment">Your Review</label>
                      <textarea
                        id="review-comment"
                        className="w-full px-sm py-sm border border-outline-variant/50 rounded-xl bg-surface-container-low focus:ring-1 focus:ring-primary outline-none resize-none text-on-surface"
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
                        className="w-full px-sm py-sm border border-outline-variant/50 rounded-xl bg-surface-container-low focus:ring-1 focus:ring-primary outline-none text-on-surface"
                        type="text"
                        placeholder="Enter your name"
                        value={reviewName}
                        onChange={(e) => setReviewName(e.target.value)}
                      />
                    </div>
                  </div>
                  <Button variant="primary-container" type="submit" loading={reviewSubmitting}>Submit Review</Button>
                </form>

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
                                className={cn('material-symbols-outlined text-body-md', star <= (review.score || 0) && 'icon-filled')}
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

      {/* Dedicated Mobile Sticky Action Bar */}
      <aside className="fixed bottom-20 inset-x-3 z-30 lg:hidden pointer-events-auto">
        <div className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-surface-container-lowest/95 backdrop-blur-xl border border-outline-variant/60 shadow-xl">
          <div className="flex flex-col min-w-0 pl-1">
            <span className="text-[10px] font-semibold text-secondary uppercase tracking-wider">Price</span>
            <span className="text-lg font-bold text-primary buyer-price leading-tight">${product.price.toFixed(2)}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleWishlist}
              aria-label="Save to Wishlist"
              className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center border border-outline-variant/60 transition-colors",
                isWished ? "bg-primary/10 text-primary" : "text-secondary hover:text-on-surface"
              )}
            >
              <span className={cn("material-symbols-outlined text-xl", isWished && "icon-filled")}>favorite</span>
            </button>
            <Button
              variant="primary"
              size="md"
              disabled={isOutOfStock}
              onClick={handleAddToCart}
              className="rounded-xl px-4 font-semibold text-xs sm:text-sm shadow-md"
            >
              {isOutOfStock ? 'Sold Out' : 'Add to Cart'}
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}
