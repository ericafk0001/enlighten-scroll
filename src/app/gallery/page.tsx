const gradeLevels = [
  "Elementary (K-5)",
  "Middle School (6-8)",
  "High School (9-12)",
  "College Prep",
];

const subjectTopics = [
  "Mathematics",
  "Science",
  "History",
  "Language Arts",
  "Computer Science",
  "Study Skills",
];

const cards = Array.from({ length: 12 }, (_, index) => ({
  id: index + 1,
  length: `${7 + (index % 5)}:${(index * 7) % 60}`.replace(/:(\d)$/, ":0$1"),
}));

export default function GalleryPage() {
  return (
    <section className="relative min-h-screen bg-[radial-gradient(circle_at_top_left,#f0f6ff_0%,#f8fbff_32%,#ffffff_65%)] px-3 pb-8 pt-6 md:px-6 md:pt-8">
      <div
        aria-hidden="true"
        className="fixed inset-0 z-10 bg-white/30 backdrop-blur-xs"
      />
      <div className="pointer-events-none fixed inset-0 z-30 flex items-center justify-center px-4 text-center">
        <p className="rounded-2xl border border-white/80 bg-white/85 px-6 py-4 text-2xl font-semibold text-slate-900 shadow-[0_14px_40px_rgba(15,23,42,0.18)] sm:text-3xl">
          Work in progress
        </p>
      </div>
      <div className="mx-auto grid w-full max-w-7xl gap-5 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="h-fit rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm backdrop-blur md:p-5">
          <h1 className="text-xl font-semibold text-slate-900">
            Video Gallery
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Filter by grade level and subject to narrow the feed.
          </p>

          <div className="mt-5 space-y-5">
            <div>
              <label
                htmlFor="grade-select"
                className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-slate-700"
              >
                Grade Level
              </label>
              <select
                id="grade-select"
                defaultValue=""
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900"
              >
                <option value="" disabled>
                  Select grade level
                </option>
                {gradeLevels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>

            <fieldset>
              <legend className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-700">
                Grade Quick Filters
              </legend>
              <div className="space-y-2">
                {gradeLevels.map((level, index) => {
                  const id = `grade-${index}`;
                  return (
                    <label
                      key={level}
                      htmlFor={id}
                      className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm text-slate-800 hover:bg-slate-100"
                    >
                      <input
                        id={id}
                        name="grade-radio"
                        type="radio"
                        defaultChecked={index === 1}
                        className="h-4 w-4"
                      />
                      <span>{level}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <div>
              <label
                htmlFor="subject-select"
                className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-slate-700"
              >
                Subject / Topic
              </label>
              <select
                id="subject-select"
                defaultValue=""
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900"
              >
                <option value="" disabled>
                  Select subject or topic
                </option>
                {subjectTopics.map((topic) => (
                  <option key={topic} value={topic}>
                    {topic}
                  </option>
                ))}
              </select>
            </div>

            <fieldset>
              <legend className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-700">
                Topic Focus
              </legend>
              <div className="space-y-2">
                {subjectTopics.map((topic, index) => {
                  const id = `topic-${index}`;
                  return (
                    <label
                      key={topic}
                      htmlFor={id}
                      className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm text-slate-800 hover:bg-slate-100"
                    >
                      <input
                        id={id}
                        name="topic-radio"
                        type="radio"
                        defaultChecked={index === 0}
                        className="h-4 w-4"
                      />
                      <span>{topic}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          </div>
        </aside>

        <div>
          <div className="mb-4 flex items-end justify-between gap-3">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
                Learning Videos
              </h2>
              <p className="text-sm text-slate-600">Upcoming uploads.</p>
            </div>
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700">
              {cards.length} results
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {cards.map((card) => (
              <article
                key={card.id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_28px_rgba(15,23,42,0.05)]"
              >
                <div className="group relative aspect-video bg-linear-to-br from-slate-200 via-slate-100 to-white">
                  <div className="absolute inset-0 bg-[linear-gradient(130deg,rgba(255,255,255,0.18),rgba(148,163,184,0.08)_42%,rgba(255,255,255,0.35))]" />
                  <div className="absolute right-2 top-2 rounded bg-black/75 px-1.5 py-0.5 text-[11px] font-medium text-white">
                    {card.length}
                  </div>
                </div>
                <div className="p-3">
                  <div className="mb-2 h-4 w-11/12 rounded bg-slate-200" />
                  <div className="mb-3 h-4 w-3/4 rounded bg-slate-200" />
                  <div className="h-3 w-2/5 rounded bg-slate-100" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
