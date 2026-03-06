'use client'

type Product = {
    id: string
    title: string
    image_url: string
}

export function ProductSlider({ products }: { products: Product[] }) {

    if (!products || products.length === 0) return null

    const items = [...products, ...products] // sonsuz loop

    return (
        <section className="overflow-hidden py-16">

            <div className="container">

                <div className="flex animate-slider gap-16 w-max">

                    {items.map((product, i) => (

                        <div
                            key={i}
                            className="group flex flex-col items-center min-w-[160px]"
                        >

                            {/* IMAGE CARD */}
                            <div
                                className="
        w-[140px]
        h-[140px]
        rounded-2xl
        overflow-hidden
        bg-white/5
        border border-white/10
        transition
        duration-300
        group-hover:scale-110
      "
                            >

                                <img
                                    src={product.image_url}
                                    alt={product.title}
                                    className="
          w-full
          h-full
          object-cover
          transition
          duration-500
          group-hover:scale-125
        "
                                />

                            </div>

                            {/* TITLE */}
                            <span
                                className="
        text-sm
        mt-4
        text-white/90
        whitespace-nowrap
        group-hover:text-white
        transition
      "
                            >
                                {product.title}
                            </span>

                        </div>

                    ))}

                </div>

            </div>

        </section>
    )
}