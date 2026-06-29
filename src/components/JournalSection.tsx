import React from "react";
import { BookOpen, Calendar, Clock, ArrowRight } from "lucide-react";
import { journalPosts } from "../data";
import { JournalPost } from "../types";

interface JournalSectionProps {
  onPostClick: (post: JournalPost) => void;
}

export default function JournalSection({ onPostClick }: JournalSectionProps) {
  return (
    <section id="journal-section" className="py-24 bg-warm-ivory border-t border-border-color">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4 max-w-lg">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-brass">
              Our Stories
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-rich-charcoal leading-tight">
              Our Journal
            </h2>
          </div>
          <p className="text-sm text-sec-text max-w-xs leading-relaxed">
            Articles exploring beautiful home designs, history of crafts, and tips for caring for your items.
          </p>
        </div>

        {/* Magazine Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-stretch">
          {journalPosts.map((post) => (
            <article 
              key={post.id} 
              onClick={() => onPostClick(post)}
              className="relative lg:h-[360px] xl:h-[400px] flex flex-col justify-between group cursor-pointer"
            >
              <div className="w-full lg:absolute lg:top-0 lg:left-0 lg:right-0 lg:bg-warm-ivory lg:hover:bg-white lg:hover:shadow-[0_16px_36px_rgba(0,0,0,0.06)] lg:hover:border-black/5 lg:border lg:border-transparent lg:p-4 lg:rounded-3xl lg:transition-all lg:duration-500 lg:hover:-translate-y-6 lg:z-10 flex flex-col justify-between h-full lg:h-auto">
                <div className="space-y-4">
                  {/* Image Wrap */}
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-border-color bg-soft-linen relative">
                    <img
                      src={post.image}
                      alt={post.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-103"
                    />
                    {/* Subtle hover blur or tint */}
                    <div className="absolute inset-0 bg-rich-charcoal/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  </div>

                  {/* Meta details - hidden by default on lg+ */}
                  <div className="flex items-center gap-4 text-[9px] uppercase tracking-widest font-mono text-sec-text lg:max-h-0 lg:opacity-0 lg:overflow-hidden lg:group-hover:max-h-12 lg:group-hover:opacity-100 lg:group-hover:mt-3 lg:transition-all lg:duration-500 lg:ease-in-out">
                    <span className="text-muted-brass font-medium">{post.category}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {post.date}
                    </span>
                  </div>

                  {/* Title and Excerpt */}
                  <div className="space-y-2">
                    <h3 className="font-serif text-2xl text-rich-charcoal group-hover:text-muted-brass transition-colors duration-300 tracking-wide leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-xs text-sec-text leading-relaxed line-clamp-2 lg:max-h-0 lg:opacity-0 lg:overflow-hidden lg:group-hover:max-h-16 lg:group-hover:opacity-100 lg:group-hover:mt-2 lg:transition-all lg:duration-500 lg:ease-in-out">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                {/* Read button - hidden by default on lg+ */}
                <div className="pt-4 mt-4 border-t border-border-color/60 flex items-center justify-between text-[10px] font-mono text-sec-text uppercase tracking-widest group-hover:text-rich-charcoal transition-colors lg:max-h-0 lg:opacity-0 lg:overflow-hidden lg:group-hover:max-h-20 lg:group-hover:opacity-100 lg:group-hover:mt-5 lg:group-hover:pt-4 lg:group-hover:border-t lg:transition-all lg:duration-500 lg:ease-in-out">
                  <span>{post.readTime}</span>
                  <span className="flex items-center gap-1 font-medium text-muted-brass">
                    Read Article <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
