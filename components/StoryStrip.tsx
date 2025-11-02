export default function StoryStrip() {
  const values = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      ),
      title: 'עיצוב ייחודי',
      description: 'כל מוצר מעוצב בקפידה עם תשומת לב לפרטים הקטנים',
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'איכות פרימיום',
      description: 'חומרים איכותיים והדפסה ברמה הגבוהה ביותר',
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: 'אחריות חברתית',
      description: 'מיוצר בישראל במפעל המעסיק אנשים עם מוגבלויות',
    },
  ];

  return (
    <section
      className="relative py-16 bg-gradient-to-r from-primary-pink/5 via-primary-turquoise/5 to-primary-mustard/5"
      aria-label="ערכי המותג"
    >
      <div className="container mx-auto px-4">
        {/* Made in Israel Badge */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-lg border-2 border-primary-turquoise">
            <span className="text-2xl">🇮🇱</span>
            <span className="font-bold text-base-black">מיוצר בישראל</span>
            <span className="text-2xl">🇮🇱</span>
          </div>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {values.map((value, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 text-center"
            >
              <div className="flex justify-center mb-4 text-primary-pink group-hover:text-primary-turquoise transition-colors">
                {value.icon}
              </div>
              <h3 className="text-xl font-bold text-base-black mb-3">
                {value.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

