import React from "react";
import { motion } from "motion/react";
import { ArrowLeft, Calendar, User, Clock, Share2, Sparkles, Heart } from "lucide-react";
import { JournalPost } from "../types";

interface JournalReaderProps {
  post: JournalPost;
  onClose: () => void;
}

export default function JournalReader({ post, onClose }: JournalReaderProps) {
  // Simple state for cosmetic like button
  const [liked, setLiked] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 35 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 overflow-y-auto bg-warm-ivory/98 backdrop-blur-md flex flex-col"
    >
      {/* Editorial Mini-Header */}
      <header className="sticky top-0 bg-warm-ivory/80 backdrop-blur-xs border-b border-black/5 px-6 md:px-12 py-4 flex items-center justify-between z-20">
        <button
          onClick={onClose}
          className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-widest text-rich-charcoal hover:text-muted-brass transition-colors group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Studio</span>
        </button>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setLiked(!liked)}
            className={`p-2 rounded-full border transition-all duration-300 ${
              liked 
                ? "bg-red-50 text-red-500 border-red-200" 
                : "border-black/5 hover:border-black/20 text-sec-text hover:text-rich-charcoal"
            }`}
            aria-label="Like story"
          >
            <Heart className={`w-4 h-4 ${liked ? "fill-red-500" : ""}`} />
          </button>
          
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-black/5 hover:border-black/20 text-xs font-mono uppercase tracking-wider text-sec-text hover:text-rich-charcoal transition-all"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copied ? "Copied Link" : "Share"}</span>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-6 md:px-12 pt-12 pb-24 w-full">
        {/* Category Tag */}
        <div className="flex items-center justify-center mb-6">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-brass bg-white border border-black/5 px-3 py-1 rounded-full shadow-2xs">
            {post.category}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-serif text-rich-charcoal text-center leading-[1.15] tracking-tight max-w-3xl mx-auto mb-8">
          {post.title}
        </h1>

        {/* Authorship & Metadata */}
        <div className="flex flex-wrap items-center justify-center gap-y-4 gap-x-8 text-[11px] font-mono uppercase tracking-widest text-sec-text/80 mb-12 border-b border-black/5 pb-8">
          {post.author && (
            <div className="flex items-center gap-2">
              <User className="w-3.5 h-3.5 text-muted-brass" />
              <span>By {post.author}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-muted-brass" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-muted-brass" />
            <span>{post.readTime}</span>
          </div>
        </div>

        {/* Hero Cover Image */}
        <div className="aspect-[16/9] rounded-[32px] overflow-hidden border border-black/5 bg-soft-linen shadow-sm mb-16 relative">
          <img
            src={post.image}
            alt={post.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
        </div>

        {/* Editorial Body Text */}
        <div className="prose prose-neutral max-w-none">
          {/* Main Introductory Content */}
          <p className="font-serif text-xl md:text-2xl text-rich-charcoal/90 leading-relaxed italic border-l-2 border-muted-brass pl-6 md:pl-8 mb-12">
            {post.content}
          </p>

          {/* Render Body Blocks */}
          {post.bodyBlocks && post.bodyBlocks.length > 0 && (
            <div className="space-y-16 mt-12">
              {post.bodyBlocks.map((block, idx) => (
                <div key={idx} className="space-y-6">
                  {block.subheading && (
                    <h2 className="font-serif text-2xl md:text-3xl text-rich-charcoal font-semibold tracking-wide">
                      {block.subheading}
                    </h2>
                  )}
                  
                  <p className="text-sm md:text-base text-sec-text leading-relaxed font-sans">
                    {block.text}
                  </p>

                  {block.image && (
                    <div className="aspect-[3/2] rounded-[24px] overflow-hidden border border-black/5 bg-soft-linen my-8">
                      <img
                        src={block.image}
                        alt={block.subheading || "Article image"}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Closing Studio Signature */}
        <div className="mt-24 pt-12 border-t border-black/5 flex flex-col items-center justify-center text-center space-y-4">
          <Sparkles className="w-5 h-5 text-muted-brass animate-pulse" />
          <h3 className="font-serif text-lg text-rich-charcoal tracking-wider uppercase">AARASTA EDITORIAL</h3>
          <p className="text-xs text-sec-text max-w-md leading-relaxed font-sans">
            Exploring the quiet dialogues between space, heritage, and human contemplation. Our journal is released fortnightly to our community.
          </p>
          <button
            onClick={onClose}
            className="mt-6 px-6 py-2.5 rounded-full bg-rich-charcoal text-warm-ivory text-xs font-mono uppercase tracking-widest hover:bg-muted-brass transition-colors shadow-xs"
          >
            Continue Exploring
          </button>
        </div>
      </div>
    </motion.div>
  );
}
