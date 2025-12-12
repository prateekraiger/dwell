"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";

export function Gallery() {
  return (
    <section id="gallery" className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6">
            <div className="flex justify-between items-end mb-10">
                <h2 className="text-3xl text-stone-900 tracking-tight font-playfair font-medium">Visual Journey</h2>
                <div className="flex gap-2">
                    <button className="w-10 h-10 border border-stone-200 flex items-center justify-center hover:bg-stone-200 transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                    </button>
                    <button className="w-10 h-10 border border-stone-200 flex items-center justify-center hover:bg-stone-200 transition-colors">
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* 5-Image Bento Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-4 h-[600px]">
                {/* Image 1: Large Main Image (Left Half) */}
                <div className="col-span-2 row-span-2 relative overflow-hidden group rounded-2xl">
                    <img src="https://plus.unsplash.com/premium_photo-1661964402307-02267d1423f5?q=80&w=1073&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Visual Journey 1" />
                    <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/10 transition-colors"></div>
                </div>

                {/* Image 2: Top Right 1 */}
                <div className="col-span-1 row-span-1 relative overflow-hidden group rounded-2xl">
                    <img src="https://images.unsplash.com/photo-1568495248636-6432b97bd949?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Visual Journey 2" />
                </div>

                {/* Image 3: Top Right 2 */}
                <div className="col-span-1 row-span-1 relative overflow-hidden group rounded-2xl">
                    <img src="https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Visual Journey 3" />
                </div>

                {/* Image 4: Bottom Right 1 */}
                <div className="col-span-1 row-span-1 relative overflow-hidden group rounded-2xl">
                    <img src="https://plus.unsplash.com/premium_photo-1678297270385-ad5067126607?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Visual Journey 4" />
                </div>

                {/* Image 5: Bottom Right 2 */}
                <div className="col-span-1 row-span-1 relative overflow-hidden group rounded-2xl">
                    <img src="https://images.unsplash.com/photo-1667054430237-2a2afe4cb863?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Visual Journey 5" />
                </div>
            </div>
        </div>
    </section>
  );
}
