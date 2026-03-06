'use client'

type Service = {
    id: string
    title: string
    image_url: string
}

type Props = {
    services: Service[]
}

export default function ServicesGrid({ services }: Props) {

    return (
        <section className="py-24">

            <div className="container">

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">

                    {services.map((service) => (

                        <div
                            key={service.id}
                            className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 text-center"
                        >

                            <div className="aspect-[4/5] w-full overflow-hidden rounded-xl mb-4">
                                <img
                                    src={service.image_url}
                                    alt={service.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <h3 className="text-lg font-semibold">
                                {service.title}
                            </h3>

                        </div>

                    ))}

                </div>

            </div>

        </section>
    )
}