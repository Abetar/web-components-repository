export default function LandingPage() {
  return (
    <main className="relative min-h-screen bg-[#0f172a] text-white overflow-hidden">
      {/* BACKGROUND EFFECT */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[#0f172a]" />

        <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-3xl animate-pulse" />

        <div className="absolute bottom-[-120px] right-[-100px] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-3xl animate-pulse" />

        <div className="absolute top-[40%] left-[60%] w-[300px] h-[300px] bg-cyan-400/10 rounded-full blur-2xl animate-pulse" />
      </div>

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 py-28 text-center">
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">
          UI Components you can copy and use instantly
        </h1>

        <p className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto">
          Browse curated Tailwind components, sections and layouts. Preview them
          instantly and copy clean code in seconds.
        </p>

        <div className="mt-10 flex justify-center gap-4 flex-wrap">
          <a
            href="/explore"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-500 transition"
          >
            Browse Snippets
          </a>

          <a
            href="/explore"
            className="px-6 py-3 border border-[#334155] rounded-lg text-sm font-medium hover:bg-[#1e293b] transition"
          >
            Explore Gallery
          </a>
        </div>
      </section>

      {/* VALUE PROPS */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-6">
            <h3 className="text-md font-medium">Copy & Paste Ready</h3>
            <p className="text-sm text-gray-400 mt-2">
              Clean Tailwind code you can drop directly into your project.
            </p>
          </div>

          <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-6">
            <h3 className="text-md font-medium">Real Preview</h3>
            <p className="text-sm text-gray-400 mt-2">
              See exactly how each component looks before using it.
            </p>
          </div>

          <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-6">
            <h3 className="text-md font-medium">Organized by Type</h3>
            <p className="text-sm text-gray-400 mt-2">
              Components, sections and full layouts categorized for fast access.
            </p>
          </div>
        </div>
      </section>

      {/* PREVIEW VISUAL */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-3 gap-6 justify-items-center">
          {/* SNIPPET 1 */}
          <div className="bg-[#0f172a] p-4 rounded-xl border border-[#334155] w-full max-w-sm">
            <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-5">
              <h3 className="text-md font-medium text-white">Pro Plan</h3>
              <p className="text-gray-400 text-sm mt-1">
                Perfect for scaling teams
              </p>

              <div className="mt-4 text-3xl font-semibold text-white">
                $29 <span className="text-sm text-gray-400">/mo</span>
              </div>

              <ul className="mt-4 space-y-2 text-sm text-gray-300">
                <li>✔ Unlimited components</li>
                <li>✔ Priority updates</li>
                <li>✔ Full access</li>
              </ul>

              <button className="mt-6 w-full bg-blue-600 hover:bg-blue-500 transition text-white py-2 rounded-lg text-sm">
                Get Started
              </button>
            </div>
          </div>

          {/* SNIPPET 2 */}
          <div className="bg-[#0f172a] p-4 rounded-xl border border-[#334155] w-full max-w-sm">
            <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-5">
              <p className="text-xs text-gray-400">Total Revenue</p>

              <div className="mt-2 text-2xl font-semibold text-white">
                $12,480
              </div>

              <div className="mt-2 text-sm text-green-400">
                +12.4% this month
              </div>

              <div className="mt-4 h-2 bg-[#0f172a] rounded">
                <div className="h-2 bg-blue-600 rounded w-2/3"></div>
              </div>
            </div>
          </div>

          {/* SNIPPET 3 */}
          <div className="bg-[#0f172a] p-4 rounded-xl border border-[#334155] w-full max-w-sm">
            <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-5">
              <h3 className="text-md font-medium text-white">Sign in</h3>

              <input
                placeholder="Email"
                className="mt-4 w-full px-3 py-2 rounded bg-[#0f172a] border border-[#334155] text-sm"
              />

              <input
                placeholder="Password"
                type="password"
                className="mt-2 w-full px-3 py-2 rounded bg-[#0f172a] border border-[#334155] text-sm"
              />

              <button className="mt-4 w-full bg-blue-600 hover:bg-blue-500 transition text-white py-2 rounded-lg text-sm">
                Login
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="text-center pb-24">
        <h2 className="text-2xl font-semibold">Start building faster</h2>

        <p className="text-gray-400 mt-2">
          Stop rewriting UI from scratch. Use ready components.
        </p>

        <a
          href="/explore"
          className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-500 transition"
        >
          Explore Repository
        </a>
      </section>
    </main>
  );
}
