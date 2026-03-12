export default function Home() {
  return (
    <div className="min-h-screen px-4 py-4">
      <div className="max-w-[1440px] h-full min-h-[calc(100vh-2rem)] mx-auto bg-blue-400 rounded-[3rem] flex flex-col items-center justify-center px-4">
        <p className="text-sm md:text-base uppercase tracking-[0.2em] text-blue-500 mb-4">
          Picture this
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-[120px] font-semibold text-blue-500 text-center leading-tight">
          Like Tiktok,
          <br />
          but for
          <br />
          Knowledge
        </h1>
      </div>
    </div>
  );
}
