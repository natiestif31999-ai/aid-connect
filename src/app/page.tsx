export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <section className="flex flex-col items-center justify-center text-center px-6 py-32 bg-blue-600 text-white">
        <h1 className="text-5xl font-bold mb-6">
          Aid Connect
        </h1>

        <p className="max-w-2xl text-lg mb-8">
          Empowering communities through education,
          healthcare, and humanitarian support.
        </p>

        <button className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition">
          Join Our Mission
        </button>
      </section>

      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-center">
          What We Do
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl shadow-lg border">
            <h3 className="text-xl font-semibold mb-4">
              Education
            </h3>

            <p>
              Supporting children and communities with
              learning opportunities and resources.
            </p>
          </div>

          <div className="p-6 rounded-2xl shadow-lg border">
            <h3 className="text-xl font-semibold mb-4">
              Healthcare
            </h3>

            <p>
              Improving access to medical support and
              wellness programs.
            </p>
          </div>

          <div className="p-6 rounded-2xl shadow-lg border">
            <h3 className="text-xl font-semibold mb-4">
              Humanitarian Aid
            </h3>

            <p>
              Providing emergency support and community
              assistance where needed most.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}