export function LocationSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto max-w-6xl px-6">

        <h2 className="text-3xl font-bold mb-8 text-center">
          Konumumuz
        </h2>

        <div className="w-full h-[450px] rounded-xl overflow-hidden shadow-lg">

          <iframe
            src="https://www.google.com/maps?q=Zübeyde%20Hanım,%20Kazım%20Karabekir%20Cd.%20No:87/43,%2006070%20Altındağ/Ankara&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />

        </div>

      </div>
    </section>
  );
}