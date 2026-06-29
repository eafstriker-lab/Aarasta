import React, { useRef, useState, useEffect } from "react";
import { motion } from "motion/react";
import { Play, Bookmark, BookmarkCheck, ArrowUpRight, Loader } from "lucide-react";

export interface PinterestItem {
  id: string;
  title: string;
  category: string;
  image: string;
  price?: string;
  type?: "image" | "video";
  videoUrl?: string;
  poster?: string;
  productDetail?: any;
}

interface PinterestGridProps {
  items: PinterestItem[];
  onItemClick: (product: any) => void;
  savedIds: string[];
  onToggleSave: (id: string) => void;
  enableInfiniteScroll?: boolean;
}

export const PinterestCard: React.FC<{
  item: PinterestItem;
  index: number;
  onItemClick: (product: any) => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
}> = ({
  item,
  index,
  onItemClick,
  isSaved,
  onToggleSave,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [span, setSpan] = useState(38);

  const calculateSpan = () => {
    if (cardRef.current) {
      // Measure the actual height of the card content
      const height = cardRef.current.getBoundingClientRect().height;
      const rowHeight = 8;
      const rowGap = 24;
      // Formula: S = Math.ceil((H + rowGap) / (rowHeight + rowGap))
      const newSpan = Math.ceil((height + rowGap) / (rowHeight + rowGap));
      setSpan(newSpan);
    }
  };

  useEffect(() => {
    // Initial measure after mounting
    calculateSpan();

    // Responsive recalculation
    window.addEventListener("resize", calculateSpan);
    return () => window.removeEventListener("resize", calculateSpan);
  }, []);

  const handleMediaLoad = () => {
    // Re-calculate height when media asset fully renders
    setTimeout(calculateSpan, 100);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: Math.min(index * 0.05, 0.5), ease: "easeOut" }}
      style={{ gridRowEnd: `span ${span}` }}
      onClick={() => item.productDetail && onItemClick(item.productDetail)}
      className="group relative rounded-[20px] overflow-hidden border border-black/5 bg-white cursor-pointer shadow-[0_4px_16px_rgba(0,0,0,0.02)] transition-all duration-500 hover:shadow-[0_12px_24px_rgba(0,0,0,0.06)] hover:-translate-y-1.5 h-fit w-full focus-within:ring-2 focus-within:ring-muted-brass"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          item.productDetail && onItemClick(item.productDetail);
        }
      }}
    >
      <div className="relative overflow-hidden w-full h-auto">
        {/* Media Block */}
        {item.type === "video" && item.videoUrl ? (
          <div className="w-full relative">
            <video
              src={item.videoUrl}
              autoPlay
              loop
              muted
              playsInline
              poster={item.poster}
              onLoadedData={handleMediaLoad}
              className="w-full h-auto object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105 transform-gpu"
            />
            <div className="absolute top-4 left-4 p-1.5 rounded-full bg-rich-charcoal/30 backdrop-blur-xs text-warm-ivory z-10">
              <Play className="w-3 h-3 fill-warm-ivory" />
            </div>
          </div>
        ) : (
          <img
            src={item.image}
            alt={item.title}
            onLoad={handleMediaLoad}
            referrerPolicy="no-referrer"
            loading="lazy"
            className="w-full h-auto object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105 transform-gpu"
          />
        )}

        {/* Dynamic Dark Gradients & Shading overlays on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Save button overlay */}
        <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(item.id);
            }}
            className={`p-2.5 rounded-full backdrop-blur-md shadow-xs border transition-all duration-300 cursor-pointer ${
              isSaved
                ? "bg-muted-brass/15 text-muted-brass border-muted-brass/20"
                : "bg-white/90 text-rich-charcoal border-black/5 hover:bg-white"
            }`}
            aria-label={isSaved ? "Saved" : "Save item"}
          >
            {isSaved ? (
              <BookmarkCheck className="w-4 h-4 stroke-[1.5]" />
            ) : (
              <Bookmark className="w-4 h-4 stroke-[1.5]" />
            )}
          </button>
        </div>

        {/* Premium Pinterest Metadata Drawer */}
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between z-10 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <div className="text-left max-w-[80%]">
            <span className="text-[8px] font-mono uppercase tracking-widest text-muted-brass bg-white/95 px-2 py-0.5 rounded shadow-2xs">
              {item.category}
            </span>
            <h4 className="font-serif text-sm md:text-base text-white mt-1.5 tracking-wide leading-tight line-clamp-1">
              {item.title}
            </h4>
            {item.price && (
              <p className="text-[9px] font-mono uppercase tracking-wider text-white/90 mt-0.5">
                {item.price}
              </p>
            )}
          </div>
          <div className="p-1.5 rounded-full bg-white text-rich-charcoal border border-black/5 shrink-0 ml-2 shadow-sm">
            <ArrowUpRight className="w-3.5 h-3.5 stroke-[1.5]" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function MasonrySkeletonCard({ heightClass }: { heightClass: "small" | "medium" | "large" }) {
  const span = heightClass === "small" ? 22 : heightClass === "medium" ? 34 : 46;
  return (
    <div
      className="rounded-[20px] bg-white border border-black/5 p-4 flex flex-col justify-between animate-pulse"
      style={{ gridRowEnd: `span ${span}` }}
    >
      <div className="bg-neutral-100 rounded-xl w-full h-full min-h-[140px] flex-1" />
      <div className="mt-4 space-y-2">
        <div className="h-2 bg-neutral-100 rounded w-1/3" />
        <div className="h-3 bg-neutral-100 rounded w-2/3" />
      </div>
    </div>
  );
}

