import React from 'react';

const brands = ['Luxury Prints', 'Packaging Studio', 'Creative Labels', 'Brand Kits', 'Marketing Prints', 'Custom Merch'];

export default function BrandStrip() {
    return (
        <section className="border-y border-white/10 bg-white/[0.03]">
            <div className="mx-auto max-w-7xl px-6 py-6 lg:px-8">
                <div className="grid grid-cols-2 gap-4 text-center md:grid-cols-3 lg:grid-cols-6">
                    {brands.map((brand) => (
                        <div
                            key={brand}
                            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm font-semibold text-white/65 backdrop-blur-md"
                        >
                            {brand}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}