export default function PinterestGrid({
  items,
  onItemClick,
  savedIds,
  onToggleSave,
  enableInfiniteScroll = true,
}: PinterestGridProps) {
  const [displayItems, setDisplayItems] = useState<PinterestItem[]>([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const observerRef = useRef<HTMLDivElement>(null);

  // Initialize display items
  useEffect(() => {
    setDisplayItems(items);
    setPage(1);
  }, [items]);

  // Infinite Scroll Trigger via IntersectionObserver
  useEffect(() => {
    if (!enableInfiniteScroll) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && !loadingMore) {
          triggerLoadMore();
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerRef.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [displayItems, loadingMore, enableInfiniteScroll]);

  const triggerLoadMore = () => {
    // Only simulate infinite scroll up to a reasonable limit (e.g. 5 pages) to prevent resource exhaustion
    if (page >= 4) return;

    setLoadingMore(true);

    setTimeout(() => {
      // Cycle items to simulate continuous exploration streaming
      const nextBatch = items.map((item, index) => ({
        ...item,
        id: `${item.id}-page-${page}-${index}`, // unique ID for infinite scrolling append
      }));

      setDisplayItems((prev) => [...prev, ...nextBatch]);
      setPage((p) => p + 1);
      setLoadingMore(false);
    }, 1200); // 1.2s delay for realistic immersive assets fetching
  };

  return (
    <div className="w-full bg-[#FAFAF8] p-4 md:p-8 rounded-[32px] border border-black/5">
      {/* CSS Grid Masonry Container */}
      <div
        className="w-full"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))",
          gridAutoRows: "8px",
          gap: "24px",
        }}
      >
        {displayItems.map((item, index) => (
          <PinterestCard
            key={item.id}
            item={item}
            index={index}
            onItemClick={onItemClick}
            isSaved={savedIds.includes(item.id.split("-page-")[0])} // Match original base ID
            onToggleSave={onToggleSave}
          />
        ))}

        {/* Skeleton items rendered on simulated infinite scrolling */}
        {loadingMore && (
          <>
            <MasonrySkeletonCard heightClass="small" />
            <MasonrySkeletonCard heightClass="medium" />
            <MasonrySkeletonCard heightClass="large" />
          </>
        )}
      </div>

      {/* Infinite Scroll Trigger Target */}
      {enableInfiniteScroll && page < 4 && (
        <div ref={observerRef} className="w-full flex justify-center items-center py-12 mt-8">
          {loadingMore ? (
            <div className="flex items-center gap-3 text-sec-text">
              <Loader className="w-4 h-4 animate-spin text-muted-brass" />
              <span className="text-[10px] font-mono uppercase tracking-[0.2em]">Assembling Masterpieces...</span>
            </div>
          ) : (
            <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-sec-text/40">
              Scroll down to reveal more
            </span>
          )}
        </div>
      )}
    </div>
  );
}
